import type { FastMCP } from 'fastmcp'
import type { SimplifiedDesign } from './simplify-node-response'
import { imageContent } from 'fastmcp'
import yaml from 'js-yaml'
import { z } from 'zod'
import { FigmaService, Logger } from './figma'
import { DownloadFigmaImagesParams } from '@fastmcp/types/figma'

export class FigmaTools {
  public server: FastMCP
  private figmaApiKey: string
  public figmaToolsCore: FigmaToolsCore

  constructor({
    server,
    figmaApiKey
  }: {
    server: FastMCP
    figmaApiKey: string
  }) {
    this.server = server
    this.figmaApiKey = figmaApiKey
    this.figmaToolsCore = new FigmaToolsCore({
      server,
      figmaApiKey,
    })
  }

  public registerTools(): void {
    this.figmaToCode()
    this.downloadFigmaImages()
  }

  private figmaToCode(): void {
    this.server.addTool({
      name: 'Figma-To-Code',
      description: '基于获取的Figma明确的样式信息 并且在Png图片识别的辅助调整下（主要依据Figma明确的样式信息），并自动根据本地相关配置（如eslint等）来进行对应调整',
      parameters: z.object({
        fileKey: z
          .string()
          .describe(
            'The key of the Figma file to fetch, often found in a provided URL like figma.com/(file|design)/<fileKey>/...',
          ),
        nodeId: z
          .string()
          .optional()
          .describe(
            'The ID of the node to fetch, often found as URL parameter node-id=<nodeId>, always use if provided',
          ),
      }),
      execute: async ({
        fileKey,
        nodeId,
      }, {
        session,
      }: {
        session: any
      }) => {
        try {
          const figmaService = this.figmaToolsCore.figmaService
          const yamlResult = await this.figmaToolsCore.figmaToCode({
            fileKey,
            nodeId: nodeId || '',
          })

          const figmaImg = await figmaService.getImageData(fileKey, nodeId as string)

          const figmaImgData = await imageContent({
            url: figmaImg,
          })
          console.log('figmaImgData', figmaImgData)

          const pre = `
            <角色定义>
              你是一个资深前端开发工程师，正在参与一个前端项目的开发。
            </角色定义>

            <任务步骤>
              <步骤1>下载所需要的图片/SVG自由，并基于获取的Figma明确的样式信息 并且在Png图片识别的辅助调整下（主要依据Figma明确的样式信息），并自动根据本地相关配置（如eslint等）来进行对应调整</步骤1>
              <步骤2>当完成用户指令时候，调用以下所需的相关工具去完成目标：获取原型图，并通过原型图与生成的代码页面的截图进行相似性比对</步骤2>
            </任务步骤>

            <需要提供的内容>
              <内容1>Figma原型图的URL：可以从上文中去寻找，如果没有提示用户提供</内容1>
            </需要提供的内容>
              
            <注意事项>
              <事项1>Figma原型中明确的像素值（这些数值应当重视）</事项1>
              <事项2>如果和Figma原型图颜色明显不一致，则需要进行调整</事项2>
              <事项3>基于Figma原型Image图得到的整体布局情况，如果发现生成代码与图片布局偏差过大，去矫正因为设计稿图层不规范导致的布局错位问题</事项3>
            </注意事项>

            <输出>
              按照用户要求生成高质量代码并与Figma原型图一摸一样，并且在代码中添加注释，说明每个组件的作用和使用方法
            </输出>
          `

          return {
            content: [
              { type: 'text', text: pre },
              figmaImgData,
              { type: 'text', text: yamlResult },
            ],
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : JSON.stringify(error)
          Logger.error(`Error fetching file ${fileKey}:`, message)
          return {
            isError: true,
            content: [{ type: 'text', text: `Error fetching file: ${message}` }],
          }
        }
      },
    })
  }

  private downloadFigmaImages(): void {
    this.server.addTool({
      name: 'Download-Figma-Images',
      description: 'Download SVG and PNG images used in a Figma file based on the IDs of image or icon nodes',
      parameters: z.object({
        fileKey: z.string().describe('The key of the Figma file containing the node'),
        nodes: z
          .object({
            nodeId: z
              .string()
              .describe('The ID of the Figma image node to fetch, formatted as 1234:5678'),
            imageRef: z
              .string()
              .optional()
              .describe(
                'If a node has an imageRef fill, you must include this variable. Leave blank when downloading Vector SVG images.',
              ),
            fileName: z.string().describe('The local name for saving the fetched file'),
          })
          .array()
          .describe('The nodes to fetch as images'),
        localPath: z
          .string()
          .describe(
            'The absolute path to the directory where images are stored in the project. If the directory does not exist, it will be created. The format of this path should respect the directory format of the operating system you are running on. Don\'t use any special character escaping in the path name either.',
          ),
      }),
      execute: async ({ fileKey, nodes, localPath }, { session }) => {
        try {
          const downloads = await this.figmaToolsCore.downloadFigmaImages({
            fileKey,
            nodes,
            localPath,
          })

          // If any download fails, return false
          const saveSuccess = !downloads.find(success => !success)
          return {
            content: [
              {
                type: 'text',
                text: saveSuccess
                  ? `Success, ${downloads.length} images downloaded: ${downloads.join(', ')}`
                  : 'Failed',
              },
            ],
          }
        } catch (error) {
          Logger.error(`Error downloading images from file ${fileKey}:`, error)
          return {
            isError: true,
            content: [{ type: 'text', text: `Error downloading images: ${error}` }],
          }
        }
      },
    })
  }

  
}


class FigmaToolsCore {
  public server: FastMCP
  private figmaApiKey: string
  public figmaService: FigmaService

  constructor({
    server,
    figmaApiKey
  }: {
    server: FastMCP
    figmaApiKey: string
  }) {
    this.server = server
    this.figmaApiKey = figmaApiKey
    this.figmaService = new FigmaService(figmaApiKey)
  }

  public async figmaToCode({
    fileKey,
    nodeId,
  }: {
    fileKey: string
    nodeId: string
  }) {

    const figmaService = this.figmaService

    let file: SimplifiedDesign
    if (nodeId) {
      file = await figmaService.getNode(fileKey, nodeId)
    } else {
      file = await figmaService.getFile(fileKey)
    }

    Logger.log(`Successfully fetched file: ${file.name}`)
    const { nodes, globalVars, ...metadata } = file

    const result = {
      metadata,
      nodes,
      globalVars,
    }

    Logger.log('Generating YAML result from file')
    const yamlResult = yaml.dump(result)

    Logger.log('Sending result to client')
    Logger.log('content', yamlResult)

    return yamlResult
  }

  public async downloadFigmaImages({
    fileKey,
    nodes,
    localPath
  }: DownloadFigmaImagesParams) {
    const figmaService = this.figmaService

    const imageFills = nodes.filter(({ imageRef }) => !!imageRef) as {
      nodeId: string
      imageRef: string
      fileName: string
    }[]
    const fillDownloads = figmaService.getImageFills(fileKey, imageFills, localPath)
    const renderRequests = nodes
      .filter(({ imageRef }) => !imageRef)
      .map(({ nodeId, fileName }) => ({
        nodeId,
        fileName,
        fileType: fileName.endsWith('.svg') ? ('svg' as const) : ('png' as const),
      }))

    const renderDownloads = figmaService.getImages(fileKey, renderRequests, localPath)

    const downloads = await Promise.all([fillDownloads, renderDownloads]).then(([f, r]) => [
      ...f,
      ...r,
    ])

    return downloads
  }

  public async downloadFigmaSVGAssets({
    fileKey,
    nodes,
    localPath
  }: DownloadFigmaImagesParams) {
    const figmaService = this.figmaService

    const renderRequests = nodes
      .filter(({ imageRef }) => !imageRef)
      .map(({ nodeId, fileName }) => ({
        nodeId,
        fileName,
        fileType: fileName.endsWith('.svg') ? ('svg' as const) : ('png' as const),
      }))

    console.log('renderRequests', nodes)

    const renderDownloads = figmaService.getSVG(fileKey, renderRequests, localPath)

    const downloads = await Promise.all([renderDownloads]).then(([r]) => [
      ...r,
    ])

    return downloads
  }

}

export type FigmaToolsCoreType = FigmaToolsCore
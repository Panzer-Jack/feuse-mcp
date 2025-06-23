import type { FastMCP } from 'fastmcp'
import type { SimplifiedDesign } from './simplify-node-response'
import { imageContent } from 'fastmcp'
import yaml from 'js-yaml'
import { z } from 'zod'
import { DownloadFigmaImagesParams } from '@fastmcp/types/figma'
import { FigmaService, Logger } from './figma'

import figmaToCodePrompt from './prompt/Figma-To-Code.xml'

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
      description: 'Generate pixel-perfect frontend code from Figma designs. Automatically parses Figma DSL structure and style information, combines with PNG preview images for visual validation, and generates high-quality frontend component code that matches your project tech stack. Supports automatic detection of project configurations (UnoCSS/TailwindCSS/SCSS etc.) and uses existing style variables and design standards.',
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

          const prompt: string = `
            <xml>
              <prompt>${figmaToCodePrompt}</prompt>
              <Figma-DSL>${yamlResult}</Figma-DSL>
            </xml>
          `

          return {
            content: [
              { type: 'text', text: prompt },
              figmaImgData,
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
        fileKey: z.string().describe("The key of the Figma file containing the node"),
        nodes: z
          .object({
            nodeId: z
              .string()
              .describe("The ID of the Figma image node to fetch, formatted as 1234:5678"),
            imageRef: z
              .string()
              .optional()
              .describe(
                "If a node has an imageRef fill, you must include this variable. Leave blank when downloading Vector SVG images.",
              ),
            fileName: z.string().describe("The local name for saving the fetched file"),
          })
          .array()
          .describe("The nodes to fetch as images"),
        pngScale: z
          .number()
          .positive()
          .optional()
          .default(2)
          .describe(
            "Export scale for PNG images. Optional, defaults to 2 if not specified. Affects PNG images only.",
          ),
        localPath: z
          .string()
          .describe(
            "The absolute path to the directory where images are stored in the project. If the directory does not exist, it will be created. The format of this path should respect the directory format of the operating system you are running on. Don't use any special character escaping in the path name either.",
          ),
        svgOptions: z
          .object({
            outlineText: z
              .boolean()
              .optional()
              .default(true)
              .describe("Whether to outline text in SVG exports. Default is true."),
            includeId: z
              .boolean()
              .optional()
              .default(false)
              .describe("Whether to include IDs in SVG exports. Default is false."),
            simplifyStroke: z
              .boolean()
              .optional()
              .default(true)
              .describe("Whether to simplify strokes in SVG exports. Default is true."),
          })
          .optional()
          .default({})
          .describe("Options for SVG export"),
      }),
      execute: async ({ fileKey, nodes, localPath, svgOptions, pngScale }, { session }) => {
        try {
          const downloads = await this.figmaToolsCore.downloadFigmaImages({
            fileKey,
            nodes,
            localPath,
            svgOptions,
            pngScale,
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
    this.figmaService = new FigmaService({
      figmaApiKey: figmaApiKey,
      figmaOAuthToken: '',
      useOAuth: false,
    })
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
    const yamlResult = JSON.stringify(result, null, 2)

    Logger.log('Sending result to client')
    Logger.log('content', yamlResult)

    return yamlResult
  }

  public async downloadFigmaImages({
    fileKey,
    nodes,
    localPath,
    svgOptions,
    pngScale
  }: DownloadFigmaImagesParams) {
    const figmaService = this.figmaService

    const imageFills = nodes.filter(({ imageRef }) => !!imageRef) as {
      nodeId: string;
      imageRef: string;
      fileName: string;
    }[];
    const fillDownloads = figmaService.getImageFills(fileKey, imageFills, localPath);
    const renderRequests = nodes
      .filter(({ imageRef }) => !imageRef)
      .map(({ nodeId, fileName }) => ({
        nodeId,
        fileName,
        fileType: fileName.endsWith(".svg") ? ("svg" as const) : ("png" as const),
      }));

    const renderDownloads = figmaService.getImages(
      fileKey,
      renderRequests,
      localPath,
      pngScale,
      svgOptions,
    );

    const downloads = await Promise.all([fillDownloads, renderDownloads]).then(([f, r]) => [
      ...f,
      ...r,
    ]);

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
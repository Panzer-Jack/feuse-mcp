import type { FastMCP } from 'fastmcp'

import { imageContent } from 'fastmcp'
import { z } from 'zod'

import { FigmaService, Logger } from '../figma/figma'
import { ScreenshotService } from './screenshot'
import similarityPrompt from './prompt/similarity-prompt.xml'

export class SimilarityTools {
  public server: FastMCP

  constructor({
    server,
  }: {
    server: FastMCP
  }) {
    this.server = server
  }

  public registerTools(): void {
    this.similarity()
  }

  private similarity(): void {
    this.server.addTool({
      name: 'similarity-figma',
      description: '获取Figma原型图，请你结合项目源码并通过原型图与生成的代码页面的截图进行相似性比对',
      parameters: z.object({
        url: z
          .string()
          .describe('当前项目代码页面的URL地址，注意不是figma网址'),
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
        url,
        fileKey,
        nodeId,
      }, {
        session,
      }: {
        session: any
      }) => {
        try {
          const figmaService = new FigmaService(session.figmaApiKey as string)
          const screenshotService = new ScreenshotService()

          console.log(`Processing similarity check for URL: ${url}, Figma fileKey: ${fileKey}, nodeId: ${nodeId || 'not provided'}`)

          // 分步执行并添加错误处理
          let figmaImg
          try {
            figmaImg = await figmaService.getImageData(fileKey, nodeId as string)
            console.log('Successfully fetched Figma image')
          } catch (figmaError) {
            Logger.error('Failed to fetch Figma image:', figmaError)
            return {
              isError: true,
              content: [{ type: 'text', text: `Error fetching Figma image: ${figmaError instanceof Error ? figmaError.message : JSON.stringify(figmaError)}` }],
            }
          }

          let screenshotImg
          try {
            screenshotImg = await screenshotService.takeScreenshot(url)
            console.log('Successfully captured screenshot')
          } catch (screenshotError) {
            Logger.error('Failed to take screenshot:', screenshotError)
            return {
              isError: true,
              content: [{ type: 'text', text: `Error taking screenshot of ${url}: ${screenshotError instanceof Error ? screenshotError.message : JSON.stringify(screenshotError)}` }],
            }
          }

          // 处理图片转换，添加错误处理
          let figmaImgData
          let screenshotImgData

          try {
            figmaImgData = await imageContent({
              url: figmaImg,
            })
            console.log('Successfully converted Figma image')
          } catch (figmaConvertError) {
            Logger.error('Failed to convert Figma image:', figmaConvertError)
            return {
              isError: true,
              content: [{ type: 'text', text: `Error converting Figma image: ${figmaConvertError instanceof Error ? figmaConvertError.message : JSON.stringify(figmaConvertError)}` }],
            }
          }

          try {
            screenshotImgData = await imageContent({
              buffer: screenshotImg,
            })
            console.log('Successfully converted screenshot image')
          } catch (screenshotConvertError) {
            Logger.error('Failed to convert screenshot image:', screenshotConvertError)
            return {
              isError: true,
              content: [{ type: 'text', text: `Error converting screenshot image: ${screenshotConvertError instanceof Error ? screenshotConvertError.message : JSON.stringify(screenshotConvertError)}` }],
            }
          }

          // console.log('figmaImgData', figmaImgData)
          console.log('screenshotImgData', screenshotImgData)

          const prompt = similarityPrompt

          return {
            content: [
              { type: 'text', text: prompt },
              figmaImgData,
              screenshotImgData,
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
}

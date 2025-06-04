import type { FastMCP } from 'fastmcp'
import type { FigmaTools, FigmaToolsCoreType } from '../figma'

import { z } from 'zod'
import { Logger } from '../figma/figma'

import apiAutomationPrompt from './prompt/api-automation.xml'
import projectStandardsPrompt from './prompt/project-standards.xml'
import initProjectStandardPrompt from './prompt/initialize-project-standard.xml'
import copilotInstructionsPrompt from './prompt/copilot-instructions.md'
import extractColorVarsPrompt from './prompt/extract-color-vars.xml'
import extractSVGAssetsPrompt from './prompt/extract-svg-assets.xml'


export class UtilityTools {
  public server: FastMCP
  public figmaToolsCore: FigmaToolsCoreType

  constructor({
    server,
    figmaTools
  }: {
    server: FastMCP
    figmaTools: FigmaTools
  }) {
    this.server = server
    this.figmaToolsCore = figmaTools.figmaToolsCore
  }

  public registerTools(): void {
    this.apiAutomation()
    this.initProjectStandard()
    this.extractColorVars()
    this.extractSVGAssets()
    this.dowdloadSVGAssets()
  }

  private dowdloadSVGAssets(): void {
    this.server.addTool({
      name: 'download-svg-assets',
      description: '根据图像或图标节点的ID，仅下载Figma文件中使用的SVG资源',
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
          const downloads = await this.figmaToolsCore.downloadFigmaSVGAssets({
            fileKey,
            nodes,
            localPath,
          })

          // If any download fails, return false
          const saveSuccess = !downloads.find(success => !success)
          const assetsPrompt = saveSuccess
            ? `Success, ${downloads.length} images downloaded: ${downloads.join(', ')}`
            : 'Failed'

          const prompt: string = `
            <xml>
              <SVG-URL>${assetsPrompt}</SVG-URL>
            </xml>
          `

          return {
            content: [
              {
                type: 'text',
                text: prompt
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

  private extractSVGAssets(): void {
    this.server.addTool({
      name: 'extract-svg-assets',
      description: '分析figma SDL中的结构，并调用download-svg-assets工具下载Figma文件中使用的SVG资源',
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
          const yamlResult = await this.figmaToolsCore.figmaToCode({
            fileKey,
            nodeId: nodeId || '',
          })

          const prompt: string = `
            <xml>
              <prompt>${extractSVGAssetsPrompt}</prompt>
              <Figma-DSL>${yamlResult}</Figma-DSL>
            </xml>
          `

          return {
            content: [
              { type: 'text', text: prompt },
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

  private extractColorVars(): void {
    this.server.addTool({
      name: 'extract-color-vars',
      description: '从Figma DSL文件中提取颜色变量，并输出在用户指定的文件中（比如unocss、tailwindcss或者自定义标准文件中等）',
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
          const yamlResult = await this.figmaToolsCore.figmaToCode({
            fileKey,
            nodeId: nodeId || '',
          })

          const prompt: string = `
            <xml>
              <prompt>${extractColorVarsPrompt}</prompt>
              <Figma-DSL>${yamlResult}</Figma-DSL>
            </xml>
          `

          return {
            content: [
              { type: 'text', text: prompt },
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

  private initProjectStandard(): void {
    this.server.addTool({
      name: 'initialize-project-standard',
      description: '针对用户指定项目进行分析，生成Copilot 和 cursor对应的全局项目规则',
      execute: async () => {
        const prompt: string = `
          <xml>
            <prompt>${initProjectStandardPrompt}</prompt>
            <template>${copilotInstructionsPrompt}</template>
          </xml>
        `
        return prompt
      },
    })
  }

  private apiAutomation(): void {
    this.server.addTool({
      name: 'api-automation',
      description: '理解后端接口文档自动生成接口类型、地址常量、mock数据、请求函数等',
      parameters: z.object({
        apiDocs: z
          .string()
          .describe('后端接口文档内容'),
      }),
      execute: async ({
        apiDocs,
      }) => {

        const prompt: string = `
          <xml>
            <project-standard>${projectStandardsPrompt}</project-standard>
            <prompt>${apiAutomationPrompt}</prompt>
            <apiDocs>${apiDocs}</apiDocs>
          </xml>
        `
        return prompt
      },
    })
  }
}

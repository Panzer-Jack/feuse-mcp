import { FastMCP } from 'fastmcp'
import { FigmaTools } from './services/figma'
import { SimilarityTools } from './services/similarity'
import { UtilityTools } from './services/utility'

export class MCPServer {
  public server: FastMCP

  private figmaTools: FigmaTools
  private similarityTools: SimilarityTools
  private utilityTools: UtilityTools

  constructor({ figmaApiKey }: { figmaApiKey: string }) {

    const server = this.createMcpServer()

    // 注册 Tools
    this.figmaTools = new FigmaTools({ server, figmaApiKey })
    this.similarityTools = new SimilarityTools({ server })
    this.utilityTools = new UtilityTools({ server, figmaTools: this.figmaTools })
    this.server = server
    this.registerTools()
  }

  private createMcpServer() {
    const server = new FastMCP({
      name: 'feuse-mcp',
      version: '0.1.0',
      ping: {
        enabled: false,
      },
    })

    return server
  }

  private registerTools(): void {
    this.figmaTools.registerTools()
    this.similarityTools.registerTools()
    this.utilityTools.registerTools()
  }
}

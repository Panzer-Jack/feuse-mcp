<div align="center">

<p align="center">
    <img src="https://github.com/user-attachments/assets/6f5a6011-9c4a-450d-8ebd-60b954dbc05f" alt="feuse-mcp" width="300px">
</p>

Frontend Useful MCP (Model Context Protocol) Tools - Essential utilities for web developers to automate API integration, Figma design-to-code conversion, and development workflow optimization.

<div align="center">
    <img src="https://img.shields.io/badge/node-%5E22.0.0-brightgreen" alt="license">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license">
</div>
</div>  

English | [中文](README.zh.md)

## 📖 Documentation
[feuse-mcp Official Documentation](https://panzer-jack.github.io/feuse-mcp/en)

## ✨ Features
- 🎨 **Figma Integration**: Built-in integration with [Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP/discussions) for seamless Figma design-to-code conversion and automatic asset extraction
- 📝 **API Automation**: Generate TypeScript interface types, API URL constants, mock data, and request functions from API documentation
- 🖼️ **Asset Management**: Download SVG and PNG images from Figma files with organized file structure
- 🎯 **Similarity Comparison**: Compare generated code pages with original Figma prototypes for accuracy validation
- 🛠️ **Project Standards**: Generate global specification guidance files for Copilot & Cursor based on current project architecture
- 🔧 **Color Variables**: Extract and convert Figma color variables to CSS/design tokens in specified standards (UnoCSS, TailwindCSS, or custom structures)

## 🔧 Available Toolset (Continuously Updated)

| Tool Name                       | Category           | Description                                                            | Input Parameters                     | Notes                                                                                        |
| ------------------------------- | ------------------ | ---------------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------- |
| **Figma-To-Code**               | Figma Integration  | Generate frontend code based on Figma styling info with PNG assistance | `fileKey`, `nodeId`(optional)        | Auto-adapts to local configs (ESLint etc), supports responsive layouts                       |
| **extract-svg-assets**          | Asset Analysis     | Analyze Figma DSL structure and auto-extract SVG resources             | `fileKey`, `nodeId`(optional)        | Intelligent Figma file analysis, batch extraction of SVG icons/vectors                       |
| **extract-color-vars**          | Design Tokens      | Extract color variables from Figma DSL to CSS framework configs        | `fileKey`, `nodeId`(optional)        | Supports UnoCSS, TailwindCSS, or custom file format output                                   |
| **similarity-figma**            | Quality Control    | Compare Figma prototypes with project page screenshots                 | `url`, `fileKey`, `nodeId`(optional) | Visual comparison with intelligent similarity scoring and detailed analysis                  |
| **api-automation**              | Development Tools  | Parse backend API docs and generate types, constants, mock data        | `apiDocs`                            | Supports multiple API doc formats, generates complete frontend API toolkit                   |
| **initialize-project-standard** | Project Management | Analyze project structure and generate Copilot/Cursor global rules     | No parameters                        | Auto-generates intelligent coding assistant project context and standards                    |
| **Download-Figma-Images**       | Asset Management   | Batch download SVG and PNG image resources from Figma by node ID       | `fileKey`, `nodes[]`, `localPath`    | Supports imageRef handling, auto-creates directory structure (low-level tool for other MCPs) |
| **download-svg-assets**         | Asset Management   | Download SVG vector resources from Figma by image/icon node ID         | `fileKey`, `nodes[]`, `localPath`    | SVG format only, supports complex node structures (low-level tool for other MCPs)            |

## 🚀 Quick Start
### Configuration

Add to your MCP client configuration:

Get your Figma API key from [Figma Developer Settings](https://www.figma.com/developers/api#authentication).

```json
{
  "feuse-mcp": {
    "command": "npx",
    "args": ["feuse-mcp@latest"],
    "env": {
      "FIGMA_API_KEY": "YOUR_FIGMA_API_KEY"
    }
  }
}
```

## 🔧 For Code Contributors

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/feuse-mcp.git
cd feuse-mcp

# Install dependencies
pnpm install

# Build
pnpm build
```

Add to your MCP client configuration:

Get your Figma API key from [Figma Developer Settings](https://www.figma.com/developers/api#authentication).

```json
{
  "feuse-mcp": {
    "command": "npx",
    // Configure path
    "args": ["YOUR/PATH/TO/dist/main.cjs"],
    "env": {
      "FIGMA_API_KEY": "YOUR_FIGMA_API_KEY"
    }
  }
}
```

## 📁 Project Structure

```
feuse-mcp/
├── src/
│   ├── main.ts              # Main entry point
│   ├── services/            # Core services
│   │   ├── figma/          # Figma integration
│   │   ├── similarity/     # Visual comparison
│   │   └── utility/        # Utility toolset
│   ├── types/              # TypeScript definitions
│   └── utils/              # Helper functions
├── docs/                   # Documentation
└── dist/                   # Built files
```

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Follow the existing code style
2. Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**If you have more interesting, fun, and cool ideas, please submit them in issues immediately ! ! !**

## 🙏 Acknowledgments

- [Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP/discussions) for providing Figma design analysis capabilities
- [fastmcp](https://github.com/punkpeye/fastmcp) for providing MCP rapid development framework
- All contributors and users of this project

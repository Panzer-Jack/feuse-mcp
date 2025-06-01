# What is feuse-mcp

feuse-mcp (Frontend Useful MCP) is a Model Context Protocol (MCP) toolkit designed for frontend developers, aimed at automating API integration, Figma design-to-code conversion, and development workflow optimization.

Boost your frontend development efficiency by 10x! 🚀

<h3 style="color: #FF6B6B;">If you have more interesting, fun, and cool ideas, please submit them in issues immediately!!!</h3>

## Project Background

In modern frontend development, there are many mechanical tasks with clear boundaries. Developers often face repetitive work: generating interface code based on API documentation, Mock data, managing design resources, etc. The feuse-mcp project is committed to automating these tedious tasks through the Model Context Protocol, allowing developers to focus on business logic implementation.

## Core Features

- **🎨 Figma Integration**: Built-in integration with [Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP/discussions), achieving seamless Figma design-to-code conversion and automatic resource extraction
- **📝 API Automation**: Generate TypeScript interface types, API URL constants, Mock data, and request functions from API documentation
- **🖼️ Asset Management**: Download SVG images from Figma files and save them in an organized file structure
- **🎯 Similarity Comparison**: Compare generated code pages with original Figma prototypes to verify implementation accuracy
- **🛠️ Project Standardization**: Generate global specification guidance files for Copilot and Cursor based on current project architecture
- **🔧 Design Tokens**: Extract Figma color variables and convert them to CSS/design tokens in specified standards (UnoCSS, TailwindCSS, or custom structure)

## Tool Components

feuse-mcp includes the following 8 core tools:

### Figma Integration Tools
- **Figma-To-Code**: Convert Figma designs to frontend code
- **extract-svg-assets**: Intelligently analyze Figma DSL structure and automatically extract SVG resources
- **extract-color-vars**: Extract color variables from Figma DSL to CSS framework configuration

### Development Tools
- **api-automation**: Parse backend API documentation and generate types, constants, Mock data
- **initialize-project-standard**: Analyze project structure and generate Copilot/Cursor global rules

### Asset Management Tools
- **Download-Figma-Images**: Batch download Figma SVG and PNG image resources by node ID
- **download-svg-assets**: Download and optimize SVG resources

### Quality Control Tools
- **similarity-figma**: Compare Figma prototypes with project page screenshots

## Applicable Scenarios

feuse-mcp is suitable for the following scenarios:
- Automate mechanical work with clear boundaries to reduce time waste
- Provide a reference for those who want to do some COOL experiments with AI editors

## Technical Advantages

- **Intelligence**: Intelligent code generation and resource management based on AI and MCP protocol
- **Framework Agnostic**: Support for mainstream frontend frameworks like React, Vue, Angular
- **Standardization**: Automatically generate code and configurations that comply with project standards
- **Extensible**: Based on MCP protocol, easy to integrate into existing development workflows

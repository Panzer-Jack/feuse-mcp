# Toolkit Introduction

feuse-mcp provides a complete set of frontend development tools, focusing on Figma integration, API automation, and development workflow optimization.

## 🔧 Available Toolset (Continuously Updated)

| Tool Name                       | Category           | Function Description                                                                                                          | Input Parameters                     | Notes                                                                                                        |
| ------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **Figma-To-Code**               | Figma Integration  | Generate frontend code based on explicit Figma style information, with PNG image assistance for identification and adjustment | `fileKey`, `nodeId`(optional)        | Auto-adapts to local config (ESLint, etc.), supports responsive layout and component structure               |
| **extract-svg-assets**          | Asset Analysis     | Analyze Figma DSL structure, automatically identify and call download tools to get SVG resources                              | `fileKey`, `nodeId`(optional)        | Intelligently analyze Figma file structure, batch extract SVG icons and vector graphics                      |
| **extract-color-vars**          | Design Tokens      | Extract color variables from Figma DSL, output to specified CSS framework configuration files                                 | `fileKey`, `nodeId`(optional)        | Support UnoCSS, TailwindCSS or custom file format output                                                     |
| **similarity-figma**            | Quality Detection  | Get Figma prototype images and project page screenshots for similarity comparison analysis                                    | `url`, `fileKey`, `nodeId`(optional) | Smart similarity scoring based on visual comparison, providing detailed difference analysis reports          |
| **api-automation**              | Development Tools  | Understand backend interface documentation, automatically generate interface types, address constants, Mock data, etc.        | `apiDocs`                            | Support multiple API documentation formats, generate complete frontend API toolchain                         |
| **initialize-project-standard** | Project Management | Analyze project structure, generate global project rules configuration for Copilot and Cursor                                 | No parameters                        | Automatically generate project context and coding standards for intelligent programming assistants           |
| **Download-Figma-Images**       | Asset Management   | Batch download SVG and PNG image resources from Figma by node ID                                                              | `fileKey`, `nodes[]`, `localPath`    | Support imageRef processing, automatically create directory structure (underlying tool, for other MCP calls) |
| **download-svg-assets**         | Asset Management   | Download SVG vector resources from Figma files specifically by image or icon node ID                                          | `fileKey`, `nodes[]`, `localPath`    | Only process SVG format, support complex node structures (underlying tool, for other MCP calls)              |

## Tool Category Description

### 🎨 Figma Integration
Directly interact with Figma API to achieve design-to-code conversion. These tools can understand Figma's design language and convert it into usable frontend code.

### 🖼️ Asset Management
Handle downloading and organizing static resources like images and icons. Support intelligent batch operations and automatically maintain project resource structure.

### 🎯 Quality Detection
Verify consistency between implementation results and design mockups. Through visual comparison and intelligent analysis, ensure development outcomes meet design requirements.

### 🛠️ Development Tools
Automation tools to improve development efficiency. Generate complete frontend development kits from API documentation, reducing repetitive work.

### 📁 Project Management
Project initialization and standardization configuration tools. Automatically analyze project architecture and generate appropriate development standards and configurations.

## Usage Scenarios

### Design-to-Code Workflow
1. Use `Figma-To-Code` to convert design mockups to base code
2. Extract required icon resources through `extract-svg-assets`  
3. Use `extract-color-vars` to generate design tokens
4. Verify implementation results with `similarity-figma`

### API Development Workflow
1. Use `api-automation` to parse backend API documentation
2. Automatically generate TypeScript type definitions
3. Generate API constants and request functions
4. Create Mock data for development testing

### Project Standardization Workflow
1. Use `initialize-project-standard` to analyze project structure
2. Generate Copilot/Cursor configuration files
3. Establish unified coding standards
4. Optimize development experience and code quality

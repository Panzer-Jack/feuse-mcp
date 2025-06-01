# 什么是 feuse-mcp

feuse-mcp（Frontend Useful MCP）是一个面向前端开发者的 Model Context Protocol (MCP) 工具集，旨在自动化 API 集成、Figma 设计稿转代码和开发工作流优化。

让你的前端开发效率提升 10 倍！🚀

<h3 style="color: #FF6B6B;">如果你有更多有意思的、好玩的、很酷的想法，请立刻在 issue 中提出来 ! ! !</h3>

## 项目背景

在现代前端开发中，存在许多机械化但又边界限制明确的活儿，开发者经常需要面对重复性的工作：根据 API 文档生成接口代码、Mock数据、管理设计资源等。feuse-mcp 项目致力于通过 Model Context Protocol 自动化这些繁琐的任务，让开发者专注于业务逻辑的实现。

## 核心特性

- **🎨 Figma 集成**：内置与 [Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP/discussions) 的集成，实现无缝的 Figma 设计稿到代码转换和自动资源提取
- **📝 API 自动化**：从 API 文档生成 TypeScript 接口类型、API URL 常量、Mock 数据和请求函数
- **🖼️ 资源管理**：从 Figma 文件下载 SVG 图像，并按组织化的文件结构保存
- **🎯 相似度比较**：将生成的代码页面与原始 Figma 原型进行比较，验证实现准确性
- **🛠️ 项目标准化**：基于当前项目架构为 Copilot 和 Cursor 生成全局规范指导文件
- **🔧 设计令牌**：提取 Figma 颜色变量并转换为指定标准的 CSS/设计令牌（UnoCSS、TailwindCSS 或自定义结构）

## 工具组成

feuse-mcp 包含以下 8 个核心工具：

### Figma 集成工具
- **Figma-To-Code**：将 Figma 设计稿转换为前端代码
- **extract-svg-assets**：智能分析 Figma DSL 结构并自动提取 SVG 资源
- **extract-color-vars**：从 Figma DSL 提取颜色变量到 CSS 框架配置

### 开发工具
- **api-automation**：解析后端 API 文档并生成类型、常量、Mock 数据
- **initialize-project-standard**：分析项目结构并生成 Copilot/Cursor 全局规则

### 资源管理工具
- **Download-Figma-Images**：按节点 ID 批量下载 Figma 的 SVG 和 PNG 图像资源
- **download-svg-assets**：下载并优化 SVG 资源

### 质量控制工具
- **similarity-figma**：比较 Figma 原型与项目页面截图

## 适用场景

feuse-mcp 适用于以下场景：
- 对于一些机械化有明显边界的dirty work进行自动化从而减少浪费生命
- 给一些想用AI编辑器做一些 很COOL的尝试 的同学一个参考

## 技术优势

- **智能化**：基于 AI 和 MCP 协议的智能代码生成和资源管理
- **框架无关**：支持 React、Vue、Angular 等主流前端框架
- **标准化**：自动生成符合项目标准的代码和配置
- **可扩展**：基于 MCP 协议，易于集成到现有开发工作流中
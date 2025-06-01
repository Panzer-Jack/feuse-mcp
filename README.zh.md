<div align="center">

<p align="center">
    <img src="https://github.com/user-attachments/assets/6f5a6011-9c4a-450d-8ebd-60b954dbc05f" alt="feuse-mcp" width="300px">
</p>
    
前端实用 MCP（模型上下文协议）工具 - 为 Web 开发者提供的自动化 API 集成、Figma 设计转代码和开发工作流优化的基础工具集。

<div align="center">
    <img src="https://img.shields.io/badge/node-%5E22.0.0-brightgreen" alt="license">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license">
</div>
</div>  

[English](README.md) | 中文

## 📖 文档
[feuse-mcp 官方文档](https://panzer-jack.github.io/feuse-mcp)


## ✨ 特性
- 🎨 **Figma 集成**: 内部集成了[Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP/discussions) 无缝将 Figma 设计转换为代码，自动提取资源
- 📝 **API 自动化**: 从 API 文档生成 TypeScript 接口类型、接口URL常量、Mock数据和请求函数
- 🖼️ **资源管理**: 从 Figma 文件下载 SVG 和 PNG 图片，并组织文件结构
- 🎯 **相似性比较**: 将生成的代码页面与原始 Figma 原型进行准确性验证对比
- 🛠️ **项目标准**: 生成针对当前项目规范架构生成 copilot & cursor 的全局规范指导文件
- 🔧 **颜色变量**: 提取并转换 Figma 颜色变量为 CSS/设计令牌 到指定的规范中（如UnoCSS、TailwindCSS 或者 自定义结构中）

## 🔧 现有工具集（持续更新ing）

| 工具名称                        | 类别      | 功能描述                                                   | 输入参数                          | 备注                                                          |
| ------------------------------- | --------- | ---------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------- |
| **Figma-To-Code**               | Figma集成 | 基于Figma明确样式信息生成前端代码，结合PNG图片辅助识别调整 | `fileKey`, `nodeId`(可选)         | 自动适配本地配置(ESLint等)，支持响应式布局和组件结构          |
| **extract-svg-assets**          | 资源分析  | 分析Figma DSL结构，自动识别并调用下载工具获取SVG资源       | `fileKey`, `nodeId`(可选)         | 智能分析Figma文件结构，批量提取SVG图标和矢量图形              |
| **extract-color-vars**          | 设计令牌  | 从Figma DSL提取颜色变量，输出到指定CSS框架配置文件         | `fileKey`, `nodeId`(可选)         | 支持UnoCSS、TailwindCSS或自定义文件格式输出                   |
| **similarity-figma**            | 质量检测  | 获取Figma原型图与项目页面截图进行相似性比对分析            | `url`, `fileKey`, `nodeId`(可选)  | 基于视觉对比的智能相似性评分，提供详细差异分析报告            |
| **api-automation**              | 开发工具  | 理解后端接口文档，自动生成接口类型、地址常量、Mock数据等   | `apiDocs`                         | 支持多种API文档格式，生成完整前端API工具链                    |
| **initialize-project-standard** | 项目管理  | 分析项目结构，生成Copilot和Cursor的全局项目规则配置        | 无参数                            | 自动生成智能编程助手的项目上下文和编码规范                    |
| **Download-Figma-Images**       | 资源管理  | 根据节点ID批量下载Figma中的SVG和PNG图片资源                | `fileKey`, `nodes[]`, `localPath` | 支持imageRef处理，自动创建目录结构（底层工具，供其他MCP调用） |
| **download-svg-assets**         | 资源管理  | 根据图像或图标节点ID，专门下载Figma文件中的SVG矢量资源     | `fileKey`, `nodes[]`, `localPath` | 仅处理SVG格式，支持复杂节点结构（底层工具，供其他MCP调用）    |


## 🚀 快速开始
### 配置

添加到您的 MCP 客户端配置中：

从 [Figma 开发者设置](https://www.figma.com/developers/api#authentication) 获取您的 Figma API 密钥。

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
## 🔧 面向代码贡献者

### 设置

```bash
# 克隆仓库
git clone https://github.com/your-username/feuse-mcp.git
cd feuse-mcp

# 安装依赖
pnpm install

# 构建
pnpm build
```

添加到您的 MCP 客户端配置中：

从 [Figma 开发者设置](https://www.figma.com/developers/api#authentication) 获取您的 Figma API 密钥。

```json
{
  "feuse-mcp": {
    "command": "npx",
    // 配置路径
    "args": ["YOUR/PATH/TO/dist/main.cjs"],
    "env": {
      "FIGMA_API_KEY": "YOUR_FIGMA_API_KEY"
    }
  }
}
```


## 📁 项目结构

```
feuse-mcp/
├── src/
│   ├── main.ts              # 主入口点
│   ├── services/            # 核心服务
│   │   ├── figma/          # Figma 集成
│   │   ├── similarity/     # 视觉比较
│   │   └── utility/        # 实用工具集
│   ├── types/              # TypeScript 定义
│   └── utils/              # 辅助函数
├── docs/                   # 文档
└── dist/                   # 构建文件
```

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。对于重大更改，请先打开一个 issue 来讨论您想要更改的内容。

**如果你有更多有意思的、好玩的、很酷的想法，请立刻在 issue 中提出来 ! ! !**

### 开发指南

1. 遵循现有的代码风格
2. 根据需要更新文档

## 📝 许可证

此项目根据 MIT 许可证授权 - 有关详细信息，请参阅 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP/discussions) 提供分析Figma设计稿的能力
- [fastmcp](https://github.com/punkpeye/fastmcp) 提供MCP快速开发框架
- 所有此项目的贡献者和用户


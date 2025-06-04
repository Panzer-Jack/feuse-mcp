# 工具集介绍

feuse-mcp 提供了一套完整的前端开发工具集，专注于 Figma 集成、API 自动化和开发工作流优化。

## 🔧 可用工具集（持续更新）

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

## 工具分类说明

### 🎨 Figma集成类
直接与Figma API交互，实现设计到代码的转换。这类工具能够理解Figma的设计语言，并将其转换为可用的前端代码。

### 🖼️ 资源管理类
处理图片、图标等静态资源的下载和组织。支持智能批量操作，自动维护项目资源结构。

### 🎯 质量检测类
验证实现效果与设计稿的一致性。通过视觉比较和智能分析，确保开发成果符合设计要求。

### 🛠️ 开发工具类
提升开发效率的自动化工具。从API文档生成完整的前端开发套件，减少重复性工作。

### 📁 项目管理类
项目初始化和标准化配置工具。自动分析项目架构，生成适合的开发规范和配置。

## 使用场景

### 设计转代码工作流
1. 使用 `extract-color-vars` 生成设计令牌
2. 使用 `Figma-To-Code` 将获取到Figma设计稿的DSL描述结构
3. 自动执行 `Download-Figma-Images` 提取所需的图标资源，到指定目录
4. 用 `similarity-figma` 验证实现效果

### API 开发工作流
1. 使用 `api-automation` 解析后端API文档
2. 自动生成 TypeScript 类型定义
3. 生成 API 常量和请求函数
4. 创建 Mock 数据用于开发测试

### 项目标准化工作流
1. 使用 `initialize-project-standard` 分析项目结构
2. 生成 Copilot/Cursor 配置文件
3. 建立统一的编码规范
4. 优化开发体验和代码质量

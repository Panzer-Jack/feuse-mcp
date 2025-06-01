# 安装配置

本页将指导你如何安装和配置 feuse-mcp。

## 获取 Figma API Key

1. 访问 [Figma Developer Settings](https://www.figma.com/developers/api#authentication) 取您的 Figma API 密钥
2. 点击 "Create new personal access token"
3. 为你的令牌命名（例如："feuse-mcp"）
4. 复制生成的 API key

## MCP 客户端配置

在你的 MCP 客户端配置文件中添加 feuse-mcp 服务器：

```json
{
  "mcpServers": {
    "feuse-mcp": {
      "command": "npx",
      "args": ["feuse-mcp@latest"],
      "env": {
        "FIGMA_API_KEY": "your_figma_api_key_here"
      }
    }
  }
}
```

## 开发者配置（从源码）

```json
{
  "mcpServers": {
    "feuse-mcp": {
      "command": "node",
      "args": ["/path/to/feuse-mcp/dist/main.cjs"],
      "env": {
        "FIGMA_API_KEY": "your_figma_api_key_here"
      }
    }
  }
}
```

## 权限设置

确保 feuse-mcp 有权限访问你的项目目录：

- 读取项目文件（用于项目分析）
- 写入生成的文件
- 创建临时文件（用于截图和对比）

## 验证安装

安装和配置完成后，在 MCP 客户端中验证 feuse-mcp 是否正常工作：

### 1. 检查服务器状态

在 VSCode Copilot 或其他 MCP 客户端中，验证 feuse-mcp 服务器是否正常连接

你应该看到以下 8 个工具：
- Figma-To-Code
- extract-svg-assets  
- extract-color-vars
- similarity-figma
- api-automation
- initialize-project-standard
- Download-Figma-Images
- download-svg-assets

### 2. 测试基本功能

尝试使用一个简单的工具来验证配置：

```
请使用 initialize-project-standard 工具
```

如果配置正确，工具会分析你的项目结构并生成相应的标准化文件。

## 故障排除

### 常见问题

**问题：Figma API Key 无效**
- 解决方案：检查 API Key 是否正确复制，确保没有额外的空格或字符

**问题：MCP 服务器无法启动**
- 解决方案：请确认是否在对应的MCP客户端内正确配置了MCP服务，并确保网络连接正常

**问题：权限被拒绝**
- 解决方案：检查文件系统权限，确保 MCP 服务器可以读写项目目录

**问题：工具执行失败**
- 解决方案：查看 MCP 客户端的日志输出，通常会显示详细的错误信息
- 如果还有其他问题，请查阅 [API 文档](/api/) 或提交 [GitHub Issues](https://github.com/Panzer-Jack/feuse-mcp/issues)。
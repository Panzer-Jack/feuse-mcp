# Installation and Configuration

This page will guide you through installing and configuring feuse-mcp.

## Get Figma API Key

1. Visit [Figma Developer Settings](https://www.figma.com/developers/api#authentication) to get your Figma API key
2. Click "Create new personal access token"
3. Name your token (e.g., "feuse-mcp")
4. Copy the generated API key

## MCP Client Configuration

Add the feuse-mcp server to your MCP client configuration file:

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

## Developer Configuration (from source)

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

## Permission Settings

Ensure feuse-mcp has permission to access your project directory:

- Read project files (for project analysis)
- Write generated files
- Create temporary files (for screenshots and comparisons)

## Verify Installation

After installation and configuration, verify that feuse-mcp is working properly in your MCP client:

### 1. Check Server Status

In VSCode Copilot or other MCP clients, verify that the feuse-mcp server is connected properly

You should see the following 8 tools:
- Figma-To-Code
- extract-svg-assets  
- extract-color-vars
- similarity-figma
- api-automation
- initialize-project-standard
- Download-Figma-Images
- download-svg-assets

### 2. Test Basic Functionality

Try using a simple tool to verify configuration:

```
Please use the initialize-project-standard tool
```

If configured correctly, the tool will analyze your project structure and generate corresponding standardization files.

## Troubleshooting

### Common Issues

**Issue: Invalid Figma API Key**
- Solution: Check if the API Key is correctly copied, ensure there are no extra spaces or characters

**Issue: MCP server fails to start**
- Solution: Please confirm that the MCP service is correctly configured in the corresponding MCP client and ensure network connection is normal

**Issue: Permission denied**
- Solution: Check file system permissions, ensure the MCP server can read and write to the project directory

**Issue: Tool execution fails**
- Solution: Check the MCP client's log output, which usually shows detailed error information
- If you still have other issues, please refer to the [API documentation](/api/) or submit [GitHub Issues](https://github.com/Panzer-Jack/feuse-mcp/issues).

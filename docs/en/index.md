---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: feuse-mcp
  text: Frontend Useful MCP Toolkit
  tagline: Automated API integration, Figma design-to-code, and development workflow optimization toolkit for web developers
  actions:
    - theme: brand
      text: What is feuse-mcp?
      link: /en/guide/
    - theme: alt
      text: Toolkit
      link: /en/tools/
    - theme: alt
      text: Github
      link: https://github.com/Panzer-Jack/feuse-mcp
  image:
    src: /feuse-mcp.png
    alt: feuse-mcp

features:
  - icon: 🎨
    title: Figma Integration
    details: Built-in integration with Figma-Context-MCP, seamlessly convert Figma designs to code, automatically extract assets and color variables
  - icon: 📝
    title: API Automation
    details: Generate TypeScript interface types, URL constants, Mock data and request functions from API documentation, supporting multiple document formats
  - icon: 🖼️
    title: Asset Management
    details: Intelligently download and organize SVG and PNG images from Figma, supporting batch operations and complex node structures
  - icon: 🎯
    title: Similarity Comparison
    details: Smart similarity scoring based on visual comparison, accurately verify generated code pages against original Figma prototypes
  - icon: 🛠️
    title: Project Standardization
    details: Analyze project structure, automatically generate global project rules configuration and coding standards for Copilot and Cursor
  - icon: 🔧
    title: Design Tokens
    details: Extract and convert Figma color variables to CSS/design tokens, supporting UnoCSS, TailwindCSS or custom formats

---

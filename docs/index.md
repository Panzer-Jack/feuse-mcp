---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: feuse-mcp
  text: 前端实用 MCP 工具集
  tagline: 为 Web 开发者提供的自动化 API 集成、Figma 设计转代码和开发工作流优化的基础工具集
  actions:
    - theme: brand
      text: 什么是 feuse-mcp？
      link: /guide/
    - theme: alt
      text: 工具集
      link: /tools/
    - theme: alt
      text: Github
      link: https://github.com/Panzer-Jack/feuse-mcp
  image:
    src: /feuse-mcp.png
    alt: feuse-mcp

features:
  - icon: 🎨
    title: Figma 集成
    details: 内部集成 Figma-Context-MCP，无缝将 Figma 设计转换为代码，自动提取资源和颜色变量
  - icon: 📝
    title: API 自动化
    details: 从 API 文档生成 TypeScript 接口类型、URL常量、Mock数据和请求函数，支持多种文档格式
  - icon: 🖼️
    title: 资源管理
    details: 智能下载和组织 Figma 中的 SVG 和 PNG 图片，支持批量操作和复杂节点结构
  - icon: 🎯
    title: 相似性比较
    details: 基于视觉对比的智能相似性评分，将生成的代码页面与原始 Figma 原型进行准确性验证
  - icon: 🛠️
    title: 项目标准化
    details: 分析项目结构，自动生成 Copilot 和 Cursor 的全局项目规则配置和编码规范
  - icon: 🔧
    title: 设计令牌
    details: 提取并转换 Figma 颜色变量为 CSS/设计令牌，支持 UnoCSS、TailwindCSS 或自定义格式

---


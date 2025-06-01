import { defineConfig } from 'vitepress'
import * as pkg from '../../package.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/feuse-mcp/',
    title: "feuse-mcp",
    description: "Frontend Useful MCP Tools - Essential utilities for web developers to automate API integration, Figma design-to-code conversion, and development workflow optimization",

    // 忽略死链接检查
    ignoreDeadLinks: true,

    head: [
        ['meta', { name: 'author', content: pkg.author.name }],
        [
            'meta',
            {
                name: 'keywords',
                content: 'feuse-mcp, MCP, Model Context Protocol, Figma, API automation, Frontend tools, Code generation, Design tokens',
            },
        ],
        ['link', { rel: 'shortcut icon', href: '/feuse-mcp.png' }],
    ],

    // 国际化配置
    locales: {
        root: {
            label: '简体中文',
            lang: 'zh-CN',
            link: '/',
            themeConfig: {
                nav: [
                    { text: '指南', link: '/guide/' },
                    { text: '工具集', link: '/tools/' },
                    { text: 'Github', link: 'https://github.com/Panzer-Jack/feuse-mcp' },
                ],
                sidebar: {
                    '/guide/': [
                        {
                            text: '介绍',
                            items: [
                                { text: '什么是 feuse-mcp', link: '/guide/' },
                                { text: '安装配置', link: '/guide/installation' },
                            ]
                        },
                        {
                            text: '深入指南',
                            items: [
                                { text: 'Figma 集成', link: '/guide/figma-integration' },
                                { text: 'API 自动化', link: '/guide/api-automation' },
                                { text: '项目标准化', link: '/guide/project-standards' },
                            ]
                        }
                    ],
                    '/tools/': [
                        {
                            text: '工具集概览',
                            items: [
                                { text: '工具集介绍', link: '/tools/' },
                            ]
                        }
                    ]
                }
            }
        },
        en: {
            label: 'English',
            lang: 'en-US',
            link: '/en/',
            themeConfig: {
                nav: [
                    { text: 'Guide', link: '/en/guide/' },
                    { text: 'Toolkit', link: '/en/tools/' },
                    { text: 'Github', link: 'https://github.com/Panzer-Jack/feuse-mcp' },
                ],
                sidebar: {
                    '/en/guide/': [
                        {
                            text: 'Introduction',
                            items: [
                                { text: 'What is feuse-mcp', link: '/en/guide/' },
                                { text: 'Installation', link: '/en/guide/installation' },
                            ]
                        },
                        {
                            text: 'In-depth Guide',
                            items: [
                                { text: 'Figma Integration', link: '/en/guide/figma-integration' },
                                { text: 'API Automation', link: '/en/guide/api-automation' },
                                { text: 'Project Standards', link: '/en/guide/project-standards' },
                            ]
                        }
                    ],
                    '/en/tools/': [
                        {
                            text: 'Toolkit Overview',
                            items: [
                                { text: 'Toolkit Introduction', link: '/en/tools/' },
                            ]
                        }
                    ]
                },
                footer: {
                    message: 'Released under the MIT License',
                    copyright: `Copyright © ${new Date().getFullYear()} Panzer_Jack`
                }
            }
        }
    },

    lastUpdated: true,

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/feuse-mcp.png',

        socialLinks: [
            { icon: 'github', link: 'https://github.com/Panzer-Jack/feuse-mcp' }
        ],

        footer: {
            message: '基于 MIT 许可发布',
            copyright: `Copyright © ${new Date().getFullYear()} Panzer_Jack`
        },

        search: {
            provider: 'local'
        }
    }
})
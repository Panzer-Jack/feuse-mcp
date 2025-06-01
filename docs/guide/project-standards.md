# 项目标准化

feuse-mcp 提供智能的项目标准化功能，能够分析项目结构并生成适合的开发规范和配置文件，特别是为 GitHub Copilot 和 Cursor 等 AI 编程助手优化的项目上下文。

## 核心功能

### initialize-project-standard 工具

`initialize-project-standard` 工具会自动分析当前项目的结构、依赖和配置，生成以下内容：

- 📋 **项目规范文档**：统一的编码规范和最佳实践
- 🤖 **AI 助手配置**：针对 Copilot/Cursor 的项目上下文
- 📁 **目录结构指南**：标准化的项目组织方式
- 🔧 **开发工具配置**：ESLint、Prettier、TypeScript 等配置建议

## 使用方法

### 基本用法

```
#initialize-project-standard
```

该工具无需任何参数，会自动：
1. 分析项目根目录和子目录结构
2. 检测使用的技术栈和框架
3. 识别现有的配置文件
4. 生成对应的标准化文档

## 生成的文件

### 1. .copilot-instructions.md & .cursorrules
为 GitHub Copilot 和 Cursor 提供项目上下文的指导文件：

```markdown
    ## 项目结构
    ### 1. 本地的pnpm-workspace.yaml文件可以获取详细的架构
    ### 2. 项目目录结构
    #### 参考
    - 请你从项目根目录去检索整个项目的结构，然后生成类似如下结构：
    ```
    ## 项目结构
    ### 1. 本地的pnpm-workspace.yaml文件可以获取详细的架构
    ### 2. 项目目录结构
    #### 参考
    - 请你从项目根目录去检索整个项目的结构，然后生成类似如下结构：
    ```bash
    一个pnpm-monorepo项目名称/
    ├── pnpm-workspace.yaml  # pnpm工作区配置文件
    ├── package.json         # 根目录的package.json文件
    ├── tsconfig.json        # 根目录的TypeScript配置文件
    ├── packages/            # 包目录
    ├── apps/                # 应用目录
        ├── xxx/               # 子项目
        │     ├── src /          # 源代码目录
        │     │   ├── components/ # 组件目录
        |     │   ├── router/     # 路由配置
        │     │   ├── store/      # 状态管理目录
        │     │   ├── utils/      # 工具函数目录
        │     │   ├── assets/     # 静态资源目录
        │     │       ├── icons/     # SVG图标目录
        │     │       ├── images/     # 图片资源目录
        │     │       ├── fonts/      # 字体资源目录
        │     │   ├── apis/       # 接口定义和地址常量
        │     │   ├── mock/       # mock数据
        │     │   ├── service/    # 通信函数
        │     │   ├── views/      # 视图组件
        │     │   ├── App.vue     # 根组件
        │     │   ├── main.ts     # 入口文件
        │     ├── public/        # 公共资源目录
        │     ├── package.json    # 项目配置文件
        │     ├── tsconfig.json    # TypeScript配置文件
        │     ├── vite.config.ts   # Vite配置文件
        │     ├── .env            # 环境变量配置文件
        │     ├── eslint.config.ts     # ESLint配置文件
        │     ├── uno.config.ts    # UnoCSS配置文件
        │     ├── .gitignore       # Git忽略文件
        │     └── README.md        # 项目说明文件
    ```
    - 注意: **请不要生成实际项目结构中没有的结构**


    ## 组件开发规范
    ### 1. 组件命名
    #### Vue组件规范
    - 组件文件名使用驼峰命名法，如 `MyComponent.vue`
    - views & pages 目录名使用小写字母和连字符，如 `my-component`
    - 项目/src/apis下为接口文件，具体生成
    #### React组件规范
    - 组件文件名使用驼峰命名法，如 `MyComponent.tsx`
    - 组件目录名使用小写字母和连字符，如 `my-component`
    - 项目/src/apis下为接口文件，具体生成

    ### 2. 项目标准
    #### 相关具体代码结构标准

    ##### SVG图标目录: 某个子项目/src/assets/icons
      - 所有SVG图标文件放在 `src/assets/icons` 目录下
      - 文件名使用小写字母和连字符，如 `icon-name.svg`

    ##### 图片资源目录: 某个子项目/src/assets/images
      - 所有图片资源放在 `src/assets/images` 目录下
      - 文件名使用小写字母和连字符，如 `image-name.png`

    ##### 接口定义以及地址常量：某个子项目/src/apis
      - 文件名为接口URL最后一部分并且用小驼峰命名，如 `queryOrderStatus.ts`
      - 代码结构参考如下：
        ```ts
        // 用户查询订单状态相关接口定义
        // path: /panzer_jack/api/v1/user/query_order_status
        // desc: 用户下单

        export const QUERY_ORDER_STATUS = '/panzer_jack/api/v1/user/query_order_status'

        // 请求参数接口
        export interface IQueryOrderStatusReq {
          order_id: string; // 订单ID
        }

        // 响应数据接口
        export interface IQueryOrderStatusResp {
          order_id: string; // 订单ID
          status: string; // 订单状态
        }
      ```

    ##### mock数据：某个子项目/src/mock
      - 文件名为接口URL最后一部分并且用小驼峰命名，如 `queryOrderStatus.ts`
      - 代码结构参考如下：
        ```ts
        // mock/queryOrderStatus.ts
        // path: /panzer_jack/api/v1/query_order_status
        // desc: 用户查询订单状态

        import type { IQueryOrderStatusReq } from '@/apis/queryOrderStatus'
        import { QueryOrderStatusErrorCode } from '@/apis/queryOrderStatus'

        export default [
          {
            url: '/panzer_jack/api/v1/query_order_status',
            method: 'post',
            response: ({ body }: { body: IQueryOrderStatusReq }) => {
              console.log('查询订单状态请求参数:', body)

              // 验证必要参数
              if (!body.order_id) {
                return {
                  code: 400,
                  message: '缺少必要参数 order_id',
                  data: body
                }
              }

              // 模拟随机系统错误的情况 (5%概率)
              if (Math.random() < 0.05) {
                return {
                  code: QueryOrderStatusErrorCode.SYSTEM_ERROR,
                  message: '发生未知错误，请前往订单列表确认是否下单成功或进行取消操作（订单列表展示可能有15分钟延迟）',
                  data: {}
                }
              }

              // 模拟不同的订单状态
              const statusArray = ['pending', 'processing', 'completed', 'cancelled']
              const randomStatus = statusArray[Math.floor(Math.random() * statusArray.length)]

              // 正常情况，返回订单状态
              return {
                code: 0,
                message: '查询订单状态成功',
                data: {
                  order_id: body.order_id,
                  status: randomStatus
                }
              }
            }
          }
        ]
        ```

    ##### 通信函数：某个子项目/src/service/index.ts
      - 函数名为接口URL最后一部分并且用小驼峰命名，如 `queryOrderStatus.ts`
      - 代码结构参考如下：
      ```ts
      import { QUERY_ORDER_STATUS, type IQueryOrderStatusResp, type IQueryOrderStatusReq } from '@/apis/queryOrderStatus.ts'

      // 使用当前项目已有的请求库和已有的请求函数规范去生成请求函数
      ```
```

## 最佳实践
1. 利用该工具初步生成 Copilot / Cursor 项目规范样本
2. 基于自身项目特点在对应生成的规范中进行手动修正

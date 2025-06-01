# API 自动化

feuse-mcp 提供强大的 API 自动化功能，能够理解后端接口文档并自动生成完整的前端 API 工具链，极大地提升开发效率并确保前后端接口的一致性。

## 工具概述

### api-automation 工具

`api-automation` 是一个专门的代码生成助手，专注于基于后端 API 文档自动生成前端 API 相关代码。

#### **核心能力**
- 📘 **TypeScript 接口类型**：精确的类型定义，确保类型安全
- 🔗 **API URL 常量**：统一的接口地址管理，避免硬编码
- 🎭 **Mock 数据**：用于开发和测试的模拟数据，支持离线开发
- 🚀 **请求函数**：封装好的 API 调用函数，包含错误处理

#### **支持的 API 文档格式**
- OpenAPI/Swagger 规范
- Postman Collection
- Apifox 文档
- 自定义 JSON/YAML/MD 格式
- 纯文本 API 说明

## 使用方法

### 基本调用

```
请使用 api-automation 工具，基于以下 API 文档生成代码：

[粘贴完整的 API 文档内容或提供文档链接]
```

### 参数说明

- `apiDocs` (必需): 完整的后端 API 定义文档
- 自动检测: 工具会自动分析当前项目的结构和代码规范

## 生成的文件结构

### 默认目录结构

api-automation 工具会在项目中生成以下结构：

```
src/
├── apis/              # API 类型定义和 URL 常量
│   └── getUserInfo.ts # 用户信息接口
├── mock/              # Mock 数据
│   └── getUserInfo.ts # 用户信息模拟数据
└── service/           # 请求服务函数
    └── index.ts       # API 调用函数
```

### 文件命名规范

- **文件名**: 使用 API URL 的最后一段，转换为 camelCase 格式
  - `/api/user/get-user-info` → `getUserInfo.ts`
- **函数名**: 与文件名保持一致的 camelCase 格式
- **类型名**: 使用 PascalCase 格式，添加适当的后缀
  - `GetUserInfoRequest`、`GetUserInfoResponse`


## 生成代码示例

### API 类型定义文件

#### 接口定义以及地址常量：某个项目/src/apis
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

#### mock数据：某个项目/src/mock
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

#### 通信函数：某个项目/src/service/index.ts
  - 函数名为接口URL最后一部分并且用小驼峰命名，如 `queryOrderStatus.ts`
  - 代码结构参考如下：
  ```ts
  import { QUERY_ORDER_STATUS, type IQueryOrderStatusResp, type IQueryOrderStatusReq } from '@/apis/queryOrderStatus.ts'
  // 使用当前项目已有的请求库和已有的请求函数规范去生成请求函数
  ```


## 智能特性

### 项目结构自适应

工具会自动检测项目的现有结构和规范：

- **自动检测 API 目录**: 如果项目中已有 `src/api`、`src/apis` 或其他 API 相关目录
- **遵循现有命名**: 分析现有文件的命名模式并保持一致
- **适配代码风格**: 根据项目的 ESLint、Prettier 配置生成符合规范的代码
- **框架适配**: 自动识别 React、Vue、Angular 等框架并生成对应的代码风格

### 代码规范遵循

生成的代码严格遵循以下规范：

- **TypeScript 类型安全**: 所有接口都有完整的类型定义
- **错误处理**: 包含完善的错误处理逻辑
- **代码注释**: 自动生成 JSDoc 注释
- **命名规范**: 遵循项目的命名约定
- **代码格式**: 符合项目的格式化规则

## 最佳实践

### 1. 文档质量
- 确保 API 文档完整且准确
- 提供详细的请求/响应示例
- 使用清晰的命名约定

### 2. 代码维护
- 定期重新生成以保持同步
- 自定义代码与生成代码分离
- 使用版本控制追踪变更

### 3. 错误处理
- 实现统一的错误处理机制
- 添加请求拦截器和响应拦截器
- 提供合适的加载和错误状态

### 4. 类型安全
- 启用 TypeScript 严格模式
- 使用生成的类型定义
- 避免使用 `any` 类型
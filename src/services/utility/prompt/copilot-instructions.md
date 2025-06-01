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


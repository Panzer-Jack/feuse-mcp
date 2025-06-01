# Project Standardization

feuse-mcp provides intelligent project standardization functionality that can analyze project structure and generate appropriate development standards and configuration files, especially optimized project context for AI programming assistants like GitHub Copilot and Cursor.

## Core Functionality

### initialize-project-standard Tool

The `initialize-project-standard` tool automatically analyzes the current project's structure, dependencies, and configuration, generating the following content:

- 📋 **Project Specification Documentation**: Unified coding standards and best practices
- 🤖 **AI Assistant Configuration**: Project context for Copilot/Cursor
- 📁 **Directory Structure Guide**: Standardized project organization
- 🔧 **Development Tool Configuration**: ESLint, Prettier, TypeScript configuration recommendations

## Usage

### Basic Usage

```
#initialize-project-standard
```

This tool requires no parameters and will automatically:
1. Analyze project root directory and subdirectory structure
2. Detect technology stack and frameworks used
3. Identify existing configuration files
4. Generate corresponding standardization documentation

## Generated Files

### 1. .copilot-instructions.md & .cursorrules
Guidance files providing project context for GitHub Copilot and Cursor:

```markdown
    ## Project Structure
    ### 1. The local pnpm-workspace.yaml file provides detailed architecture information
    ### 2. Project Directory Structure
    #### Reference
    - Please retrieve the entire project structure from the project root directory, then generate a structure similar to the following:
    ```
    ## Project Structure
    ### 1. The local pnpm-workspace.yaml file provides detailed architecture information
    ### 2. Project Directory Structure
    #### Reference
    - Please retrieve the entire project structure from the project root directory, then generate a structure similar to the following:
    ```bash
    A pnpm-monorepo project name/
    ├── pnpm-workspace.yaml  # pnpm workspace configuration file
    ├── package.json         # Root package.json file
    ├── tsconfig.json        # Root TypeScript configuration file
    ├── packages/            # Packages directory
    ├── apps/                # Applications directory
        ├── xxx/               # Sub-project
        │     ├── src /          # Source code directory
        │     │   ├── components/ # Components directory
        |     │   ├── router/     # Router configuration
        │     │   ├── store/      # State management directory
        │     │   ├── utils/      # Utility functions directory
        │     │   ├── assets/     # Static assets directory
        │     │       ├── icons/     # SVG icons directory
        │     │       ├── images/     # Image assets directory
        │     │       ├── fonts/      # Font assets directory
        │     │   ├── apis/       # Interface definitions and address constants
        │     │   ├── mock/       # mock data
        │     │   ├── service/    # Communication functions
        │     │   ├── views/      # View components
        │     │   ├── App.vue     # Root component
        │     │   ├── main.ts     # Entry file
        │     ├── public/        # Public assets directory
        │     ├── package.json    # Project configuration file
        │     ├── tsconfig.json    # TypeScript configuration file
        │     ├── vite.config.ts   # Vite configuration file
        │     ├── .env            # Environment variables configuration file
        │     ├── eslint.config.ts     # ESLint configuration file
        │     ├── uno.config.ts    # UnoCSS configuration file
        │     ├── .gitignore       # Git ignore file
        │     └── README.md        # Project documentation file
    ```
    - Note: **Do not generate structures that don't exist in the actual project**

    ## Component Development Standards
    ### 1. Component Naming
    #### Vue Component Standards
    - Component file names use camelCase, e.g., `MyComponent.vue`
    - views & pages directory names use lowercase and hyphens, e.g., `my-component`
    - Interface files under project/src/apis, specific generation details below
    #### React Component Standards
    - Component file names use camelCase, e.g., `MyComponent.tsx`
    - Component directory names use lowercase and hyphens, e.g., `my-component`
    - Interface files under project/src/apis, specific generation details below

    ### 2. Project Standards
    #### Related Specific Code Structure Standards

    ##### SVG Icons Directory: some-sub-project/src/assets/icons
      - All SVG icon files are placed in the `src/assets/icons` directory
      - File names use lowercase and hyphens, e.g., `icon-name.svg`

    ##### Image Assets Directory: some-sub-project/src/assets/images
      - All image assets are placed in the `src/assets/images` directory
      - File names use lowercase and hyphens, e.g., `image-name.png`

    ##### Interface Definitions and Address Constants: some-sub-project/src/apis
      - File names are the last part of interface URL in camelCase, e.g., `queryOrderStatus.ts`
      - Code structure reference:
        ```ts
        // User query order status related interface definition
        // path: /panzer_jack/api/v1/user/query_order_status
        // desc: User order placement

        export const QUERY_ORDER_STATUS = '/panzer_jack/api/v1/user/query_order_status'

        // Request parameter interface
        export interface IQueryOrderStatusReq {
          order_id: string; // Order ID
        }

        // Response data interface
        export interface IQueryOrderStatusResp {
          order_id: string; // Order ID
          status: string; // Order status
        }
      ```

    ##### Mock Data: some-sub-project/src/mock
      - File names are the last part of interface URL in camelCase, e.g., `queryOrderStatus.ts`
      - Code structure reference:
        ```ts
        // mock/queryOrderStatus.ts
        // path: /panzer_jack/api/v1/query_order_status
        // desc: User query order status

        import type { IQueryOrderStatusReq } from '@/apis/queryOrderStatus'
        import { QueryOrderStatusErrorCode } from '@/apis/queryOrderStatus'

        export default [
          {
            url: '/panzer_jack/api/v1/query_order_status',
            method: 'post',
            response: ({ body }: { body: IQueryOrderStatusReq }) => {
              console.log('Query order status request parameters:', body)

              // Validate required parameters
              if (!body.order_id) {
                return {
                  code: 400,
                  message: 'Missing required parameter order_id',
                  data: body
                }
              }

              // Simulate random system error (5% probability)
              if (Math.random() < 0.05) {
                return {
                  code: QueryOrderStatusErrorCode.SYSTEM_ERROR,
                  message: 'Unknown error occurred, please go to order list to confirm if order was placed successfully or cancel (order list display may have 15-minute delay)',
                  data: {}
                }
              }

              // Simulate different order statuses
              const statusArray = ['pending', 'processing', 'completed', 'cancelled']
              const randomStatus = statusArray[Math.floor(Math.random() * statusArray.length)]

              // Normal case, return order status
              return {
                code: 0,
                message: 'Query order status successful',
                data: {
                  order_id: body.order_id,
                  status: randomStatus
                }
              }
            }
          }
        ]
        ```

    ##### Communication Functions: some-sub-project/src/service/index.ts
      - Function names are the last part of interface URL in camelCase, e.g., `queryOrderStatus.ts`
      - Code structure reference:
      ```ts
      import { QUERY_ORDER_STATUS, type IQueryOrderStatusResp, type IQueryOrderStatusReq } from '@/apis/queryOrderStatus.ts'

      // Use existing request libraries and function specifications in current project to generate request functions
      ```
```

## Best Practices
1. Use this tool to initially generate Copilot / Cursor project specification samples
2. Manually modify the generated specifications based on your project's specific characteristics

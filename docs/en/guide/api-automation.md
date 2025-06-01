# API Automation

feuse-mcp provides powerful API automation functionality that can understand backend interface documentation and automatically generate a complete frontend API toolchain, greatly improving development efficiency and ensuring consistency between frontend and backend interfaces.

## Tool Overview

### api-automation Tool

`api-automation` is a specialized code generation assistant focused on automatically generating frontend API-related code based on backend API documentation.

#### **Core Capabilities**
- 📘 **TypeScript Interface Types**: Precise type definitions ensuring type safety
- 🔗 **API URL Constants**: Unified interface address management, avoiding hard coding
- 🎭 **Mock Data**: Simulation data for development and testing, supporting offline development
- 🚀 **Request Functions**: Encapsulated API call functions with error handling

#### **Supported API Documentation Formats**
- OpenAPI/Swagger specifications
- Postman Collection
- Apifox documentation
- Custom JSON/YAML/MD formats
- Plain text API descriptions

## Usage

### Basic Call

```
Please use the api-automation tool to generate code based on the following API documentation:

[Paste complete API documentation content or provide documentation link]
```

### Parameter Description

- `apiDocs` (required): Complete backend API definition documentation
- Auto-detection: The tool automatically analyzes current project structure and code standards

## Generated File Structure

### Default Directory Structure

The api-automation tool generates the following structure in the project:

```
src/
├── apis/              # API type definitions and URL constants
│   └── getUserInfo.ts # User info interface
├── mock/              # Mock data
│   └── getUserInfo.ts # User info simulation data
└── service/           # Request service functions
    └── index.ts       # API call functions
```

### File Naming Convention

- **File names**: Use the last segment of API URL, converted to camelCase format
  - `/api/user/get-user-info` → `getUserInfo.ts`
- **Function names**: Consistent camelCase format with file names
- **Type names**: Use PascalCase format with appropriate suffixes
  - `GetUserInfoRequest`, `GetUserInfoResponse`

## Generated Code Examples

### API Type Definition File

#### Interface definitions and address constants:某个项目/src/apis
  - File names are the last part of interface URL in camelCase, like `queryOrderStatus.ts`
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

#### Mock data: 某个项目/src/mock
  - File names are the last part of interface URL in camelCase, like `queryOrderStatus.ts`
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

#### Communication functions: 某个项目/src/service/index.ts
  - Function names are the last part of interface URL in camelCase, like `queryOrderStatus.ts`
  - Code structure reference:
  ```ts
  import { QUERY_ORDER_STATUS, type IQueryOrderStatusResp, type IQueryOrderStatusReq } from '@/apis/queryOrderStatus.ts'
  // Use existing request libraries and function specifications in current project to generate request functions
  ```

## Smart Features

### Project Structure Adaptation

The tool automatically detects existing project structure and standards:

- **Auto-detect API directories**: If project already has `src/api`, `src/apis` or other API-related directories
- **Follow existing naming**: Analyze naming patterns of existing files and maintain consistency
- **Adapt code style**: Generate code that complies with project's ESLint, Prettier configurations
- **Framework adaptation**: Automatically identify React, Vue, Angular and other frameworks and generate corresponding code styles

### Code Standard Compliance

Generated code strictly follows these standards:

- **TypeScript type safety**: All interfaces have complete type definitions
- **Error handling**: Includes comprehensive error handling logic
- **Code comments**: Automatically generate JSDoc comments
- **Naming conventions**: Follow project naming conventions
- **Code formatting**: Conform to project formatting rules

## Best Practices

### 1. Documentation Quality
- Ensure API documentation is complete and accurate
- Provide detailed request/response examples
- Use clear naming conventions

### 2. Code Maintenance
- Regularly regenerate to maintain synchronization
- Separate custom code from generated code
- Use version control to track changes

### 3. Error Handling
- Implement unified error handling mechanism
- Add request interceptors and response interceptors
- Provide appropriate loading and error states

### 4. Type Safety
- Enable TypeScript strict mode
- Use generated type definitions
- Avoid using `any` type

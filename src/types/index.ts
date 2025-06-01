export interface ITools {
  [key: string]: {
    name: string
    description: string
    parameters: any
    execute: (args: any) => Promise<any>
  }
}

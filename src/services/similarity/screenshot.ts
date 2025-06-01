import { chromium } from 'playwright'

/**
 * 截图服务类，用于对指定URL进行网页截图
 */
export class ScreenshotService {
  constructor() { }

  /**
   * 对指定URL进行截图
   * @param url 要截图的URL
   * @param options 截图选项
   * @param options.fileName 截图文件名称
   * @param options.fullPage 是否截取全页面
   * @param options.width 截图宽度
   * @param options.height 截图高度
   * @param options.timeout 超时时间(毫秒)
   * @returns 截图ImageBuffer
   */
  async takeScreenshot(url: string, options?: {
    fileName?: string
    fullPage?: boolean
    width?: number
    height?: number
    timeout?: number
  }) {
    const browser = await chromium.launch({ headless: true })
    try {
      // 创建新的浏览器上下文
      const context = await browser.newContext({
        viewport: {
          width: options?.width || 1280,
          height: options?.height || 720,
        },
      })

      // 创建新页面并导航到指定URL
      const page = await context.newPage()
      await page.goto(url, {
        timeout: options?.timeout || 30000,
        waitUntil: 'networkidle',
      })

      // 执行截图
      const imageBuffer = await page.screenshot({
        fullPage: options?.fullPage || false,
      })

      // const imageBufferStr = Buffer.from(imageBuffer).toString('base64')
      // console.log('imageBufferStr', imageBufferStr)

      return imageBuffer
    } finally {
      // 确保浏览器关闭
      await browser.close()
    }
  }

  /**
   * 对指定元素进行截图
   * @param url 要截图的URL
   * @param selector 元素选择器
   * @param options 截图选项
   * @param options.fileName 截图文件名称
   * @param options.timeout 超时时间(毫秒)
   * @returns 截图ImageBuffer
   */
  async takeElementScreenshot(url: string, selector: string, options?: {
    fileName?: string
    timeout?: number
  }) {
    const browser = await chromium.launch({ headless: true })
    try {
      const context = await browser.newContext()
      const page = await context.newPage()

      await page.goto(url, {
        timeout: options?.timeout || 30000,
        waitUntil: 'networkidle',
      })

      // 等待选择器对应的元素出现
      await page.waitForSelector(selector, { timeout: options?.timeout || 30000 })

      // 对指定元素进行截图
      const element = await page.$(selector)
      if (!element) {
        throw new Error(`Element with selector "${selector}" not found`)
      }

      const imageBuffer = await element.screenshot()

      return imageBuffer
    } finally {
      await browser.close()
    }
  }
}

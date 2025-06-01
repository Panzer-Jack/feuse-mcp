import puppeteer from 'puppeteer-core'
import * as ChromeLauncher from 'chrome-launcher'

/**
 * 截图服务类，用于对指定URL进行网页截图
 */
export class ScreenshotService {
  constructor() { }

  /**
   * 获取Chrome可执行文件路径
   * @returns Chrome路径
   */
  private async getChromeExecutablePath(): Promise<string> {
    try {
      // 使用 chrome-launcher 自动查找 Chrome
      const installation = await ChromeLauncher.Launcher.getInstallations()
      if (installation && installation.length > 0) {
        return installation[0] // 返回第一个找到的 Chrome 安装路径
      }
    } catch (error) {
      console.warn('Chrome launcher failed to find Chrome installation:', error)
    }

    // 如果 chrome-launcher 失败，回退到手动路径
    const platform = process.platform
    if (platform === 'darwin') {
      // macOS
      return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    } else if (platform === 'win32') {
      // Windows
      return 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    } else {
      // Linux
      return '/usr/bin/google-chrome'
    }
  }

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

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: await this.getChromeExecutablePath(),
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    try {
      // 创建新页面
      const page = await browser.newPage()

      // 设置视口大小
      await page.setViewport({
        width: 375,
        height: 0,
      })

      // 导航到指定URL，等待网络空闲
      await page.goto(url, {
        timeout: options?.timeout || 30000,
        waitUntil: 'networkidle0',
      })

      // 执行截图
      const imageBuffer = await page.screenshot({
        fullPage: options?.fullPage || false,
      })

      // 将 Uint8Array 转换为 Buffer
      const buffer = Buffer.from(imageBuffer)

      // const imageBufferStr = buffer.toString('base64')
      // console.log('imageBufferStr', imageBufferStr)

      return buffer
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
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: await this.getChromeExecutablePath(),
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    try {
      const page = await browser.newPage()

      await page.goto(url, {
        timeout: options?.timeout || 30000,
        waitUntil: 'networkidle0',
      })

      // 等待选择器对应的元素出现
      await page.waitForSelector(selector, { timeout: options?.timeout || 30000 })

      // 对指定元素进行截图
      const element = await page.$(selector)
      if (!element) {
        throw new Error(`Element with selector "${selector}" not found`)
      }

      const imageBuffer = await element.screenshot()

      // 将 Uint8Array 转换为 Buffer
      const buffer = Buffer.from(imageBuffer)

      return buffer
    } finally {
      await browser.close()
    }
  }
}

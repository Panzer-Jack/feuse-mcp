/**
 * Figma 图片下载参数类型定义
 */
export interface DownloadFigmaImagesParams {
  /** Figma 文件的唯一标识符，包含目标节点 */
  fileKey: string

  /** 需要下载为图片的节点数组 */
  nodes: FigmaImageNode[]

  /** 
   * 项目中存储图片的绝对路径目录
   * 如果目录不存在，将会自动创建
   * 路径格式应遵循运行操作系统的目录格式，不要在路径名中使用任何特殊字符转义
   */
  localPath: string
}

/**
 * Figma 图片节点类型定义
 */
export interface FigmaImageNode {
  /** 
   * Figma 图片节点的ID，格式为 1234:5678 
   */
  nodeId: string

  /** 
   * 如果节点有 imageRef 填充，必须包含此变量
   * 下载矢量 SVG 图片时留空
   */
  imageRef?: string

  /** 保存获取文件的本地名称 */
  fileName: string
}
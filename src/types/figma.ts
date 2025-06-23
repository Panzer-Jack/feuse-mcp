/**
 * Figma 图片下载参数类型定义
 */
export interface DownloadFigmaImagesParams {
  fileKey: string,
  nodes: FigmaImageNode[],
  localPath: string,
  pngScale: number,
  svgOptions: {
    outlineText: boolean;
    includeId: boolean;
    simplifyStroke: boolean;
  },
}

type FetchImageParams = {
  /**
   * The Node in Figma that will either be rendered or have its background image downloaded
   */
  nodeId: string;
  /**
   * The local file name to save the image
   */
  fileName: string;
  /**
   * The file mimetype for the image
   */
  fileType: "png" | "svg";
};

/**
 * Figma 图片节点类型定义
 */
export interface FigmaImageNode {
  /** 
   * Figma 图片节点的ID，格式为 1234:5678 
   */
  nodeId: string;

  /** 
   * 如果节点有 imageRef 填充，必须包含此变量
   * 下载矢量 SVG 图片时留空
   */
  imageRef?: string

  /** 保存获取文件的本地名称 */
  fileName: string
}
import type {
  GetFileNodesResponse,
  GetFileResponse,
  GetImageFillsResponse,
  GetImagesResponse,
} from '@figma/rest-api-spec'
import type { SimplifiedDesign } from './simplify-node-response'
import fs from 'node:fs'
import process from 'node:process'
import { downloadFigmaImage } from '@fastmcp/utils/common'
import yaml from 'js-yaml'
import { parseFigmaResponse } from './simplify-node-response'
import { fetchWithRetry } from '@fastmcp/utils/fetch-with-retry'

export const Logger = {
  log: (..._args: any[]) => {

  },
  error: (..._args: any[]) => {

  },
}

export type FigmaAuthOptions = {
  figmaApiKey: string;
  figmaOAuthToken: string;
  useOAuth: boolean;
};

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

type FetchImageFillParams = Omit<FetchImageParams, "fileType"> & {
  /**
   * Required to grab the background image when an image is used as a fill
   */
  imageRef: string;
};

export class FigmaService {
  private readonly apiKey: string;
  private readonly oauthToken: string;
  private readonly useOAuth: boolean;
  private readonly baseUrl = "https://api.figma.com/v1";

  constructor({ figmaApiKey, figmaOAuthToken, useOAuth }: FigmaAuthOptions) {
    this.apiKey = figmaApiKey || "";
    this.oauthToken = figmaOAuthToken || "";
    this.useOAuth = !!useOAuth && !!this.oauthToken;
  }

  private async request<T>(endpoint: string): Promise<T> {
    try {
      Logger.log(`Calling ${this.baseUrl}${endpoint}`);

      // Set auth headers based on authentication method
      const headers: Record<string, string> = {};

      if (this.useOAuth) {
        // Use OAuth token with Authorization: Bearer header
        Logger.log("Using OAuth Bearer token for authentication");
        headers["Authorization"] = `Bearer ${this.oauthToken}`;
      } else {
        // Use Personal Access Token with X-Figma-Token header
        Logger.log("Using Personal Access Token for authentication");
        headers["X-Figma-Token"] = this.apiKey;
      }

      return await fetchWithRetry<T>(`${this.baseUrl}${endpoint}`, {
        headers,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to make request to Figma API: ${error.message}`);
      }
      throw new Error(`Failed to make request to Figma API: ${error}`);
    }
  }

  async getImageFills(
    fileKey: string,
    nodes: FetchImageFillParams[],
    localPath: string,
  ): Promise<string[]> {
    if (nodes.length === 0) return [];

    let promises: Promise<string>[] = [];
    const endpoint = `/files/${fileKey}/images`;
    const file = await this.request<GetImageFillsResponse>(endpoint);
    const { images = {} } = file.meta;
    promises = nodes.map(async ({ imageRef, fileName }) => {
      const imageUrl = images[imageRef];
      if (!imageUrl) {
        return "";
      }
      return downloadFigmaImage(fileName, localPath, imageUrl);
    });
    return Promise.all(promises);
  }

  async getImages(
    fileKey: string,
    nodes: FetchImageParams[],
    localPath: string,
    pngScale: number,
    svgOptions: {
      outlineText: boolean;
      includeId: boolean;
      simplifyStroke: boolean;
    },
  ): Promise<string[]> {
    const pngIds = nodes.filter(({ fileType }) => fileType === "png").map(({ nodeId }) => nodeId);
    const pngFiles =
      pngIds.length > 0
        ? this.request<GetImagesResponse>(
          `/images/${fileKey}?ids=${pngIds.join(",")}&format=png&scale=${pngScale}`,
        ).then(({ images = {} }) => images)
        : ({} as GetImagesResponse["images"]);

    const svgIds = nodes.filter(({ fileType }) => fileType === "svg").map(({ nodeId }) => nodeId);
    const svgParams = [
      `ids=${svgIds.join(",")}`,
      "format=svg",
      `svg_outline_text=${svgOptions.outlineText}`,
      `svg_include_id=${svgOptions.includeId}`,
      `svg_simplify_stroke=${svgOptions.simplifyStroke}`,
    ].join("&");

    const svgFiles =
      svgIds.length > 0
        ? this.request<GetImagesResponse>(`/images/${fileKey}?${svgParams}`).then(
          ({ images = {} }) => images,
        )
        : ({} as GetImagesResponse["images"]);

    const files = await Promise.all([pngFiles, svgFiles]).then(([f, l]) => ({ ...f, ...l }));

    const downloads = nodes
      .map(({ nodeId, fileName }) => {
        const imageUrl = files[nodeId];
        if (imageUrl) {
          return downloadFigmaImage(fileName, localPath, imageUrl);
        }
        return false;
      })
      .filter((url) => !!url);

    return Promise.all(downloads);
  }

  async getFile(fileKey: string, depth?: number | null): Promise<SimplifiedDesign> {
    try {
      const endpoint = `/files/${fileKey}${depth ? `?depth=${depth}` : ""}`;
      Logger.log(`Retrieving Figma file: ${fileKey} (depth: ${depth ?? "default"})`);
      const response = await this.request<GetFileResponse>(endpoint);
      Logger.log("Got response");
      const simplifiedResponse = parseFigmaResponse(response);
      writeLogs("figma-raw.yml", response);
      writeLogs("figma-simplified.yml", simplifiedResponse);
      return simplifiedResponse;
    } catch (e) {
      console.error("Failed to get file:", e);
      throw e;
    }
  }

  async getNode(fileKey: string, nodeId: string, depth?: number | null): Promise<SimplifiedDesign> {
    const endpoint = `/files/${fileKey}/nodes?ids=${nodeId}${depth ? `&depth=${depth}` : ""}`;
    const response = await this.request<GetFileNodesResponse>(endpoint);
    Logger.log("Got response from getNode, now parsing.");
    writeLogs("figma-raw.yml", response);
    const simplifiedResponse = parseFigmaResponse(response);
    writeLogs("figma-simplified.yml", simplifiedResponse);
    return simplifiedResponse;
  }

  async getImageData(
    fileKey: string,
    nodeId: string,
  ): Promise<string> {
    const images = await this.request<GetImagesResponse>(
      `/images/${fileKey}?ids=${nodeId}&scale=2&format=png`,
    ).then(({ images = {} }) => images)
    let image = ''

    for (const key in images) {
      image = images[key] as string
    }

    console.log(images, image)

    return image
  }

  async getSVG(
    fileKey: string,
    nodes: FetchImageParams[],
    localPath: string,
  ): Promise<string[]> {

    const svgIds = nodes.filter(({ fileType }) => fileType === 'svg').map(({ nodeId }) => nodeId)
    const svgFiles
      = svgIds.length > 0
        ? this.request<GetImagesResponse>(
          `/images/${fileKey}?ids=${svgIds.join(',')}&format=svg`,
        ).then(({ images = {} }) => images)
        : ({} as GetImagesResponse['images'])

    const files = await Promise.all([svgFiles]).then(([l]) => ({ ...l }))

    const downloads = nodes
      .map(({ nodeId, fileName }) => {
        const imageUrl = files[nodeId]
        if (imageUrl) {
          return downloadFigmaImage(fileName, localPath, imageUrl)
        }
        return false
      })
      .filter(url => !!url)

    return Promise.all(downloads)
  }
}

function writeLogs(name: string, value: any) {
  try {
    if (process.env.NODE_ENV !== "development") return;

    const logsDir = "logs";

    try {
      fs.accessSync(process.cwd(), fs.constants.W_OK);
    } catch (error) {
      Logger.log("Failed to write logs:", error);
      return;
    }

    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }
    fs.writeFileSync(`${logsDir}/${name}`, yaml.dump(value));
  } catch (error) {
    console.debug("Failed to write logs:", error);
  }
}


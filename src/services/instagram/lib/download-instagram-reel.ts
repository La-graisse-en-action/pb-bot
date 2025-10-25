import axios from 'axios';
import chalk from 'chalk';
import { clearInstagramCaption } from '../utils/clearInstagramCaption.js';
import { getVideoUrl } from '../utils/extract-video-from-links.js';

const rapidApiUrl = 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all';
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB límite de Discord para bots normales
const MAX_FILE_SIZE_BOOSTED = 50 * 1024 * 1024; // 50MB para servidores con boost nivel 2

export type ErrorCodes = 'FILE_TOO_LARGE' | 'API_ERROR' | 'TIMEOUT' | 'RATE_LIMIT' | 'NETWORK_ERROR' | 'UNKNOWN';
export type ReelData = {
  src: string;
  title: string;
  picture: string;
  thumbnail: string;
  fileSize?: number;
  error?: {
    code: ErrorCodes;
    message: string;
    details?: any;
  };
};

export type DownloadOptions = {
  maxFileSize?: number;
  timeout?: number;
  checkFileSize?: boolean;
};

export async function downloadInstagramReel(URL: string, options?: DownloadOptions): Promise<ReelData> {
  const { maxFileSize = MAX_FILE_SIZE, timeout = 30000, checkFileSize = true } = options || {};

  try {
    const response = await axios.request({
      method: 'GET',
      url: rapidApiUrl,
      params: {
        url: URL,
        filename: 'download',
      },
      headers: {
        'X-RapidAPI-Key': '824dddee65msh76dbe040b14bfe4p12ab6ajsnc6532155d4f8',
        'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com',
      },
      timeout,
    });

    if (response.status !== 200) {
      console.error(chalk.red(`Error downloading Instagram reel: ${response.status} - ${response.statusText}`));

      return {
        src: '',
        title: '',
        picture: '',
        thumbnail: '',
        error: {
          code: 'API_ERROR',
          message: `API returned status ${response.status}`,
          details: { status: response.status, statusText: response.statusText },
        },
      };
    }

    const data = response.data;
    const videoUrl = getVideoUrl(data.links);
    const finalVideoUrl = videoUrl || data.picture;

    // Verificar el tamaño del archivo si está habilitado
    if (finalVideoUrl && checkFileSize) {
      try {
        const headResponse = await axios.head(finalVideoUrl, { timeout: 10000 });
        const fileSize = parseInt(headResponse.headers['content-length'] || '0');

        if (fileSize > maxFileSize) {
          const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
          const maxSizeMB = (maxFileSize / (1024 * 1024)).toFixed(0);

          console.warn(chalk.yellow(`File too large: ${fileSizeMB}MB (max: ${maxSizeMB}MB)`));

          return {
            src: data.src_url,
            title: clearInstagramCaption(data.title),
            thumbnail: data.picture,
            picture: finalVideoUrl,
            fileSize,
            error: {
              code: 'FILE_TOO_LARGE',
              message: `File size ${fileSizeMB}MB exceeds limit of ${maxSizeMB}MB`,
              details: { fileSize, maxFileSize, fileSizeMB, maxSizeMB },
            },
          };
        }

        return {
          src: data.src_url,
          title: clearInstagramCaption(data.title),
          thumbnail: data.picture,
          picture: finalVideoUrl,
          fileSize,
        };
      } catch (sizeError) {
        console.warn(chalk.yellow('Could not verify file size:', sizeError));
        // Continuar sin validación de tamaño
      }
    }

    return {
      src: data.src_url,
      title: clearInstagramCaption(data.title),
      thumbnail: data.picture,
      picture: finalVideoUrl,
    };
  } catch (error) {
    console.error(chalk.red('Error in downloadInstagramReel:'), error);

    let errorCode: ErrorCodes = 'UNKNOWN';
    let errorMessage = 'Unknown error occurred';
    let errorDetails: any = {};

    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        errorCode = 'TIMEOUT';
        errorMessage = 'Request timed out';
      } else if (error.response?.status === 429) {
        errorCode = 'RATE_LIMIT';
        errorMessage = 'Rate limit exceeded';
        errorDetails = { retryAfter: error.response.headers['retry-after'] };
      } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        errorCode = 'NETWORK_ERROR';
        errorMessage = 'Network connection failed';
      } else {
        errorCode = 'API_ERROR';
        errorMessage = error.message;
      }
      errorDetails = { ...errorDetails, code: error.code, status: error.response?.status };
    }

    return {
      src: '',
      title: '',
      picture: '',
      thumbnail: '',
      error: {
        code: errorCode,
        message: errorMessage,
        details: errorDetails,
      },
    };
  }
}

// Función auxiliar para obtener el límite de tamaño según el servidor
export function getMaxFileSize(guildPremiumTier?: number): number {
  return guildPremiumTier && guildPremiumTier >= 2 ? MAX_FILE_SIZE_BOOSTED : MAX_FILE_SIZE;
}

// Constantes exportadas para usar en la lógica de presentación
export const FILE_SIZE_LIMITS = {
  NORMAL: MAX_FILE_SIZE,
  BOOSTED: MAX_FILE_SIZE_BOOSTED,
} as const;

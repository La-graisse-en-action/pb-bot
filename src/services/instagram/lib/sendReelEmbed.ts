import axios, { AxiosError } from 'axios';
import chalk from 'chalk';
import { AttachmentBuilder, Message } from 'discord.js';
import { Readable } from 'stream';
import { type ReelData } from './download-instagram-reel';

export type SendReelOptions = {
  timeout?: number;
  maxRetries?: number;
  deleteOnError?: boolean;
};

export type SendReelResult = {
  success: boolean;
  messageSent?: Message;
  error?: {
    code: 'NO_DATA' | 'DOWNLOAD_FAILED' | 'SEND_FAILED' | 'REACT_FAILED' | 'UNKNOWN';
    message: string;
    details?: any;
  };
};

const DEFAULT_OPTIONS: Required<SendReelOptions> = {
  timeout: 60000, // 60 segundos
  maxRetries: 2,
  deleteOnError: false,
};

/**
 * Descarga y envía un reel de Instagram como archivo adjunto
 * @param message - Mensaje de Discord para responder
 * @param data - Datos del reel de Instagram
 * @param options - Opciones de configuración
 * @returns Resultado de la operación
 */
export async function sendReelEmbed(
  message: Message,
  data: ReelData,
  options?: SendReelOptions
): Promise<SendReelResult> {
  const config = { ...DEFAULT_OPTIONS, ...options };

  // Validación temprana
  if (!data?.picture) {
    console.error(chalk.red('No data or picture URL provided'));
    return {
      success: false,
      error: {
        code: 'NO_DATA',
        message: 'No reel data or picture URL available',
      },
    };
  }

  try {
    console.log(chalk.blue('Downloading reel video...'));

    // Descargar video con reintentos
    const videoBuffer = await downloadWithRetry(data.picture, config.timeout, config.maxRetries);

    if (!videoBuffer) {
      return {
        success: false,
        error: {
          code: 'DOWNLOAD_FAILED',
          message: 'Failed to download video after retries',
        },
      };
    }

    console.log(chalk.blue(`Video downloaded: ${(videoBuffer.length / 1024 / 1024).toFixed(2)}MB`));

    // Crear attachment desde buffer (sin guardar en disco)
    const attachment = new AttachmentBuilder(videoBuffer, {
      name: generateFileName(data.title),
    });

    // Enviar mensaje
    console.log(chalk.blue('Sending video to Discord...'));
    const messageSent = await message.reply({
      files: [attachment],
    });

    console.log(chalk.green('Video sent successfully'));

    // Intentar agregar reacción (no crítico si falla)
    await addReactionSafely(messageSent).catch((error) => {
      console.warn(chalk.yellow('Failed to add reaction:'), error.message);
    });

    return {
      success: true,
      messageSent,
    };
  } catch (error) {
    console.error(chalk.red('Error sending reel:'), error);

    return {
      success: false,
      error: {
        code: 'SEND_FAILED',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: error,
      },
    };
  }
}

/**
 * Descarga un archivo con reintentos automáticos
 */
async function downloadWithRetry(url: string, timeout: number, maxRetries: number): Promise<Buffer | null> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout,
        maxContentLength: 100 * 1024 * 1024, // 100MB máximo
        maxBodyLength: 100 * 1024 * 1024,
      });

      return Buffer.from(response.data);
    } catch (error) {
      lastError = error as Error;
      console.warn(
        chalk.yellow(
          `Download attempt ${attempt}/${maxRetries} failed:`,
          error instanceof AxiosError ? error.code : error
        )
      );

      // No reintentar en ciertos casos
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404 || error.response?.status === 403) {
          console.error(chalk.red('Video not accessible (404/403)'));
          return null;
        }
      }

      // Esperar antes de reintentar (exponential backoff)
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        console.log(chalk.blue(`Retrying in ${delay}ms...`));
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  console.error(chalk.red('All download attempts failed'));
  return null;
}

/**
 * Genera un nombre de archivo limpio y seguro
 */
function generateFileName(title?: string): string {
  if (!title || title.trim() === '') {
    return `instagram_reel_${Date.now()}.mp4`;
  }

  // Limpiar título: remover caracteres no válidos, limitar longitud
  const cleanTitle = title
    .replace(/[^a-zA-Z0-9\s\-_]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);

  return `${cleanTitle}_${Date.now()}.mp4`;
}

/**
 * Agrega reacción al mensaje de forma segura
 */
async function addReactionSafely(message: Message): Promise<void> {
  try {
    const botUserId = message.client.user.id;

    // Mapeo de IDs a emojis (configurable)
    const reactionMap: Record<string, string> = {
      '549600306959351809': '✡️',
      '1036509633826791424': '🗿',
    };

    const emoji = reactionMap[botUserId];

    if (emoji) {
      await message.react(emoji);
      console.log(chalk.green(`Reaction ${emoji} added`));
    }
  } catch (error) {
    // No lanzar error, solo registrar
    console.warn(chalk.yellow('Could not add reaction:'), error);
  }
}

/**
 * Versión alternativa que usa streams (más eficiente en memoria para archivos grandes)
 */
export async function sendReelStream(
  message: Message,
  data: ReelData,
  options?: SendReelOptions
): Promise<SendReelResult> {
  const config = { ...DEFAULT_OPTIONS, ...options };

  if (!data?.picture) {
    return {
      success: false,
      error: {
        code: 'NO_DATA',
        message: 'No reel data or picture URL available',
      },
    };
  }

  try {
    console.log(chalk.blue('Streaming reel video...'));

    const response = await axios.get(data.picture, {
      responseType: 'stream',
      timeout: config.timeout,
    });

    const stream = response.data as Readable;

    const attachment = new AttachmentBuilder(stream, {
      name: generateFileName(data.title),
    });

    const messageSent = await message.reply({
      files: [attachment],
    });

    console.log(chalk.green('Video streamed successfully'));

    await addReactionSafely(messageSent).catch(() => {});

    return {
      success: true,
      messageSent,
    };
  } catch (error) {
    console.error(chalk.red('Error streaming reel:'), error);

    return {
      success: false,
      error: {
        code: 'SEND_FAILED',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: error,
      },
    };
  }
}

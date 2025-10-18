import { Message } from 'discord.js';
import { ReelData } from './download-instagram-reel.js';

export async function sendReelEmbed(message: Message, data: ReelData) {
  try {
    if (!data || !data.picture) return;
    // Enviar el embed Y el video como mensaje separado
    await message.reply(data.picture);
  } catch (error) {
    console.error('Error sending reel embed:', error);
  }
}

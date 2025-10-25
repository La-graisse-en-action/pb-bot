import { Message } from 'discord.js';
import { getFirstInstagramUrl } from './utils/validateInstagramUrl.js';
import { downloadInstagramReel } from './lib/download-instagram-reel.js';
import { sendReelEmbed } from './lib/sendReelEmbed.js';

export type InstagramServiceProps = {
  message: Message;
};

export const initInstagramService = async ({ message }: InstagramServiceProps) => {
  const urlData = getFirstInstagramUrl(message.toString());
  const data = await downloadInstagramReel(urlData?.fullUrl ?? '');
  await sendReelEmbed(message, data);
};

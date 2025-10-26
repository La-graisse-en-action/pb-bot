import { Message } from 'discord.js';
import { downloadInstagramReel } from './lib/download-instagram-reel';
import { sendReelEmbed } from './lib/sendReelEmbed';
import { getFirstInstagramUrl } from './utils/validateInstagramUrl';

export type InstagramServiceProps = {
  message: Message;
};

export const initInstagramService = async ({ message }: InstagramServiceProps) => {
  const urlData = getFirstInstagramUrl(message.toString());
  const data = await downloadInstagramReel(urlData?.fullUrl ?? '');
  await sendReelEmbed(message, data);
};

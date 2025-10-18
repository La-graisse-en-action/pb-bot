import chalk from 'chalk';
import { Events, Message } from 'discord.js';
import { CustomEvent } from '../types/CustomEvent.js';
import { executeTextCommand } from '../utils/executeTextCommand.js';
import { getFirstInstagramUrl, hasInstagramUrl } from '../utils/instagram/validateInstagramUrl.js';
import { downloadInstagramReel } from '../lib/download-instagram-reel.js';
import { sendReelEmbed } from '../lib/sendReelEmbed.js';

const messageCreate: CustomEvent = {
  name: Events.MessageCreate,
  once: false,
  execute: async (message: Message) => {
    if (message.author.bot) return;
    console.log(chalk.blue(`📨 Message from ${message.author.tag} in #${message?.guild?.name || message.channel.id}`));
    console.log(chalk.gray(`   Content: "${message.content}"`));
    console.log(chalk.gray(`   Channel ID: ${message.channel.id} | Message ID: ${message.id}`));

    if (message.content.startsWith('!')) {
      await executeTextCommand(message);
    }

    if (hasInstagramUrl(message.toString())) {
      const urlData = getFirstInstagramUrl(message.toString());
      const data = await downloadInstagramReel(urlData?.fullUrl ?? '');
      await sendReelEmbed(message, data)
    }
  }
};

export default messageCreate;

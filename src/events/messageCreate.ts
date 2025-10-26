import chalk from 'chalk';
import { Events, Message } from 'discord.js';
import { initInstagramService } from '../services/instagram/index';
import { hasInstagramUrl } from '../services/instagram/utils/validateInstagramUrl';
import { type CustomEvent } from '../types/CustomEvent';
import { executeTextCommand } from '../utils/executeTextCommand';

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
      await initInstagramService({ message });
    }
  },
};

export default messageCreate;

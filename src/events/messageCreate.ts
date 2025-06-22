import { CommandInteraction, Events, Interaction, Message, User } from 'discord.js';
import { CustomEvent } from '../types/CustomEvent.js';
import { getUser } from '../api/getUser.js';
import { createUser } from '../api/createUser.js';
import chalk from 'chalk';
import { loadCommandFromMessage } from '../utils/loadCommandFromMessage.js';
import { commands } from '../constants/commands.js';
import { executeTextCommand } from '../utils/executeTextCommand.js';

const messageCreate: CustomEvent = {
  name: Events.MessageCreate,
  once: false,
  execute: async (message: Message) => {
    if (message.author.bot) return;
    console.log(chalk.blue(`- Message from ${message.author.tag}: ${message.content}`));

    const user = await getUser(message.author.id);
    if (!user) {
      await createUser({
        id: message.author.id,
        username: message.author.username,
        createdAt: message.author.createdAt || new Date(),
      });
    }

    console.info(chalk.blue(`- Message received`));

    if (message.content.startsWith('!')) {
      executeTextCommand(message);
    }
  },
};

export default messageCreate;

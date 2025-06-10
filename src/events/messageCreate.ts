import { Events, Message } from 'discord.js';
import { CustomEvent } from '../types/CustomEvent.js';
import { getUser } from '../api/getUser.js';
import { createUser } from '../api/createUser.js';
import chalk from 'chalk';

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
  },
};

export default messageCreate;

import { Events } from 'discord.js';
import { CustomEvent } from '../types/CustomEvent.js';

const messageCreate: CustomEvent = {
  name: Events.MessageCreate,
  once: false,
  execute: async (message) => {
    console.log(`Message from ${message.author.tag}: ${message.content}`);
    if (message.author.bot) return;

    message.reply(`You said: ${message.content}`);
  },
};

export default messageCreate;

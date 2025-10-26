import chalk from 'chalk';
import { Client, Events } from 'discord.js';
import { type CustomEvent } from '../types/CustomEvent';
import { type LoadedCommand } from '../types/SlashCommand';
import { loadCommands } from '../utils/loadCommands.js';

const clientReady: CustomEvent = {
  name: Events.ClientReady,
  once: true,
  execute: async (client: Client & { commands: Map<string, LoadedCommand> }) => {
    console.log('\n');
    console.log(chalk.bgBlue('Bot is loading.'));
    const commandsLoaded = await loadCommands(client);
    if (commandsLoaded.length === 0) {
      console.error('No commands were loaded. Please check your command files.');
      return;
    }
    console.log('\n');
    console.log(chalk.bgGreen(`Bot is ready! Logged in as ${client.user?.tag}`));
  },
};

export default clientReady;

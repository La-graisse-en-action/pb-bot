import chalk from 'chalk';
import { Client, Events } from 'discord.js';
import { loadCommands } from '../utils/loadCommands.js';
import { testDBConnection } from '../api/testDbConnection.js';
import { CustomEvent } from '../types/CustomEvent.js';
import CustomClient from '../types/CustomClient.js';
import { LoadedCommand } from '../types/SlashCommand.js';

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
    await testDBConnection();
    console.log('\n');
    console.log(chalk.bgGreen(`Bot is ready! Logged in as ${client.user?.tag}`));
  },
};

export default clientReady;

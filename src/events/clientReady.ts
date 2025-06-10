import chalk from 'chalk';
import { Events } from 'discord.js';
import { loadCommands } from '../utils/loadCommands.js';
import { testDBConnection } from '../api/testDbConnection.js';
import { CustomEvent } from '../types/CustomEvent.js';

const clientReady: CustomEvent = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
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

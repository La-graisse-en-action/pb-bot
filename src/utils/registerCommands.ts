import chalk from 'chalk';
import { REST, Routes } from 'discord.js';
import { LoadedCommand } from '../types/SlashCommand.js';

export const registerCommands = async (commands: LoadedCommand[], clientId: string, token: string): Promise<void> => {
  const rest = new REST({ version: '10' }).setToken(token);
  console.log(chalk.blue(`- Registering ${commands.length} commands for client ID: ${clientId}`));

  try {
    console.log(chalk.yellow('- Refreshing application (/) commands...'));

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands.map((command) => command.data.toJSON()),
    });

    console.log(chalk.green('- Successfully reloaded application (/) commands.'));
  } catch (error) {
    console.error(`Error refreshing commands: ${error}`);
  }
};

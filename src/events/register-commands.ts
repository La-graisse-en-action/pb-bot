import { REST, Routes } from 'discord.js';

export const registerCommands = async (commands: any[], clientId: string, token: string) => {
  const rest = new REST({ version: '10' }).setToken(token);

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands.map((command) => command.data.toJSON()),
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error refreshing commands:', error);
  }
};

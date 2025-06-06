// @ts-check
const { REST, Routes } = require('discord.js');

/**
 * Registra los comandos de barra globales en la API de Discord.
 * @param {Array<{ data: { toJSON: () => any } }>} commands - Lista de comandos con método data.toJSON()
 * @param {string} clientId - ID de la aplicación (cliente)
 * @param {string} token - Token del bot
 * @returns {Promise<void>}
 */
const registerCommands = async (commands, clientId, token) => {
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

module.exports = { registerCommands };

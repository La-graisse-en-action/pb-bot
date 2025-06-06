// @ts-check
import { Events, Client } from 'discord.js';

/**
 * Custom Client class with commands property.
 * @typedef {Object} Command
 * @property {{ name: string }} data
 * @property {(interaction: import('discord.js').Interaction) => Promise<void>} execute
 */
class CustomClient extends Client {
  /**
   * @type {Map<string, Command>}
   */
  commands = new Map();
}

/**
 * Handles interaction events for slash commands.
 * @param {CustomClient} client - The Discord client instance.
 */
export const interactionEvent = (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (command) {
      await command.execute(interaction);
    }
  });
};

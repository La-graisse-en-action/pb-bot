import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { commands } from '../constants/commands';
import { type SlashCommand } from '../types/SlashCommand';

export const pbHelp: SlashCommand = {
  data: new SlashCommandBuilder().setName('pb-help').setDescription('Muestra la ayuda del bot'),

  execute: async (interaction, options) => {
    const availableCommands = Object.keys(commands).map((command) => {
      const commandObj = commands[command];
      const description = commandObj?.description || 'No description available';
      return { name: `/${command}`, value: description };
    });

    const embeds = [new EmbedBuilder().setTitle('Comandos disponibles').addFields(availableCommands)];
    if (options?.returnBeforeReply) {
      return {
        embeds,
      };
    }

    await interaction.reply({
      content: 'Aquí tienes la ayuda del bot:',
      embeds,
    });
  },
};

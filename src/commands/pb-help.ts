import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { commands } from '../constants/commands.js';
import { SlashCommand } from '../types/SlashCommand.js';

export const pbHelp: SlashCommand = {
  data: new SlashCommandBuilder().setName('pb-help').setDescription('Muestra la ayuda del bot'),

  execute: async (interaction, options) => {
    const availableCommands = Object.keys(commands).map((command) => {
      const { description } = commands[command];
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

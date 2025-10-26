import { SlashCommandBuilder } from 'discord.js';
import { type SlashCommand } from '../types/SlashCommand';

export const pbDrink: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('pb-drink')
    .setNameLocalizations({
      'en-US': 'pb-drink',
      'es-ES': 'peda',
      'es-419': 'peda',
    })
    .setDescription('Post a drink message')
    .setDescriptionLocalizations({
      'en-US': 'Post a drink message',
      'es-ES': 'Publica un mensaje de peda',
      'es-419': 'Publica un mensaje de peda',
    }),
  execute: async (interaction) => {
    await interaction.reply({
      content: 'peda?',
    });
  },
};

export default pbDrink;

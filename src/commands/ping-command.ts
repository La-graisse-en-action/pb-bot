import { CommandInteraction, Interaction, SlashCommandBuilder } from 'discord.js';
import { InteractionResponseType } from 'discord-api-types/v10';

export const pingCommand = {
  data: new SlashCommandBuilder().setName('pb-ping').setDescription('Replies with Pong!'),

  execute: async (interaction: CommandInteraction) => {
    await interaction.reply('Pong!');
  },
};

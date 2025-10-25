// @ts-check
import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types/SlashCommand.js';
import { getFirstInstagramUrl } from '../services/instagram/utils/validateInstagramUrl.js';
import { downloadInstagramReel } from '../services/instagram/lib/download-instagram-reel.js';

export const pbIg: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('pb-ig')
    .setDescription('Replies with an Instagram Reel; Ensure it is a video reel.')
    .addStringOption((opt) =>
      opt.setName('reel').setDescription('Lista de juegos separados por coma o espacio (opcional)').setRequired(false),
    ) as SlashCommandBuilder,
  execute: async (interaction, options) => {
    try {
      const reelUrl = interaction.options.get('reel', false);
      if (!reelUrl) return;

      const parsedUrl = getFirstInstagramUrl(`${reelUrl?.value}`.toString());
      if (!parsedUrl || !parsedUrl.fullUrl) return;
      const data = await downloadInstagramReel(parsedUrl?.fullUrl?.toString());

      if (options?.returnBeforeReply) {
        return {
          content: data.picture,
        };
      }

      await interaction.reply({
        content: data.picture,
      });
    } catch (error) {
      console.error(error);
      return;
    }
  },
};

export default pbIg;

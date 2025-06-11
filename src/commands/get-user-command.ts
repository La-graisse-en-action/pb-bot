import { APIEmbedField, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types/SlashCommand.js';
import { formatStringCode } from '../utils/formatStringCode.js';
import { capitalize } from '../utils/capitalize.js';
import { getMessageByUserId } from '../api/getMessageByUserId.js';
import { userCommandEmbedBuilder } from '../utils/userCommandEmbedBuilder.js';

export const userCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('pb-user')
    .setDescription('Muestra información del usuario seleccionado o del que ejecuta el comando')
    .addUserOption((option) =>
      option.setName('usuario').setDescription('Usuario para mostrar la información').setRequired(false)
    ) as SlashCommandBuilder,

  execute: async (interaction) => {
    try {
      const selectedUser = interaction.options.get('usuario')?.user || interaction.user;
      const member = await interaction.guild?.members.fetch(selectedUser.id);

      if (!selectedUser || !member) {
        await interaction.reply({
          content: 'No se pudo obtener la información del usuario.',
          ephemeral: true,
        });
        return;
      }

      const embed = await userCommandEmbedBuilder({
        user: selectedUser,
        member,
      });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing user command:', error);
      await interaction.reply({
        content: 'Ocurrió un error al intentar obtener la información del usuario.',
        ephemeral: true,
      });
    }
  },
};

export default userCommand;

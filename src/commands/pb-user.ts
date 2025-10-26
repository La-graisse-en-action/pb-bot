import { SlashCommandBuilder } from 'discord.js';
import { type SlashCommand } from '../types/SlashCommand';
import { getUserCommandEmbedBuilder } from '../utils/getUserCommandEmbedBuilder';

export const pbUser: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('pb-user')
    .setDescription('Muestra información del usuario seleccionado o del que ejecuta el comando')
    .addUserOption((option) =>
      option.setName('usuario').setDescription('Usuario para mostrar la información').setRequired(false)
    ) as SlashCommandBuilder,

  execute: async (interaction, options) => {
    try {
      const selectedUser = interaction.options.get('usuario')?.user || interaction.user;
      const member = await interaction.guild?.members.fetch(selectedUser.id);

      if (!selectedUser || !member) {
        if (options?.returnBeforeReply) {
          return {
            content: 'No se pudo obtener la información del usuario.',
          };
        }
        await interaction.reply({
          content: 'No se pudo obtener la información del usuario.',
        });
        return;
      }

      const embed = await getUserCommandEmbedBuilder({
        user: selectedUser,
        member,
      });

      if (options?.returnBeforeReply) {
        return {
          embeds: [embed],
        };
      }

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing user command:', error);
      if (options?.returnBeforeReply) {
        return {
          content: 'Ocurrió un error al intentar obtener la información del usuario.',
        };
      }
      await interaction.reply({
        content: 'Ocurrió un error al intentar obtener la información del usuario.',
        ephemeral: true,
      });
    }
  },
};

export default pbUser;

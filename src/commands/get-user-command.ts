import { APIEmbedField, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types/SlashCommand.js';

export const userCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('pb-user')
    .setDescription('Muestra información del usuario que ejecuta el comando'),

  execute: async (interaction) => {
    const user = interaction.user;

    const fields: APIEmbedField[] = [
      { name: 'ID:', value: user.id, inline: true },
      { name: 'Tag:', value: user.tag, inline: true },
      { name: 'Bot:', value: user.bot ? '✅ Sí' : '❌ No', inline: true },
      { name: '\u200B', value: '\u200B', inline: false }, // Salto de línea visual
      { name: 'Nombre de usuario:', value: user.username, inline: true },
      { name: 'Display name:', value: user.displayName || '—', inline: true },
      { name: 'Global name:', value: user.globalName || '—', inline: true },
      { name: '\u200B', value: '\u200B', inline: false },
      { name: 'Discriminator:', value: user.discriminator, inline: true },
      { name: 'Creado el:', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: true },
      { name: 'System user:', value: user.system ? '✅ Sí' : '❌ No', inline: true },
      { name: '\u200B', value: '\u200B', inline: false },
      { name: 'Accent Color:', value: user.hexAccentColor || '—', inline: true },
      { name: 'Avatar URL:', value: `[Ver avatar](${user.displayAvatarURL()})`, inline: true },
      { name: 'Banner:', value: user.bannerURL() ? `[Ver banner](${user.bannerURL()})` : '—', inline: true },
    ];

    const embed = new EmbedBuilder()
      .setTitle(`Información de ${user.username}`)
      .setDescription(`ID: ${user.id}`)
      .setThumbnail(user.displayAvatarURL({ extension: 'png', size: 128 }))
      .addFields(fields);

    await interaction.reply({ embeds: [embed] });
  },
};

export default userCommand;

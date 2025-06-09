const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

const userCommand = {
  data: new SlashCommandBuilder()
    .setName('pb-user')
    .setDescription('Muestra información del usuario que ejecuta el comando'),

  /**
   * @param {import('discord.js').CommandInteraction} interaction
   */
  execute: async (interaction) => {
    const user = interaction.user;

    /**
     * @type {Array<{ name: string, value: string, inline?: boolean }>}
     * @description Fields of the embed that show user information.
     */
    const fields = [
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

    /**
     * @type {import('discord.js').EmbedBuilder}
     */
    const embed = new EmbedBuilder()
      .setTitle(`Información de ${user.username}`)
      .setDescription(`ID: ${user.id}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(fields);

    await interaction.reply({ embeds: [embed] });
  },
};

module.exports = { userCommand };

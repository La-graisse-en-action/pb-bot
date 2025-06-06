// @ts-check
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

/**
 * @typedef {import('discord.js').CommandInteraction} CommandInteraction
 * @typedef {Object} SlashCommand
 * @property {SlashCommandBuilder} data
 * @property {(interaction: CommandInteraction) => Promise<void>} execute
 */

/**
 * Format as a Discord inline code block
 * @param {string} text
 * @returns {string}
 */
const formatAsInlineCode = (text) => {
  return `\`${text}\``;
};

/**
 * @type {SlashCommand}
 */
const pingCommand = {
  data: new SlashCommandBuilder().setName('pb-ping').setDescription('Replies with Pong!'),

  /**
   * @param {CommandInteraction} interaction
   */
  execute: async (interaction) => {
    const start = Date.now();
    const wsPing = interaction.client.ws.ping;
    const dbPing = 1.35;

    const responseTime = Date.now() - start;

    const embed = new EmbedBuilder()
      .setTitle('Pong!')
      .addFields(
        { name: 'Discord REST latency', value: formatAsInlineCode(`${responseTime}ms`), inline: false },
        { name: 'Discord Gateway (WS) latency', value: formatAsInlineCode(`${wsPing}ms`), inline: false },
        { name: 'Database response time', value: formatAsInlineCode(`${dbPing}ms`), inline: false },
        { name: 'Other ping', value: formatAsInlineCode(`${responseTime + 1}ms`), inline: false }
      )
      .setColor(0x00ff00)
      .setTimestamp()
      .setFooter({
        text: 'Requested by ' + interaction.user.username,
        iconURL: interaction.client.user?.displayAvatarURL(),
      });

    await interaction.reply({
      embeds: [embed],
    });
  },
};

module.exports = { pingCommand };

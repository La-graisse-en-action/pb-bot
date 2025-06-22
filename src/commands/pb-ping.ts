// @ts-check
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { SlashCommand } from '../types/SlashCommand.js';

/** Format as a Discord inline code block */
const formatAsInlineCode = (text: string): string => {
  return `\`${text}\``;
};

export const pbPing: SlashCommand = {
  data: new SlashCommandBuilder().setName('pb-ping').setDescription('Replies with Pong!'),

  execute: async (interaction, options) => {
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

    if (options?.returnBeforeReply) {
      return {
        embeds: [embed],
      };
    }

    await interaction.reply({
      embeds: [embed],
    });
  },
};

export default pbPing;

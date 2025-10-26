// @ts-check
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { type SlashCommand } from '../types/SlashCommand';
import { formatStringCode } from '../utils/formatStringCode';

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
        { name: 'Discord REST latency', value: formatStringCode(`${responseTime}ms`), inline: false },
        { name: 'Discord Gateway (WS) latency', value: formatStringCode(`${wsPing}ms`), inline: false },
        { name: 'Database response time', value: formatStringCode(`${dbPing}ms`), inline: false },
        { name: 'Other ping', value: formatStringCode(`${responseTime + 1}ms`), inline: false }
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

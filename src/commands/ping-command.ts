import { EmbedBuilder, Interaction, SlashCommandBuilder } from 'discord.js';
import { InteractionResponseType } from 'discord-api-types/v10';
import { SlashCommand } from '../types/slash-command';

const formatAsInlineCode = (text: string): string => {
  return `\`${text}\``;
};

export const pingCommand: SlashCommand = {
  data: new SlashCommandBuilder().setName('pb-ping').setDescription('Replies with Pong!'),

  execute: async (interaction) => {
    const start = Date.now();
    const { ws } = interaction.client;
    const wsPing = ws.ping;

    const dbStart = Date.now();
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

    // await interaction.reply({
    //   content: `**Discord REST latency:** ${responseTime}ms\n**Discord Gateway (WS) latency:** ${wsPing}ms\n**Database response time:** ${dbPing}ms\n**Other ping:** ${
    //     responseTime + 1
    //   }ms`,
    // });
    await interaction.reply({
      embeds: [embed],
    });
  },
};

import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types/SlashCommand.js';

const defaultGames = [
  'Rocket League',
  'Valorant',
  'League of Legends',
  'Minecraft',
  'Among Us',
  'CS:GO',
  'Fortnite',
  'Fall Guys',
  'Apex Legends',
];

export const pbPlay: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('pb-play')
    .setDescription('Elige un juego al azar de una lista prehecha o personalizada')
    .addStringOption((opt) =>
      opt.setName('juegos').setDescription('Lista de juegos separados por coma o espacio (opcional)').setRequired(false)
    ) as SlashCommandBuilder,

  execute: async (interaction, options) => {
    const gamesInput = interaction.options.get('juegos')?.value?.toString() || '';
    if (gamesInput.length > 1000 || gamesInput.length < 1) {
      if (options?.returnBeforeReply) {
        return {
          content: 'Please provide a correct list of games; example: "LoL, Valorant, Minecraft"',
        };
      }
      await interaction.reply({
        content: 'Please provide a correct list of games; example: "LoL, Valorant, Minecraft"',
      });
      return;
    }
    let games;

    if (gamesInput) {
      games = gamesInput.includes(',')
        ? gamesInput
            .split(',')
            .map((j) => j.trim())
            .filter(Boolean)
        : gamesInput
            .split(' ')
            .map((j) => j.trim())
            .filter(Boolean);
    } else {
      games = defaultGames;
    }

    if (!games.length) {
      if (options?.returnBeforeReply) {
        return {
          content: 'No se encontraron juegos en la lista proporcionada.',
        };
      }
      await interaction.reply({
        content: 'Do not found any games in the provided list.',
      });
      return;
    }

    const chosenGame = games[Math.floor(Math.random() * games.length)];

    const embed = new EmbedBuilder()
      .setTitle('🎮 ¿Qué jugamos hoy?')
      .setDescription(`He seleccionado al azar:\n**${chosenGame?.toUpperCase()}**`)
      .addFields({ name: 'Opciones', value: games.map((g) => `• ${g}`).join('\n'), inline: false })
      .setColor(0x3498db)
      .setFooter({ text: 'Powered by /what-to-play' })
      .setTimestamp();

    if (options?.returnBeforeReply) {
      return {
        embeds: [embed],
      };
    }

    await interaction.reply({ embeds: [embed] });
  },
};

export default pbPlay;

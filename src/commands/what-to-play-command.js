// @ts-check
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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

/**
 * @typedef {import('discord.js').CommandInteraction} CommandInteraction
 * @typedef {Object} SlashCommand
 * @property {import('discord.js').SlashCommandOptionsOnlyBuilder} data
 * @property {(interaction: CommandInteraction) => Promise<void>} execute
 */

/**
 * @type {SlashCommand}
 */
const whatToPlayCommand = {
  data: new SlashCommandBuilder()
    .setName('pb-play')
    .setDescription('Elige un juego al azar de una lista prehecha o personalizada')
    .addStringOption((opt) =>
      opt.setName('juegos').setDescription('Lista de juegos separados por coma o espacio (opcional)').setRequired(false)
    ),
  /**
   * @param {CommandInteraction} interaction
   */
  execute: async (interaction) => {
    const gamesInput = interaction.options.get('juegos')?.value?.toString() || '';
    if (gamesInput.length > 1000 || gamesInput.length < 1) {
      await interaction.reply({
        content: 'Please provide a correct list of games; example: "LoL, Valorant, Minecraft"',
        ephemeral: true,
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
      await interaction.reply({
        content: 'Do not found any games in the provided list.',
        ephemeral: true,
      });
      return;
    }

    const chosenGame = games[Math.floor(Math.random() * games.length)];

    const embed = new EmbedBuilder()
      .setTitle('🎮 ¿Qué jugamos hoy?')
      .setDescription(`He seleccionado al azar:\n\n**${chosenGame}**`)
      .addFields({ name: 'Opciones', value: games.map((g) => `• ${g}`).join('\n'), inline: false })
      .setColor(0x3498db)
      .setFooter({ text: 'Powered by /what-to-play' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

module.exports = { whatToPlayCommand };

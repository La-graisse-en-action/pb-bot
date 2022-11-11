const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const colors = require('../utils/colors')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('playlists')
    .setDescription('Obten las playlists de musica mas usadas en la panal band'),
  async execute(interaction) {
    const msgEmbed = new EmbedBuilder()
      .setTitle('Playlists')
      .setColor(colors)
      .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/1200px-Spotify_App_Logo.svg.png')
    console.log(interaction)

    await interaction.reply({ embeds: [msgEmbed] })
  },
}

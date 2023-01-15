const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const getCurrentDate = require('../utils/getCurrentDate')
const logs = require('../utils/logs')
const spotifyPlaylists = require('../constants/spotifyPlaylists')
const playlistBtnAction = require('../helpers/playlistBtnAction')

const spotifyLogo =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/1200px-Spotify_App_Logo.svg.png'
const color = '#1DB954' // spotify logo hex color
const embedAuthorObj = {
  name: 'Spotify Playlists',
  iconURL: spotifyLogo,
}

const msgEmbed = new EmbedBuilder()
  .setAuthor(embedAuthorObj)
  .setTitle('Playlists')
  .setColor(color)
  .setFooter({ text: getCurrentDate() })

const row = new ActionRowBuilder().addComponents(
  // Show all playlists
  new ButtonBuilder().setCustomId('all').setLabel('🎵 Mostrar todas las playlists').setStyle(ButtonStyle.Primary),
  new ButtonBuilder().setCustomId('pizzaTime').setLabel('🍕 Pizza Time').setStyle(ButtonStyle.Secondary)
)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('playlists')
    .setDescription('Obten las playlists de musica mas usadas en la panal band')
    .addStringOption((option) =>
      option.setName('playlists').setDescription('Elige una playlist').setAutocomplete(true)
    ),
  async execute(interaction) {
    const collector = interaction.channel.createMessageComponentCollector({ time: 15000 })

    collector.on('collect', async (i) => {
      console.log(i)
      if (!i.isButton()) return
      const customId = i.customId

      if (customId === 'all') {
        logs.info('primary button was clicked!')
        const newEmbed = new EmbedBuilder()
          .setTitle('Playlists')
          .setColor(color)
          .setAuthor(embedAuthorObj)
          .setDescription('Mostrando todas las playlists:')
          .addFields(
            Object.keys(spotifyPlaylists).map((key) => {
              const nameSplitted = key.split('_')
              const name = nameSplitted
                .map((letter) => {
                  return letter.charAt(0).toUpperCase() + letter.slice(1)
                })
                .join(' ')
              return { name: `🎵 ${name}`, value: spotifyPlaylists[key] }
            })
          )
          .setFooter({ text: getCurrentDate() })

        await i.update({ embeds: [newEmbed], components: [] })
      } else if (customId === 'pizzaTime') {
        playlistBtnAction(i, {
          playlistUrl: spotifyPlaylists.pizza_time,
          color,
          name: '🍕 Pizza Time',
          description: 'Mostrando la playlist de Pizza Time:',
          thumbnail: 'https://i.imgur.com/8QZ7Z9C.png',
        })
      }
    })

    collector.on('end', (collected) => console.log(`Collected ${collected.size} items`))

    await interaction.reply({ embeds: [msgEmbed], components: [row] })
  },
}

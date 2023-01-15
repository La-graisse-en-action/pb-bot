const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const getCurrentDate = require('../utils/getCurrentDate')
const logs = require('../utils/logs')

const spotifyLogo =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/1200px-Spotify_App_Logo.svg.png'
// spotify logo hex color
const color = '#1DB954'
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
            { name: '🎵 Playlist 1', value: 'https://open.spotify.com/playlist/1' },
            { name: '🎵 Playlist 2', value: 'https://open.spotify.com/playlist/2' }
          )
          .setFooter({ text: getCurrentDate() })

        await i.update({ embeds: [newEmbed], components: [] })
      } else if (customId === 'pizzaTime') {
        logs.info('secondary button was clicked!')
        import('../utils/clipboard.mjs').then((clipboard) => {
          console.log(clipboard.clipboard.writeSync('https://open.spotify.com/playlist/3'))
        })
        const newEmbed = new EmbedBuilder()
          .setTitle('Playlists')
          .setColor(color)
          .setAuthor(embedAuthorObj)
          .setDescription('Seleccionaste la playlist de pizza time:')
          .addFields({ name: '🍕 Pizza Time', value: 'https://open.spotify.com/playlist/3' })
          .setFooter({ text: getCurrentDate() })

        await i.update({ embeds: [newEmbed], components: [] })
      }
    })

    collector.on('end', (collected) => console.log(`Collected ${collected.size} items`))

    await interaction.reply({ embeds: [msgEmbed], components: [row] })
  },
}

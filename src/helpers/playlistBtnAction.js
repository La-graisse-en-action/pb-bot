const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const getCurrentDate = require('../utils/getCurrentDate')
const logs = require('../utils/logs')

const spotifyLogo =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/1200px-Spotify_App_Logo.svg.png'
const embedAuthorObj = {
  name: 'Spotify Playlists',
  iconURL: spotifyLogo,
}

async function playlistBtnAction(
  interaction,
  { playlistUrl = '', color = '', name = '', description = '', thumbnail = '' }
) {
  try {
    logs.info('secondary button was clicked!')
    import('../utils/clipboard.mjs').then((clipboard) => {
      clipboard.clipboard.writeSync(playlistUrl)
    })
    const newEmbed = new EmbedBuilder()
      .setTitle('Playlists')
      .setColor(color)
      .setAuthor(embedAuthorObj)
      .setDescription(description)
      .addFields({ name, value: playlistUrl })
      .setThumbnail(thumbnail)
      .setFooter({ text: getCurrentDate() })

    const secondaryRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setLabel('Abrir en Spotify').setStyle(ButtonStyle.Link).setURL(playlistUrl)
    )
    await interaction.update({ embeds: [newEmbed], components: [secondaryRow] })
  } catch (error) {
    logs.error(error)
    await interaction.update({
      content: 'Se ha producido un error al ejecutar este comando.',
      ephemeral: true,
      embeds: [],
      components: [],
    })
  }
}

module.exports = playlistBtnAction

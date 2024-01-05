const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const getCurrentDate = require('../utils/getCurrentDate')
const colors = require('../constants/colors')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add-playlist')
    .setDescription('Responde con informacion que esta en la base de datos!')
    .addStringOption((option) =>
      option
        .setName('playlistdata')
        .setDescription('introduce la infromacion de una playlist separada por guiones name - url - id...')
        .setRequired(true)
    )
    .addAttachmentOption((option) =>
      option.setName('attachment').setDescription('Añade una imagen a la playlist').setRequired(false)
    ),
  async execute(interaction) {
    const playlistData = interaction.options.getString('playlistdata') ?? 'No data provided'
    const dataSplitted = playlistData.split('-').map((item) => item.trim())
    console.log(dataSplitted)
    console.log('interaction: ', interaction)

    if (dataSplitted.join(' ') === 'No data provided' || dataSplitted.length <= 3) {
      const newEmbed = new EmbedBuilder()
        .setTitle('Add Playlist: Wrong Format')
        .setColor(colors.red)
        .setDescription('El formato para agregar una nueva playlist es incorrecta, prueba: **nombre - url - id**')
        .setFooter({ text: getCurrentDate() })

      await interaction.reply({ embeds: [newEmbed], components: [] })
      return
    }

    const playlistJsonToSend = {
      name: dataSplitted[0],
      url: dataSplitted[1],
      playlistId: dataSplitted[2],
    }
    // await prismaClient.playlist.create({
    //   data: playlistJsonToSend,
    // })

    // const data = await prismaClient.playlist.findMany()
    await interaction.reply(`Data: ${playlistData}`)
  },
}

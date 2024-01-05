const { SlashCommandBuilder } = require('discord.js')
const commandNames = require('../constants/command-names')

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandNames.tweet)
    .setDescription('Coloca la URL de un tweet para obtener el video o imagen como preview')
    .addStringOption((option) => option.setName('url').setDescription('La URL del tweet').setRequired(true)),

  async execute(interaction) {
    /** @type {string | undefined} url */
    const urlParam = interaction.options.get('url')?.value ?? ''
    await interaction.reply(`Actualmente la API de Twitter no esta disponible, pero tu tweet es: ${urlParam} :)`)
  },
}

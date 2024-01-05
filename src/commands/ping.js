const { SlashCommandBuilder } = require('discord.js')
const commandNames = require('../constants/command-names')

module.exports = {
  data: new SlashCommandBuilder().setName(commandNames.ping).setDescription('Replies with Pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!')
  },
}

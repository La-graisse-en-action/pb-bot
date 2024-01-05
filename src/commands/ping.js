const { SlashCommandBuilder } = require('discord.js')
const commandNames = require('../constants/command-names')

module.exports = {
  data: new SlashCommandBuilder().setName(commandNames.ping).setDescription('Replies with Pong!'),
  async execute(interaction) {
    console.log(interaction)
    const username = interaction.member?.nickname ?? interaction.user.username

    await interaction.reply(username ? `Pong, ${username}!` : 'Pong!')
  },
}

const { Events } = require('discord.js')
const log = require('../utils/logs')

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`)
      return
    }

    try {
      await command.execute(interaction)
    } catch (error) {
      log.error(error)
      log.warn(`There was an error while executing ${interaction.commandName}`)
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }
  },
}

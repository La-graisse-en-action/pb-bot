const { Events } = require('discord.js')
const log = require('../utils/logs')

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    log.success('Ready!')
    log.info(`Logged in as ${client.user.tag}`)
  },
}

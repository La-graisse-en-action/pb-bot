const { Client, GatewayIntentBits, Collection } = require('discord.js')
const { token } = require('./config')
const fs = require('node:fs')
const path = require('node:path')
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const log = require('./utils/logs')

client.commands = new Collection()

// events
const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'))

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

// commands
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  } else {
    log.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
  }
}

client.on('messageReactionAdd', (reaction, user) => {
  console.log(reaction, user)
})

const main = () => {
  client.login(token)
  console.log('Hello World from the PB Bot!')
}

main()

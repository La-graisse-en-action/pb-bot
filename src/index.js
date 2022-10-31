const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
const { token } = require('./config')
const fs = require('node:fs')
const path = require('node:path')
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const log = require('./utils/logs')

client.commands = new Collection()
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

client.once(Events.ClientReady, (client) => {
  log.success('Ready!')
  log.info(`Logged in as ${client.user.tag}`)
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return
  const command = interaction.client.commands.get(interaction.commandName)

  if (!command) {
    log.error(`No command matching ${interaction.commandName} was found.`)
    return
  }

  try {
    await command.execute(interaction)
  } catch (error) {
    log.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
})

client.login(token)

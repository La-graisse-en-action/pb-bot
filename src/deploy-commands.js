const { REST, Routes } = require('discord.js')
const { clientId, guildId, token } = require('./config')
const fs = require('node:fs')
const path = require('path')
const log = require('./utils/logs.js')

const commands = []
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync(path.join(__dirname, '/commands')).filter((file) => file.endsWith('.js'))

console.log(commandFiles)
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  commands.push(command.data.toJSON())
}

// Construct and prepare an instance of the REST module
// eslint-disable-next-line prettier/prettier
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
// eslint-disable-next-line prettier/prettier
(async () => {
  try {
    log.info(`Started refreshing ${commands.length} application (/) commands...`)

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    if (!data) {
      log.error('Commands could not be loaded correctly')
    }
    log.success(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
  }
})()

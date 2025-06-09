// @ts-check
const { Client, GatewayIntentBits, Events, REST, Routes } = require('discord.js');
const config = require('./config.js');
const fs = require('fs');
const path = require('path');

/**
 * Custom Client class with commands property.
 * @typedef {Object} Command
 * @property {{ name: string }} data
 * @property {(interaction: import('discord.js').Interaction) => Promise<void>} execute
 */
class CustomClient extends Client {
  /**
   * @type {Map<string, Command>}
   */
  commands = new Map();
}

/**
 * @type {CustomClient}
 */
const client = new CustomClient({
  intents: [],
});

/**
 * Register global slash commands in Discord API.
 * @param {Array<{ data: { toJSON: () => any } }>} commands
 * @param {string} clientId
 * @param {string} token
 * @returns {Promise<void>}
 */
const registerCommands = async (commands, clientId, token) => {
  const rest = new REST({ version: '10' }).setToken(token);
  console.log(`Registering ${commands.length} commands for client ID: ${clientId}`);

  try {
    console.log('- - - Started refreshing application (/) commands. - - -');

    console.log({ commands });
    await rest.put(Routes.applicationCommands(clientId), {
      body: commands.map((command) => command.data.toJSON()),
    });

    console.log('- - - Successfully reloaded application (/) commands. - - -');
  } catch (error) {
    console.error('Error refreshing commands:', error);
  }
};

/**
 * Load all commands from the "commands" folder.
 * @param {Client & { commands: Map<string, Command> }} client
 * @returns {Promise<Command[]>}
 */
const loadCommands = async (client) => {
  const commands = [];
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const exported = require(path.join(commandsPath, file));
    for (const key of Object.keys(exported)) {
      const command = exported[key];
      if (command && command.data && command.execute) {
        client.commands.set(command.data.name, command);
        commands.push(command);
      }
    }
  }
  console.table(commands.map((c) => c.data.name));
  await registerCommands(commands, config.clientId, config.token);

  return commands;
};

client.once(Events.ClientReady, async () => {
  console.log('- - - Bot is loading - - -');
  await loadCommands(client);
  console.log(`- - - Bot ready and logged in as ${client?.user?.tag}! - - -`);
});

client.on(Events.MessageCreate, (message) => {
  console.log(`Message from ${message.author.tag}: ${message.content}`);
  if (message.author.bot) return;

  message.reply(`You said: ${message.content}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  console.log(`Interaction received: ${interaction.id} of type ${interaction.type}`);
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  console.log(`Received command: ${interaction.commandName}`);
  console.log(`Idioma del usuario: ${interaction.locale}`);

  if (command) {
    // @ts-ignore
    await command.execute(interaction);
  } else {
    console.log(`Command ${interaction.commandName} not found`);
  }
});

client.login(config.token);

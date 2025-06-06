// @ts-check
const { Client, GatewayIntentBits, Events } = require('discord.js');
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
 * Load all commands from the "commands" folder.
 * @param {Client & { commands: Map<string, Command> }} client
 * @returns {Promise<Command[]>}
 */
const loadCommands = async (client) => {
  const commands = [];
  const commandsPath = path.join(__dirname, 'commands');
  console.log(`Loading commands from: ${commandsPath}`);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
  console.table(commandFiles);

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

  return commands;
};

client.once(Events.ClientReady, async () => {
  console.log('Bot is ready!');
  await loadCommands(client);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (command) {
    // @ts-ignore
    await command.execute(interaction);
  } else {
    console.log(`Command ${interaction.commandName} not found`);
  }
});

client.login(config.token);

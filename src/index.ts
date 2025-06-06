import { Client, GatewayIntentBits, Events } from 'discord.js';
import { loadCommands } from './load-commands';
import { config } from './config';

// Extend the Client interface to include the commands property
declare module 'discord.js' {
  interface Client {
    commands: Map<string, any>;
  }
}

const client = new Client({
  intents: [],
});

client.commands = new Map();

client.once(Events.ClientReady, async () => {
  console.log('Bot is ready!');
  await loadCommands(client);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (command) {
    await command.execute(interaction);
  } else {
    console.log(`Command ${interaction.commandName} not found`);
  }
});

client.login(config.token);

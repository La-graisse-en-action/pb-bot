import { Client, GatewayIntentBits } from 'discord.js';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';
import { LoadedCommand } from './types/SlashCommand.js';
import { loadEvents } from './utils/loadEvents.js';

export const filename = fileURLToPath(import.meta.url);
export const dirname = path.dirname(filename);

class CustomClient extends Client {
  commands: Map<string, LoadedCommand> = new Map();
}

const client = new CustomClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

loadEvents(client);
client.login(config.token);

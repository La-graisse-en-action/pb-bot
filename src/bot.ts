import { Client, Events, GatewayIntentBits, Interaction, REST, Routes, SlashCommandBuilder } from 'discord.js';
import config from './config.js';
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import chalk from 'chalk';
import { prismaClient } from './db/prisma.js';
import { loadCommands } from './utils/loadCommands.js';
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

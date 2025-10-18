import { Client } from 'discord.js';
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';
import { dirname } from '../bot.js';
import { CustomEvent } from '../types/CustomEvent.js';
import chalk from 'chalk';
import { LoadedCommand } from '../types/SlashCommand.js';

export const loadEvents = async (client: Client & { commands: Map<string, LoadedCommand> }) => {
  try {
    console.log(chalk.bgGreen(`Loading events: ${dirname}`));
    const eventsPath = path.join(dirname, 'events');

    const eventFiles = fs.readdirSync(eventsPath)
      .filter((f) => f.endsWith('.js') || f.endsWith('.ts'));
    console.log(chalk.blue('- Found event files:', eventFiles));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const fileUrl = pathToFileURL(filePath).href;
      const exported = await import(fileUrl);
      const event: CustomEvent = exported.default;

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, {}));
      } else {
        client.on(event.name, (...args) => event.execute(...args, {}));
      }
    }
  } catch (error) {
    console.error('Error loading events:', error);
    throw new Error();
  }
};

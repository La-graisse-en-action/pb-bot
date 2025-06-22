// src/utils/loadCommands.ts
import { Client } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { registerCommands } from './registerCommands.js';
import { LoadedCommand } from '../types/SlashCommand.js';
import { dirname } from '../bot.js';
import config from '../config.js';
import chalk from 'chalk';

export const loadCommands = async (
  client: Client & { commands: Map<string, LoadedCommand> }
): Promise<LoadedCommand[]> => {
  const commands: LoadedCommand[] = [];
  const commandsPath = path.join(dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const fileUrl = pathToFileURL(filePath).href;

    try {
      const exported = await import(fileUrl);
      const command: LoadedCommand = exported.default;

      if (command && typeof command.data?.name === 'string' && typeof command.execute === 'function') {
        client.commands.set(command.data.name, command);
        commands.push(command);
      } else {
        console.warn(`File ignored (not a valid command): ${file}`);
      }
    } catch (err) {
      console.error(`Error importando comando ${file}:`, err);
    }
  }

  if (commands.length === 0) {
    console.warn(chalk.yellow('- No commands found. Please check your command files.'));
    return [];
  }

  const commandNames = commands.map((cmd) => cmd.data.name).join(', ');
  console.log(chalk.green(`- Commands loaded: ${commandNames}`));

  await registerCommands(commands, config.clientId, config.token);

  return commands;
};

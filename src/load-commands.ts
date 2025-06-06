// src/commands.ts
import fs from 'fs';
import path from 'path';
import { Client } from 'discord.js';

export const loadCommands = async (client: Client) => {
  const commands: any[] = [];

  const commandsPath = path.join(new URL('.', import.meta.url).pathname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = await import(path.join(commandsPath, file));
    if (command.pingCommand) {
      client.commands.set(command.pingCommand.data.name, command.pingCommand);
      commands.push(command.pingCommand);
    }
  }
  return commands;
};

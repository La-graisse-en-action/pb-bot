import { Client } from 'discord.js';
import { SlashCommand } from './SlashCommand.js';

export class CustomClient extends Client {
  commands: Map<string, SlashCommand> = new Map();
}
export default CustomClient;

import { Client } from 'discord.js';
import { type SlashCommand } from './SlashCommand';

export class CustomClient extends Client {
  commands: Map<string, SlashCommand> = new Map();
}
export default CustomClient;

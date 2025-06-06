import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export type SlashCommand = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
};

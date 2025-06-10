import { CommandInteraction, Interaction, SlashCommandBuilder } from 'discord.js';

export interface SlashCommand {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}
// interface Command {
//   data: SlashCommandBuilder;
//   execute: (interaction: Interaction) => Promise<void>;
// }

export type LoadedCommand = Omit<SlashCommand, 'execute'> & {
  execute: (interaction: Interaction) => Promise<void>;
};

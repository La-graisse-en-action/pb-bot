import {
  CommandInteraction,
  EmbedBuilder,
  Interaction,
  InteractionReplyOptions,
  MessagePayload,
  SlashCommandBuilder,
} from 'discord.js';

export type SlashCommandOptions = {
  returnBeforeReply?: boolean;
};

export type SlashCommandExecute = (
  interaction: CommandInteraction,
  options?: SlashCommandOptions
) => Promise<MessagePayload | InteractionReplyOptions | undefined | void>;

export interface SlashCommand {
  data: SlashCommandBuilder;
  execute: SlashCommandExecute;
}
// interface Command {
//   data: SlashCommandBuilder;
//   execute: (interaction: Interaction) => Promise<void>;
// }

export type LoadedCommand = Omit<SlashCommand, 'execute'> & {
  execute: SlashCommandExecute;
};

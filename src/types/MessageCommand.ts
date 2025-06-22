import { CommandInteraction } from 'discord.js';
import { SlashCommand, SlashCommandExecute, SlashCommandOptions } from './SlashCommand.js';

export type MessageCommand = {
  name: string;
  description: string;
  localizations?: {
    [locale: string]: {
      name: string;
      description: string;
    };
  };
  stringOptionLocalizations?: {
    [locale: string]: {
      message: string;
    };
  };
  execute: SlashCommandExecute;
};

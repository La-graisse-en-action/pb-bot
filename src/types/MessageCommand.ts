import { type SlashCommandExecute } from './SlashCommand';

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

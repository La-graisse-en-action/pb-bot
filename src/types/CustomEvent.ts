import { Events, Client, Message } from 'discord.js';

export type CustomEvent = {
  name: string | Events;
  once?: boolean;
  execute: (...args: any[]) => Promise<void> | void;
};

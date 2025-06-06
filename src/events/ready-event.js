// @ts-check
import { Events, Client } from 'discord.js';

/**
 * @param {Client} client
 */
export const readyEvent = (client) => {
  client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client?.user?.tag}!`);
  });
};

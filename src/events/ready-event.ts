import { Events } from 'discord.js';

export const readyEvent = (client: any) => {
  client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
};

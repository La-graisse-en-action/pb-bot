import { Events } from 'discord.js';

export const interactionEvent = (client: any) => {
  client.on(Events.InteractionCreate, async (interaction: any) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (command) {
      await command.execute(interaction);
    }
  });
};

import chalk from 'chalk';
import { type CacheType, Events, type Interaction } from 'discord.js';
import CustomClient from '../types/CustomClient';
import { type CustomEvent } from '../types/CustomEvent';

const interactionCreate: CustomEvent = {
  name: Events.InteractionCreate,
  once: false,
  execute: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isChatInputCommand()) return;
    const client = interaction?.client as CustomClient;
    console.log(chalk.green(`- Interaction received: ${interaction.id} of type ${interaction.type}`));

    const command = client.commands.get(interaction.commandName);
    console.log(chalk.blue(`- Command found: ${interaction.commandName}`));
    console.log(chalk.yellow(`- Idioma del usuario: ${interaction.locale}`));

    if (command) {
      console.log(chalk.blue(`- Executing command: ${interaction.commandName}`));
      await command.execute(interaction);
    } else {
      console.error(`Command ${interaction.commandName} not found`);
    }
  },
};

export default interactionCreate;

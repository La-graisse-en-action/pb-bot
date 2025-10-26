// src/core/executeTextCommand.ts

import chalk from 'chalk';
import { ChatInputCommandInteraction, Message } from 'discord.js';
import { commands } from '../constants/commands';
import { loadCommandFromMessage } from './loadCommandFromMessage';

export async function executeTextCommand(message: Message) {
  const cmd = loadCommandFromMessage(message.content);
  if (cmd) {
    // Ejecuta la lógica de tu comando aquí
    // message.reply(`Comando detectado: ${cmd}`);
    const command = commands[cmd];
    if (command) {
      try {
        const commandReturn = await command.execute(
          {
            reply: message.reply,
            client: message.client,
            user: message.author,
            options: {
              get: (name: string) => {
                if (name === 'usuario') {
                  /**
                   * @example { id: '<@677887905812840449>' }
                   */
                  const id =
                    message.mentions.users.first()?.id || message.content.split(' ')[1]?.replace(/[<@!>]/g, '');
                  if (id) {
                    // return message.mentions.users.first() || {};
                    return { user: message.mentions.users.first() || {} };
                  }
                  return { user: message.author };
                }

                if (name === 'juegos') {
                  /**
                   * @example { value: 'Rocket League, Valorant, Minecraft' }
                   */
                  const value = message.content.split(' ').slice(1).join(' ') || '';
                  return {
                    value: value.length > 0 ? value : null,
                  };
                }

                if (name === 'mensaje') {
                  /**
                   * @example { value: 'Hola, ¿cómo estás?' }
                   */
                  const value = message.content.split(' ').slice(1).join(' ') || '';
                  return {
                    value: value.length > 0 ? value : null,
                  };
                }
              },
            },
            guild: message.guild,
          } as unknown as ChatInputCommandInteraction,
          {
            returnBeforeReply: true,
          }
        );

        message.reply(commandReturn as any);
      } catch (error) {
        console.error(chalk.red(`Error executing command ${cmd}:`, error));
        message.reply('Hubo un error al ejecutar el comando. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  } else {
    message.reply('Comando no reconocido. Usa `!pb-[comando]` válido.');
  }
}

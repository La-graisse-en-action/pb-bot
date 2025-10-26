import pbDrink from '../commands/pb-drink';
import pbGpt from '../commands/pb-gpt';
import { pbHelp } from '../commands/pb-help';
import pbIg from '../commands/pb-ig';
import pbPing from '../commands/pb-ping';
import pbPlay from '../commands/pb-play';
import pbUser from '../commands/pb-user';
import { type MessageCommand } from '../types/MessageCommand';

export const commands: {
  [key: string]: MessageCommand;
} = {
  'pb-user': {
    name: 'pb-user',
    description: 'Shows information about the selected user or the user who executed the command',
    localizations: {
      'en-US': {
        name: 'pb-user',
        description: 'Shows information about the selected user or the user who executed the command',
      },
      'es-ES': {
        name: 'pb-usuario',
        description: 'Muestra información del usuario seleccionado o del que ejecuta el comando',
      },
      'es-419': {
        name: 'pb-usuario',
        description: 'Muestra información del usuario seleccionado o del que ejecuta el comando',
      },
    },
    execute: pbUser.execute,
  },
  'pb-gpt': {
    name: 'pb-gpt',
    description: 'Interact with the AI model to get responses based on your input',
    localizations: {
      'en-US': {
        name: 'pb-gpt',
        description: 'Interact with the AI model to get responses based on your input',
      },
      'es-ES': {
        name: 'pb-gpt',
        description: 'Interactúa con el modelo de IA para obtener respuestas basadas en tu entrada',
      },
      'es-419': {
        name: 'pb-gpt',
        description: 'Interactúa con el modelo de IA para obtener respuestas basadas en tu entrada',
      },
    },
    stringOptionLocalizations: {
      'en-US': {
        message: 'Message to send to the AI',
      },
      'es-ES': {
        message: 'Mensaje para enviar a la IA',
      },
      'es-419': {
        message: 'Mensaje para enviar a la IA',
      },
    },
    execute: pbGpt.execute,
  },
  'pb-ping': {
    name: 'pb-ping',
    description: 'Replies with Pong! and various latency metrics',
    localizations: {
      'en-US': {
        name: 'pb-ping',
        description: 'Replies with Pong! and various latency metrics',
      },
      'es-ES': {
        name: 'pb-ping',
        description: 'Responde con Pong! y varias métricas de latencia',
      },
      'es-419': {
        name: 'pb-ping',
        description: 'Responde con Pong! y varias métricas de latencia',
      },
    },
    execute: pbPing.execute,
  },
  'pb-drink': {
    name: 'pb-drink',
    description: 'Post a drink message',
    localizations: {
      'en-US': {
        name: 'pb-drink',
        description: 'Post a drink message',
      },
      'es-ES': {
        name: 'pb-peda',
        description: 'Publica un mensaje de peda',
      },
      'es-419': {
        name: 'pb-peda',
        description: 'Publica un mensaje de peda',
      },
    },
    execute: pbDrink.execute,
  },
  'pb-play': {
    name: 'pb-play',
    description: 'Choose a random game from a pre-made or custom list',
    localizations: {
      'en-US': {
        name: 'pb-play',
        description: 'Choose a random game from a pre-made or custom list',
      },
      'es-419': {
        name: 'pb-jugar',
        description: 'Elige un juego al azar de una lista prehecha o personalizada',
      },
      'es-ES': {
        name: 'pb-jugar',
        description: 'Elige un juego al azar de una lista prehecha o personalizada',
      },
    },
    stringOptionLocalizations: {
      'en-US': {
        message: 'List of games separated by comma or space (optional)',
      },
      'es-ES': {
        message: 'Lista de juegos separados por coma o espacio (opcional)',
      },
      'es-419': {
        message: 'Lista de juegos separados por coma o espacio (opcional)',
      },
    },
    execute: pbPlay.execute,
  },
  'pb-help': {
    name: 'pb-help',
    description: 'Shows the bot help',
    localizations: {
      'en-US': {
        name: 'pb-help',
        description: 'Shows the bot help',
      },
      'es-ES': {
        name: 'pb-ayuda',
        description: 'Muestra la ayuda del bot',
      },
      'es-419': {
        name: 'pb-ayuda',
        description: 'Muestra la ayuda del bot',
      },
    },
    execute: pbHelp.execute,
  },
  'pb-ig': {
    name: 'pb-ig',
    description: 'Fetch the embed video from a Instagram Reel\n Ensure it is a video and not an image used as a Reel.',
    execute: pbIg.execute,
  },
};

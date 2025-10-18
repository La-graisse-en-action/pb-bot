import axios from 'axios';
import chalk from 'chalk';
import { Message } from 'discord.js';
import fs from 'fs';
import { ReelData } from './download-instagram-reel.js';

export async function sendReelEmbed(message: Message, data: ReelData) {
  try {
    if (!data || !data.picture) {
      console.error(chalk.red('No se encontró la información del reel'));
      return;
    }

    console.log(chalk.blue('Creando embed y archivo para el reel'));
    const response = await axios.get(data.picture, {
      responseType: 'arraybuffer', // necesario para archivos binarios
    });
    fs.writeFileSync('video.mp4', response.data);

    await message
      .reply({
        files: [
          {
            attachment: 'video.mp4',
            name: 'epic_video.mp4',
          },
        ],
      })
      .then(async (messageSent) => {
        console.log(chalk.blue('Eliminando Video guardado'));
        fs.unlinkSync('video.mp4'); // Eliminar el archivo después de enviarlo

        console.log(chalk.blue('Reaccionando al mensaje enviado'));
        const jewUserId = '549600306959351809';
        const chadUserId = '1036509633826791424';
        const userMessageSent = messageSent.client.user.id;
        if (userMessageSent === chadUserId) {
          await messageSent.react('🗿');
        } else if (userMessageSent === jewUserId) {
          await messageSent.react('✡️');
        }
      });

    // Enviar el embed Y el video como mensaje separado
    // await message.reply(data.picture);
  } catch (error) {
    console.error('Error sending reel embed:', error);
  }
}

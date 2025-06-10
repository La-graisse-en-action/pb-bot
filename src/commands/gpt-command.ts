import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import config from '../config.js';
import { InferenceClient } from '@huggingface/inference';
import { SlashCommand } from '../types/SlashCommand.js';

const inference = new InferenceClient(config.huggingFaceApiKey);

export const gptCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('pb-gpt')
    .setDescription('Genera una respuesta usando modelos AI')
    .addStringOption((opt) =>
      opt.setName('mensaje').setDescription('Escribe un mensaje para procesarlo a través de una AI').setRequired(true)
    ) as SlashCommandBuilder,

  execute: async (interaction) => {
    try {
      console.log('Ejecutando modelo HUGGING FACE...');
      const messageInput = interaction.options.get('mensaje')?.value?.toString() || '';
      if (messageInput.length > 1000 || messageInput.length < 1) {
        await interaction.reply({
          content: 'Por favor, proporciona un mensaje válido (entre 1 y 1000 caracteres).',
        });
        return;
      }
      const response = await inference.chatCompletion({
        model: 'meta-llama/Llama-3.1-8B-Instruct',
        provider: 'sambanova', // or together, fal-ai, replicate, cohere …
        messages: [
          {
            role: 'user',
            content: messageInput,
          },
        ],
        max_tokens: 512,
        temperature: 0.5,
      });
      let messageContent = response.choices[0].message.content || '';
      if (messageContent.length < 1) {
        await interaction.reply({
          content: 'La AI no ha generado una respuesta válida. Por favor, intenta con otro mensaje.',
        });
        return;
      } else if (messageContent.length >= 1024) {
        messageContent = messageContent.substring(0, 1019) + '...';
      }

      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Respuesta de AI')
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL({ extension: 'png', size: 128 }),
        })
        .setDescription(`${interaction.user.username} dijo:`)
        .addFields({ name: 'Mensaje', value: messageInput, inline: false })
        .addFields({ name: 'Respuesta', value: messageContent, inline: false })
        .setTimestamp()
        .setFooter({ text: 'Powered by Hugging Face' });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing gpt command:', error);
      await interaction.reply({
        content: 'Hubo un error al ejecutar el comando. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  },
};

export default gptCommand;

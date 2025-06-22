import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import config from '../config.js';
import { InferenceClient } from '@huggingface/inference';
import { SlashCommand } from '../types/SlashCommand.js';
import { postMessageByUserId } from '../api/postMessageByUserId.js';
import chalk from 'chalk';

const inference = new InferenceClient(config.huggingFaceApiKey);

export const pbGpt: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('pb-gpt')
    .setDescription('Genera una respuesta usando modelos AI')
    .addStringOption((opt) =>
      opt.setName('mensaje').setDescription('Escribe un mensaje para procesarlo a través de una AI').setRequired(true)
    ) as SlashCommandBuilder,

  execute: async (interaction, options) => {
    try {
      console.log('Ejecutando modelo HUGGING FACE...');
      const messageInput = interaction.options.get('mensaje')?.value?.toString() || '';
      const isInvalidInputMessage = messageInput.trim().length > 1000 || messageInput.trim().length < 1;
      if (isInvalidInputMessage) {
        if (options?.returnBeforeReply) {
          return {
            content: 'Por favor, proporciona un mensaje válido (entre 1 y 1000 caracteres).',
          };
        }
        await interaction.reply({
          content: 'Por favor, proporciona un mensaje válido (entre 1 y 1000 caracteres).',
        });
        return;
      }

      if (interaction.user.id && !isInvalidInputMessage) {
        await postMessageByUserId(interaction.user.id, messageInput);
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
        if (options?.returnBeforeReply) {
          return {
            content: 'La AI no ha generado una respuesta válida. Por favor, intenta con otro mensaje.',
          };
        }
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

      if (options?.returnBeforeReply) {
        return {
          embeds: [embed],
        };
      }

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing gpt command:', error);
      if (options?.returnBeforeReply) {
        return {
          content: 'Hubo un error al ejecutar el comando. Por favor, inténtalo de nuevo más tarde.',
        };
      }
      await interaction.reply({
        content: 'Hubo un error al ejecutar el comando. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  },
};

export default pbGpt;

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const OpenAI = require('openai');
const config = require('../config.js');
const { InferenceClient } = require('@huggingface/inference');

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: config.openaiApiKey,
});

const inference = new InferenceClient(config.huggingFaceApiKey);

const gptCommand = {
  data: new SlashCommandBuilder()
    .setName('pb-gpt')
    .setDescription('Genera una respuesta usando modelos AI')
    .addStringOption((opt) =>
      opt.setName('mensaje').setDescription('Escribe un mensaje para procesarlo a traves de una AI').setRequired(false)
    ),

  /**
   * @param {import('discord.js').CommandInteraction} interaction
   */
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
      // console.log({ response, choices: response.choices[0].message.content });
      let messageContent = response.choices[0].message.content;
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

module.exports = { gptCommand };

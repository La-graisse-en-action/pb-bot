const { SlashCommandBuilder } = require('discord.js')
const commandNames = require('../constants/command-names')
const OpenAI = require('openai')
const openai = new OpenAI({
  apiKey: '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',
})

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandNames.ai)
    .setDescription('Utiliza la AI para tener una respuesta inteligente del PB Bot')
    .addStringOption((option) => option.setName('mensaje').setDescription('Contenido del mensaje').setRequired(true)),

  async execute(interaction) {
    /** @type {string | undefined} url */
    const value = interaction.options.get('mensaje')?.value ?? ''
    const username = interaction.user.username ?? 'user'

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: value, user: username }],
        model: 'ada',
        max_tokens: 100,
      })

      const apiChoice = completion.data.choices[0]
      console.log({ apiChoice })

      await interaction.reply(apiChoice.message.content ?? apiChoice.text ?? 'No se pudo obtener una respuesta')
    } catch (error) {
      console.error(error)
      await interaction.reply('No se pudo obtener una respuesta')
    }
  },
}

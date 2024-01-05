const { SlashCommandBuilder } = require('discord.js')
const commandNames = require('../constants/command-names')

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandNames.user)
    .setDescription('Responde con informacion curiosa sobre el usuario'),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
    )
  },
}

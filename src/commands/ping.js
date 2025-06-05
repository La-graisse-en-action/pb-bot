const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('pb-ping').setDescription('Replies with Pong!'),
  async execute(interaction) {
    console.log(interaction);
    const username = interaction.member?.nickname ?? interaction.user.username;

    await interaction.reply(username ? `Pong, ${username}!` : 'Pong!');
  },
};

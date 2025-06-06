const { SlashCommandBuilder } = require('discord.js');

const userCommand = {
  data: new SlashCommandBuilder()
    .setName('pb-user')
    .setDescription('Muestra información del usuario que ejecuta el comando'),

  /**
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    const user = interaction.user;
    const embed = {
      title: 'Información del Usuario',
      description: `Aquí tienes la información del usuario que ejecutó el comando.`,
      fields: [
        { name: 'ID', value: user.id, inline: true },
        { name: 'Nombre de Usuario', value: user.username, inline: true },
        { name: 'Discriminador', value: user.discriminator, inline: true },
        { name: 'Avatar URL', value: user.displayAvatarURL() || 'No tiene avatar', inline: false },
      ],
      color: 0x00ff00,
      timestamp: new Date(),
    };

    await interaction.reply({ embeds: [embed] });
  },
};

module.exports = { userCommand };

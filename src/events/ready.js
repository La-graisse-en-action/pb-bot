const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    if (client) {
      console.info('Ready!');
      console.info(`Logged in as ${client.user.tag}`);
    } else {
      console.error('Client is undefined');
    }
  },
};

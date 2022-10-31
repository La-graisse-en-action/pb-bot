const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, client => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.login(token);

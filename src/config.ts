import dotenv from 'dotenv';
dotenv.config();

export const config = {
  token: process.env.TOKEN || '',
  clientId: process.env.CLIENT_ID || '',
  guildId: process.env.GUILD_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
};

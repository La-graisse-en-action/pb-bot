import dotenv from 'dotenv';
dotenv.config();

const config = {
  token: process.env.TOKEN || '',
  clientId: process.env.CLIENT_ID || '',
  guildId: process.env.GUILD_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  huggingFaceApiKey: process.env.HUGGING_FACE_API_KEY || '',
};

export default config;
export type Config = typeof config;
export type ConfigKeys = keyof Config;

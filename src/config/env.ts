import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 3000),

  databaseUrl: process.env.DATABASE_URL || '',

  openAiApiKey: process.env.OPENAI_API_KEY || ''
};
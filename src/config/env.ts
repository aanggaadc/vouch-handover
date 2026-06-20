import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 3000),

  databaseUrl: process.env.DATABASE_URL || '',

  geminiApiKey: process.env.GEMINI_API_KEY|| ''
};
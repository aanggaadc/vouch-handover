import { GoogleGenAI } from "@google/genai";
import { ParsedNightLogSchema } from "./night-log-schema";
import { NIGHT_LOG_PROMPT } from "../../prompts/night-log-extraction.prompt";
import { logger } from "../../utils/logger";
import { env } from "../../config/env";

export class NightLogParserService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: env.geminiApiKey,
    });
  }

  async parse(logContent: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `
${NIGHT_LOG_PROMPT}

Night Log:

${logContent}
`,
      });

      const text = response.text?.trim();

      if (!text) {
        throw new Error("Gemini returned empty response");
      }

      const parsed = ParsedNightLogSchema.parse(
        JSON.parse(text)
      );

      logger.info({
        event: "night_log_parsed",
        extractedCount: parsed.events.length,
      });

      return parsed.events;
    } catch (error) {
      logger.error({
        event: "night_log_parse_failed",
        error:
          error instanceof Error
            ? error.message
            : String(error),
      });

      throw error;
    }
  }
}

export const nightLogParserService =
  new NightLogParserService();
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import { logger } from "../utils/logger";
import { rawEventRepository } from "../repositories/raw-event.repository";
import { nightLogParserService } from "../services/ai/night-log-parser.service";

import "dotenv/config";

async function run() {
  try {
    logger.info({
      event: "night_log_import_started",
    });

    const filePath = path.resolve(process.cwd(), "data/night-logs.md");

    const content = await fs.readFile(filePath, "utf8");

    const parsedEvents = await nightLogParserService.parse(content);

    logger.info({
      event: "night_log_extracted",
      extractedCount: parsedEvents.length,
    });

    const rawEvents = parsedEvents.map((event) => ({
      id: randomUUID(),

      hotelId: "lumen-sg",

      sourceType: "night_log",

      eventType: event.eventType,

      room: event.room,

      guest: event.guest,

      description: event.description,

      status: event.status,

      eventTime: new Date("2026-05-28T07:00:00+08:00"),

      payload: event,
    }));

    await rawEventRepository.createMany(
      rawEvents
    );

    logger.info({
      event: "night_log_import_completed",
      importedEvents: rawEvents.length,
    });
  } catch (error) {
    logger.error({
      event: "night_log_import_failed",
      error: error instanceof Error ? error.message : String(error),
    });

    process.exit(1);
  }
}

run();

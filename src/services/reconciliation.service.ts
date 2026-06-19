import { prisma } from "../db/prisma";

import { rawEventRepository } from "../repositories/raw-event.repository";

import { issueRepository } from "../repositories/issue.repository";

import { getIssueCategory } from "./category.service";

import { issueEvidenceRepository } from "../repositories/issue-evidence.repository";
import { buildIssueKey } from "./issue-key.service";

export class ReconciliationService {
  async run() {
    await prisma.issueEvidence.deleteMany();

    await prisma.issue.deleteMany();

    const events = await rawEventRepository.findAll();

    for (const event of events) {
      const category = getIssueCategory(event.eventType || "");

      if (!category) {
        continue;
      }

      const key = buildIssueKey(event);

      const existing = await issueRepository.findByKey(key);

      if (!existing) {
        const issue = await issueRepository.create({
          hotelId: event.hotelId,

          key,

          category,

          room: event.room,

          guest: event.guest,

          status: event.status === "resolved" ? "RESOLVED" : "OPEN",

          summary: event.description,

          openedAt: event.eventTime,

          resolvedAt: event.status === "resolved" ? event.eventTime : null,
        });

        await issueEvidenceRepository.create(issue.id, event.id);

        continue;
      }

      await issueEvidenceRepository.create(existing.id, event.id);

      await issueRepository.update(existing.id, {
        summary: event.description,
      });

      if (event.status === "resolved") {
        await issueRepository.update(existing.id, {
          status: "RESOLVED",
          resolvedAt: event.eventTime,
        });
      }
    }
  }
}

export const reconciliationService = new ReconciliationService();

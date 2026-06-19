import { rawEventRepository } from "../repositories/raw-event.repository";

import { issueRepository } from "../repositories/issue.repository";

import { getIssueCategory } from "./category.service";

import { issueEvidenceRepository } from "../repositories/issue-evidence.repository";

export class ReconciliationService {
  async run() {
    const events = await rawEventRepository.findAll();

    for (const event of events) {
      const category = getIssueCategory(event.eventType || "");

      if (!category) {
        continue;
      }

      const existing = await issueRepository.findOpenIssue(
        event.hotelId,
        category,
        event.room,
      );

      if (!existing) {
        const issue = await issueRepository.create({
          hotelId: event.hotelId,

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

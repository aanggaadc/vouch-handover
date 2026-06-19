import { issueRepository } from "../repositories/issue.repository";

import { getPriority } from "./priority.service";
import { buildIssueTitle } from "./handover-summary.service";
import { buildWarnings } from "./warning.service";
import { isFYI } from "./handover-classifier.service";

export class HandoverService {
  async generate(hotelId: string) {
    const openIssues = await issueRepository.findOpenIssues(hotelId);

    const resolvedIssues = await issueRepository.findResolvedIssues(hotelId);

    const warnings = buildWarnings([...openIssues, ...resolvedIssues]);

    const fyiIssues = resolvedIssues.filter(isFYI);

    const newlyResolvedIssues = resolvedIssues.filter((issue) => !isFYI(issue));

    return {
      hotelId,

      generatedAt: new Date().toISOString(),

      actionRequired: openIssues.map((issue) => ({
        priority: getPriority(issue),

        title: buildIssueTitle(issue),

        room: issue.room,

        summary: issue.summary,

        sources: issue.evidences.map((e) => e.rawEventId),
      })),

      newlyResolved: newlyResolvedIssues.map((issue) => ({
        title: buildIssueTitle(issue),

        summary: issue.summary,

        sources: issue.evidences.map((e) => e.rawEventId),
      })),

      fyi: fyiIssues.map((issue) => ({
        title: buildIssueTitle(issue),

        summary: issue.summary,

        sources: issue.evidences.map((e) => e.rawEventId),
      })),

      warnings,
    };
  }
}

export const handoverService = new HandoverService();

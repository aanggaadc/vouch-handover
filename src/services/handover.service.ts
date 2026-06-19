import { issueRepository }
  from '../repositories/issue.repository';

import { getPriority }
  from './priority.service';

import { buildIssueTitle }
  from './handover-summary.service';

export class HandoverService {
  async generate(
    hotelId: string
  ) {
    const openIssues =
      await issueRepository.findOpenIssues();

    const resolvedIssues =
      await issueRepository.findResolvedIssues();

    return {
      hotelId,

      generatedAt:
        new Date().toISOString(),

      actionRequired:
        openIssues.map((issue) => ({
          priority:
            getPriority(issue),

          title:
            buildIssueTitle(issue),

          room:
            issue.room,

          summary:
            issue.summary,

          sources:
            issue.evidences.map(
              (e) => e.rawEventId
            )
        })),

      newlyResolved:
        resolvedIssues.map((issue) => ({
          title:
            buildIssueTitle(issue),

          summary:
            issue.summary,

          sources:
            issue.evidences.map(
              (e) => e.rawEventId
            )
        })),

      fyi: [],

      warnings: []
    };
  }
}

export const handoverService =
  new HandoverService();
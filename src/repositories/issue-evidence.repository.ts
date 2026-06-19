import { prisma } from '../db/prisma';

export class IssueEvidenceRepository {
  async create(
    issueId: string,
    rawEventId: string
  ) {
    return prisma.issueEvidence.create({
      data: {
        issueId,
        rawEventId
      }
    });
  }
}

export const issueEvidenceRepository =
  new IssueEvidenceRepository();
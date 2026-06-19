import { issueRepository }
  from '../repositories/issue.repository';

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
        openIssues.map(
          (issue) => ({
            id: issue.id,

            category:
              issue.category,

            room: issue.room,

            summary:
              issue.summary,

            sources:
              issue.evidences.map(
                (e) =>
                  e.rawEventId
              )
          })
        ),

      newlyResolved:
        resolvedIssues.map(
          (issue) => ({
            id: issue.id,

            category:
              issue.category,

            room: issue.room,

            summary:
              issue.summary,

            sources:
              issue.evidences.map(
                (e) =>
                  e.rawEventId
              )
          })
        ),

      warnings: []
    };
  }
}

export const handoverService =
  new HandoverService();
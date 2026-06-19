import { rawEventRepository }
  from '../repositories/raw-event.repository';

import { issueRepository }
  from '../repositories/issue.repository';

import { getIssueCategory }
  from './category.service';

export class ReconciliationService {
  async run() {
    const events =
      await rawEventRepository.findAll();

    for (const event of events) {
      const category =
        getIssueCategory(
          event.eventType || ''
        );

      if (!category) {
        continue;
      }

      const existing =
        await issueRepository.findOpenIssue(
          event.hotelId,
          category,
          event.room
        );

      if (!existing) {
        await issueRepository.create({
          hotelId: event.hotelId,

          category,

          room: event.room,

          guest: event.guest,

          status:
            event.status === 'resolved'
              ? 'RESOLVED'
              : 'OPEN',

          summary: event.description,

          openedAt: event.eventTime,

          resolvedAt:
            event.status === 'resolved'
              ? event.eventTime
              : null
        });

        continue;
      }

      if (event.status === 'resolved') {
        await issueRepository.update(
          existing.id,
          {
            status: 'RESOLVED',

            resolvedAt:
              event.eventTime
          }
        );
      }
    }
  }
}

export const reconciliationService =
  new ReconciliationService();
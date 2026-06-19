import { RawEvent } from '@prisma/client';

export function buildIssueKey(
  event: RawEvent
): string {
  switch (event.eventType) {
    case 'compliance':
      return 'immigration_backlog';

    case 'facilities':
      return 'corridor_leak_215';

    default:
      return `${event.eventType}_${event.room ?? 'na'}`;
  }
}
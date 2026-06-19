import { Issue } from '@prisma/client';

import { Priority } from '../types/priority';

export function getPriority(
  issue: Issue
): Priority {
  switch (issue.category) {
    case 'compliance':
      return Priority.HIGH;

    case 'maintenance':
      return Priority.HIGH;

    case 'deposit_issue':
      return Priority.HIGH;

    case 'damage_report':
      return Priority.HIGH;

    case 'facilities':
      return Priority.MEDIUM;

    case 'check_in_issue':
      return Priority.MEDIUM;

    case 'complaint':
      return Priority.LOW;

    default:
      return Priority.LOW;
  }
}
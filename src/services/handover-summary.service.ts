import { Issue } from '@prisma/client';

export function buildIssueTitle(
  issue: Issue
): string {
  switch (issue.category) {
    case 'maintenance':
      return `Room ${issue.room} maintenance issue`;

    case 'compliance':
      return `Compliance follow-up required`;

    case 'deposit_issue':
      return `Missing guest deposit`;

    case 'facilities':
      return `Facilities issue requires follow-up`;

    case 'damage_report':
      return `Damage charge requires review`;

    default:
      return issue.summary;
  }
}
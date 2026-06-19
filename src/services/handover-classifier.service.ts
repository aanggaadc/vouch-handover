import { Issue } from '@prisma/client';

export function isActionRequired(
  issue: Issue
) {
  return (
    issue.status === 'OPEN'
  );
}

export function isNewlyResolved(
  issue: Issue
) {
  return (
    issue.status === 'RESOLVED'
  );
}

export function isFYI(
  issue: Issue
) {
  return (
    issue.category === 'finance_note'
  );
}

export function isWarning(
  issue: Issue
) {
  return (
    issue.category === 'damage_report'
  );
}
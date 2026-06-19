import { Issue } from '@prisma/client';
import { Priority }
  from '../types/priority';

export function getPriority(
  issue: Issue
): Priority {
  if (
    issue.category ===
    'compliance'
  ) {
    return Priority.HIGH;
  }

  if (
    issue.category ===
    'maintenance'
  ) {
    return Priority.HIGH;
  }

  if (
    issue.category ===
    'deposit_issue'
  ) {
    return Priority.HIGH;
  }

  if (
    issue.category ===
    'damage_report'
  ) {
    return Priority.HIGH;
  }

  return Priority.MEDIUM;
}
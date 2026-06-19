export function getIssueCategory(
  eventType: string
): string | null {
  const tracked = [
    'maintenance',
    'deposit_issue',
    'compliance',
    'facilities',
    'damage_report',
    'check_in_issue',
    'finance_note',
    'complaint'
  ];

  if (!tracked.includes(eventType)) {
    return null;
  }

  return eventType;
}
export function getIssueCategory(eventType: string): string | null {
  const tracked = [
    "maintenance",
    "deposit_issue",
    "compliance",
    "facilities",
    "damage_report",
    "check_in_issue",
    "finance_note",
    "complaint",

    "safe_issue",
    "occupancy_discrepancy",
    "wifi_issue",
    "no_show",
  ];

  if (!tracked.includes(eventType)) {
    return null;
  }

  return eventType;
}

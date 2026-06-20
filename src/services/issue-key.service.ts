import { RawEvent } from "@prisma/client";

export function buildIssueKey(event: RawEvent): string {
  switch (event.eventType) {
    case "compliance":
      return "immigration_backlog";

    case "facilities":
      return "corridor_leak_215";

    case "safe_issue":
      return `safe_issue_${event.room}`;

    case "occupancy_discrepancy":
      return `occupancy_discrepancy_${event.room}`;

    case "wifi_issue":
      return `wifi_issue_${event.room ?? "unknown"}`;

    case "no_show":
      return `no_show_${event.room}`;

    default:
      return `${event.eventType}_${event.room ?? "na"}`;
  }
}

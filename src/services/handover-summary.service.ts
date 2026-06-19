import { Issue } from "@prisma/client";

export function buildIssueTitle(
  issue: Issue,
): string {
  switch (issue.category) {
    case "maintenance":
      return `Room ${issue.room} remains OUT OF ORDER`;

    case "compliance":
      return "Immigration reporting backlog requires action";

    case "deposit_issue":
      return `Missing deposit issue for room ${issue.room}`;

    case "check_in_issue":
      return `Booking identity requires OTA verification`;

    case "damage_report":
      return `Damage charge requires manager review`;

    case "facilities":
      return `Facilities issue requires follow-up`;

    case "finance_note":
      return `Finance note for room ${issue.room}`;

    default:
      return issue.summary;
  }
}
import { Issue } from "@prisma/client";

export interface HandoverWarning {
  severity: "HIGH" | "MEDIUM";
  title: string;
  summary: string;
  issueId: string;
}

export function buildWarnings(
  issues: Issue[],
): HandoverWarning[] {
  const warnings: HandoverWarning[] = [];

  for (const issue of issues) {
    const summary =
      issue.summary.toLowerCase();

    if (
      issue.category ===
        "damage_report" &&
      (
        summary.includes("no photos") ||
        summary.includes(
          "no manager approval",
        )
      )
    ) {
      warnings.push({
        severity: "HIGH",
        issueId: issue.id,

        title:
          "Damage charge lacks supporting evidence",

        summary:
          issue.summary,
      });
    }

    if (
      issue.category ===
        "compliance" &&
      summary.includes("deadline")
    ) {
      warnings.push({
        severity: "HIGH",
        issueId: issue.id,

        title:
          "Immigration reporting deadline risk",

        summary:
          issue.summary,
      });
    }
  }

  return warnings;
}
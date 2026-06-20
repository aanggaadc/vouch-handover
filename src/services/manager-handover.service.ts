import { HandoverResponse, HandoverItem } from "../types";

export class ManagerHandoverService {
  format(handover: HandoverResponse): string {
    const lines: string[] = [];

    lines.push("MORNING HANDOVER");
    lines.push(`Hotel: ${handover.hotelId}`);
    lines.push(`Generated: ${handover.generatedAt}`);
    lines.push("");

    this.renderActionRequired(lines, handover.actionRequired);

    lines.push(
      `⚠ WARNINGS (${handover.warnings.length})`
    );
    lines.push("");

    handover.warnings.forEach((warning, index) => {
      lines.push(`${index + 1}. ${warning.title}`);

      if (
        warning.title.trim().toLowerCase() !==
        warning.summary.trim().toLowerCase()
      ) {
        lines.push(`   ${warning.summary}`);
      }

      lines.push("");
    });

    lines.push(
      `✅ RESOLVED OVERNIGHT (${handover.newlyResolved.length})`
    );
    lines.push("");

    handover.newlyResolved.forEach((item) => {
      lines.push(`• ${item.title}`);
    });

    lines.push("");

    lines.push(`ℹ FYI (${handover.fyi.length})`);
    lines.push("");

    handover.fyi.forEach((item) => {
      lines.push(`• ${item.title}`);
    });

    return lines.join("\n");
  }

  private renderActionRequired(
    lines: string[],
    items: HandoverItem[]
  ): void {
    const highPriority = items.filter(
      (item) => item.priority === "HIGH"
    );

    const mediumPriority = items.filter(
      (item) => item.priority === "MEDIUM"
    );

    const lowPriority = items.filter(
      (item) => item.priority === "LOW"
    );

    let counter = 1;

    if (highPriority.length > 0) {
      lines.push(
        `🔥 HIGH PRIORITY (${highPriority.length})`
      );
      lines.push("");

      highPriority.forEach((item) => {
        this.renderActionItem(
          lines,
          item,
          counter++
        );
      });
    }

    if (mediumPriority.length > 0) {
      lines.push(
        `🟡 MEDIUM PRIORITY (${mediumPriority.length})`
      );
      lines.push("");

      mediumPriority.forEach((item) => {
        this.renderActionItem(
          lines,
          item,
          counter++
        );
      });
    }

    if (lowPriority.length > 0) {
      lines.push(
        `🟢 LOW PRIORITY (${lowPriority.length})`
      );
      lines.push("");

      lowPriority.forEach((item) => {
        this.renderActionItem(
          lines,
          item,
          counter++
        );
      });
    }
  }

  private renderActionItem(
    lines: string[],
    item: HandoverItem,
    index: number
  ): void {
    lines.push(`${index}. ${item.title}`);

    const title =
      item.title.trim().toLowerCase();

    const summary =
      item.summary.trim().toLowerCase();

    if (title !== summary) {
      lines.push(`   ${item.summary}`);
    }

    lines.push("");
  }
}
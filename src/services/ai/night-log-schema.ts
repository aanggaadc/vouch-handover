import { z } from "zod";

export const ParsedNightLogSchema = z.object({
  events: z.array(
    z.object({
      eventType: z.enum([
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
      ]),

      room: z.string().nullable(),

      guest: z.string().nullable(),

      description: z.string(),

      status: z.enum([
        "resolved",
        "unresolved",
        "pending",
      ]),
      incomplete: z.boolean().optional()
    })
  ),
});

export type ParsedNightLog =
  z.infer<typeof ParsedNightLogSchema>;
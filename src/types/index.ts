export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface ParsedNightLogEvent {
  eventType: string;
  room: string | null;
  guest: string | null;
  description: string;
  status: "resolved" | "unresolved" | "pending";
}

export interface HandoverItem {
  priority?: "HIGH" | "MEDIUM" | "LOW";
  title: string;
  room?: string | null;
  summary: string;
  sources: string[];
}

export interface WarningItem {
  severity: "HIGH" | "MEDIUM" | "LOW";
  issueId: string;
  title: string;
  summary: string;
}

export interface HandoverResponse {
  hotelId: string;
  generatedAt: string;

  actionRequired: HandoverItem[];

  newlyResolved: {
    title: string;
    summary: string;
    sources: string[];
  }[];

  fyi: {
    title: string;
    summary: string;
    sources: string[];
  }[];

  warnings: WarningItem[];
}
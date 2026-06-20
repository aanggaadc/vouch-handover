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
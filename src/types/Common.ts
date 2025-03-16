export type DatabaseStatus = "success" | "error" | "loading";

export interface Report {
  id: string;
  startTime: string;
  endTime: string;
  content: string;
  category?: string;
  categoryColorCode?: string;
}
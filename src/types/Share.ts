import { Todo } from "./Common";

export type ShareFormat = "daily" | "weekly" | "custom";

export interface ShareOptions {
  format: ShareFormat;
  selectedDate: string;
}

export interface ShareAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  action: () => void;
}

export interface ReportData {
  completedTodos: Todo[];
  incompleteTodos: Todo[];
  todayTodos: Todo[];
  todayCompleted: Todo[];
  selectedDate: string;
}

export interface GeneratedReport {
  text: string;
  stats: {
    totalCompleted: number;
    totalTodos: number;
    completionRate: number;
  };
}

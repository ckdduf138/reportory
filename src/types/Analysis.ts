export interface AnalysisData {
  totalTodos: number;
  completedTodos: number;
  todayTodos: number;
  todayCompleted: number;
  completionRate: number;
  productivityScore: number;
  categoryStats: { [key: string]: number };
  dailyTrends: DailyTrend[];
  priorityStats: PriorityStats;
  overdueCount: number;
  averageCompletionDays: number;
}

export interface DailyTrend {
  date: string;
  todos: number;
  completed: number;
}

export interface PriorityStats {
  high: number;
  medium: number;
  low: number;
}

export type AnalysisPeriod = "week" | "month" | "quarter";
export type AnalysisMetric = "completion" | "productivity" | "priority";

export interface StatCardProps {
  icon: any;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}

export interface ImprovementSuggestion {
  id: string;
  title: string;
  description: string;
  type: "warning" | "error" | "success" | "info";
  condition: boolean;
}

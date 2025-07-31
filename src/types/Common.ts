export interface Todo {
  id: string;
  title: string;
  description?: string;
  category?: Category;
  estimatedTime?: string; // 예상 소요시간 (분 단위)
  isCompleted: boolean;
  priority: "high" | "medium" | "low";
  createdAt: string;
  completedAt?: string;
  dueDate: string; // 할일 예정 날짜 (YYYY-MM-DD 형식)
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export type ViewMode = "todo";

export const DefaultCategoryColor = "#7986CB";

export const PriorityColors = {
  high: "#EF4444", // 빨강
  medium: "#F59E0B", // 노랑
  low: "#10B981", // 초록
};

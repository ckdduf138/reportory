export interface Report {
  id: string;
  startTime: string;
  endTime: string;
  content: string;
  category?: Category;
  linkedTodoId?: string; // 연결된 할일 ID
  isFromTodo?: boolean; // 할일에서 생성된 기록인지
}

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
  linkedReportId?: string; // 연결된 리포트 ID
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export type ViewMode = "todo" | "log";

export const DefaultCategoryColor = "#7986CB";

export const PriorityColors = {
  high: "#EF4444", // 빨강
  medium: "#F59E0B", // 노랑
  low: "#10B981", // 초록
};

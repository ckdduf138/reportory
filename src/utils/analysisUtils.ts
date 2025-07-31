import { Todo } from "../types/Common";
import { AnalysisData, DailyTrend, PriorityStats } from "../types/Analysis";

export const calculateAnalysisData = (todos: Todo[]): AnalysisData => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayStr = today.toISOString().split("T")[0];

  // 전체 할일 통계
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.isCompleted).length;

  // 오늘 할일 통계
  const todayTodos = todos.filter((todo) => todo.dueDate === todayStr);
  const todayCompleted = todayTodos.filter((todo) => todo.isCompleted).length;

  // 완료율 계산
  const completionRate =
    totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  // 연체된 할일 계산
  const overdueCount = todos.filter(
    (todo) => !todo.isCompleted && todo.dueDate < todayStr
  ).length;

  // 평균 완료 소요일 계산
  const averageCompletionDays = calculateAverageCompletionDays(todos);

  // 생산성 점수 계산
  const productivityScore = calculateProductivityScore(
    completionRate,
    overdueCount,
    totalTodos,
    todayCompleted,
    todayTodos.length
  );

  // 카테고리별 통계
  const categoryStats = calculateCategoryStats(todos);

  // 일별 트렌드 (최근 7일)
  const dailyTrends = calculateDailyTrends(todos, today);

  // 우선순위별 통계
  const priorityStats = calculatePriorityStats(todos);

  return {
    totalTodos,
    completedTodos,
    todayTodos: todayTodos.length,
    todayCompleted,
    completionRate,
    productivityScore,
    categoryStats,
    dailyTrends,
    priorityStats,
    overdueCount,
    averageCompletionDays,
  };
};

const calculateAverageCompletionDays = (todos: Todo[]): number => {
  const completedWithDates = todos.filter(
    (todo) => todo.isCompleted && todo.completedAt && todo.createdAt
  );

  if (completedWithDates.length === 0) return 0;

  return Math.round(
    completedWithDates.reduce((sum, todo) => {
      const created = new Date(todo.createdAt);
      const completed = new Date(todo.completedAt!);
      return (
        sum +
        Math.ceil(
          (completed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
        )
      );
    }, 0) / completedWithDates.length
  );
};

const calculateProductivityScore = (
  completionRate: number,
  overdueCount: number,
  totalTodos: number,
  todayCompleted: number,
  todayTodosCount: number
): number => {
  const overdueRate = totalTodos > 0 ? (overdueCount / totalTodos) * 100 : 0;
  const todayCompletionRate =
    todayTodosCount > 0 ? (todayCompleted / todayTodosCount) * 100 : 100;

  return Math.min(
    Math.round(
      completionRate * 0.5 +
        (100 - overdueRate) * 0.3 +
        todayCompletionRate * 0.2
    ),
    100
  );
};

const calculateCategoryStats = (todos: Todo[]): { [key: string]: number } => {
  return todos.reduce((acc, todo) => {
    const categoryName = todo.category?.name || "기타";
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
};

const calculateDailyTrends = (todos: Todo[], today: Date): DailyTrend[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split("T")[0];

    const dayTodos = todos.filter((todo) => todo.dueDate === dateStr);
    const dayCompleted = dayTodos.filter((todo) => todo.isCompleted);

    return {
      date: date.toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
      }),
      todos: dayTodos.length,
      completed: dayCompleted.length,
    };
  }).reverse();
};

const calculatePriorityStats = (todos: Todo[]): PriorityStats => {
  return todos.reduce(
    (acc, todo) => {
      acc[todo.priority || "medium"]++;
      return acc;
    },
    { high: 0, medium: 0, low: 0 }
  );
};

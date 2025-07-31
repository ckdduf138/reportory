import { Todo } from "../types/Common";
import { ReportData, GeneratedReport } from "../types/Share";

export const generateReportData = (
  todos: Todo[],
  selectedDate: string
): ReportData => {
  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const incompleteTodos = todos.filter((todo) => !todo.isCompleted);
  const todayTodos = todos.filter((todo) => todo.dueDate === selectedDate);
  const todayCompleted = todayTodos.filter((todo) => todo.isCompleted);

  return {
    completedTodos,
    incompleteTodos,
    todayTodos,
    todayCompleted,
    selectedDate,
  };
};

export const generateShareText = (reportData: ReportData): GeneratedReport => {
  const {
    completedTodos,
    incompleteTodos,
    todayTodos,
    todayCompleted,
    selectedDate,
  } = reportData;

  const today = new Date(selectedDate);
  const formattedDate = `${today.getFullYear()}.${String(
    today.getMonth() + 1
  ).padStart(2, "0")}.${String(today.getDate()).padStart(
    2,
    "0"
  )}(${today.toLocaleDateString("ko-KR", { weekday: "short" })})`;

  let shareText = `📅 ${formattedDate}\n\n`;

  // 완료된 할일 추가
  if (completedTodos.length > 0) {
    shareText += "✅ 완료한 할일:\n";
    completedTodos.forEach((todo) => {
      shareText += `• ${todo.title}\n`;
    });
    shareText += "\n";
  }

  // 미완료 할일 추가
  if (incompleteTodos.length > 0) {
    shareText += "📋 진행 중인 할일:\n";
    incompleteTodos.forEach((todo) => {
      shareText += `• ${todo.title}\n`;
    });
    shareText += "\n";
  }

  // 오늘 할일 통계
  shareText += `📊 오늘의 성과:\n`;
  shareText += `완료: ${todayCompleted.length}개 / 전체: ${todayTodos.length}개\n`;

  const completionRate =
    todayTodos.length > 0
      ? Math.round((todayCompleted.length / todayTodos.length) * 100)
      : 0;

  if (todayTodos.length > 0) {
    shareText += `완료율: ${completionRate}%\n`;
  }

  return {
    text: shareText,
    stats: {
      totalCompleted: todayCompleted.length,
      totalTodos: todayTodos.length,
      completionRate,
    },
  };
};

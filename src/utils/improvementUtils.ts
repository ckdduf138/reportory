import { AnalysisData } from "../types/Analysis";
import { ImprovementSuggestion } from "../types/Analysis";

export const generateImprovementSuggestions = (
  analysisData: AnalysisData
): ImprovementSuggestion[] => {
  const suggestions: ImprovementSuggestion[] = [
    {
      id: "completion-rate",
      title: "📋 할일 완료율 개선",
      description: `현재 완료율이 ${analysisData.completionRate}%입니다. 할일을 더 작은 단위로 나누어 보세요.`,
      type: "warning",
      condition: analysisData.completionRate < 70,
    },
    {
      id: "overdue-management",
      title: "⏰ 연체 할일 관리",
      description: `연체된 할일이 ${analysisData.overdueCount}개 있습니다. 우선순위를 재조정해 보세요.`,
      type: "error",
      condition: analysisData.overdueCount > 0,
    },
    {
      id: "productivity-improvement",
      title: "🚀 생산성 향상",
      description: `생산성 점수가 ${analysisData.productivityScore}점입니다. 마감일 관리와 할일 완료에 더 집중해 보세요.`,
      type: "warning",
      condition: analysisData.productivityScore < 50,
    },
    {
      id: "completion-speed",
      title: "📈 완료 속도 개선",
      description: `평균 완료 소요일이 ${analysisData.averageCompletionDays}일입니다. 할일을 더 작게 나누어 빠른 완료를 목표로 해보세요.`,
      type: "info",
      condition: analysisData.averageCompletionDays > 7,
    },
    {
      id: "excellent-management",
      title: "🎉 훌륭한 관리!",
      description:
        "완료율이 높고 연체된 할일이 없습니다. 이 패턴을 계속 유지하세요!",
      type: "success",
      condition:
        analysisData.completionRate >= 80 && analysisData.overdueCount === 0,
    },
  ];

  return suggestions.filter((suggestion) => suggestion.condition);
};

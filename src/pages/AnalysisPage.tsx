import React, { useEffect, useState } from "react";
import { Target, Activity, Award, Clock } from "lucide-react";

import { AppHeader, SidebarMenu } from "../components/common";
import {
  StatCard,
  AnalysisFilters,
  DailyTrendsChart,
  CategoryDistribution,
  PriorityAnalysis,
  ImprovementSuggestions,
} from "../components/analysis";
import { useIsMobile } from "../hooks/useBreakpoint";
import { useTodo } from "../hooks/todo/useTodo";
import { useAnalysisData } from "../hooks/useAnalysisData";
import { generateImprovementSuggestions } from "../utils/improvementUtils";
import { AnalysisPeriod, AnalysisMetric } from "../types/Analysis";

const AnalysisPage: React.FC = () => {
  const isMobile = useIsMobile();
  const { todos, fetchTodos } = useTodo();
  const analysisData = useAnalysisData(todos);

  const [selectedPeriod, setSelectedPeriod] = useState<AnalysisPeriod>("week");
  const [selectedMetric, setSelectedMetric] =
    useState<AnalysisMetric>("completion");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const improvementSuggestions = generateImprovementSuggestions(analysisData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <div className="container mx-auto max-w-6xl">
        <AppHeader
          title="분석"
          subtitle="상세한 통계와 분석으로 생산성을 향상시키세요"
        />

        <div className={`${isMobile ? "px-4" : "px-6"} pb-24 space-y-6`}>
          {/* 필터 옵션 */}
          <AnalysisFilters
            selectedPeriod={selectedPeriod}
            selectedMetric={selectedMetric}
            onPeriodChange={setSelectedPeriod}
            onMetricChange={setSelectedMetric}
          />

          {/* 주요 지표 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Target}
              title="오늘 할일"
              value={`${analysisData.todayCompleted}/${analysisData.todayTodos}`}
              subtitle="완료/전체"
            />

            <StatCard
              icon={Activity}
              title="전체 완료율"
              value={`${analysisData.completionRate}%`}
              subtitle={`${analysisData.completedTodos}/${analysisData.totalTodos} 완료`}
              color="green"
            />

            <StatCard
              icon={Award}
              title="생산성 점수"
              value={analysisData.productivityScore}
              subtitle="100점 만점"
              color="purple"
            />

            <StatCard
              icon={Clock}
              title="연체된 할일"
              value={analysisData.overdueCount}
              subtitle={analysisData.overdueCount > 0 ? "주의 필요" : "완벽!"}
              color={analysisData.overdueCount > 0 ? "red" : "green"}
            />
          </div>

          {/* 일별 트렌드 차트 */}
          <DailyTrendsChart dailyTrends={analysisData.dailyTrends} />

          {/* 카테고리별 분석 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryDistribution categoryStats={analysisData.categoryStats} />
            <PriorityAnalysis priorityStats={analysisData.priorityStats} />
          </div>

          {/* 개선 제안 */}
          <ImprovementSuggestions suggestions={improvementSuggestions} />
        </div>

        <SidebarMenu />
      </div>
    </div>
  );
};

export default AnalysisPage;

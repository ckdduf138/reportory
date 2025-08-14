import React, { useEffect } from "react";

import { StatsView } from "../components/common";
import { SidebarMenu, AppHeader, SEOHead } from "../components/common";
import { useTodo } from "../hooks/todo/useTodo";
import { useIsMobile } from "../hooks/useBreakpoint";

const StatsPage: React.FC = () => {
  const isMobile = useIsMobile();

  const { todos, fetchTodos } = useTodo();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <SEOHead 
        title="통계 및 분석 | Reportory"
        description="할일 완료율, 카테고리별 진행 상황, 생산성 추이를 한눈에 확인하세요. 데이터 기반으로 더 나은 업무 습관을 만들어보세요."
        keywords="할일 통계, 생산성 분석, 완료율, 진행률, 업무 성과, 데이터 분석"
        canonical="https://reportory.com/stats"
      />
      
      <div className="container mx-auto max-w-6xl">
        <AppHeader
          title="통계"
          subtitle="할일과 기록에 대한 통계를 확인하세요"
        />

        <div className={`${isMobile ? "px-4" : "px-6"} pb-24`}>
          <StatsView todos={todos} />
        </div>

        <SidebarMenu />
      </div>
    </div>
  );
};

export default StatsPage;

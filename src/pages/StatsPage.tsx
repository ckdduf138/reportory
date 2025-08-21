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
        title="할일 통계 분석 | 생산성 측정 도구 - Reportory"
        description="📊 내 할일 완료율은 얼마나 될까? 생산성 통계와 진행률 분석으로 업무 효율을 높이세요! 카테고리별 성과, 일별 트렌드까지 한눈에 확인하는 분석 도구."
        keywords="할일 통계, 생산성 분석, 완료율 확인, 업무 성과, 진행률 측정, 할일 진척도, 업무 분석, 생산성 측정, task analytics, 개인 생산성, 업무 효율성"
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

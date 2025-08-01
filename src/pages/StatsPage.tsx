import React, { useEffect } from "react";

import { StatsView } from "../components/common";
import { SidebarMenu, AppHeader } from "../components/common";
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

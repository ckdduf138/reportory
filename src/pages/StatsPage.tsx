import React, { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";

import StatsView from "../components/StatsView";
import SidebarMenu from "../components/SidebarMenu";
import { Report, Todo } from "../types/Common";
import { getReport } from "../utils/stores/reportUtils";
import { getTodos } from "../utils/stores/todoUtils";
import { useIsMobile } from "../hooks/useBreakpoint";

const StatsPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [reports, setReports] = useState<Report[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [reportsData, todosData] = await Promise.all([
      getReport(),
      getTodos(),
    ]);
    setReports(reportsData);
    setTodos(todosData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <div className="container mx-auto max-w-7xl">
        {/* 헤더 */}
        <div className={`text-center ${isMobile ? "px-4 py-6" : "px-8 py-10"}`}>
          <div className={`flex items-center justify-center gap-3 mb-4`}>
            <div
              className={`bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl 
              ${isMobile ? "p-2.5" : "p-4"} shadow-lg`}
            >
              <BarChart3
                className={`${isMobile ? "w-5 h-5" : "w-8 h-8"} text-white`}
              />
            </div>
            <div>
              <h1
                className={`${
                  isMobile ? "text-xl" : "text-4xl"
                } font-bold text-gray-900`}
              >
                분석 리포트
              </h1>
              <div
                className={`${
                  isMobile ? "w-16 h-0.5" : "w-20 h-1"
                } bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mx-auto mt-1`}
              ></div>
            </div>
          </div>

          <p
            className={`text-gray-600 ${isMobile ? "text-sm px-2" : "text-lg"} 
            max-w-lg mx-auto leading-relaxed`}
          >
            할일과 기록에 대한 통계와 분석을 확인하세요
          </p>
        </div>{" "}
        {/* 메인 콘텐츠 */}
        <div className={`${isMobile ? "px-3 pb-8" : "px-4 pb-12"}`}>
          <StatsView todos={todos} reports={reports} />
        </div>
        <SidebarMenu />
      </div>
    </div>
  );
};

export default StatsPage;

import React, { memo } from "react";
import { CheckSquare, Clock } from "lucide-react";
import { ViewMode } from "../../types/Common";
import { useIsMobile } from "../../hooks/useBreakpoint";

interface TabNavigationProps {
  activeTab: ViewMode;
  onTabChange: (tab: ViewMode) => void;
  todoCount: number;
  reportCount: number;
}

const TabNavigation: React.FC<TabNavigationProps> = memo(
  ({ activeTab, onTabChange, todoCount, reportCount }) => {
    const isMobile = useIsMobile();

    const tabs = [
      {
        id: "todo" as ViewMode,
        label: "할일",
        icon: CheckSquare,
        count: todoCount,
        description: "오늘 계획",
        color: "text-teal-600",
      },
      {
        id: "log" as ViewMode,
        label: "기록",
        icon: Clock,
        count: reportCount,
        description: "시간 로그",
        color: "text-gray-700",
      },
    ];

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex relative">
          {/* 활성 탭 배경 슬라이더 */}
          <div
            className="absolute top-0 bottom-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg m-1 transition-all duration-300 ease-out shadow-md"
            style={{
              width: `calc(${100 / tabs.length}% - 0.5rem)`,
              left: `calc(${
                tabs.findIndex((tab) => tab.id === activeTab) *
                (100 / tabs.length)
              }% + 0.25rem)`,
            }}
          />

          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 relative z-10 transition-all duration-300 ease-out
                ${isMobile ? "py-3 px-2" : "p-4"}
                ${
                  isActive
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }
                active:scale-95
              `}
              >
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`flex items-center ${
                      isMobile ? "gap-1" : "gap-2"
                    }`}
                  >
                    <IconComponent
                      size={isMobile ? 16 : 20}
                      className={`transition-colors duration-300 ${
                        isActive ? "text-white" : tab.color
                      }`}
                    />
                    <span
                      className={`font-medium transition-colors duration-300 ${
                        isMobile ? "text-xs" : "text-base"
                      }`}
                    >
                      {tab.label}
                    </span>
                    {tab.count > 0 && (
                      <span
                        className={`${
                          isMobile
                            ? "px-1.5 py-0.5 text-xs"
                            : "px-2 py-0.5 text-xs"
                        } 
                        rounded-full font-bold transition-all duration-300 min-w-[18px] text-center
                      ${
                        isActive
                          ? "bg-white/20 text-white border border-white/30"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }
                    `}
                      >
                        {tab.count}
                      </span>
                    )}
                  </div>
                  {!isMobile && (
                    <span
                      className={`text-xs transition-colors duration-300 ${
                        isActive ? "text-teal-100" : "text-gray-400"
                      }`}
                    >
                      {tab.description}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

TabNavigation.displayName = "TabNavigation";

export default TabNavigation;

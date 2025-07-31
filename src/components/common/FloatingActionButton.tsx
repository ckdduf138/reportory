import React from "react";
import { Plus } from "lucide-react";
import { useIsMobile } from "../../hooks/useBreakpoint";
import { ViewMode } from "../../types/Common";

interface FloatingActionButtonProps {
  activeTab: ViewMode;
  onTodoAdd: () => void;
  onReportAdd: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  activeTab,
  onTodoAdd,
  onReportAdd,
}) => {
  const isMobile = useIsMobile();

  const handleClick = () => {
    if (activeTab === "todo") {
      onTodoAdd();
    } else {
      onReportAdd();
    }
  };

  const getTitle = () => {
    return activeTab === "todo" ? "할일 추가" : "기록 추가";
  };

  return (
    <div
      className={`fixed ${
        isMobile ? "bottom-4 right-4" : "bottom-8 right-8"
      } z-40`}
    >
      <div
        className={`flex ${
          isMobile ? "flex-col-reverse gap-3" : "flex-row gap-4 items-center"
        }`}
      >
        <button
          className={`flex items-center justify-center ${
            isMobile ? "w-14 h-14" : "w-16 h-16"
          } 
            bg-gradient-to-br from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 
            rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl
            border-2 border-white/20 group`}
          onClick={handleClick}
          title={getTitle()}
        >
          <Plus
            className={`${
              isMobile ? "w-6 h-6" : "w-7 h-7"
            } text-white group-hover:rotate-180 transition-transform duration-300`}
          />
        </button>
      </div>
    </div>
  );
};

export default FloatingActionButton;

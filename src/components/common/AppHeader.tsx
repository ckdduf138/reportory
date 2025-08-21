import React from "react";
import { Calendar } from "lucide-react";
import { useIsMobile } from "../../hooks/useBreakpoint";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title = "Reportory",
  subtitle = "할일 계획부터 시간 기록까지, 완벽한 하루 관리",
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`text-center ${isMobile ? "px-4 py-6" : "px-8 py-10"}`}>
      <div className={`flex items-center justify-center gap-3 mb-4`}>
        <div
          className={`bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl 
          ${isMobile ? "p-2.5" : "p-4"} shadow-lg`}
        >
          <img
            src="/images/favicon.svg"
            alt="Reportory Logo"
            className={`${
              isMobile ? "w-5 h-5" : "w-8 h-8"
            } filter brightness-0 invert`}
          />
        </div>
        <div>
          <h1
            className={`${
              isMobile ? "text-xl" : "text-4xl"
            } font-bold text-gray-900`}
          >
            {title}
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
        {subtitle}
      </p>
    </div>
  );
};

export default AppHeader;

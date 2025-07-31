import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Tag,
  BarChart3,
  Share,
  HelpCircle,
  Settings,
  Menu,
  X,
} from "lucide-react";

import { getReport } from "../../utils/stores/reportUtils";
import { formatTime } from "../../utils/transalte";
import { toast } from "../ui/toastContainer";
import { deleteDatabase } from "../../utils/stores/dbUtils";
import { useIsMobile } from "../../hooks/useBreakpoint";

const SidebarMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleHome = () => {
    navigate("/home");
  };

  const handleCategory = () => {
    navigate("/category");
  };

  const handleStats = () => {
    navigate("/stats");
  };

  const handleCopyClipboard = async () => {
    const reports = await getReport();

    const today = new Date();

    const formattedDate = `${today.getFullYear()}.${String(
      today.getMonth() + 1
    ).padStart(2, "0")}.${String(today.getDate()).padStart(
      2,
      "0"
    )}(${today.toLocaleDateString("ko-KR", { weekday: "short" })})\n\n`;

    const reportText = reports
      .map((report) => {
        const formattedStartTime = formatTime(report.startTime);
        const formattedEndTime = formatTime(report.endTime);
        return `${formattedStartTime} ~ ${formattedEndTime} ${report.content}\n`;
      })
      .join("");

    try {
      if (reportText !== "") {
        await navigator.clipboard.writeText(formattedDate + reportText);
      } else {
        toast.info("먼저 기록해주세요.");
      }
    } catch (error) {
      toast.error("클립보드에 복사하는데 실패했어요.");
    }
  };

  const handleHardReset = () => {
    try {
      deleteDatabase();

      toast.success("DB를 삭제하는데 성공했어요.");
    } catch (error) {
      toast.error("DB를 삭제하는데 실패했어요.");
    }
  };

  const menuItems = [
    {
      label: "홈",
      icon: Home,
      onClick: handleHome,
      accent: location.pathname === "/" || location.pathname === "/home",
    },
    {
      label: "카테고리",
      icon: Tag,
      onClick: handleCategory,
      accent: location.pathname === "/category",
    },
    {
      label: "분석",
      icon: BarChart3,
      onClick: handleStats,
      accent: location.pathname === "/stats",
    },
    { label: "공유", icon: Share, onClick: handleCopyClipboard },
    { label: "도움말", icon: HelpCircle, onClick: handleHardReset },
    { label: "설정", icon: Settings, onClick: () => {} },
  ];

  return (
    <>
      {/* 햄버거 버튼 */}
      <button
        className={`fixed ${isMobile ? "top-4 left-4" : "top-6 left-6"} 
          p-3 rounded-xl bg-white/90 backdrop-blur-md shadow-lg border border-gray-200/50 
          hover:bg-teal-50 hover:border-teal-200 active:scale-95 transition-all duration-200 z-50
          group`}
        onClick={() => setIsOpen(true)}
      >
        <Menu
          className={`${
            isMobile ? "w-5 h-5" : "w-6 h-6"
          } text-gray-700 group-hover:text-teal-600 transition-colors`}
        />
      </button>

      {/* 사이드바 */}
      <div
        className={`fixed top-0 left-0 h-full ${isMobile ? "w-72" : "w-72"} 
          bg-gradient-to-b from-teal-500 via-teal-400 to-white backdrop-blur-xl shadow-2xl border-r border-gray-200/50
          transform transition-all duration-300 ease-out z-50 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* 헤더 */}
        <div className={`relative ${isMobile ? "p-4" : "p-6"}`}>
          <h1
            className={`${
              isMobile ? "text-xl" : "text-2xl"
            } font-bold text-white tracking-tight`}
          >
            Reportory
          </h1>
          <p
            className={`text-white/90 ${isMobile ? "text-xs" : "text-sm"} mt-1`}
          >
            일상을 기록하고 관리하세요
          </p>

          <button
            className={`absolute ${
              isMobile ? "top-3 right-3 p-1.5" : "top-4 right-4 p-2"
            } 
              rounded-lg bg-white/20 hover:bg-white/30 
              active:scale-95 transition-all duration-200`}
            onClick={() => setIsOpen(false)}
          >
            <X className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-white`} />
          </button>
        </div>

        {/* 메뉴 리스트 */}
        <nav
          className={`flex flex-col ${
            isMobile ? "p-3 space-y-1" : "p-4 space-y-2"
          } 
          bg-white/95 backdrop-blur-sm h-full ${isMobile ? "pt-4" : "pt-6"}`}
        >
          {menuItems.map((item, index) => (
            <NavItem
              key={index}
              label={item.label}
              icon={item.icon}
              onClicked={() => {
                item.onClick();
                setIsOpen(false);
              }}
              accent={item.accent}
              isMobile={isMobile}
            />
          ))}
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

interface NavItemProps {
  label: string;
  icon: React.ComponentType<any>;
  onClicked: () => void;
  accent?: boolean;
  isMobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  icon: Icon,
  onClicked,
  accent = false,
  isMobile = false,
}) => {
  return (
    <button
      className={`group relative flex items-center ${
        isMobile ? "gap-3" : "gap-4"
      } w-full 
        ${isMobile ? "p-3" : "p-4"} rounded-xl
        text-left transition-all duration-200 overflow-hidden
        ${
          accent
            ? "bg-teal-500 text-white shadow-lg hover:bg-teal-600 hover:shadow-xl"
            : "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
        }
        active:scale-[0.98]`}
      onClick={onClicked}
    >
      <Icon
        className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} 
          ${accent ? "text-white" : "text-gray-500 group-hover:text-teal-600"} 
          transition-colors duration-200 flex-shrink-0`}
      />
      <span
        className={`font-medium ${isMobile ? "text-sm" : "text-lg"} truncate`}
      >
        {label}
      </span>

      {/* 호버 효과 */}
      <div
        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
        transition-opacity duration-200 pointer-events-none
        ${accent ? "bg-white/10" : "bg-teal-500/5"}`}
      />
    </button>
  );
};

export default SidebarMenu;

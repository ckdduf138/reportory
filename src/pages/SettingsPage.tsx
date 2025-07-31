import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Trash2,
  Download,
  Upload,
  Globe,
  Palette,
  HelpCircle,
  Database,
} from "lucide-react";

import { AppHeader, SidebarMenu } from "../components/common";
import { Loader, SimpleColorPicker } from "../components/ui";
import { useIsMobile } from "../hooks/useBreakpoint";
import { deleteDatabase } from "../utils/stores/dbUtils";
import { toast } from "../components/ui/toastContainer";

interface AppSettings {
  theme: "light" | "dark" | "auto";
  primaryColor: string;
}

const SettingsPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<AppSettings>({
    theme: "light",
    primaryColor: "#14B8A6",
  });

  useEffect(() => {
    // 로컬 스토리지에서 설정 불러오기
    const savedSettings = localStorage.getItem("daily-report-settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("daily-report-settings", JSON.stringify(newSettings));
    toast.success("설정이 저장되었습니다.");
  };

  const exportData = async () => {
    setIsLoading(true);
    try {
      const data = {
        todos: localStorage.getItem("todos") || "[]",
        categories: localStorage.getItem("categories") || "[]",
        settings: localStorage.getItem("daily-report-settings") || "{}",
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `daily-report-backup-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("데이터가 성공적으로 내보내졌습니다.");
    } catch (error) {
      toast.error("데이터 내보내기에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const importData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);

            if (data.todos) localStorage.setItem("todos", data.todos);
            if (data.categories)
              localStorage.setItem("categories", data.categories);
            if (data.settings)
              localStorage.setItem("daily-report-settings", data.settings);

            toast.success(
              "데이터가 성공적으로 가져와졌습니다. 페이지를 새로고침해주세요."
            );
          } catch (error) {
            toast.error("잘못된 파일 형식입니다.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const resetAllData = () => {
    if (
      window.confirm(
        "모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      setIsLoading(true);
      try {
        deleteDatabase();
        localStorage.removeItem("daily-report-settings");
        toast.success("모든 데이터가 삭제되었습니다.");
        setTimeout(() => window.location.reload(), 1000);
      } catch (error) {
        toast.error("데이터 삭제에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <div className="container mx-auto max-w-4xl">
        <AppHeader
          title="설정"
          subtitle="앱 설정을 개인화하고 데이터를 관리하세요"
        />

        <div className={`${isMobile ? "px-4" : "px-6"} pb-24 space-y-6`}>
          {/* 테마 설정 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-800">테마 설정</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  테마
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "light", label: "밝게", icon: Sun },
                    { value: "dark", label: "어둡게", icon: Moon },
                    { value: "auto", label: "자동", icon: Globe },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => updateSetting("theme", value as any)}
                      className={`p-3 rounded-lg border transition-colors flex flex-col items-center gap-2 ${
                        settings.theme === value
                          ? "border-teal-500 bg-teal-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  기본 색상
                </label>
                <SimpleColorPicker
                  selectedColor={settings.primaryColor}
                  onColorChange={(color) =>
                    updateSetting("primaryColor", color)
                  }
                />
              </div>
            </div>
          </div>

          {/* 데이터 관리 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-800">데이터 관리</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={exportData}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">데이터 내보내기</div>
                  <div className="text-sm text-gray-600">백업 파일 생성</div>
                </div>
              </button>

              <button
                onClick={importData}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">데이터 가져오기</div>
                  <div className="text-sm text-gray-600">백업 파일 복원</div>
                </div>
              </button>

              <button
                onClick={resetAllData}
                className="flex items-center gap-3 p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600"
              >
                <Trash2 className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">모든 데이터 삭제</div>
                  <div className="text-sm text-red-500">되돌릴 수 없음</div>
                </div>
              </button>
            </div>
          </div>

          {/* 도움말 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-800">
                도움말 및 정보
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">버전</span>
                <span className="text-gray-900 font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">마지막 업데이트</span>
                <span className="text-gray-900 font-medium">
                  {new Date().toISOString().split("T")[0]}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">개발자</span>
                <span className="text-gray-900 font-medium">
                  Daily Report Team
                </span>
              </div>
            </div>
          </div>
        </div>

        <SidebarMenu />
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default SettingsPage;

import React from "react";

import { AppHeader, SidebarMenu, SEOHead } from "../components/common";
import { Loader } from "../components/ui";
import { ThemeSettings, DataManagement } from "../components/settings";
import { useIsMobile } from "../hooks/useBreakpoint";
import { useSettings } from "../hooks/useSettings";

const SettingsPage: React.FC = () => {
  const isMobile = useIsMobile();
  const {
    settings,
    isLoading,
    updateSetting,
    handleExportData,
    handleImportData,
    handleResetAllData,
  } = useSettings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <SEOHead
        title="설정 | Reportory"
        description="Reportory 앱의 테마, 알림, 데이터 백업 등 개인 설정을 관리하고 앱을 개인화하세요."
        keywords="앱 설정, 테마 설정, 데이터 백업, 개인화, 환경설정"
        canonical="https://reportory.com/settings"
      />

      <div className="container mx-auto max-w-4xl">
        <AppHeader
          title="설정"
          subtitle="앱 설정을 개인화하고 데이터를 관리하세요"
        />

        <div className={`${isMobile ? "px-4" : "px-6"} pb-24 space-y-6`}>
          {/* 테마 설정 */}
          <ThemeSettings settings={settings} onSettingChange={updateSetting} />

          {/* 데이터 관리 */}
          <DataManagement
            onExportData={handleExportData}
            onImportData={handleImportData}
            onResetAllData={handleResetAllData}
          />
        </div>

        <SidebarMenu />
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default SettingsPage;

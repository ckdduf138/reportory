import React from "react";

import { AppHeader, SidebarMenu, SEOHead } from "../components/common";
import {
  FeatureGrid,
  QuickStartGuide,
  FAQSection,
  SupportInfo,
} from "../components/help";
import { useIsMobile } from "../hooks/useBreakpoint";

const HelpPage: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <SEOHead 
        title="도움말 및 사용법 | Reportory"
        description="Reportory 할일 관리 앱의 상세한 사용법, 주요 기능 안내, FAQ를 확인하세요. 더 효율적인 업무 관리를 위한 가이드를 제공합니다."
        keywords="사용법, 도움말, 가이드, FAQ, 할일관리 방법, 앱 사용법"
        canonical="https://reportory.com/help"
      />
      
      <div className="container mx-auto max-w-4xl">
        <AppHeader
          title="도움말"
          subtitle="Daily Report 사용법과 자주 묻는 질문"
        />

        <div className={`${isMobile ? "px-4" : "px-6"} pb-24 space-y-8`}>
          {/* 주요 기능 */}
          <FeatureGrid />

          {/* 사용법 가이드 */}
          <QuickStartGuide />

          {/* FAQ */}
          <FAQSection />

          {/* 지원 정보 */}
          <SupportInfo />
        </div>

        <SidebarMenu />
      </div>
    </div>
  );
};

export default HelpPage;

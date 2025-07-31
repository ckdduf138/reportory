import React from "react";

import { AppHeader, SidebarMenu } from "../components/common";
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

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
        title="할일 앱 사용법 가이드 | 투두리스트 만들기 방법 - Reportory"
        description="Reportory 할일 앱 사용법 완벽 가이드! 투두리스트 만들기부터 카테고리 설정까지. 초보자도 쉽게 따라할 수 있는 단계별 설명과 FAQ 제공."
        keywords="할일 앱 사용법, 투두리스트 만들기, 할일 관리 방법, 앱 가이드, 사용 설명서, FAQ, 할일 정리법, 생산성 향상 팁, 업무 관리 가이드, 할일 앱 도움말"
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

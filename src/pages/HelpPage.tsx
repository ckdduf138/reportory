import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Calendar,
  CheckSquare,
  Share2,
  Settings,
  BarChart3,
  Rocket,
  BookOpen,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

import { AppHeader, SidebarMenu } from "../components/common";
import { useIsMobile } from "../hooks/useBreakpoint";

interface FAQItem {
  question: string;
  answer: string;
}

const HelpPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const faqData: FAQItem[] = [
    {
      question: "Daily Report 앱은 무엇인가요?",
      answer:
        "Daily Report는 하루 동안의 할일과 시간 기록을 체계적으로 관리할 수 있는 웹 애플리케이션입니다. 할일 관리, 시간 추적, 통계 분석, 데이터 공유 등의 기능을 제공합니다.",
    },
    {
      question: "할일을 어떻게 추가하나요?",
      answer:
        "홈 화면에서 '할일' 탭을 선택한 후, 입력란에 할일 내용을 작성하고 카테고리를 선택한 다음 추가 버튼을 클릭하면 됩니다. 중요도와 예상 소요 시간도 설정할 수 있습니다.",
    },
    {
      question: "시간 기록은 어떻게 작성하나요?",
      answer:
        "홈 화면에서 '기록' 탭을 선택한 후, 시작 시간과 종료 시간을 설정하고 활동 내용을 입력하여 저장할 수 있습니다. 카테고리별로 분류하여 관리할 수 있습니다.",
    },
    {
      question: "카테고리는 어떻게 관리하나요?",
      answer:
        "카테고리 메뉴에서 새로운 카테고리를 추가하거나 기존 카테고리의 이름과 색상을 수정할 수 있습니다. 각 카테고리는 고유한 색상으로 구분됩니다.",
    },
    {
      question: "데이터를 백업하거나 복원할 수 있나요?",
      answer:
        "설정 페이지에서 '데이터 내보내기'를 통해 모든 데이터를 JSON 파일로 백업할 수 있습니다. 백업 파일에는 할일, 기록, 카테고리, 설정 정보가 모두 포함됩니다. '데이터 가져오기'를 통해 백업 파일을 선택하면 모든 데이터가 복원됩니다.",
    },
    {
      question: "일일 리포트를 공유할 수 있나요?",
      answer:
        "공유하기 페이지에서 선택한 날짜의 완료된 할일, 시간 기록, 진행 중인 할일이 포함된 일일 리포트를 생성할 수 있습니다. 생성된 리포트는 클립보드 복사, 텍스트 파일 다운로드, 이메일 공유, 또는 기기의 네이티브 공유 기능을 통해 공유할 수 있습니다.",
    },
    {
      question: "통계는 어떤 정보를 보여주나요?",
      answer:
        "통계 페이지에서는 카테고리별 할일 완료율, 시간 사용 분석, 생산성 지표 등을 차트와 그래프로 시각화하여 보여줍니다.",
    },
    {
      question: "데이터는 어디에 저장되나요?",
      answer:
        "모든 데이터는 브라우저의 로컬 스토리지에 저장되어 개인 정보가 안전하게 보호됩니다. 서버로 전송되지 않으며 오직 사용자의 기기에만 저장됩니다.",
    },
  ];

  const features = [
    {
      icon: <CheckSquare className="w-6 h-6 text-teal-600" />,
      title: "할일 관리",
      description:
        "카테고리별로 할일을 체계적으로 관리하고 완료 상태를 추적할 수 있습니다.",
    },
    {
      icon: <Clock className="w-6 h-6 text-teal-600" />,
      title: "시간 기록",
      description:
        "하루 동안의 활동 시간을 기록하고 시간 사용 패턴을 분석할 수 있습니다.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-teal-600" />,
      title: "통계 분석",
      description:
        "생산성 지표와 카테고리별 통계를 시각적으로 확인할 수 있습니다.",
    },
    {
      icon: <Share2 className="w-6 h-6 text-teal-600" />,
      title: "데이터 공유",
      description: "일일 리포트를 다양한 형태로 생성하고 공유할 수 있습니다.",
    },
    {
      icon: <Settings className="w-6 h-6 text-teal-600" />,
      title: "설정 관리",
      description: "데이터 백업/복원, 테마 설정 등 개인화 옵션을 제공합니다.",
    },
    {
      icon: <Calendar className="w-6 h-6 text-teal-600" />,
      title: "카테고리 관리",
      description:
        "개인 맞춤형 카테고리를 생성하고 색상으로 구분하여 관리할 수 있습니다.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <div className="container mx-auto max-w-4xl">
        <AppHeader
          title="도움말"
          subtitle="Daily Report 사용법과 자주 묻는 질문"
        />

        <div className={`${isMobile ? "px-4" : "px-6"} pb-24 space-y-8`}>
          {/* 주요 기능 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Rocket className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-800">주요 기능</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 사용법 가이드 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-800">
                빠른 시작 가이드
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-teal-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">카테고리 설정</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    카테고리 메뉴에서 업무, 개인, 학습 등 본인의 활동에 맞는
                    카테고리를 생성하세요.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-teal-50/70 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">할일 추가</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    홈 화면의 할일 탭에서 오늘 해야 할 일들을 카테고리별로
                    추가하세요.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-teal-50/50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-teal-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">시간 기록</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    기록 탭에서 활동한 시간을 입력하여 하루 일과를 체계적으로
                    관리하세요.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-teal-50/30 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-teal-800 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">분석 및 공유</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    통계 메뉴에서 생산성을 분석하고, 공유 메뉴에서 일일 리포트를
                    생성하세요.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-800">
                자주 묻는 질문
              </h2>
            </div>

            <div className="space-y-3">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleFAQ(index);
                      }
                    }}
                    className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset transition-colors flex items-center justify-between"
                    aria-expanded={expandedFAQ === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span
                      id={`faq-question-${index}`}
                      className="font-medium text-gray-800"
                    >
                      {faq.question}
                    </span>
                    {expandedFAQ === index ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {expandedFAQ === index && (
                    <div
                      id={`faq-answer-${index}`}
                      className="px-4 py-3 bg-white border-t border-gray-200"
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                    >
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 지원 정보 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-800">
                지원 및 피드백
              </h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-3">
                Daily Report 사용 중 문제가 발생하거나 개선 아이디어가 있으시면
                언제든지 피드백을 주세요.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                  버전 1.0.0
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  React 18
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  TypeScript
                </span>
              </div>
            </div>
          </div>
        </div>

        <SidebarMenu />
      </div>
    </div>
  );
};

export default HelpPage;

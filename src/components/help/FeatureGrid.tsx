import React from "react";
import {
  Clock,
  Calendar,
  CheckSquare,
  Share2,
  Settings,
  BarChart3,
  Rocket,
} from "lucide-react";

const FeatureGrid: React.FC = () => {
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
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;

import React from "react";
import { BookOpen } from "lucide-react";
import { getGuideSteps } from "../../utils/helpUtils";

const QuickStartGuide: React.FC = () => {
  const guideSteps = getGuideSteps();

  const getStepBgColor = (step: number) => {
    const colors = [
      "bg-teal-50",
      "bg-teal-50/70",
      "bg-teal-50/50",
      "bg-teal-50/30",
    ];
    return colors[step - 1] || "bg-teal-50";
  };

  const getStepButtonColor = (step: number) => {
    const colors = ["bg-teal-500", "bg-teal-600", "bg-teal-700", "bg-teal-800"];
    return colors[step - 1] || "bg-teal-500";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-teal-600" />
        <h2 className="text-xl font-bold text-gray-800">빠른 시작 가이드</h2>
      </div>

      <div className="space-y-4">
        {guideSteps.map((step) => (
          <div
            key={step.step}
            className={`flex gap-4 p-4 ${getStepBgColor(step.step)} rounded-lg`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 ${getStepButtonColor(
                step.step
              )} text-white rounded-full flex items-center justify-center font-bold text-sm`}
            >
              {step.step}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStartGuide;

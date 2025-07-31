import React from "react";
import { MessageCircle } from "lucide-react";
import { getSupportInfo } from "../../utils/helpUtils";

const SupportInfo: React.FC = () => {
  const supportInfo = getSupportInfo();

  const getTechBadgeColor = (tech: string) => {
    if (tech.includes("React")) return "bg-blue-100 text-blue-800";
    if (tech.includes("TypeScript")) return "bg-purple-100 text-purple-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <MessageCircle className="w-6 h-6 text-teal-600" />
        <h2 className="text-xl font-bold text-gray-800">지원 및 피드백</h2>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-gray-700 mb-3">{supportInfo.description}</p>

        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
            버전 {supportInfo.version}
          </span>
          {supportInfo.technologies.map((tech, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm font-medium ${getTechBadgeColor(
                tech
              )}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportInfo;

import React from "react";
import { HelpCircle } from "lucide-react";

interface AppInfoProps {
  version?: string;
  lastUpdate?: string;
  developer?: string;
}

const AppInfo: React.FC<AppInfoProps> = ({
  version = "1.0.0",
  lastUpdate = new Date().toISOString().split("T")[0],
  developer = "Daily Report Team",
}) => {
  const infoItems = [
    { label: "버전", value: version },
    { label: "마지막 업데이트", value: lastUpdate },
    { label: "개발자", value: developer },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <HelpCircle className="w-5 h-5 text-teal-600" />
        <h2 className="text-xl font-bold text-gray-800">도움말 및 정보</h2>
      </div>

      <div className="space-y-3">
        {infoItems.map((item) => (
          <div
            key={item.label}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
          >
            <span className="text-gray-700">{item.label}</span>
            <span className="text-gray-900 font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppInfo;

import React from "react";
import { Download, Upload, Trash2, Database } from "lucide-react";

interface DataManagementProps {
  onExportData: () => void;
  onImportData: () => void;
  onResetAllData: () => void;
}

const DataManagement: React.FC<DataManagementProps> = ({
  onExportData,
  onImportData,
  onResetAllData,
}) => {
  const dataActions = [
    {
      id: "export",
      label: "데이터 내보내기",
      description: "백업 파일 생성",
      icon: Download,
      onClick: onExportData,
      variant: "default" as const,
      iconColor: "text-blue-600",
    },
    {
      id: "import",
      label: "데이터 가져오기",
      description: "백업 파일 복원",
      icon: Upload,
      onClick: onImportData,
      variant: "default" as const,
      iconColor: "text-green-600",
    },
    {
      id: "reset",
      label: "모든 데이터 삭제",
      description: "되돌릴 수 없음",
      icon: Trash2,
      onClick: onResetAllData,
      variant: "danger" as const,
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Database className="w-5 h-5 text-teal-600" />
        <h2 className="text-xl font-bold text-gray-800">데이터 관리</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dataActions.map((action) => {
          const Icon = action.icon;
          const isDanger = action.variant === "danger";

          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`flex items-center gap-3 p-4 border rounded-lg hover:bg-opacity-50 transition-colors ${
                isDanger
                  ? "border-red-200 hover:bg-red-50 text-red-600"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Icon className={`w-5 h-5 ${action.iconColor}`} />
              <div className="text-left">
                <div className="font-medium">{action.label}</div>
                <div
                  className={`text-sm ${
                    isDanger ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  {action.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DataManagement;

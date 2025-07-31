import React from "react";
import { BarChart3 } from "lucide-react";
import { PriorityStats } from "../../types/Analysis";

interface PriorityAnalysisProps {
  priorityStats: PriorityStats;
}

const PriorityAnalysis: React.FC<PriorityAnalysisProps> = ({
  priorityStats,
}) => {
  const priorityItems = [
    {
      key: "high" as const,
      label: "높음",
      color: "bg-red-500",
      count: priorityStats.high,
    },
    {
      key: "medium" as const,
      label: "보통",
      color: "bg-yellow-500",
      count: priorityStats.medium,
    },
    {
      key: "low" as const,
      label: "낮음",
      color: "bg-green-500",
      count: priorityStats.low,
    },
  ];

  const total = Object.values(priorityStats).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-5 h-5 text-teal-600" />
        <h2 className="text-xl font-bold text-gray-800">우선순위별 할일</h2>
      </div>

      <div className="space-y-4">
        {priorityItems.map(({ key, label, color, count }) => {
          const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

          return (
            <div key={key} className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${color}`}></div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-sm text-gray-600">
                    {count}개 ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${color}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriorityAnalysis;

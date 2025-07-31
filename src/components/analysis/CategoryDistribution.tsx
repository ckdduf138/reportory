import React from "react";
import { PieChart } from "lucide-react";

interface CategoryDistributionProps {
  categoryStats: { [key: string]: number };
}

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({
  categoryStats,
}) => {
  const colors = [
    "bg-teal-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-500",
  ];

  const total = Object.values(categoryStats).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <PieChart className="w-5 h-5 text-teal-600" />
        <h2 className="text-xl font-bold text-gray-800">카테고리별 분포</h2>
      </div>

      <div className="space-y-3">
        {Object.entries(categoryStats).map(([category, count], index) => {
          const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

          return (
            <div key={category} className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full ${
                  colors[index % colors.length]
                }`}
              ></div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{category}</span>
                  <span className="text-sm text-gray-600">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      colors[index % colors.length]
                    }`}
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

export default CategoryDistribution;

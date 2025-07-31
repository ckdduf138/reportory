import React from "react";
import { TrendingUp } from "lucide-react";
import { DailyTrend } from "../../types/Analysis";

interface DailyTrendsChartProps {
  dailyTrends: DailyTrend[];
}

const DailyTrendsChart: React.FC<DailyTrendsChartProps> = ({ dailyTrends }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-5 h-5 text-teal-600" />
        <h2 className="text-xl font-bold text-gray-800">일별 활동 트렌드</h2>
      </div>

      <div className="space-y-4">
        {dailyTrends.map((day, index) => (
          <div key={day.date} className="flex items-center gap-4">
            <div className="w-16 text-sm text-gray-600">{day.date}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-sm font-medium">할일: {day.todos}개</div>
                <div className="text-sm text-gray-500">
                  완료: {day.completed}개
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      day.todos > 0 ? (day.completed / day.todos) * 100 : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="text-sm text-gray-500 w-12 text-right">
              {day.todos > 0
                ? Math.round((day.completed / day.todos) * 100)
                : 0}
              %
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyTrendsChart;

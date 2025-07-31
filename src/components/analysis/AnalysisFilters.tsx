import React from "react";
import { Filter } from "lucide-react";
import { AnalysisPeriod, AnalysisMetric } from "../../types/Analysis";

interface AnalysisFiltersProps {
  selectedPeriod: AnalysisPeriod;
  selectedMetric: AnalysisMetric;
  onPeriodChange: (period: AnalysisPeriod) => void;
  onMetricChange: (metric: AnalysisMetric) => void;
}

const AnalysisFilters: React.FC<AnalysisFiltersProps> = ({
  selectedPeriod,
  selectedMetric,
  onPeriodChange,
  onMetricChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-teal-600" />
        <h2 className="text-xl font-bold text-gray-800">분석 옵션</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            기간
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => onPeriodChange(e.target.value as AnalysisPeriod)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="week">최근 1주일</option>
            <option value="month">최근 1개월</option>
            <option value="quarter">최근 3개월</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            지표
          </label>
          <select
            value={selectedMetric}
            onChange={(e) => onMetricChange(e.target.value as AnalysisMetric)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="completion">완료율 분석</option>
            <option value="productivity">생산성 분석</option>
            <option value="priority">우선순위 분석</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AnalysisFilters;

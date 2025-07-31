import React from "react";
import { GeneratedReport } from "../../types/Share";

interface ReportPreviewProps {
  report: GeneratedReport | null;
}

const ReportPreview: React.FC<ReportPreviewProps> = ({ report }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">미리보기</h2>

      <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
          {report?.text || "리포트를 생성해주세요."}
        </pre>
      </div>

      {report && (
        <div className="mt-4 p-3 bg-teal-50 rounded-lg">
          <h3 className="text-sm font-semibold text-teal-800 mb-2">
            통계 요약
          </h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-teal-600">완료:</span>
              <span className="ml-1 font-medium">
                {report.stats.totalCompleted}개
              </span>
            </div>
            <div>
              <span className="text-teal-600">전체:</span>
              <span className="ml-1 font-medium">
                {report.stats.totalTodos}개
              </span>
            </div>
            <div>
              <span className="text-teal-600">완료율:</span>
              <span className="ml-1 font-medium">
                {report.stats.completionRate}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportPreview;

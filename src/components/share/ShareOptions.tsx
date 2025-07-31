import React from "react";
import { ShareFormat } from "../../types/Share";

interface ShareOptionsProps {
  selectedFormat: ShareFormat;
  selectedDate: string;
  onFormatChange: (format: ShareFormat) => void;
  onDateChange: (date: string) => void;
  onGenerate: () => void;
  todosCount: number;
  completedCount: number;
}

const ShareOptions: React.FC<ShareOptionsProps> = ({
  selectedFormat,
  selectedDate,
  onFormatChange,
  onDateChange,
  onGenerate,
  todosCount,
  completedCount,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">공유 옵션</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            형식 선택
          </label>
          <select
            value={selectedFormat}
            onChange={(e) => onFormatChange(e.target.value as ShareFormat)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="daily">일일 리포트</option>
            <option value="weekly">주간 리포트</option>
            <option value="custom">사용자 정의</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            날짜 선택
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={onGenerate}
        className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
      >
        리포트 생성
      </button>

      <div className="mt-4 bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600">
          선택된 날짜: <span className="font-medium">{selectedDate}</span> |
          전체 업무: <span className="font-medium">{todosCount}개</span> | 완료:{" "}
          <span className="font-medium text-green-600">{completedCount}개</span>{" "}
          | 완료율:{" "}
          <span className="font-medium text-blue-600">
            {todosCount > 0
              ? ((completedCount / todosCount) * 100).toFixed(1)
              : 0}
            %
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShareOptions;

import React, { memo, useState, useCallback } from "react";
import {
  Clock,
  Pencil,
  Trash2,
  FileText,
  ExternalLink,
  Calendar,
  MessageSquare,
} from "lucide-react";

import { formatTime } from "../../utils/transalte";
import { Report } from "../../types/Common";
import CategoryComponent from "../ui/Category";
import { useIsMobile, useIsTablet } from "../../hooks/useBreakpoint";

interface ReportViewerProps {
  reports: Report[];
  delete_report: (id: string) => void;
  edit_report: (report: Report) => void;
}

const ReportViewer: React.FC<ReportViewerProps> = memo(
  ({ reports, delete_report, edit_report }) => {
    const isMobile = useIsMobile();
    const isTablet = useIsTablet();
    const [expandedReportIndex, setExpandedReportIndex] = useState<
      number | null
    >(null);

    const handleClick = useCallback(
      (index: number, report: Report) => {
        if (expandedReportIndex === index) {
          edit_report(report);
        } else {
          setExpandedReportIndex(index);
        }
      },
      [expandedReportIndex, edit_report]
    );

    const handleEdit = useCallback(
      (e: React.MouseEvent, index: number, report: Report) => {
        e.stopPropagation();
        setExpandedReportIndex(index);
        edit_report(report);
      },
      [edit_report]
    );

    const handleDelete = useCallback(
      (e: React.MouseEvent, index: number, id: string) => {
        e.stopPropagation();
        if (index === expandedReportIndex) {
          setExpandedReportIndex(null);
        }
        delete_report(id);
      },
      [expandedReportIndex, delete_report]
    );

    // 빈 상태 표시
    if (reports.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-gray-50 rounded-full p-6 mb-4">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            아직 기록이 없어요
          </h3>
          <p className="text-center text-gray-500 max-w-sm">
            오늘 하루도 기록해봅시다. 작은 일부터 시작해보세요!
          </p>
        </div>
      );
    }

    // 컬럼 개수 결정
    const getGridColumns = () => {
      if (isMobile) return "grid-cols-1";
      if (isTablet) return "grid-cols-2";
      return "grid-cols-3";
    };

    return (
      <div className="space-y-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              오늘의 기록 ({reports.length})
            </h2>
          </div>
        </div>

        <div className={`grid gap-4 ${getGridColumns()}`}>
          {reports.map((report, index) => (
            <div
              key={report.id}
              className={`group relative bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                expandedReportIndex === index
                  ? "border-teal-500 shadow-xl ring-2 ring-teal-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleClick(index, report)}
            >
              {/* 액션 버튼들 */}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  onClick={(e) => handleEdit(e, index, report)}
                  className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  title="수정"
                >
                  <Pencil className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={(e) => handleDelete(e, index, report.id)}
                  className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-red-50 hover:border-red-300 transition-colors"
                  title="삭제"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>

              {/* 카드 내용 */}
              <div className="p-6 pt-12">
                {/* 시간 정보 */}
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {formatTime(report.startTime)} ~{" "}
                    {formatTime(report.endTime)}
                  </span>
                </div>

                {/* 내용 */}
                <div className="mb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <p
                      className={`text-gray-800 leading-relaxed ${
                        expandedReportIndex === index
                          ? "whitespace-pre-wrap"
                          : "line-clamp-3"
                      }`}
                    >
                      {report.content}
                    </p>
                  </div>

                  {/* 확장/축소 힌트 */}
                  {report.content.length > 100 && (
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                      <ExternalLink className="w-3 h-3" />
                      {expandedReportIndex === index
                        ? "축소하려면 클릭"
                        : "전체보기"}
                    </div>
                  )}
                </div>

                {/* 카테고리 */}
                {report.category && (
                  <div className="flex items-center gap-2">
                    <CategoryComponent category={report.category} />
                  </div>
                )}

                {/* 연결된 TODO 표시 */}
                {report.linkedTodoId && (
                  <div className="mt-3 p-2 bg-teal-50 rounded-lg border border-teal-200">
                    <div className="flex items-center gap-2 text-sm text-teal-700">
                      <ExternalLink className="w-3 h-3" />
                      <span>연결된 할일이 있습니다</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 호버 효과를 위한 오버레이 */}
              <div className="absolute inset-0 bg-transparent group-hover:bg-teal-50/20 rounded-xl pointer-events-none transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

ReportViewer.displayName = "ReportViewer";

export default ReportViewer;

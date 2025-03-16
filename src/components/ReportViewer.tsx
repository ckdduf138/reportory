import React, { useState } from 'react';

import { formatTime } from '../utils/transalte';

import { Report } from '../types/Common';

interface ReportViewerProps {
  reports: Report[];
  delete_report: (id: string) => void;
  edit_report: (report: Report) => void;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ reports, delete_report, edit_report }) => {
  const [expandedReportIndex, setExpandedReportIndex] = useState<number | null>(null);

  const handleClick = (index: number, report: Report) => {
    if (expandedReportIndex === index) {
      setExpandedReportIndex(null);
      edit_report(report);
    } else {
      setExpandedReportIndex(index);
    }
  };

  const handleEdit = (report: Report) => {
    edit_report(report);
  };

  const handleDelete = (id: string) => {
    delete_report(id);
  };

  return (
    <div>
      {reports.length === 0 ? (
        <p className="text-center text-gray-500">오늘 하루도 기록해봅시다.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {reports.map((report, index) => (
            <li
              key={index}
              className={`relative flex flex-col p-3 rounded cursor-pointer border-2 bg-gray-100 transition-all duration-300 ease-in-out
                ${expandedReportIndex === index ? 'border-black max-h-screen' : 'border-transparent max-h-[76px]'} `}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(index, report);
              }}>

              <div className="text-black">
                <span>{formatTime(report.startTime)} ~ {formatTime(report.endTime)}</span>
                <p className={`${expandedReportIndex === index ? '' : 'truncate line-clamp-1'}`}>{report.content}</p>
              </div>
              
              {/* 리포트 수정 삭제 버튼 */}
              <div className="flex absolute top-1.5 right-1.5 gap-2 cursor-pointer">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(report);
                  }}>
                  <img src={`${process.env.PUBLIC_URL}/images/common/ic-edit-02.svg`} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(report.id);
                  }}>
                  <img src={`${process.env.PUBLIC_URL}/images/common/ic-trash-02.svg`} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportViewer;

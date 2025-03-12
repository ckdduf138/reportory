import React, { useState } from 'react';

interface Report {
  startTime: string;
  endTime: string;
  content: string;
}

interface ReportViewerProps {
  reports: Report[];
  delete_report: (index: number) => void;
}

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const ampm = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${ampm} ${formattedHours}:${formattedMinutes}`;
};

const ReportViewer: React.FC<ReportViewerProps> = ({ reports, delete_report }) => {
  const [expandedReportIndex, setExpandedReportIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (expandedReportIndex === index) {
      setExpandedReportIndex(null);
    } else {
      setExpandedReportIndex(index);
    }
  };

  const handleDelete = (index: number) => {
    delete_report(index);
  };

  return (
    <div>
      {reports.length === 0 ? (
        <p className="text-center text-gray-500">오늘 하루도 기록해봅시다.</p>
      ) : (
        <ul className="mt-2">
          {reports.map((report, index) => (
            <li
              key={index}
              className={`flex flex-col bg-gray-100 p-2 rounded mb-2 cursor-pointer transition-all duration-300 ease-in-out ${
                expandedReportIndex === index ? 'bg-gray-300' : ''
              }`}
              onClick={() => handleClick(index)}
              style={{
                backgroundColor: expandedReportIndex === index ? '#F6F8F9' : '',
                height: expandedReportIndex === index ? 'auto' : '60px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* 리포트 삭제 버튼 */}
              <img
                src={`${process.env.PUBLIC_URL}/images/home/ic-cross-circle.svg`}
                alt="Delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  cursor: 'pointer',
                }}
              />

              {/* 일반 보기 */}
              <div className="text-black">
                <span>{formatTime(report.startTime)} ~ {formatTime(report.endTime)}</span>
                <p>{expandedReportIndex !== index ? report.content.slice(0, 50) : ''}</p>
              </div>

              {/* 상세보기 */}
              {expandedReportIndex === index && (
                <p>{report.content}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportViewer;

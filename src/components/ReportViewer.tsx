import React, { useState } from 'react';

interface Report {
  startTime: string;
  endTime: string;
  content: string;
}

interface ReportViewerProps {
  reports: Report[];
}

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number); // 시간과 분을 분리하고 숫자로 변환
  const ampm = hours >= 12 ? '오후' : '오전'; // 오전/오후 판단
  const formattedHours = hours % 12 || 12; // 12시간제로 변환
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // 1자리 분은 2자리로 변환
  return `${ampm} ${formattedHours}:${formattedMinutes}`;
};


const ReportViewer: React.FC<ReportViewerProps> = ({ reports }) => {
  const [expandedReportIndex, setExpandedReportIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (expandedReportIndex === index) {
      setExpandedReportIndex(null);
    } else {
      setExpandedReportIndex(index);
    }
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
                  height: expandedReportIndex === index ? 'auto' : '60px',
                  overflow: 'hidden',
              }}
            >
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

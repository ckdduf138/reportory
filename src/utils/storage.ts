import { toast } from "react-toastify";

import { formatTime } from "./transalte";

export const STORAGE_KEY = 'daily_reports';

// 리포트를 저장하는 함수
export const saveReport = (startTime: string, endTime: string, content: string) => {
  const reports = getReports();
  const newReport = { startTime, endTime, content };

  reports.push(newReport);

  reports.sort((a, b) => {
    const [aHours, aMinutes] = a.startTime.split(':').map(Number);
    const [bHours, bMinutes] = b.startTime.split(':').map(Number);

    const aTime = new Date(0, 0, 0, aHours, aMinutes);
    const bTime = new Date(0, 0, 0, bHours, bMinutes);

    return aTime.getTime() - bTime.getTime();
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
};

// 저장된 리포트를 불러오는 함수
export const getReports = (): {startTime: string; endTime: string; content: string }[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// 리포트를 삭제하는 함수
export const deleteReport = (index: number) => {
  const reports = getReports();
  reports.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
};

// 리포트를 복사하는 함수
export const copyReport = () => {
  const reports = JSON.parse(localStorage.getItem('STORAGE_KEY') || '[]');

  const reportText = reports.map((report: { startTime: string, endTime: string, content: string }) => {
    const formattedStartTime = formatTime(report.startTime);
    const formattedEndTime = formatTime(report.endTime);
    return `${formattedStartTime} ~ ${formattedEndTime}\n${report.content}\n\n`;
  }).join('');

  // 모바일에서 클립보드를 처리하는 방식
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(reportText)
      .then(() => {
        toast.success('클립보드에 복사되었어요.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          style: {
            fontSize: '16px',
            width: '90%',
          },
        });
      })
      .catch((error) => {
        toast.error('클립보드에 복사를 실패했어요.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          style: {
            fontSize: '16px',
            width: '90%',
          },
        });
      });
  } else {
    toast.error('클립보드에 복사를 실패했어요.', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      style: {
        fontSize: '16px',
        width: '90%',
      },
    });
  }
};
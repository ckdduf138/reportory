const STORAGE_KEY = 'daily_reports';

// 리포트를 저장하는 함수
export const saveReport = (startTime: string, endTime: string, content: string) => {
  const reports = getReports();
  const newReport = { startTime, endTime, content };

  reports.push(newReport);

  reports.sort((a, b) => {
    const [aHours, aMinutes] = a.startTime.split(':').map(Number);
    const [bHours, bMinutes] = b.startTime.split(':').map(Number);

    const aTime = new Date(0, 0, 0, aHours, aMinutes); // 시간을 Date 객체로 변환
    const bTime = new Date(0, 0, 0, bHours, bMinutes);

    return aTime.getTime() - bTime.getTime(); // 시간순으로 정렬
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

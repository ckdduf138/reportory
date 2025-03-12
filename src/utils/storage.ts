const STORAGE_KEY = 'daily_reports';

export const saveReport = (report: string) => {
  const reports = getReports();
  reports.push(report);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
};

export const getReports = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const deleteReport = (index: number) => {
  const reports = getReports();
  reports.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
};

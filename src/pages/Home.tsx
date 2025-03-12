import React, { useEffect, useState } from 'react';

import ReportForm from '../components/ReportForm';
import ReportViewer from '../components/ReportViewer';

import { deleteReport, getReports, saveReport } from '../utils/storage';

const Home: React.FC = () => {
  const [reports, setReports] = useState<{ startTime: string; endTime: string; content: string; }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setReports(getReports());
  }, []);

  const handleAddReport = (startTime: string, endTime: string, content: string) => {
    saveReport(startTime, endTime, content);
    setReports(getReports());
    setIsModalOpen(false);
  };

  const handleDelete = (index: number) => {
    deleteReport(index);
    setReports(getReports());
  };

  return (
    <div className="min-h-screen flex items-start justify-center relative">
      <div className="p-6 w-full max-w-7xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Daily Report</h1>

        {isModalOpen && (
          <ReportForm
            onSubmit={handleAddReport}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        <ReportViewer reports={reports} delete_report={handleDelete}/>

        {/* 플로팅 버튼 */}
        <button
          className="fixed bottom-8 right-8 w-16 h-16 bg-black text-white text-4xl flex items-center justify-center rounded-full shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <img src='/images/home/ic-plus.svg'/>
        </button>
      </div>
    </div>
  );
};

export default Home;

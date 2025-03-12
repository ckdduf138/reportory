import React, { useEffect, useState } from 'react';

import ReportForm from '../components/ReportForm';
import ReportViewer from '../components/ReportViewer';

import { deleteReport, getReports, saveReport, copyReport } from '../utils/storage';
import { ToastContainer } from 'react-toastify';

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

  const handleExport = () => {
    copyReport();
  };

  return (
    <div className="min-h-screen flex items-start justify-center relative">
      <div className="p-6 w-full max-w-7xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Daily Report</h1>

        <ReportViewer reports={reports} delete_report={handleDelete}/>

        {isModalOpen && (
          <ReportForm
            onSubmit={handleAddReport}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        {/* 업로드 버튼 */}
        <button
          className="fixed bottom-8 left-8 w-16 h-16 bg-[#DDDDDD] flex items-center justify-center rounded-full shadow-lg"
          onClick={() => handleExport()}
        >
          <img src='/images/home/ic-export.svg'/>
        </button>

        {/* 플로팅 버튼 */}
        <button
          className="fixed bottom-8 right-8 w-16 h-16 bg-black flex items-center justify-center rounded-full shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <img src='/images/home/ic-plus.svg'/>
        </button>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Home;

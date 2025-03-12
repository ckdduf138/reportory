import React, { useEffect, useState } from 'react';

import ReportForm from '../components/ReportForm';
import ReportViewer from '../components/ReportViewer';

import { deleteReport, getReports, saveReport, copyReport } from '../utils/storage';
import { ToastContainer } from 'react-toastify';

import { Report } from '../types/Report';
import { generateUUID } from '../utils/transalte';

const Home: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await getReports();
      setReports(data);
    };
    fetchReports();
  }, []);
  
  const handleAddReport = async (report: Report) => {
    report.id = generateUUID();

    await saveReport(report);
    const data = await getReports();

    setReports(data);
    setIsModalOpen(false);
  };
  
  const handleDelete = async (id: string) => {
    await deleteReport(id);
    const data = await getReports();
    setReports(data);
  };

  const handleExport = () => {
    copyReport();
  };

  return (
    <div className="min-h-screen flex items-start justify-center relative">
      <div className="p-6 w-full max-w-7xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Daily Report</h1>

        <ReportViewer 
          reports={reports} 
          delete_report={handleDelete}
        />

        {/* 업로드 버튼 */}
        <button
          className="fixed bottom-8 left-8 w-16 h-16 bg-[#DDDDDD] flex items-center justify-center rounded-full shadow-lg"
          onClick={() => handleExport()}
        >
          <img src={`${process.env.PUBLIC_URL}/images/home/ic-export.svg`} />
        </button>

        {/* 플로팅 버튼 */}
        <button
          className="fixed bottom-8 right-8 w-16 h-16 bg-black flex items-center justify-center rounded-full shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <img src={`${process.env.PUBLIC_URL}/images/home/ic-plus.svg`} />
        </button>

        {isModalOpen && (
          <ReportForm
            isOpen={isModalOpen}
            reports={reports}
            onSubmit={handleAddReport}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Home;

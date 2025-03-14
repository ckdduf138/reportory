import React, { useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';

import ReportForm from '../components/ReportForm';
import ReportViewer from '../components/ReportViewer';

import { generateUUID } from '../utils/transalte';
import { deleteDatabase, deleteReport, getReports, saveReport, copyReport } from '../utils/storage';

import { Report } from '../types/Report';

const Home: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [editReport, setEditReport] = useState<Report>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await getReports();
      setReports(data);
    };
    fetchReports();
  }, []);
  
  const handleAddReport = () => {
    setEditReport(undefined);
    setIsModalOpen(true);
  };
  
  const handleExport = () => {
    copyReport();
  };

  const handleSaveReport = async (report: Report) => {
    if(!report.id) {
      report.id = generateUUID();
    }

    await saveReport(report);
    const data = await getReports();

    setReports(data);
    setIsModalOpen(false);
  };
  
  const handleEdit = async (report: Report) => {
    setEditReport(report);

    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteReport(id);
    const data = await getReports();
    setReports(data);
  };

  const deleteAndReload = async () => {
    await deleteDatabase();
    window.location.reload();
  };
  
  return (
    <div className="min-h-screen flex items-start justify-center relative">
      <div className="p-6 w-full max-w-7xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Daily Report</h1>

        <ReportViewer 
          reports={reports} 
          delete_report={handleDelete}
          edit_report={handleEdit}
        />

        {/* 초기화 버튼 */}
        <button
          className="fixed top-6 right-6 w-16 h-8 bg-[#DDDDDD] flex items-center justify-center shadow-lg"
          onClick={() => deleteAndReload()}
        >
          초기화
        </button>

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
          onClick={() => handleAddReport()}
        >
          <img src={`${process.env.PUBLIC_URL}/images/home/ic-plus.svg`} />
        </button>

        {isModalOpen && (
          <ReportForm
            isOpen={isModalOpen}
            reports={reports}
            editReport={editReport}
            onSubmit={handleSaveReport}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        
        <ToastContainer />
      </div>
    </div>
  );
};

export default Home;

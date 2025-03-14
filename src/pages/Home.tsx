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
      <div className="p-6 pb-24 w-full max-w-7xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Daily Report</h1>

        <ReportViewer 
          reports={reports} 
          delete_report={handleDelete}
          edit_report={handleEdit}
        />

        {/* 하단 고정 바 */}
        <div className="fixed bottom-0 left-0 w-full bg-white py-4 px-6 flex justify-between items-center shadow-lg">
          {/* 초기화 버튼 */}
          <button className="w-14 h-14 flex items-center justify-center bg-gray-300 rounded-full shadow-md" onClick={deleteAndReload}>
            <img src={`${process.env.PUBLIC_URL}/images/home/ic-trash.svg`} />
          </button>

          {/* 추가 버튼 (플로팅) */}
          <button
            className="w-16 h-16 bg-black flex items-center justify-center rounded-full shadow-lg absolute left-1/2 transform -translate-x-1/2"
            onClick={handleAddReport}
          >
            <img src={`${process.env.PUBLIC_URL}/images/home/ic-plus.svg`} />
          </button>

          {/* 업로드 버튼 */}
          <button className="w-14 h-14 flex items-center justify-center bg-gray-300 rounded-full shadow-md" onClick={handleExport}>
            <img src={`${process.env.PUBLIC_URL}/images/home/ic-export.svg`} />
          </button>
        </div>

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

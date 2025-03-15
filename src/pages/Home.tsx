import React, { useEffect, useState } from 'react';

import { toast, ToastContainer } from 'react-toastify';

import ReportForm from '../components/ReportForm';
import ReportViewer from '../components/ReportViewer';
import Loader from '../components/Loader';

import { generateUUID } from '../utils/transalte';
import { deleteDatabase, deleteReport, getReports, saveReport, copyReport } from '../utils/storage';

import { Report } from '../types/Common';
import SidebarMenu from '../components/SidebarMenu';


const Home: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [editReport, setEditReport] = useState<Report>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);
  
  const fetchReports = async () => {
    const data = await getReports();
    setReports(data);
  };

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
    await fetchReports();

    setIsModalOpen(false);
  };
  
  const handleEdit = async (report: Report) => {
    setEditReport(report);

    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteReport(id);
    fetchReports();
  };

  const deleteAndReload = async () => {
    if(reports.length === 0) {
      toast.warning("삭제할 데이터가 없어요.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        style: {
          fontSize: '16px',
          width: '90%',
        },
      });

      return;
    }

    setIsLoading(true);
    const status = await deleteDatabase();

    switch(status) {
      case "success":
        await fetchReports();

        toast.success("모두 삭제되었어요.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          style: {
            fontSize: '16px',
            width: '90%',
          },
        });
        
        setIsLoading(false);
        break;
      case "error":
        toast.error("잠시 후 다시 시도해주세요.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          style: {
            fontSize: '16px',
            width: '90%',
          },
        });

        setIsLoading(false);
        break;
      case "loading":
        break;
    }
  };
  
  return (
    <div className="min-h-screen flex items-start justify-center relative">
      <div className="p-5 pb-24 w-full max-w-7xl">
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
            className="w-16 h-16 bg-black flex items-center justify-center rounded-full shadow-lg right-0"
            onClick={handleAddReport}
          >
            <img src={`${process.env.PUBLIC_URL}/images/home/ic-plus.svg`} />
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
        
        <SidebarMenu />
        <ToastContainer />

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';

import ReportForm from '../components/ReportForm';
import ReportViewer from '../components/ReportViewer';
import SidebarMenu from '../components/SidebarMenu';
import Loader from '../components/Loader';
import Modal from '../components/Modal';

import { generateUUID } from '../utils/transalte';
import { deleteDatabase, deleteReport, getReports, saveReport } from '../utils/storage';

import { Report } from '../types/Common';
import { toast } from '../components/toastContainer';

const Home: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [editReport, setEditReport] = useState<Report>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleDelteAll = async () => {
    setIsDeleteModalOpen(false);
    setIsLoading(true);
    const status = await deleteDatabase();

    switch(status) {
      case "success":
        await fetchReports();

        toast.success("모두 삭제되었어요.");
        
        setIsLoading(false);
        break;
      case "error":
        toast.error("잠시 후 다시 시도해주세요.");

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

        <div className="fixed bottom-0 left-0 w-full bg-white py-4 px-6 flex justify-between items-center shadow-lg">
          <button className="w-14 h-14 flex items-center justify-center bg-gray-300 rounded-full shadow-md" 
            onClick={() => { reports.length === 0 ? toast.warning("삭제할 리포트가 없어요.") : setIsDeleteModalOpen(true)}}>
            <img src={`${process.env.PUBLIC_URL}/images/common/ic-trash-02.svg`} />
          </button>

          <button className="w-16 h-16 bg-black flex items-center justify-center rounded-full shadow-lg right-0" 
            onClick={handleAddReport}>
            <img src={`${process.env.PUBLIC_URL}/images/home/ic-plus.svg`} />
          </button>
        </div>

        <SidebarMenu />

        {/* 리포트 추가하는 모달창 */}
        {isModalOpen && (
          <ReportForm
            isOpen={isModalOpen}
            reports={reports}
            editReport={editReport}
            onSubmit={handleSaveReport}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        {isDeleteModalOpen && (
          <Modal 
            content='리포트 전체를 삭제하시겠습니까?'      
            onClickedCancel={() => setIsDeleteModalOpen(false)}
            onClickedOk={() => handleDelteAll()}/>
        )}

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default Home;

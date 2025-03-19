import React, { useEffect, useState } from 'react';

import ReportForm from '../components/ReportForm';
import ReportViewer from '../components/ReportViewer';
import SidebarMenu from '../components/SidebarMenu';
import Loader from '../components/Loader';
import Modal from '../components/Modal';

import { generateUUID } from '../utils/transalte';

import { Report } from '../types/Common';
import { toast } from '../components/toastContainer';
import { createReport, deleteAllReports, deleteReport, getReport, updateReport } from '../utils/stores/reportUtils';

const Home: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [editReport, setEditReport] = useState<Report>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchReportAll();
  }, []);
  
  const fetchReportAll = async () => {
    const data = await getReport();
    setReports(data);
  };

  const handleAddReport = () => {
    setEditReport(undefined);
    setIsModalOpen(true);
  };

  const handleSaveReport = async (report: Report) => {
    setIsLoading(true);
    let response: string = '';
    try {
      if(!report.id) {
        report.id = generateUUID();
        response = await createReport(report);
      }
      else {
        response = await updateReport(report);
      }
  
      toast.success(response);
    } catch (error: any) {
      toast.error(error);
    }
    finally {
      await fetchReportAll();
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };
  
  const handleUpdateReport = async (report: Report) => {
    setEditReport(report);

    setIsModalOpen(true);
  };

  const handleDeleteReport = async (id: string) => {
    setIsLoading(true);

    try {
      const response = await deleteReport(id);
      toast.success(response);
    } catch (error: any) {
      toast.error(error);
    }
    finally {
      await fetchReportAll();
      setIsLoading(false);
    }
  };

  const handleDeleteAllReport = async () => {
    setIsDeleteModalOpen(false);
    setIsLoading(true);

    try {
      const response = await deleteAllReports();
      toast.success(response);
    } catch (error: any) {
      toast.error(error);
    }
    finally {
      await fetchReportAll();
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-start justify-center relative">
      <div className="p-5 pb-24 w-full max-w-7xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Daily Report</h1>

        <ReportViewer 
          reports={reports} 
          delete_report={handleDeleteReport}
          edit_report={handleUpdateReport}
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
            onClickedOk={() => handleDeleteAllReport()}/>
        )}

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default Home;

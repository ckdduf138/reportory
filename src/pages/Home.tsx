import React, { useEffect, useState } from 'react';
import { deleteReport, getReports, saveReport } from '../utils/storage';
import ReportForm from '../components/ReportForm';
import ReportViewer from '../components/ReportViewer';

const Home: React.FC = () => {
  const [reports, setReports] = useState<{ startTime: string; endTime: string; content: string; }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 컴포넌트가 렌더링될 때 저장된 리포트를 가져오기
  useEffect(() => {
    setReports(getReports());
  }, []);

  const handleAddReport = (startTime: string, endTime: string, content: string) => {
    saveReport(startTime, endTime, content);
    setReports(getReports());  // 새로 추가된 리포트를 반영
    setIsModalOpen(false);
  };

  const handleDelete = (index: number) => {
    deleteReport(index);
    setReports(getReports());  // 삭제 후 리포트를 갱신
  };

  return (
    <div className="min-h-screen flex items-start justify-center relative">
      <div className="p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Daily Report</h1>

        {isModalOpen && (
          <ReportForm
            onSubmit={handleAddReport}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        <ReportViewer reports={reports} />

        {/* 플로팅 버튼 */}
        <button
          className="fixed bottom-8 right-8 w-16 h-16 bg-black text-white text-4xl flex items-center justify-center rounded-full shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <img src='/images/home/icon_plus.svg'/>
        </button>
      </div>
    </div>
  );
};

export default Home;

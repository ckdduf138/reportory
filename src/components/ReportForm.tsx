import React, { useEffect, useState } from 'react';

import { Report } from '../types/Common';

interface ReportFormProps {
  isOpen: boolean;
  reports: Report[];
  editReport?: Report;
  onSubmit: (report: Report) => void;
  onClose: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ reports, editReport: initialReport, isOpen, onSubmit, onClose }) => {
  const [scale, setScale] = useState(0.5);
  const [startTime, setStartTime] = useState(initialReport?.startTime || '');
  const [endTime, setEndTime] = useState(initialReport?.endTime || '');
  const [content, setContent] = useState(initialReport?.content || '');

  useEffect(() => {
    if (isOpen) {
      setScale(1);
    } else {
      setScale(0.5);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!initialReport) {
      setStartTime(reports.length > 0 ? reports[reports.length - 1].endTime : '00:00');

      const currentTime = new Date();
      const formattedTime = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
      setEndTime(formattedTime);
    }
  }, [reports, initialReport]);

  const handleSubmit = () => {
    if (startTime && endTime && content.trim()) {
      onSubmit({
        ...initialReport,
        startTime,
        endTime,
        content,
      } as Report);

      onClose();
    }
  };

  const isFormValid = startTime && endTime && content.trim();
  const title = initialReport ? '리포트 수정하기' : '리포트 추가하기';

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-7xl"
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 0.3s ease',
        }}>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">시작 시간</label>
          <input className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-black"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}/>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">종료 시간</label>
          <input className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-black"
            type="time" 
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}/>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">내용</label>
          <textarea className="w-full p-3 border-2 border-gray-300 rounded-lg h-40 resize-none focus:outline-none focus:ring-0 focus:border-black"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요.."/>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
            onClick={onClose}>취소
          </button>
          <button className={`px-6 py-2 rounded-lg shadow-md transition duration-300 
            ${isFormValid ? 'bg-gray-700 hover:bg-gray-800 text-white': 'bg-gray-300 cursor-not-allowed'}`}
            disabled={!isFormValid}
            onClick={handleSubmit}>{initialReport ? '수정' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;

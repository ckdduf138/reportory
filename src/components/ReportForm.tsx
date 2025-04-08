import React, { useEffect, useState } from 'react';

import { Report } from '../types/Common';
import Dropdown from './Dropdown';

interface ReportFormProps {
  isOpen: boolean;
  reports: Report[];
  editReport?: Report;
  onSubmit: (report: Report) => void;
  onClose: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ reports, editReport, isOpen, onSubmit, onClose }) => {
  const [scale, setScale] = useState(0.5);
  const [startTime, setStartTime] = useState(editReport?.startTime || '');
  const [endTime, setEndTime] = useState(editReport?.endTime || '');
  const [content, setContent] = useState(editReport?.content || '');
  const [category, setCategory] = useState(editReport?.category || '');

  useEffect(() => {
    if (isOpen) {
      setScale(1);
    } else {
      setScale(0.5);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!editReport) {
      setStartTime(reports.length > 0 ? reports[reports.length - 1].endTime : '00:00');

      const currentTime = new Date();
      const formattedTime = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
      setEndTime(formattedTime);
    }
  }, [reports, editReport]);

  const handleSubmit = () => {
    if (startTime && endTime && content.trim()) {
      onSubmit({
        ...editReport,
        startTime,
        endTime,
        content,
        category,
      } as Report);

      onClose();
    }
  };

  const isFormValid = startTime && endTime && content.trim();
  const title = editReport ? '리포트 수정하기' : '리포트 추가하기';

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center backdrop-blur-md" onClick={() => onClose()}>
      <div className={`flex flex-col bg-white p-6 gap-4 rounded-lg shadow-xl w-[80%] max-w-2xl transition-transform duration-300 ease-in-out`}
        style={{ transform: `scale(${scale})` }}
        onClick={(e) => {e.stopPropagation()}}>
          
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

        <Dropdown 
          category={editReport?.category}
          handleSetCategory={setCategory}
        />

        <input className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-black text-sm"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <input className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-black text-sm"
          type="time" 
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <textarea className="w-full p-3 border-2 border-gray-300 rounded-lg h-20 resize-none focus:outline-none focus:ring-0 focus:border-black"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
        />

        <div className="flex justify-around items-center">
          <button className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition active:scale-95"
            onClick={onClose}>취소
          </button>
          <button className={`px-6 py-2 rounded-lg shadow-md transition duration-300 active:scale-95 
            ${isFormValid ? 'bg-gray-700 hover:bg-gray-800 text-white': 'bg-gray-300 cursor-not-allowed'}`}
            disabled={!isFormValid}
            onClick={handleSubmit}>{editReport ? '수정' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;

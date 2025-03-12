import React, { useEffect, useState } from 'react';
import { deleteReport, getReports, saveReport } from '../utils/storage';

const Home: React.FC = () => {
    const [report, setReport] = useState('');
    const [reports, setReports] = useState<string[]>([]);
  
    useEffect(() => {
        setReports(getReports());
    }, []);
  
    const handleSubmit = () => {
        if (report.trim()) {
            saveReport(report);
            setReports(getReports());
            setReport('');
        }
    };
  
    const handleDelete = (index: number) => {
        deleteReport(index);
        setReports(getReports());
    };

    return (
        <div className='p-6'>
        <h1 className='text-2xl font-bold mb-4'>Daily Report</h1>
        <textarea
            className='w-full h-32 p-2 border rounded mb-4'
            value={report}
            onChange={(e) => setReport(e.target.value)}
            placeholder='Write your daily report here...'
        />
        <button 
            className='bg-blue-500 text-white px-4 py-2 rounded mb-4'
            onClick={handleSubmit}
        >
            Submit
        </button>

        <h2 className='text-xl font-semibold mt-6'>Saved Reports</h2>
        <ul className='mt-2'>
            {reports.map((r, index) => (
            <li key={index} className='flex justify-between items-center bg-gray-100 p-2 rounded mb-2'>
                <span>{r}</span>
                <button 
                className='bg-red-500 text-white px-2 py-1 rounded'
                onClick={() => handleDelete(index)}
                >
                Delete
                </button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default Home;

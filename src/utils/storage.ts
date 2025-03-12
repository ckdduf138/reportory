import { toast } from "react-toastify";
import { formatTime } from "./transalte";

const DB_NAME = "DailyReportDB";
const STORE_NAME = "reports";

// IndexedDB 열기
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// 리포트 저장
export const saveReport = async (startTime: string, endTime: string, content: string) => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  const newReport = { startTime, endTime, content };

  store.put(newReport);
};


// 리포트 가져오기
export const getReports = async (): Promise<{ id: number; startTime: string; endTime: string; content: string }[]> => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    
    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

// 리포트 삭제
export const deleteReport = async (id: number) => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  store.delete(id);
};

// 리포트 복사
export const copyReport = async () => {
  const reports = await getReports();

  const reportText = reports.map((report) => {
    const formattedStartTime = formatTime(report.startTime);
    const formattedEndTime = formatTime(report.endTime);
    return `${formattedStartTime} ~ ${formattedEndTime}\n${report.content}\n\n`;
  }).join("");

  try {
    if(reportText !== '') {
      await navigator.clipboard.writeText(reportText);
    }
    else {
      toast.info("먼저 기록해주세요.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        style: {
          fontSize: '16px',
          width: '90%',
        },
      });
    }
  } catch (error) {
    console.error("클립보드 복사 실패:", error);
    toast.error("클립보드에 복사하는데 실패했어요..", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      style: {
        fontSize: '16px',
        width: '90%',
      },
    });
  }
};

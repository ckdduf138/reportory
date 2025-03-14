import { toast } from "react-toastify";
import { formatTime } from "./transalte";
import { DatabaseStatus, Report } from "../types/Common";

const DB_NAME = "DailyReportDB";
const STORE_NAME = "reports";

// IndexedDB 열기
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 2);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        objectStore.createIndex("startTime", "startTime", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// IndexedDB 삭제
export const deleteDatabase = (): Promise<DatabaseStatus> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);

    request.onsuccess = () => {
      resolve("success");
    };

    request.onerror = (e) => {
      reject("error");
    };

    request.onblocked = () => {
      resolve("success");
    };
  });
};

// 리포트 저장
export const saveReport = async (report: Report) => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  const newReport = report;

  store.put(newReport);

  db.close();
};


// 리포트 가져오기
export const getReports = async (): Promise<Report[]> => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const index = store.index("startTime");

  return new Promise((resolve, reject) => {
    const request = index.getAll();

    request.onsuccess = () => {
      resolve(request.result);
      db.close();
    };

    request.onerror = () => {
      reject(request.error);
      db.close();
    };
  });
};

// 리포트 삭제
export const deleteReport = async (id: string) => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  store.delete(id);

  db.close();
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
    toast.error("클립보드에 복사하는데 실패했어요.", {
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

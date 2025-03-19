import { formatTime } from "../transalte";
import { DatabaseStatus, Report } from "../../types/Common";
import { toast } from "../../components/toastContainer";

const DB_NAME = "DailyReportDB";
export const REPORT_STORE_NAME = "reports";
export const CATEGORY_STORE_NAME = "categories";

// IndexedDB 열기
export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 2);

    request.onupgradeneeded = () => {
      const db = request.result;

      const storeNames = [REPORT_STORE_NAME, CATEGORY_STORE_NAME];

      storeNames.forEach(storeName => {
        if (!db.objectStoreNames.contains(storeName)) {
          const objectStore = db.createObjectStore(storeName, { keyPath: "id" });

          if (storeName === REPORT_STORE_NAME) {
            objectStore.createIndex("startTime", "startTime", { unique: false });
          }
        }
      });
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
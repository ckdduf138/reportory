import { Report } from "../../types/Common";
import { openDB, REPORT_STORE_NAME } from "./dbUtils";

export const createReport = async (report: Report): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();
      const transaction = db.transaction(REPORT_STORE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(REPORT_STORE_NAME);
      const request = objectStore.add(report);

      request.onsuccess = () => resolve('추가했어요.');
      request.onerror = (e) => reject('잠시 후 다시 시도해주세요.');
    } catch (error) {
      reject(error);
    }
    finally {
      if (db) db.close();
    }
  });
};

export const getReport = async (): Promise<Report[]> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();
      const transaction  = db.transaction(REPORT_STORE_NAME, "readonly");
      const store = transaction .objectStore(REPORT_STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(request.error);
    } catch (error) {
      reject(error);
    }
    finally {
      if (db) db.close();
    }
  });
};

export const updateReport = async (report: Report): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();
      const transaction = db.transaction(REPORT_STORE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(REPORT_STORE_NAME);
      const request = objectStore.put(report);

      request.onsuccess = () => resolve('수정했어요.');
      request.onerror = (e) => reject('잠시 후 다시 시도해주세요.');
    } catch (erorr) {
      reject('잠시 후 다시 시도해주세요.');
    }
    finally {
      if (db) db.close();
    } 
  });
};

export const deleteReport = async (reportId: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();
      const transaction = db.transaction(REPORT_STORE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(REPORT_STORE_NAME);
      const request = objectStore.delete(reportId);
      
      request.onsuccess = () => resolve('삭제했어요.');
      request.onerror = (e) => reject('잠시 후 다시 시도해주세요.');
    } catch (erorr) {
      reject('잠시 후 다시 시도해주세요.');
    }
    finally {
      if (db) db.close();
    } 
  });
};

export const deleteAllReports = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();
      const transaction = db.transaction(REPORT_STORE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(REPORT_STORE_NAME);
      const request = objectStore.clear();

      request.onsuccess = () => resolve('모두 삭제했어요.');
      request.onerror = (e) => reject('잠시 후 다시 시도해주세요.');
    } catch (error) {
      reject('잠시 후 다시 시도해주세요.');
    }
    finally {
      if (db) db.close();
    }
  });
};

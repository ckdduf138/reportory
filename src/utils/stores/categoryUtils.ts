import { CATEGORY_STORE_NAME, openDB } from './dbUtils';

export const createCategory = async (tag: any): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();
      const transaction = db.transaction(CATEGORY_STORE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(CATEGORY_STORE_NAME);
      const request = objectStore.add(tag);

      request.onsuccess = () => resolve('추가했어요.');
      request.onerror = () => reject('잠시 후 다시 시도해주세요.');
    } catch (error) {
      reject('잠시 후 다시 시도해주세요.');
    } finally {
      if (db) db.close();
    }
  });
};

export const getCategory = async (): Promise<any[]> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();

      console.log(db);

      const transaction = db.transaction(CATEGORY_STORE_NAME, 'readonly');
      const objectStore = transaction.objectStore(CATEGORY_STORE_NAME);
      const request = objectStore.getAll();

      console.log(request);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject('잠시 후 다시 시도해주세요.');
    } catch (error) {
      reject('잠시 후 다시 시도해주세요.');
    } finally {
      if (db) db.close();
    }
  });
};

export const updateCategory = async (tag: any): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();
      const transaction = db.transaction(CATEGORY_STORE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(CATEGORY_STORE_NAME);
      const request = objectStore.put(tag);

      request.onsuccess = () => resolve('수정했어요.');
      request.onerror = () => reject('잠시 후 다시 시도해주세요.');
    } catch (error) {
      reject('잠시 후 다시 시도해주세요.');
    } finally {
      if (db) db.close();
    }
  });
};

export const deleteCategory = async (tagId: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();
      const transaction = db.transaction(CATEGORY_STORE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(CATEGORY_STORE_NAME);
      const request = objectStore.delete(tagId);

      request.onsuccess = () => resolve('삭제했어요.');
      request.onerror = () => reject('잠시 후 다시 시도해주세요.');
    } catch (error) {
      reject('잠시 후 다시 시도해주세요.');
    } finally {
      if (db) db.close();
    }
  });
};

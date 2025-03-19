import { CATEGORY_STORE_NAME, openDB } from './dbUtils';

export const createCategory = async (tag: any) => {
  const db = await openDB();
  const transaction = db.transaction(CATEGORY_STORE_NAME, 'readwrite');
  const objectStore = transaction.objectStore(CATEGORY_STORE_NAME);
  const request = objectStore.add(tag);
  request.onsuccess = () => console.log('Tag created successfully');
  request.onerror = (e) => console.error('Error creating tag:', e);
};

export const getCategory = async () => {
  const db = await openDB();
  const transaction = db.transaction(CATEGORY_STORE_NAME, 'readonly');
  const objectStore = transaction.objectStore(CATEGORY_STORE_NAME);
  const request = objectStore.getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const updateCategory = async (tag: any) => {
  const db = await openDB();
  const transaction = db.transaction(CATEGORY_STORE_NAME, 'readwrite');
  const objectStore = transaction.objectStore(CATEGORY_STORE_NAME);
  const request = objectStore.put(tag);
  request.onsuccess = () => console.log('Tag updated successfully');
  request.onerror = (e) => console.error('Error updating tag:', e);
};

export const deleteCategory = async (tagId: string) => {
  const db = await openDB();
  const transaction = db.transaction(CATEGORY_STORE_NAME, 'readwrite');
  const objectStore = transaction.objectStore(CATEGORY_STORE_NAME);
  const request = objectStore.delete(tagId);
  request.onsuccess = () => console.log('Tag deleted successfully');
  request.onerror = (e) => console.error('Error deleting tag:', e);
};

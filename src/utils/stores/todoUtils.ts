import { Todo } from "../../types/Common";
import { openDB, TODO_STORE_NAME } from "./dbUtils";

export const createTodo = async (todo: Todo): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();
      const transaction = db.transaction(TODO_STORE_NAME, "readwrite");
      const objectStore = transaction.objectStore(TODO_STORE_NAME);
      const request = objectStore.add(todo);

      request.onsuccess = () => resolve("할일을 추가했어요.");
      request.onerror = (e) => reject("잠시 후 다시 시도해주세요.");
    } catch (error) {
      reject(error);
    } finally {
      if (db) db.close();
    }
  });
};

export const getTodos = async (): Promise<Todo[]> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();
      const transaction = db.transaction(TODO_STORE_NAME, "readonly");
      const store = transaction.objectStore(TODO_STORE_NAME);
      const index = store.index("createdAt");
      const request = index.getAll();

      request.onsuccess = () => {
        // 우선순위와 생성일자 기준으로 정렬
        const todos = request.result.sort((a: Todo, b: Todo) => {
          if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1; // 완료되지 않은 것을 먼저
          }

          const priorityOrder = { high: 0, medium: 1, low: 2 };
          if (a.priority !== b.priority) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          }

          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });
        resolve(todos);
      };
      request.onerror = (e) => reject(request.error);
    } catch (error) {
      reject(error);
    } finally {
      if (db) db.close();
    }
  });
};

export const updateTodo = async (todo: Todo): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();
      const transaction = db.transaction(TODO_STORE_NAME, "readwrite");
      const objectStore = transaction.objectStore(TODO_STORE_NAME);
      const request = objectStore.put(todo);

      request.onsuccess = () => resolve("할일을 수정했어요.");
      request.onerror = (e) => reject("잠시 후 다시 시도해주세요.");
    } catch (error) {
      reject("잠시 후 다시 시도해주세요.");
    } finally {
      if (db) db.close();
    }
  });
};

export const deleteTodo = async (todoId: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();
      const transaction = db.transaction(TODO_STORE_NAME, "readwrite");
      const objectStore = transaction.objectStore(TODO_STORE_NAME);
      const request = objectStore.delete(todoId);

      request.onsuccess = () => resolve("할일을 삭제했어요.");
      request.onerror = (e) => reject("잠시 후 다시 시도해주세요.");
    } catch (error) {
      reject("잠시 후 다시 시도해주세요.");
    } finally {
      if (db) db.close();
    }
  });
};

export const deleteAllTodos = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();
      const transaction = db.transaction(TODO_STORE_NAME, "readwrite");
      const objectStore = transaction.objectStore(TODO_STORE_NAME);
      const request = objectStore.clear();

      request.onsuccess = () => resolve("모든 할일을 삭제했어요.");
      request.onerror = (e) => reject("잠시 후 다시 시도해주세요.");
    } catch (error) {
      reject("잠시 후 다시 시도해주세요.");
    } finally {
      if (db) db.close();
    }
  });
};

export const toggleTodoComplete = async (todoId: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    let db: IDBDatabase | null = null;
    try {
      db = await openDB();
      const transaction = db.transaction(TODO_STORE_NAME, "readwrite");
      const objectStore = transaction.objectStore(TODO_STORE_NAME);

      const getRequest = objectStore.get(todoId);
      getRequest.onsuccess = () => {
        const todo: Todo = getRequest.result;
        if (todo) {
          todo.isCompleted = !todo.isCompleted;
          todo.completedAt = todo.isCompleted
            ? new Date().toISOString()
            : undefined;

          const putRequest = objectStore.put(todo);
          putRequest.onsuccess = () =>
            resolve(todo.isCompleted ? "완료했어요!" : "완료를 취소했어요.");
          putRequest.onerror = () => reject("잠시 후 다시 시도해주세요.");
        } else {
          reject("할일을 찾을 수 없어요.");
        }
      };
      getRequest.onerror = () => reject("잠시 후 다시 시도해주세요.");
    } catch (error) {
      reject("잠시 후 다시 시도해주세요.");
    } finally {
      if (db) db.close();
    }
  });
};

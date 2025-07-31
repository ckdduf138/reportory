const DB_NAME = "reportoryDB";
export const REPORT_STORE_NAME = "reports";
export const CATEGORY_STORE_NAME = "categories";
export const TODO_STORE_NAME = "todos";
const DB_VERSION = 8; // 버전 업그레이드

// IndexedDB 열기 (향상된 마이그레이션 지원)
export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = (event.target as IDBOpenDBRequest).transaction!;
      const oldVersion = event.oldVersion;

      console.log(`DB 업그레이드: ${oldVersion} → ${DB_VERSION}`);

      // Reports Store
      if (!db.objectStoreNames.contains(REPORT_STORE_NAME)) {
        const reportStore = db.createObjectStore(REPORT_STORE_NAME, {
          keyPath: "id",
        });
        reportStore.createIndex("startTime", "startTime", { unique: false });
        reportStore.createIndex("linkedTodoId", "linkedTodoId", {
          unique: false,
        });
        reportStore.createIndex("isFromTodo", "isFromTodo", { unique: false });
      } else {
        // 기존 스토어에 새 인덱스 추가 (버전 8에서 추가)
        const reportStore = transaction.objectStore(REPORT_STORE_NAME);
        if (oldVersion < 8) {
          try {
            if (!reportStore.indexNames.contains("linkedTodoId")) {
              reportStore.createIndex("linkedTodoId", "linkedTodoId", {
                unique: false,
              });
            }
            if (!reportStore.indexNames.contains("isFromTodo")) {
              reportStore.createIndex("isFromTodo", "isFromTodo", {
                unique: false,
              });
            }
          } catch (e) {
            console.warn("인덱스 추가 중 오류:", e);
          }
        }
      }

      // Categories Store
      if (!db.objectStoreNames.contains(CATEGORY_STORE_NAME)) {
        db.createObjectStore(CATEGORY_STORE_NAME, { keyPath: "id" });
      }

      // Todos Store
      if (!db.objectStoreNames.contains(TODO_STORE_NAME)) {
        const todoStore = db.createObjectStore(TODO_STORE_NAME, {
          keyPath: "id",
        });
        todoStore.createIndex("createdAt", "createdAt", { unique: false });
        todoStore.createIndex("priority", "priority", { unique: false });
        todoStore.createIndex("isCompleted", "isCompleted", { unique: false });
        todoStore.createIndex("linkedReportId", "linkedReportId", {
          unique: false,
        });
      } else {
        // 기존 스토어에 새 인덱스 추가
        const todoStore = transaction.objectStore(TODO_STORE_NAME);
        if (oldVersion < 8) {
          try {
            if (!todoStore.indexNames.contains("linkedReportId")) {
              todoStore.createIndex("linkedReportId", "linkedReportId", {
                unique: false,
              });
            }
          } catch (e) {
            console.warn("인덱스 추가 중 오류:", e);
          }
        }
      }

      // 데이터 마이그레이션 (필요한 경우)
      if (oldVersion < 8) {
        migrateDataToV8(transaction);
      }
    };

    request.onsuccess = () => {
      console.log("DB 연결 성공");
      resolve(request.result);
    };

    request.onerror = () => {
      console.error("DB 연결 실패:", request.error);
      reject(request.error);
    };

    request.onblocked = () => {
      console.warn("DB가 다른 탭에서 사용 중입니다. 페이지를 새로고침하세요.");
    };
  });
};

// 데이터 마이그레이션 함수
const migrateDataToV8 = (transaction: IDBTransaction) => {
  console.log("V8로 데이터 마이그레이션 시작");

  // Reports에 새 필드 추가 (기본값 설정)
  if (transaction.objectStoreNames.contains(REPORT_STORE_NAME)) {
    const reportStore = transaction.objectStore(REPORT_STORE_NAME);
    const reportRequest = reportStore.getAll();

    reportRequest.onsuccess = () => {
      const reports = reportRequest.result;
      reports.forEach((report: any) => {
        if (report.linkedTodoId === undefined) {
          report.linkedTodoId = null;
        }
        if (report.isFromTodo === undefined) {
          report.isFromTodo = false;
        }
        reportStore.put(report);
      });
      console.log(`${reports.length}개 리포트 마이그레이션 완료`);
    };
  }

  // Todos에 새 필드 추가
  if (transaction.objectStoreNames.contains(TODO_STORE_NAME)) {
    const todoStore = transaction.objectStore(TODO_STORE_NAME);
    const todoRequest = todoStore.getAll();

    todoRequest.onsuccess = () => {
      const todos = todoRequest.result;
      todos.forEach((todo: any) => {
        if (todo.linkedReportId === undefined) {
          todo.linkedReportId = null;
        }
        if (todo.completedAt === undefined && todo.isCompleted) {
          todo.completedAt = new Date().toISOString();
        }
        todoStore.put(todo);
      });
      console.log(`${todos.length}개 할일 마이그레이션 완료`);
    };
  }
};

// IndexedDB 삭제
export const deleteDatabase = (): Promise<string> => {
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

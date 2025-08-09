import { AppSettings } from "../types/Settings";
import { toast } from "../components/ui/toastContainer";
import { deleteDatabase } from "./stores/dbUtils";

const SETTINGS_KEY = "daily-report-settings";

export const loadSettings = (): AppSettings => {
  const savedSettings = localStorage.getItem(SETTINGS_KEY);
  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch {
      // 파싱 오류 시 기본값 반환
    }
  }

  return {
    theme: "light",
    primaryColor: "#14B8A6",
  };
};

export const saveSettings = (settings: AppSettings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  toast.success("설정이 저장되었습니다.");
};

export const exportData = async (): Promise<void> => {
  try {
    // IndexedDB에서 실제 데이터 가져오기
    const { getTodos } = await import("./stores/todoUtils");
    const { getCategory } = await import("./stores/categoryUtils");

    const [todos, categories] = await Promise.all([
      getTodos().catch((error) => {
        console.error("getTodos 오류:", error);
        return [];
      }),
      getCategory().catch((error) => {
        console.error("getCategory 오류:", error);
        return [];
      }),
    ]);

    const data = {
      todos: JSON.stringify(todos),
      categories: JSON.stringify(categories),
      settings: localStorage.getItem(SETTINGS_KEY) || "{}",
      exportDate: new Date().toISOString(),
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `daily-report-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("💾 파일 다운로드 완료");
    toast.success("데이터가 성공적으로 내보내졌습니다.");
  } catch (error) {
    console.error("❌ Export error:", error);
    console.error(
      "❌ Error stack:",
      error instanceof Error ? error.stack : "Unknown error"
    );
    toast.error("데이터 내보내기에 실패했습니다.");
    throw error;
  }
};

export const importData = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);

            // 데이터 유효성 검사
            if (!data.todos && !data.categories && !data.settings) {
              throw new Error("잘못된 백업 파일 형식입니다.");
            }

            // IndexedDB에 데이터 복원
            if (data.todos) {
              const todos = JSON.parse(data.todos);
              const { createTodo } = await import("./stores/todoUtils");

              // 기존 데이터 삭제 후 복원
              await deleteDatabase();
              for (const todo of todos) {
                try {
                  await createTodo(todo);
                } catch (error) {
                  console.warn("Todo 복원 실패:", error);
                }
              }
            }

            if (data.categories) {
              const categories = JSON.parse(data.categories);
              const { createCategory } = await import("./stores/categoryUtils");

              for (const category of categories) {
                try {
                  await createCategory(category);
                } catch (error) {
                  console.warn("Category 복원 실패:", error);
                }
              }
            }

            // 설정 복원
            if (data.settings) {
              localStorage.setItem(SETTINGS_KEY, data.settings);
            }

            toast.success("데이터를 가져왔습니다");

            // 바로 새로고침
            window.location.reload();
            resolve();
          } catch (error) {
            console.error("Import error:", error);
            toast.error("잘못된 파일 형식이거나 데이터 복원에 실패했습니다.");
            reject(error);
          }
        };
        reader.readAsText(file);
      } else {
        reject(new Error("파일이 선택되지 않았습니다."));
      }
    };
    input.click();
  });
};

export const resetAllData = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (
      window.confirm(
        "모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      try {
        deleteDatabase();
        localStorage.removeItem(SETTINGS_KEY);
        toast.success("모든 데이터가 삭제되었습니다.");
        setTimeout(() => window.location.reload(), 1000);
        resolve();
      } catch (error) {
        toast.error("데이터 삭제에 실패했습니다.");
        reject(error);
      }
    } else {
      reject(new Error("사용자가 취소했습니다."));
    }
  });
};

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
    const data = {
      todos: localStorage.getItem("todos") || "[]",
      categories: localStorage.getItem("categories") || "[]",
      settings: localStorage.getItem(SETTINGS_KEY) || "{}",
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

    toast.success("데이터가 성공적으로 내보내졌습니다.");
  } catch (error) {
    toast.error("데이터 내보내기에 실패했습니다.");
    throw error;
  }
};

export const importData = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);

            if (data.todos) localStorage.setItem("todos", data.todos);
            if (data.categories)
              localStorage.setItem("categories", data.categories);
            if (data.settings)
              localStorage.setItem(SETTINGS_KEY, data.settings);

            toast.success(
              "데이터가 성공적으로 가져와졌습니다. 페이지를 새로고침해주세요."
            );
            resolve();
          } catch (error) {
            toast.error("잘못된 파일 형식입니다.");
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

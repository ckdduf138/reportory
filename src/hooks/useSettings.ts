import { useState, useEffect } from "react";
import { AppSettings } from "../types/Settings";
import {
  loadSettings,
  saveSettings,
  exportData,
  importData,
  resetAllData,
} from "../utils/settingsUtils";

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(loadSettings());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedSettings = loadSettings();
    setSettings(savedSettings);
  }, []);

  const updateSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleExportData = async () => {
    setIsLoading(true);
    try {
      await exportData();
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportData = async () => {
    setIsLoading(true);
    try {
      await importData();
    } catch (error) {
      // 에러는 이미 utils에서 처리됨
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAllData = async () => {
    setIsLoading(true);
    try {
      await resetAllData();
    } catch (error) {
      // 사용자가 취소하거나 에러 발생
    } finally {
      setIsLoading(false);
    }
  };

  return {
    settings,
    isLoading,
    updateSetting,
    handleExportData,
    handleImportData,
    handleResetAllData,
  };
};

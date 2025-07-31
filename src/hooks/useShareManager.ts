import { useState, useEffect } from "react";
import { Todo } from "../types/Common";
import { ShareFormat, GeneratedReport } from "../types/Share";
import { generateReportData, generateShareText } from "../utils/shareUtils";
import {
  copyToClipboard,
  downloadAsText,
  shareViaWebAPI,
} from "../utils/shareActionUtils";

import { toast } from "../components/ui/toastContainer";

export const useShareManager = (todos: Todo[]) => {
  const [selectedFormat, setSelectedFormat] = useState<ShareFormat>("daily");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] =
    useState<GeneratedReport | null>(null);

  const generateReport = () => {
    setIsGenerating(true);

    try {
      const reportData = generateReportData(todos, selectedDate);
      const report = generateShareText(reportData);
      setGeneratedReport(report);
    } catch (error) {
      console.error("Report generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!generatedReport) {
      toast.error("리포트가 생성되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    await copyToClipboard(generatedReport.text);
  };

  const handleDownloadAsText = () => {
    if (!generatedReport) {
      generateReport();
      return;
    }
    const filename = `daily-report-${selectedDate}.txt`;
    downloadAsText(generatedReport.text, filename);
  };

  const handleShareViaWebAPI = async () => {
    if (!generatedReport) {
      generateReport();
      return;
    }
    const title = `Daily Report - ${selectedDate}`;
    await shareViaWebAPI(title, generatedReport.text);
  };

  // 날짜나 todos가 변경될 때 자동으로 리포트 생성
  useEffect(() => {
    if (todos.length > 0) {
      generateReport();
    }
  }, [selectedDate, todos]);

  return {
    // State
    selectedFormat,
    selectedDate,
    isGenerating,
    generatedReport,

    // Actions
    setSelectedFormat,
    setSelectedDate,
    generateReport,

    // Share actions
    handleCopyToClipboard,
    handleDownloadAsText,
    handleShareViaWebAPI,
  };
};

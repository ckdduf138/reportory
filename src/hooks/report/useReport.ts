import { useState, useCallback } from "react";
import { Report } from "../../types/Common";
import {
  createReport,
  deleteReport,
  getReport,
  updateReport,
} from "../../utils/stores/reportUtils";
import { generateUUID } from "../../utils/transalte";
import { toast } from "../../components/ui/toastContainer";

export const useReport = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [editReport, setEditReport] = useState<Report>();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReports = useCallback(async () => {
    const data = await getReport();
    setReports(data);
  }, []);

  const handleAddReport = useCallback(() => {
    setEditReport(undefined);
    setIsReportModalOpen(true);
  }, []);

  const handleSaveReport = useCallback(
    async (report: Report) => {
      setIsLoading(true);
      let response: string = "";
      try {
        if (!report.id) {
          report.id = generateUUID();
          response = await createReport(report);
        } else {
          response = await updateReport(report);
        }
        toast.success(response);
      } catch (error: any) {
        toast.error(error);
      } finally {
        await fetchReports();
        setIsLoading(false);
        setIsReportModalOpen(false);
      }
    },
    [fetchReports]
  );

  const handleEditReport = useCallback((report: Report) => {
    setEditReport(report);
    setIsReportModalOpen(true);
  }, []);

  const handleDeleteReport = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        const response = await deleteReport(id);
        toast.success(response);
      } catch (error: any) {
        toast.error(error);
      } finally {
        await fetchReports();
        setIsLoading(false);
      }
    },
    [fetchReports]
  );

  const closeReportModal = useCallback(() => {
    setIsReportModalOpen(false);
  }, []);

  return {
    reports,
    editReport,
    isReportModalOpen,
    isLoading,
    fetchReports,
    handleAddReport,
    handleSaveReport,
    handleEditReport,
    handleDeleteReport,
    closeReportModal,
  };
};

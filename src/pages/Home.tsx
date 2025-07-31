import React, { useEffect, useState } from "react";
import { Plus, FileText, CheckSquare } from "lucide-react";

import ReportForm from "../components/ReportForm";
import ReportViewer from "../components/ReportViewer";
import TodoForm from "../components/TodoForm";
import TabNavigation from "../components/TabNavigation";
import SidebarMenu from "../components/SidebarMenu";
import Loader from "../components/Loader";
import TodoViewer from "../components/TodoViewer";

import { generateUUID } from "../utils/transalte";

import { Report, Todo, ViewMode, Category } from "../types/Common";
import { toast } from "../components/toastContainer";
import {
  createReport,
  deleteReport,
  getReport,
  updateReport,
} from "../utils/stores/reportUtils";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodoComplete,
  updateTodo,
} from "../utils/stores/todoUtils";
import { useIsMobile } from "../hooks/useBreakpoint";

const Home: React.FC = () => {
  // 상태 관리
  const [activeTab, setActiveTab] = useState<ViewMode>("todo");
  const [reports, setReports] = useState<Report[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editReport, setEditReport] = useState<Report>();
  const [editTodo, setEditTodo] = useState<Todo>();

  // 모달 상태
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // 반응형 훅
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([fetchReportAll(), fetchTodoAll()]);
  };

  const fetchReportAll = async () => {
    const data = await getReport();
    setReports(data);
  };

  const fetchTodoAll = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  // Todo 관련 핸들러들
  const handleAddTodo = () => {
    setEditTodo(undefined);
    setIsTodoModalOpen(true);
  };

  const handleSaveTodo = async (todo: Todo) => {
    setIsLoading(true);
    let response: string = "";
    try {
      if (!todo.id) {
        todo.id = generateUUID();
        response = await createTodo(todo);
      } else {
        response = await updateTodo(todo);
      }
      toast.success(response);
    } catch (error: any) {
      toast.error(error);
    } finally {
      await fetchTodoAll();
      setIsLoading(false);
      setIsTodoModalOpen(false);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditTodo(todo);
    setIsTodoModalOpen(true);
  };

  const handleDeleteTodo = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await deleteTodo(id);
      toast.success(response);
    } catch (error: any) {
      toast.error(error);
    } finally {
      await fetchTodoAll();
      setIsLoading(false);
    }
  };

  const handleToggleTodoComplete = async (id: string) => {
    try {
      const response = await toggleTodoComplete(id);
      toast.success(response);
      await fetchTodoAll();
    } catch (error: any) {
      toast.error(error);
    }
  };

  // Report 관련 핸들러들 (기존과 동일하지만 변수명 수정)
  const handleAddReport = () => {
    setEditReport(undefined);
    setIsReportModalOpen(true);
  };

  const handleSaveReport = async (report: Report) => {
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
      await fetchReportAll();
      setIsLoading(false);
      setIsReportModalOpen(false);
    }
  };

  const handleUpdateReport = async (report: Report) => {
    setEditReport(report);
    setIsReportModalOpen(true);
  };

  const handleDeleteReport = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await deleteReport(id);
      toast.success(response);
    } catch (error: any) {
      toast.error(error);
    } finally {
      await fetchReportAll();
      setIsLoading(false);
    }
  };

  // 탭 변경 핸들러
  const handleTabChange = (tab: ViewMode) => {
    setActiveTab(tab);
  };

  // 통계 계산
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <div className="container mx-auto max-w-7xl">
        {/* 헤더 */}
        <div className={`text-center ${isMobile ? "px-4 py-6" : "px-8 py-10"}`}>
          <div className={`flex items-center justify-center gap-3 mb-4`}>
            <div
              className={`bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl 
              ${isMobile ? "p-2.5" : "p-4"} shadow-lg`}
            >
              <CheckSquare
                className={`${isMobile ? "w-5 h-5" : "w-8 h-8"} text-white`}
              />
            </div>
            <div>
              <h1
                className={`${
                  isMobile ? "text-xl" : "text-4xl"
                } font-bold text-gray-900`}
              >
                Reportory
              </h1>
              <div
                className={`${
                  isMobile ? "w-16 h-0.5" : "w-20 h-1"
                } bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mx-auto mt-1`}
              ></div>
            </div>
          </div>
          <p
            className={`text-gray-600 ${isMobile ? "text-sm px-2" : "text-lg"} 
            max-w-lg mx-auto leading-relaxed`}
          >
            할일 계획부터 시간 기록까지, 완벽한 하루 관리
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className={`${isMobile ? "mx-3 mb-4" : "mx-4 mb-8"}`}>
          <TabNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
            todoCount={todos.filter((t) => !t.isCompleted).length}
            reportCount={reports.length}
          />
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div
          className={`min-h-[60vh] ${isMobile ? "mb-20 px-3" : "mb-24 px-4"}`}
        >
          {activeTab === "todo" && (
            <TodoViewer
              todos={todos}
              categories={categories}
              onToggleComplete={handleToggleTodoComplete}
              onEditTodo={handleEditTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          )}

          {activeTab === "log" && (
            <ReportViewer
              reports={reports}
              delete_report={handleDeleteReport}
              edit_report={handleUpdateReport}
            />
          )}
        </div>

        {/* 플로팅 액션 버튼들 */}
        <div
          className={`fixed ${
            isMobile ? "bottom-4 right-4" : "bottom-8 right-8"
          } z-40`}
        >
          <div
            className={`flex ${
              isMobile
                ? "flex-col-reverse gap-3"
                : "flex-row gap-4 items-center"
            }`}
          >
            {/* 메인 추가 버튼 */}
            <button
              className={`flex items-center justify-center ${
                isMobile ? "w-14 h-14" : "w-16 h-16"
              } 
                bg-gradient-to-br from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 
                rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl
                border-2 border-white/20 group`}
              onClick={activeTab === "todo" ? handleAddTodo : handleAddReport}
              title={activeTab === "todo" ? "할일 추가" : "기록 추가"}
            >
              <Plus
                className={`${
                  isMobile ? "w-6 h-6" : "w-7 h-7"
                } text-white group-hover:rotate-180 transition-transform duration-300`}
              />
            </button>
          </div>
        </div>

        <SidebarMenu />

        {/* 할일 추가/수정 모달 */}
        {isTodoModalOpen && (
          <TodoForm
            isOpen={isTodoModalOpen}
            editTodo={editTodo}
            onSubmit={handleSaveTodo}
            onClose={() => setIsTodoModalOpen(false)}
          />
        )}

        {/* 기록 추가/수정 모달 */}
        {isReportModalOpen && (
          <ReportForm
            isOpen={isReportModalOpen}
            reports={reports}
            editReport={editReport}
            onSubmit={handleSaveReport}
            onClose={() => setIsReportModalOpen(false)}
          />
        )}

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";

import { ReportForm, ReportViewer } from "../components/report";
import { TodoForm, TodoViewer } from "../components/todo";
import {
  TabNavigation,
  SidebarMenu,
  AppHeader,
  FloatingActionButton,
} from "../components/common";
import { Loader } from "../components/ui";

import { ViewMode, Category } from "../types/Common";
import { useTodo } from "../hooks/todo/useTodo";
import { useReport } from "../hooks/report/useReport";
import { useIsMobile } from "../hooks/useBreakpoint";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewMode>("todo");
  const [categories, setCategories] = useState<Category[]>([]);

  const isMobile = useIsMobile();

  // 커스텀 훅 사용
  const {
    todos,
    editTodo,
    isTodoModalOpen,
    isLoading: todoLoading,
    fetchTodos,
    handleAddTodo,
    handleSaveTodo,
    handleEditTodo,
    handleDeleteTodo,
    handleToggleTodoComplete,
    closeTodoModal,
  } = useTodo();

  const {
    reports,
    editReport,
    isReportModalOpen,
    isLoading: reportLoading,
    fetchReports,
    handleAddReport,
    handleSaveReport,
    handleEditReport,
    handleDeleteReport,
    closeReportModal,
  } = useReport();

  const isLoading = todoLoading || reportLoading;

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([fetchTodos(), fetchReports()]);
    };
    fetchAllData();
  }, [fetchTodos, fetchReports]);

  const handleTabChange = (tab: ViewMode) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <div className="container mx-auto max-w-7xl">
        {/* 헤더 */}
        <AppHeader />

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
              edit_report={handleEditReport}
            />
          )}
        </div>

        {/* 플로팅 액션 버튼 */}
        <FloatingActionButton
          activeTab={activeTab}
          onTodoAdd={handleAddTodo}
          onReportAdd={handleAddReport}
        />

        <SidebarMenu />

        {/* 할일 추가/수정 모달 */}
        {isTodoModalOpen && (
          <TodoForm
            isOpen={isTodoModalOpen}
            editTodo={editTodo}
            onSubmit={handleSaveTodo}
            onClose={closeTodoModal}
          />
        )}

        {/* 기록 추가/수정 모달 */}
        {isReportModalOpen && (
          <ReportForm
            isOpen={isReportModalOpen}
            reports={reports}
            editReport={editReport}
            onSubmit={handleSaveReport}
            onClose={closeReportModal}
          />
        )}

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";

import { TodoForm, TodoViewer } from "../components/todo";
import {
  SidebarMenu,
  AppHeader,
  FloatingActionButton,
} from "../components/common";
import { Loader } from "../components/ui";

import { Category } from "../types/Common";
import { useTodo } from "../hooks/todo/useTodo";
import { useIsMobile } from "../hooks/useBreakpoint";

const Home: React.FC = () => {
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

  const isLoading = todoLoading;

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <div className="container mx-auto max-w-7xl">
        {/* 헤더 */}
        <AppHeader />

        {/* 메인 콘텐츠 영역 */}
        <div
          className={`min-h-[60vh] ${isMobile ? "mb-20 px-3" : "mb-24 px-4"}`}
        >
          <TodoViewer
            todos={todos}
            categories={categories}
            onToggleComplete={handleToggleTodoComplete}
            onEditTodo={handleEditTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>

        {/* 플로팅 액션 버튼 */}
        <FloatingActionButton onTodoAdd={handleAddTodo} />

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

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";

import { TodoForm, TodoViewer } from "../components/todo";
import {
  SidebarMenu,
  AppHeader,
  FloatingActionButton,
  SEOHead,
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
      <SEOHead 
        title="무료 할일 목록 앱 | 투두리스트 체크리스트 만들기 - Reportory"
        description="🔥 2024년 최고의 무료 할일 목록 앱! 투두리스트 작성부터 체크리스트 관리까지. 오늘 할일, 업무 일정을 쉽게 정리하고 생산성 UP! 지금 바로 사용해보세요."
        keywords="할일 목록, 투두리스트, 할일 앱, 무료 할일 관리, 체크리스트, 오늘 할일, 업무 관리, 일정 관리, 할일 정리, todo list, 할일 체크, 업무 효율, 생산성 앱, 할일 추천, 투두 앱, task manager, 일정표, 할일 플래너, 업무 플래너, 개인 일정"
        canonical="https://reportory.com/"
      />
      
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
        
        {/* SEO 최적화를 위한 숨겨진 콘텐츠 */}
        <div className="sr-only">
          <h1>무료 할일 목록 앱 - 투두리스트 체크리스트 만들기 | Reportory</h1>
          <p>
            🎯 2024년 최고의 무료 할일 목록 앱 Reportory! 투두리스트 작성, 할일 관리, 체크리스트 만들기를 
            쉽고 간편하게 할 수 있는 최고의 생산성 도구입니다. 오늘 할일부터 장기 프로젝트까지, 
            모든 업무와 개인 일정을 체계적으로 관리하세요.
          </p>
          
          <h2>인기 검색 기능들</h2>
          <ul>
            <li>📝 할일 목록 만들기 및 관리</li>
            <li>✅ 투두리스트 체크리스트 작성</li>
            <li>📊 오늘 할일 진행률 추적</li>
            <li>🗂️ 카테고리별 업무 분류</li>
            <li>📱 모바일 할일 앱 (안드로이드, iOS 지원)</li>
            <li>💼 업무 관리 및 일정 플래너</li>
            <li>🎯 개인 목표 설정 및 추적</li>
            <li>📈 생산성 분석 및 통계</li>
          </ul>
          
          <h3>왜 Reportory 할일 앱을 선택해야 할까요?</h3>
          <p>
            ✨ <strong>완전 무료</strong>: 평생 무료로 모든 기능 사용 가능<br/>
            🚀 <strong>쉬운 사용법</strong>: 복잡한 설정 없이 바로 할일 작성<br/>
            📱 <strong>모든 기기 지원</strong>: 스마트폰, 태블릿, PC에서 동기화<br/>
            🔒 <strong>데이터 보안</strong>: 개인정보 수집 없이 안전한 로컬 저장<br/>
            ⚡ <strong>빠른 속도</strong>: 즉시 로딩되는 가벼운 할일 앱
          </p>
          
          <h4>이런 분들께 추천합니다</h4>
          <ul>
            <li>📚 학생 - 과제 관리, 시험 일정 관리</li>
            <li>💼 직장인 - 업무 할일, 프로젝트 관리</li>
            <li>🏠 주부 - 가사일, 장보기 리스트</li>
            <li>👨‍💼 프리랜서 - 클라이언트 업무 추적</li>
            <li>🎯 개인 - 습관 형성, 목표 달성</li>
          </ul>
          
          <h5>투두리스트 앱 비교 - Reportory가 최고인 이유</h5>
          <p>
            다른 할일 관리 앱들과 달리, Reportory는 복잡한 회원가입이나 유료 결제 없이 
            모든 할일 관리 기능을 무료로 제공합니다. 노션, 트렐로, 투두이스트 같은 
            복잡한 도구 대신, 간단하고 직관적인 할일 목록으로 생산성을 높이세요.
          </p>
          
          <h6>검색 키워드</h6>
          <p>
            할일앱, 투두앱, 체크리스트앱, 일정관리앱, 업무관리앱, 할일정리, 
            투두리스트만들기, 할일목록만들기, 오늘할일, 내일할일, 주간할일, 
            월간할일, 할일추천, 생산성향상, 시간관리, 업무효율, 개인플래너
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

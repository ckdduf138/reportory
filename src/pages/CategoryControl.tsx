import React, { useEffect } from "react";

import { Loader } from "../components/ui";
import { SidebarMenu, AppHeader, SEOHead } from "../components/common";
import { CategoryList, CategoryModal } from "../components/category";

import { useIsMobile } from "../hooks/useBreakpoint";
import { useCategoryManagement } from "../hooks/useCategoryManagement";

const CategoryControl: React.FC = () => {
  const isMobile = useIsMobile();
  const {
    // Data
    categories,
    isLoading,

    // Modal state
    isModalOpen,
    categoryName,
    editingCategory,
    selectedColor,

    // Actions
    fetchCategories,
    handleSaveCategory,
    resetModal,
    startEdit,
    openCreateModal,
    handleDeleteCategory,

    // Setters
    setCategoryName,
    setSelectedColor,
  } = useCategoryManagement();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <SEOHead 
        title="할일 카테고리 관리 | 업무 분류 정리 도구 - Reportory"
        description="📂 할일을 효율적으로 분류하는 카테고리 관리! 업무별, 프로젝트별로 할일을 정리하고 색상으로 구분하세요. 체계적인 할일 관리의 시작입니다."
        keywords="할일 카테고리, 업무 분류, 프로젝트 분류, 할일 정리, 업무 관리, 색상 태그, 카테고리 만들기, 할일 그룹, 업무 그룹, task category, 할일 폴더"
        canonical="https://reportory.com/category"
      />
      
      <div className="container mx-auto max-w-4xl">
        <AppHeader
          title="카테고리 관리"
          subtitle="할일과 기록에 사용할 카테고리를 관리하세요"
        />

        {/* 카테고리 목록 */}
        <div className={`${isMobile ? "px-4" : "px-6"} pb-24`}>
          <CategoryList
            categories={categories}
            onEdit={startEdit}
            onDelete={handleDeleteCategory}
            onAddClick={openCreateModal}
          />
        </div>

        {/* 카테고리 추가/수정 모달 */}
        <CategoryModal
          isOpen={isModalOpen}
          editingCategory={editingCategory}
          categoryName={categoryName}
          selectedColor={selectedColor}
          onClose={resetModal}
          onSave={handleSaveCategory}
          onCategoryNameChange={setCategoryName}
          onColorChange={setSelectedColor}
        />

        <SidebarMenu />
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default CategoryControl;

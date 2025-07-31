import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Check, X, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Loader, SimpleColorPicker } from "../components/ui";
import { SidebarMenu, AppHeader } from "../components/common";

import { Category, DefaultCategoryColor } from "../types/Common";
import { useIsMobile, useResponsiveValue } from "../hooks/useBreakpoint";
import { useCategory } from "../hooks/useCategory";

const CategoryControl: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const responsiveValue = useResponsiveValue({
    mobile: 1,
    tablet: 2,
    desktop: 3,
  });

  const {
    categories,
    isLoading,
    fetchCategories,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  } = useCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editedName, setEditedName] = useState("");
  const [selectedColor, setSelectedColor] =
    useState<string>(DefaultCategoryColor);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSaveCategory = async () => {
    if (!categoryName.trim()) return;

    const category: Category = {
      id: "",
      name: categoryName.trim(),
      color: selectedColor,
    };

    if (editingCategory) {
      await handleUpdateCategory({ ...category, id: editingCategory.id });
    } else {
      await handleCreateCategory(category);
    }

    resetModal();
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setCategoryName("");
    setEditingCategory(null);
    setSelectedColor(DefaultCategoryColor);
  };

  const startEdit = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setSelectedColor(category.color);
    setIsModalOpen(true);
  };

  const startInlineEdit = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditedName(category.name);
  };

  const saveInlineEdit = async () => {
    if (!editingCategoryId || !editedName.trim()) return;

    const categoryToUpdate = categories.find((c) => c.id === editingCategoryId);
    if (categoryToUpdate) {
      await handleUpdateCategory({
        ...categoryToUpdate,
        name: editedName.trim(),
      });
    }

    setEditingCategoryId(null);
    setEditedName("");
  };

  const cancelInlineEdit = () => {
    setEditingCategoryId(null);
    setEditedName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <div className="container mx-auto max-w-4xl">
        <AppHeader
          title="카테고리 관리"
          subtitle="할일과 기록에 사용할 카테고리를 관리하세요"
        />

        {/* 카테고리 목록 */}
        <div className={`${isMobile ? "px-4" : "px-6"} pb-24`}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  카테고리 목록
                </h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  추가
                </button>
              </div>

              {categories.length === 0 ? (
                <div className="text-center py-12">
                  <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">아직 카테고리가 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        {editingCategoryId === category.id ? (
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveInlineEdit();
                              if (e.key === "Escape") cancelInlineEdit();
                            }}
                          />
                        ) : (
                          <span className="font-medium text-gray-800">
                            {category.name}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {editingCategoryId === category.id ? (
                          <>
                            <button
                              onClick={saveInlineEdit}
                              className="p-1 text-green-600 hover:bg-green-100 rounded"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelInlineEdit}
                              className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startInlineEdit(category)}
                              className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 카테고리 추가/수정 모달 */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  {editingCategory ? "카테고리 수정" : "카테고리 추가"}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카테고리 이름
                    </label>
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="카테고리 이름을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      색상
                    </label>
                    <SimpleColorPicker
                      selectedColor={selectedColor}
                      onColorChange={setSelectedColor}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={resetModal}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSaveCategory}
                    disabled={!categoryName.trim()}
                    className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-300 transition-colors"
                  >
                    {editingCategory ? "수정" : "추가"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <SidebarMenu />
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default CategoryControl;

import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Check, X, Tag } from "lucide-react";

import Loader from "../components/Loader";
import { toast } from "../components/toastContainer";
import SidebarMenu from "../components/SidebarMenu";
import ColorPicker from "../components/ColorPicker";

import { generateUUID } from "../utils/transalte";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../utils/stores/categoryUtils";

import { Category, DefaultCategoryColor } from "../types/Common";
import { useIsMobile, useResponsiveValue } from "../hooks/useBreakpoint";
import { useNavigate } from "react-router-dom";

const CategoryControl: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editedName, setEditedName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const gridCols = useResponsiveValue({
    mobile: 1,
    tablet: 2,
    desktop: 3,
  });

  useEffect(() => {
    fetchReportAll();
  }, []);

  const fetchReportAll = async () => {
    const data = await getCategory();
    setCategories(data);
  };

  // 모달 열기
  const openModal = (category?: Category) => {
    setEditingCategory(category || null);
    setCategoryName(category?.name || "");
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryName("");
    setEditingCategory(null);
  };

  // 카테고리 저장
  const handleSaveCategory = async (category: Category) => {
    setIsLoading(true);

    let response: string = "";
    try {
      if (category.id) {
        response = await updateCategory({ ...category });
      } else {
        const newCategory: Category = {
          ...category,
          id: generateUUID(),
          color: DefaultCategoryColor,
        };
        response = await createCategory(newCategory);
      }

      toast.success(response);
    } catch (error: any) {
      toast.error(error);
    } finally {
      await fetchReportAll();
      setIsLoading(false);
      setIsModalOpen(false);
    }

    closeModal();
  };

  // 카테고리 삭제
  const handleDeleteCategory = async (id: string) => {
    setIsLoading(true);

    try {
      const response = await deleteCategory(id);
      toast.success(response);
    } catch (error: any) {
      toast.error(error);
    } finally {
      await fetchReportAll();
      setIsLoading(false);
    }
  };

  const startEditingCategory = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditedName(category.name);
  };

  const saveEditedCategory = (category: Category) => {
    if (editedName.trim()) {
      if (editedName === category.name) return;

      handleSaveCategory({
        ...category,
        name: editedName,
      });
    }
    setEditingCategoryId(null);
    setEditedName("");
  };

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
              <Tag
                className={`${isMobile ? "w-5 h-5" : "w-8 h-8"} text-white`}
              />
            </div>
            <div>
              <h1
                className={`${
                  isMobile ? "text-xl" : "text-4xl"
                } font-bold text-gray-900`}
              >
                카테고리 관리
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
            카테고리를 추가하고 관리하세요
          </p>
        </div>

        {/* 메인 컨텐츠 */}
        <div className={`${isMobile ? "px-3 pb-24" : "px-4 pb-24"}`}>
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <Tag
                className={`${
                  isMobile ? "w-12 h-12" : "w-16 h-16"
                } text-gray-400 mx-auto mb-4`}
              />
              <h3
                className={`${
                  isMobile ? "text-lg" : "text-xl"
                } font-semibold text-gray-600 mb-2`}
              >
                카테고리가 없습니다
              </h3>
              <p className={`text-gray-500 mb-6 ${isMobile ? "text-sm" : ""}`}>
                첫 번째 카테고리를 추가해보세요
              </p>
            </div>
          ) : (
            <div
              className={`grid ${isMobile ? "gap-3" : "gap-4"} mt-4`}
              style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
            >
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`bg-white rounded-xl border border-gray-200 shadow-sm 
                    hover:shadow-md transition-all duration-200 overflow-hidden
                    ${
                      editingCategoryId === category.id
                        ? "ring-2 ring-teal-200"
                        : ""
                    }`}
                >
                  {/* 편집 모드일 때는 다른 레이아웃 사용 */}
                  {editingCategoryId === category.id ? (
                    <div className={`${isMobile ? "p-3" : "p-4"} space-y-3`}>
                      {/* 편집 중인 이름 입력 */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className={`text-xs text-gray-500 font-medium`}>
                            이름 편집
                          </span>
                        </div>
                        <input
                          className={`w-full ${
                            isMobile ? "px-3 py-2 text-sm" : "px-3 py-2"
                          } 
                            border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                            transition-all duration-200`}
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              saveEditedCategory(category);
                            }
                            if (e.key === "Escape") {
                              setEditingCategoryId(null);
                              setEditedName("");
                            }
                          }}
                          placeholder="카테고리 이름"
                          autoFocus
                        />
                      </div>

                      {/* 색상 선택 */}
                      <div className="space-y-2">
                        <span className="text-xs text-gray-500 font-medium">
                          색상 선택
                        </span>
                        <ColorPicker
                          category={category}
                          updateCategory={handleSaveCategory}
                        />
                      </div>

                      {/* 액션 버튼 */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => {
                            setEditingCategoryId(null);
                            setEditedName("");
                          }}
                          className={`${
                            isMobile ? "px-3 py-1.5 text-sm" : "px-4 py-2"
                          } 
                            text-gray-600 bg-gray-100 hover:bg-gray-200 
                            rounded-lg transition-colors duration-200`}
                        >
                          취소
                        </button>
                        <button
                          onClick={() => saveEditedCategory(category)}
                          disabled={!editedName.trim()}
                          className={`${
                            isMobile ? "px-3 py-1.5 text-sm" : "px-4 py-2"
                          } 
                            ${
                              editedName.trim()
                                ? "bg-teal-500 hover:bg-teal-600 text-white"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            } rounded-lg transition-colors duration-200 font-medium`}
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* 일반 모드 */
                    <div className={`${isMobile ? "p-3" : "p-4"}`}>
                      {/* 상단: 이름과 액션 버튼 */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div
                            className={`${
                              isMobile ? "w-3 h-3" : "w-4 h-4"
                            } rounded-full flex-shrink-0`}
                            style={{ backgroundColor: category.color }}
                          />
                          <span
                            className={`font-medium text-gray-800 truncate 
                            ${isMobile ? "text-sm" : ""}`}
                          >
                            {category.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => startEditingCategory(category)}
                            className={`${
                              isMobile ? "p-1.5" : "p-2"
                            } text-gray-500 
                              hover:bg-gray-50 hover:text-teal-600 
                              rounded-lg transition-colors duration-200`}
                          >
                            <Edit2
                              className={`${
                                isMobile ? "w-3.5 h-3.5" : "w-4 h-4"
                              }`}
                            />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className={`${
                              isMobile ? "p-1.5" : "p-2"
                            } text-gray-500 
                              hover:bg-red-50 hover:text-red-600 
                              rounded-lg transition-colors duration-200`}
                          >
                            <Trash2
                              className={`${
                                isMobile ? "w-3.5 h-3.5" : "w-4 h-4"
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* 하단: 색상 선택기 (컴팩트) */}
                      <div className="pt-2 border-t border-gray-100">
                        <ColorPicker
                          category={category}
                          updateCategory={handleSaveCategory}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 플로팅 액션 버튼 */}
        <div
          className={`fixed ${
            isMobile ? "bottom-4 right-4" : "bottom-6 right-6"
          } z-40`}
        >
          <button
            onClick={() => openModal()}
            className={`flex items-center ${isMobile ? "gap-2" : "gap-3"} 
              bg-gradient-to-r from-teal-500 to-cyan-500 
              text-white ${isMobile ? "px-4 py-3" : "px-6 py-4"} rounded-full 
              shadow-lg hover:shadow-xl 
              active:scale-95 transition-all duration-200 group`}
          >
            <Plus
              className={`${
                isMobile ? "w-5 h-5" : "w-6 h-6"
              } group-hover:rotate-180 transition-transform duration-300`}
            />
            {!isMobile && <span className="font-semibold">카테고리 추가</span>}
          </button>
        </div>

        {/* 카테고리 추가/수정 모달 */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
            <div
              className={`bg-white rounded-xl shadow-2xl ${
                isMobile ? "w-full max-w-sm mx-4" : "w-96"
              } 
                transform transition-all duration-300 scale-100 max-h-[90vh] overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 모달 헤더 */}
              <div
                className={`flex items-center justify-between ${
                  isMobile ? "p-4" : "p-6"
                } border-b border-gray-200`}
              >
                <h3
                  className={`${
                    isMobile ? "text-lg" : "text-xl"
                  } font-bold text-gray-900`}
                >
                  {editingCategory ? "카테고리 수정" : "카테고리 추가"}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* 모달 본문 */}
              <div className={`${isMobile ? "p-4" : "p-6"}`}>
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block ${
                        isMobile ? "text-sm" : "text-sm"
                      } font-medium text-gray-700 mb-2`}
                    >
                      카테고리 이름
                    </label>
                    <input
                      className={`w-full ${
                        isMobile ? "px-3 py-2.5 text-sm" : "px-4 py-3"
                      } 
                        border border-gray-300 rounded-xl
                        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                        transition-all duration-200`}
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="카테고리 이름을 입력하세요"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && categoryName.trim()) {
                          handleSaveCategory({
                            ...editingCategory,
                            name: categoryName,
                          } as Category);
                        }
                      }}
                      autoFocus
                    />
                  </div>
                </div>
              </div>

              {/* 모달 푸터 */}
              <div
                className={`flex items-center justify-end gap-3 ${
                  isMobile ? "p-4" : "p-6"
                } border-t border-gray-200`}
              >
                <button
                  onClick={closeModal}
                  className={`${isMobile ? "px-3 py-2 text-sm" : "px-4 py-2"} 
                    text-gray-700 bg-gray-100 hover:bg-gray-200 
                    rounded-lg transition-colors`}
                >
                  취소
                </button>
                <button
                  onClick={() =>
                    handleSaveCategory({
                      ...editingCategory,
                      name: categoryName,
                    } as Category)
                  }
                  disabled={!categoryName.trim()}
                  className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-2"} 
                    rounded-lg font-medium transition-all duration-200
                    ${
                      categoryName.trim()
                        ? "bg-teal-500 hover:bg-teal-600 text-white shadow-md hover:shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {editingCategory ? "수정" : "추가"}
                </button>
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

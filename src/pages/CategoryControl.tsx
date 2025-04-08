import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";
import { toast } from "../components/toastContainer";
import SidebarMenu from "../components/SidebarMenu";
import ColorPicker from "../components/ColorPicker";

import { generateUUID } from "../utils/transalte";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../utils/stores/categoryUtils";

import { Category, DefaultCategoryColor } from "../types/Common";


const CategoryControl: React.FC = () =>  {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');

  const [isLoading, setIsLoading] = useState(false);

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
    
    let response: string = '';
    try {
      if(category.id) {
        response = await updateCategory({...category});
      }
      else {
        const newCategory: Category = {...category, id: generateUUID(), color: DefaultCategoryColor};
        response = await createCategory(newCategory);
      }
  
      toast.success(response);
    } catch (error: any) {
      toast.error(error);
    }
    finally {
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
    }
    finally {
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
      if(editedName === category.name) return;
      
      handleSaveCategory({
        ...category,
        name: editedName,
      });
    }
    setEditingCategoryId(null);
    setEditedName('');
  };

  return (
    <div className="flex flex-col min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center text-black">카테고리 관리</h1>

      {/* 카테고리 리스트 */}
      <div className="flex flex-col flex-grow">
        <ul className="my-6 bg-white rounded-lg shadow-md divide-y">
          {categories.map((category) => (
            <li key={category.id} className="flex justify-between items-center py-3 px-4 space-x-4">
              {editingCategoryId === category.id ? (
                <input className="text-gray-900 font-medium flex-1 focus:outline-none"
                  type="text"
                  value={editedName}
                  autoFocus
                  onChange={(e) => setEditedName(e.target.value)}
                  onBlur={() => saveEditedCategory(category)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEditedCategory(category);
                  }}
                />
              ) : (
                <span
                  className="text-gray-900 font-medium flex-1 cursor-pointer"
                  onClick={() => startEditingCategory(category)}
                >
                  {category.name}
                </span>
              )}

              <ColorPicker category={category} updateCategory={handleSaveCategory} />
              <div className="flex gap-3">
                <button onClick={() => handleDeleteCategory(category.id)}>
                  <img src={`${process.env.PUBLIC_URL}/images/common/ic-trash-02.svg`} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 카테고리 추가 버튼 */}
      <div className="flex fixed bottom-0 left-0 w-full bg-white py-4 px-6 shadow-lg">
        <button className="flex w-full justify-center bg-black text-white py-4 rounded-lg text-lg font-semibold transition active:scale-95"
          onClick={() => openModal()}
        >
          <img src={`${process.env.PUBLIC_URL}/images/category/ic-plus-02.svg`} /> 카테고리 추가
        </button>
      </div>

      {/* 카테고리 추가하는 모달창 */}
      {isModalOpen && (
        <div className="flex fixed inset-0 items-center justify-center bg-black bg-opacity-40 border-2 backdrop-blur-md" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg" onClick={(e) => {e.stopPropagation()}}>
            <h3 className="text-lg font-semibold mb-6">{editingCategory ? "카테고리 수정" : "카테고리 추가"}</h3>
            
            <input className="w-full border rounded-lg p-3 focus:outline-none focus:ring-0 focus:border-black"
              type="text" 
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="카테고리 이름 입력.."
            />

            <div className="flex justify-between items-center mt-6">
              <button className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition active:scale-95" 
                onClick={closeModal}>취소
              </button>
              <button className={`px-6 py-2 rounded-lg shadow-md transition duration-300 active:scale-95
                ${categoryName ? 'bg-gray-700 hover:bg-gray-800 text-white': 'bg-gray-300 cursor-not-allowed'}`}
                disabled={!categoryName}
                onClick={() => handleSaveCategory({...editingCategory, name: categoryName} as Category)}>저장
              </button>
            </div>
          </div>
        </div>
      )}

      <SidebarMenu />
      {isLoading && <Loader />}
    </div>
  );
}

export default CategoryControl;

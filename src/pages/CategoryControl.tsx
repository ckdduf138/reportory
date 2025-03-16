import { useState } from "react";

import SidebarMenu from "../components/SidebarMenu";

interface Category {
  id: number;
  name: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "휴식" },
    { id: 2, name: "여가" },
    { id: 3, name: "자기계발" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

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
  const saveCategory = () => {
    if (!categoryName.trim()) return;
    
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) => (cat.id === editingCategory.id ? { ...cat, name: categoryName } : cat))
      );
    } else {
      setCategories((prev) => [
        ...prev,
        { id: Date.now(), name: categoryName },
      ]);
    }
    
    closeModal();
  };

  // 카테고리 삭제
  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-black">카테고리 관리</h1>

      {/* 카테고리 리스트 */}
      <ul className="my-6 bg-white rounded-lg shadow-md divide-y">
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center py-3 px-4">
            <span className="text-gray-900 font-medium">{category.name}</span>
            <div className="flex gap-3">
              <button onClick={() => openModal(category)} className="text-gray-500 hover:text-blue-500 transition">
                <img src={`${process.env.PUBLIC_URL}/images/category/ic-edit-02.svg`} />
              </button>
              <button onClick={() => deleteCategory(category.id)} className="text-gray-500 hover:text-red-500 transition">
              <img src={`${process.env.PUBLIC_URL}/images/category/ic-trash-02.svg`} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 카테고리 추가 버튼 */}
      <button 
        className="mt-4 w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg text-lg font-semibold active:scale-95 transition"
        onClick={() => openModal()}
      >
        <img src={`${process.env.PUBLIC_URL}/images/category/ic-plus-02.svg`} /> 카테고리 추가
      </button>

      <SidebarMenu />

      {/* 카테고리 추가하는 모달창 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 border-2 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-6">{editingCategory ? "카테고리 수정" : "카테고리 추가"}</h3>
            
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-0 focus:border-black"
              placeholder="카테고리 이름 입력.."
            />

            <div className="flex justify-between items-center mt-6">
              <button className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300" 
                onClick={closeModal}>취소
              </button>
              <button
                className={`px-6 py-2 rounded-lg shadow-md transition duration-300 ${
                  categoryName
                    ? 'bg-gray-700 hover:bg-gray-800 text-white'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={!categoryName}
                onClick={saveCategory}>저장
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

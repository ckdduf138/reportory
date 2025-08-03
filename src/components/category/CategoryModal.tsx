import React from "react";
import { SimpleColorPicker } from "../ui";
import { CategoryModalProps } from "../../types/Category";

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  editingCategory,
  categoryName,
  selectedColor,
  onClose,
  onSave,
  onCategoryNameChange,
  onColorChange,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onSave();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">
            {editingCategory ? "카테고리 수정" : "카테고리 추가"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리 이름
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => onCategoryNameChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="카테고리 이름을 입력하세요"
                maxLength={20}
                autoFocus
              />
              <div className="mt-1 text-xs text-gray-500">
                {categoryName.length}/20자
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                색상
              </label>
              <SimpleColorPicker
                selectedColor={selectedColor}
                onColorChange={onColorChange}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={!categoryName.trim()}
                className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {editingCategory ? "수정" : "추가"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// 색상 밝기 계산 함수
const getBrightness = (hexColor: string) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
};

export default CategoryModal;

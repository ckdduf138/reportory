import React from "react";
import { Plus } from "lucide-react";
import { CategoryListProps } from "../../types/Category";
import CategoryItem from "./CategoryItem";

const CategoryList: React.FC<
  CategoryListProps & { onAddClick: () => void }
> = ({ categories, onEdit, onDelete, onAddClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">카테고리 목록</h2>
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            추가
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">아직 카테고리가 없습니다.</p>
            <p className="text-sm text-gray-400 mt-2">
              새 카테고리를 추가해보세요.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;

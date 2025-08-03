import React from "react";
import { Plus, Package } from "lucide-react";
import { CategoryListProps } from "../../types/Category";
import CategoryItem from "./CategoryItem";

const CategoryList: React.FC<
  CategoryListProps & { onAddClick: () => void }
> = ({ categories, onEdit, onDelete, onAddClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6 gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Package className="w-6 h-6 text-teal-600 flex-shrink-0" />
            <h2 className="text-xl font-bold text-gray-800 truncate">
              카테고리 목록
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
              {categories.length}개
            </span>
          </div>
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-sm hover:shadow-md flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">카테고리 </span>추가
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 font-medium">
              아직 카테고리가 없습니다.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              새 카테고리를 추가하여 할일을 분류해보세요.
            </p>
            <button
              onClick={onAddClick}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              첫 번째 카테고리 추가하기
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="animate-in slide-in-from-top duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CategoryItem
                  category={category}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;

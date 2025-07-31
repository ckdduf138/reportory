import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { CategoryItemProps } from "../../types/Category";

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        <span className="font-medium text-gray-800">{category.name}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(category)}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
          title="수정"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
          title="삭제"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;

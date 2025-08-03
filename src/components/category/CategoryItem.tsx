import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { CategoryItemProps } from "../../types/Category";
import { useIsMobile } from "../../hooks/useBreakpoint";

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div
          className="w-4 h-4 rounded-full flex-shrink-0"
          style={{ backgroundColor: category.color }}
        />
        <span
          className="font-medium text-gray-800 truncate"
          title={category.name}
        >
          {category.name}
        </span>
      </div>

      <div
        className={`flex items-center gap-2 flex-shrink-0 ${
          isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        } transition-opacity`}
      >
        <button
          onClick={() => onEdit(category)}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
          title="수정"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
          title="삭제"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;

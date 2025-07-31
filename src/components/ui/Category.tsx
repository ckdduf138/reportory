import { Category } from "../../types/Common";

interface CategoryProps {
  category: Category;
}

const CategoryComponent: React.FC<CategoryProps> = ({ category }) => {
  if (!category) return null;

  return (
    <div className="mt-2 text-sm text-gray-600">
      <span
        className="px-2 py-1 rounded"
        style={{ backgroundColor: category.color, color: "#ffffff" }}
      >
        {category.name}
      </span>
    </div>
  );
};

export default CategoryComponent;

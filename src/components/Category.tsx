import React, { ReactNode } from "react";

interface CategoryProps {
  children: ReactNode;
  categoryColorCode?: string;
}

const Category: React.FC<CategoryProps> = ({ children, categoryColorCode }) => {
  if (!children) return null;

  return (
    <div className="mt-2 text-sm text-gray-600">
        <span className="px-2 py-1 rounded" 
        style={{ backgroundColor: categoryColorCode, color: "#fff" }}>{children}</span>
    </div>
  );
};

export default Category;

import { Category } from "../../types/Common";

interface CategoryProps {
  category: Category;
}

const CategoryComponent: React.FC<CategoryProps> = ({ category }) => {
  if (!category) return null;

  // 색상의 밝기를 계산하여 텍스트 색상을 결정
  const getTextColor = (hexColor: string) => {
    // hex 색상을 RGB로 변환
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // 밝기 계산 (0.299*R + 0.587*G + 0.114*B)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // 밝기가 128보다 크면 검은색, 작으면 흰색
    return brightness > 128 ? "#000000" : "#ffffff";
  };

  const textColor = getTextColor(category.color);

  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium truncate max-w-[120px]"
      style={{
        backgroundColor: category.color,
        color: textColor,
      }}
      title={category.name}
    >
      {category.name}
    </span>
  );
};

export default CategoryComponent;

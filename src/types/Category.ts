import { Category } from "./Common";

export interface CategoryModalProps {
  isOpen: boolean;
  editingCategory: Category | null;
  categoryName: string;
  selectedColor: string;
  onClose: () => void;
  onSave: () => void;
  onCategoryNameChange: (name: string) => void;
  onColorChange: (color: string) => void;
}

export interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

export interface CategoryItemProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

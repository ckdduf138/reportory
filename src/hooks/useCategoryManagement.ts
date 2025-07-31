import { useState } from "react";
import { Category, DefaultCategoryColor } from "../types/Common";
import { useCategory } from "./useCategory";

export const useCategoryManagement = () => {
  const {
    categories,
    isLoading,
    fetchCategories,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  } = useCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedColor, setSelectedColor] =
    useState<string>(DefaultCategoryColor);

  const handleSaveCategory = async () => {
    if (!categoryName.trim()) return;

    const category: Category = {
      id: "",
      name: categoryName.trim(),
      color: selectedColor,
    };

    if (editingCategory) {
      await handleUpdateCategory({ ...category, id: editingCategory.id });
    } else {
      await handleCreateCategory(category);
    }

    resetModal();
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setCategoryName("");
    setEditingCategory(null);
    setSelectedColor(DefaultCategoryColor);
  };

  const startEdit = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setSelectedColor(category.color);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setIsModalOpen(true);
  };

  return {
    // Data
    categories,
    isLoading,

    // Modal state
    isModalOpen,
    categoryName,
    editingCategory,
    selectedColor,

    // Actions
    fetchCategories,
    handleSaveCategory,
    resetModal,
    startEdit,
    openCreateModal,
    handleDeleteCategory,

    // Setters
    setCategoryName,
    setSelectedColor,
  };
};

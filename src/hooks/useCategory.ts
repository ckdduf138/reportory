import { useState, useCallback } from "react";
import { Category } from "../types/Common";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../utils/stores/categoryUtils";
import { generateUUID } from "../utils/transalte";
import { toast } from "../components/ui/toastContainer";

export const useCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    const data = await getCategory();
    setCategories(data);
  }, []);

  const handleCreateCategory = useCallback(
    async (category: Category) => {
      setIsLoading(true);
      try {
        const newCategory = { ...category, id: generateUUID() };
        const response = await createCategory(newCategory);
        toast.success(response);
        await fetchCategories();
      } catch (error: any) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCategories]
  );

  const handleUpdateCategory = useCallback(
    async (category: Category) => {
      setIsLoading(true);
      try {
        const response = await updateCategory(category);
        toast.success(response);
        await fetchCategories();
      } catch (error: any) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCategories]
  );

  const handleDeleteCategory = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        const response = await deleteCategory(id);
        toast.success(response);
        await fetchCategories();
      } catch (error: any) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCategories]
  );

  return {
    categories,
    isLoading,
    fetchCategories,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  };
};

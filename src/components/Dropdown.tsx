import React, { useEffect, useState } from "react";
import { Category } from "../types/Common";
import { getCategory } from "../utils/stores/categoryUtils";

interface DropdownProps {
  category?: Category;
  handleSetCategory: React.Dispatch<React.SetStateAction<string | Category>>
};

const Dropdown: React.FC<DropdownProps> = ({category, handleSetCategory}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if(category) {
      setCurrentCategory(category);
    }

    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        setCategories(data);
      } catch (error) {
        console.error("카테고리 로드 실패:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDropdownClick = (item: Category) => {
    setCurrentCategory(item);
    handleSetCategory(item);
    setIsOpen(false);
  };

  return (
    <div className="relative w-44">
      <button
        onClick={toggleDropdown}
        className="flex justify-between w-full p-3 pr-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-black text-sm text-center inline-flex items-center"
      >
        {currentCategory ? 
          <>
            <span className="text-gray-900 font-medium truncate">{currentCategory.name ?? '카테고리'}</span>
            <div className="relative flex flex-col items-center">
              <div
                className="w-5 h-5 rounded-full border border-gray-300 shadow-lg"
                style={{ backgroundColor: currentCategory.color }}/>
            </div>
          </> : '카테고리'
        }

        <svg className="absolute right-3 w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-10" 
        />

          <div className="absolute right-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {categories.map((item: Category) => (
                <li key={item.id} className="flex justify-between items-center py-2 px-4 space-x-4" onClick={() => handleDropdownClick(item)}>
                  <span className="text-gray-900 font-medium flex-1 truncate">{item.name}</span>
                  <div className="relative flex flex-col items-center">
                    <div
                      className="w-5 h-5 rounded-full border border-gray-300 shadow-lg"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </li>
                ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;

import React, { memo, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Overlay from "./Overlay";
import { useAdminCategories } from "../hooks/useAdminCategories";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { Dispatch, SetStateAction } from "react";

interface CategoriesPanelProps {
  categoryPanelHS: boolean;
  handleClosePopupHS: () => void;
  setSelectedCategory: Dispatch<SetStateAction<{category_id: string, category_name: string}>>;
  selectedCategory: any;
}

const CategoriesPanel: React.FC<CategoriesPanelProps> = memo(
  ({ categoryPanelHS, handleClosePopupHS, setSelectedCategory, selectedCategory }) => {
    const businessId = useSelector((state: RootState) => state.auth.user_id);
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState<string>("");
    const { data: adminCategories, isLoading } = useAdminCategories({
      search,
      page: 1,
      limit: 10000,
      business_id: businessId,
    });
    useEffect(() => {
      if (categoryPanelHS) {
        setTimeout(() => setIsVisible(true), 10);
      } else {
        setIsVisible(false);
      }
    }, [categoryPanelHS]);

    // Handle category selection
    const handleSelect = (id: string, title: string) => {
      setSelectedCategory({category_id: id, category_name: title});
      handleClosePopupHS(); // Close panel
    };
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };

    return (
      <>
        <Overlay isVisible={isVisible && categoryPanelHS} />
        <div
          className={`p-6 rounded-[32px] bg-white left-float-panel-target shadow-2xl transition-all duration-300 ${
            categoryPanelHS
              ? "left-float-panel-target-show"
              : "left-float-panel-target-hide"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-tight">
              Select Category
            </h3>
            <button
              onClick={handleClosePopupHS}
              className="p-2 bg-gray-100 rounded-xl cursor-pointer hover:bg-red-50 hover:text-red-500 transition-all"
            >
              <IoClose size={20} />
            </button>
          </div>

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-orange-500 outline-none font-semibold text-sm transition-all mb-4"
            placeholder="Search categories..."
          />

          <ul className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <p className="text-center text-gray-400 py-10">Loading...</p>
            ) : adminCategories?.data?.length > 0 ? (
              adminCategories.data.map((category: any, idx: any) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(category._id, category?.category_name)}
                  className={`px-4 py-3 rounded-xl cursor-pointer ${selectedCategory?.category_id == category?._id && 'bg-orange-600 text-white'} font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-all border border-transparent hover:border-orange-100 capitalize`}
                >
                  {category.category_name}
                </li>
              ))
            ) : (
              <p className="text-center text-gray-400 text-xs py-10 font-bold italic">
                No categories found
              </p>
            )}
          </ul>
        </div>
      </>
    );
  }
);

export default CategoriesPanel;

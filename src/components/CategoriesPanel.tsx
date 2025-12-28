import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Overlay from "./Overlay";

interface CategoriesPanelProps {
  categoryPanelHS: boolean;
  handleClosePopupHS: () => void;
  onSelectCategory: (categoryTitle: string) => void;
}

const data = [{ title: 'coding' }, { title: 'development' }, { title: 'design' }];

const CategoriesPanel: React.FC<CategoriesPanelProps> = ({
  categoryPanelHS,
  handleClosePopupHS,
  onSelectCategory
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (categoryPanelHS) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [categoryPanelHS]);

  // Handle category selection
  const handleSelect = (title: string) => {
    onSelectCategory(title); // Pass data to parent
    handleClosePopupHS();    // Close panel
  };

  // Filter data based on search input
  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Overlay isVisible={isVisible && categoryPanelHS} />
      <div
        className={`p-6 rounded-[32px] bg-white left-float-panel-target shadow-2xl transition-all duration-300 ${
          categoryPanelHS ? "left-float-panel-target-show" : "left-float-panel-target-hide"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800 uppercase tracking-tight">Select Category</h3>
          <button
            onClick={handleClosePopupHS}
            className="p-2 bg-gray-100 rounded-xl cursor-pointer hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <IoClose size={20} />
          </button>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-orange-500 outline-none font-semibold text-sm transition-all mb-4"
          placeholder="Search categories..."
        />

        <ul className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
          {filteredData.length > 0 ? (
            filteredData.map((list, idx) => (
              <li 
                key={idx}
                onClick={() => handleSelect(list.title)}
                className="px-4 py-3 rounded-xl cursor-pointer font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-all border border-transparent hover:border-orange-100 capitalize"
              >
                {list.title}
              </li>
            ))
          ) : (
            <p className="text-center text-gray-400 text-xs py-10 font-bold italic">No categories found</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default CategoriesPanel;
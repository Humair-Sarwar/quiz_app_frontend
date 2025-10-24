import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Overlay from "./Overlay";

interface CategoriesPanelProps {
  categoryPanelHS: boolean;
  handleClosePopupHS: ()=> void;
}
let data = [{
    title: 'coding',
    
}, {
    title: 'development'
}]
const CategoriesPanel: React.FC<CategoriesPanelProps> = ({
  categoryPanelHS,
  handleClosePopupHS
}) => {

      const [isVisible, setIsVisible] = useState<boolean>(false);
      useEffect(() => {
          // Slight delay to trigger CSS transition after mount
          setTimeout(() => setIsVisible(true), 10);
        }, []);


        const hanldeSelectCategory = ()=>{
            handleClosePopupHS()
        }
  return (
    <>
    <Overlay isVisible={isVisible} />
      <div
        className={`p-5 rounded-2xl bg-white left-float-panel-target ${
          categoryPanelHS ? "left-float-panel-target-show" : "left-float-panel-target-hide"
        }`}
      >
        <div className="relative">
          <button
          onClick={handleClosePopupHS}
            type="button"
            className="bg-[#cccccc8c] rounded-4xl absolute right-[-8px] top-[-8px] p-[3px] cursor-pointer transition-all text-black hover:bg-[#e04e00] hover:text-white"
          >
            <IoClose />
          </button>
        </div>
        <h3 className="text-[15px] text-start">Select Category</h3>
        <input
          type="text"
          id="quiz_title"
          className="mt-1 input-target-set-field w-full"
          placeholder="Search Category..."
        />
        <ul className="category-selection-list-target ">
            {data?.map((list)=>(
                <li className="py-3 inactive-target" onClick={()=> hanldeSelectCategory()}>{list?.title}</li>
            ))}
          
        </ul>
      </div>
    </>
  );
};

export default CategoriesPanel;

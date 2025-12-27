import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { IoClose } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { deleteCategory } from "../hooks/useAdminCategories";
import { handleError, handleSuccess } from "../toast";
import { useQueryClient } from "@tanstack/react-query";


interface DeletePopupProps {
  handleClosePopup: () => void;
  business_id?: string | null;
  id?: string; 
  selectedItems?: object[];
}

const DeletePopup: React.FC<DeletePopupProps> = ({ handleClosePopup, business_id, id, selectedItems }) => {
  const queryClient = useQueryClient();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const delCategory = deleteCategory();
  useEffect(() => {
    // Slight delay to trigger CSS transition after mount
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleClosePopup();
    }, 300); // match your transition duration
  };
  
  const handleDelete = ()=>{
    if((selectedItems?.length ?? 0) > 0){
      console.log(selectedItems, '[]]]]')
    }else{
      delCategory.mutate({business_id: business_id!, id: id!}, {
        onSuccess: ()=> {
          handleSuccess('Category Deleted Successfully!')
          queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
          handleCloseWithAnimation();
        },
        onError: () => {
          handleError("Something went wrong!");
        }
      })
    }
  }

  return (
    <>
      {/* Background overlay */}
      <Overlay isVisible={isVisible}/>

      {/* Popup container */}
      <div
        className={`fixed inset-0 flex items-center justify-center py-4 px-4 z-50 transition-all duration-300 ease-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-10"
        }`}
      >
        <div className="bg-white rounded-2xl text-center overflow-y-auto max-h-[100%] shadow-2xl p-6 sm:p-6 w-full lg:w-[500px] md:w-[500px] sm:w-[500px] relative transition-all duration-300 ease-in-out">
          <button
                type="button"
                onClick={handleCloseWithAnimation}
                className="bg-[#cccccc8c] rounded-4xl absolute right-3 top-3 p-[3px] cursor-pointer transition-all text-black hover:bg-[#e04e00] hover:text-white"
              >
                <IoClose />
              </button>
              <div className="flex justify-center items-center"><RxCrossCircled className="text-[80px] text-[#ff225d]"/></div>
                <h3 className="text-[25px] my-3">Are you sure?</h3>
                <p className="text-[#888]">Do you really want to delete this record?</p>
                <div className="mt-4 flex justify-center gap-3">
                    <button onClick={handleCloseWithAnimation} className="bg-gray-300 text-white py-3 px-6 rounded-[8px] cursor-pointer transition-all hover:bg-gray-400">Cancel</button>
                    <button onClick={handleDelete} className="bg-[#ff225d] text-white py-3 px-6 rounded-[8px] cursor-pointer transition-all hover:bg-[#c61746]">Delete</button>
                </div>
        </div>
      </div>
    </>
  );
};

export default DeletePopup;

import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import my_pic from "../assets/images/my-pic.jpg";
import { IoCameraSharp } from "react-icons/io5";
import "react-phone-input-2/lib/style.css";
import { IoMdAdd } from "react-icons/io";


interface AddUpdateCategoryProps {
  handleClosePopup: () => void;
  component_type: number
}

const AddUpdateCategory: React.FC<AddUpdateCategoryProps> = ({ handleClosePopup, component_type }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
        <div className="bg-white rounded-2xl overflow-y-auto max-h-[100%] shadow-2xl p-6 sm:p-6 w-full max-w-2xl relative transition-all duration-300 ease-in-out">
          <form action="">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-semibold flex items-center gap-2">
                {component_type == 1 ? <IoMdAdd /> : <MdEdit />} {component_type == 1 ? 'Create' : 'Update'} Category
              </h2>
              <button
                type="button"
                onClick={handleCloseWithAnimation}
                className="bg-[#cccccc8c] rounded-4xl p-[3px] cursor-pointer transition-all text-black hover:bg-[#e04e00] hover:text-white"
              >
                <IoClose />
              </button>
            </div>

            
<div className="flex justify-center items-center">
{/* Profile image */}
              <div className="relative mb-3 h-[100px] w-[100px] rounded-full border-4 border-white shadow-md group">
                <img
                  src={my_pic}
                  alt="Profile"
                  className="h-full w-full object-cover object-center rounded-full"
                />

                <label
                  htmlFor="profileUpload"
                  className="absolute bottom-[-2px] right-[-2px] z-30 bg-[#cccccc8c] hover:bg-[#e04e00] hover:text-white text-black p-1 rounded-full cursor-pointer shadow transition-all duration-300 flex items-center justify-center"
                >
                  <IoCameraSharp className="text-[18px]" />
                </label>

                <input
                  type="file"
                  id="profileUpload"
                  className="hidden"
                  onChange={() => console.log()}
                />
              </div>
</div>
              
          

            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-4">
                <label htmlFor="name" className="block">
                  Category Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Enter Category Name"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="slug" className="block">
                  Slug:
                </label>
                <input
                  type="text"
                  id="slug"
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Slug"
                />
              </div>
<div className="md:col-span-2">
                <label htmlFor="slug" className="block">
                  Sort Order:
                </label>
                <input
                  type="number"
                  id="slug"
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Sort Order"
                  value={1}
                />
              </div>
              
            </div>

            {/* Buttons */}
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseWithAnimation}
                className="rounded-[10px] border border-red-400 bg-transparent py-3 px-4 text-red-400 cursor-pointer hover:text-red-500 hover:border-red-500 transition-all"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-[10px] bg-green-400 py-3 px-4 text-white cursor-pointer hover:bg-green-600 transition-all"
              >
                {component_type == 1 ? 'Create' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUpdateCategory;

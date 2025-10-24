import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import bg from '../../assets/images/bg.jpg'
import ViewUserQuiz from "../../components/ViewUserQuiz";
import { MdDelete, MdOutlineContentCopy, MdPermMedia } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";

const Media: React.FC = () => {
  const [viewCustomerQuiz, setViewCustomerQuiz] = useState<boolean>(false);
  const handleClosePopup = () => {
    setViewCustomerQuiz(false);
  };
  return (
    <>
      <div className="p-5 lg:p-10 h-[calc(100vh - 60px)]">
        <div className="flex justify-between items-start flex-col lg:flex-row md:flex-row lg:items-center md:items-center">
          <h2 className="text-[20px] font-semibold flex items-center gap-2 mb-3 text-nowrap">
            <MdPermMedia className="text-[20px]" /> Media
          </h2>
         <button
                       className="primary-button flex items-center gap-2 w-full lg:w-auto md:w-auto justify-center"
                       onClick={() => {}}
                     >
                       <IoCloudUploadOutline />
                       Upload
                     </button>
        </div>

       <div className="p-4 bg-white rounded-[10px] mt-5 shadow">
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-4">
            <div className="rounded-[10px] h-[85px] overflow-hidden relative">
                <img src={bg} className="h-[100%] w-[100%] object-cover" alt="" />
                <div className="absolute left-[5px] top-[5px] flex gap-1">
                    <div className="bg-[#ffffff9c] rounded-[50%] p-[4px] cursor-pointer hover:bg-[#ffffffe3] transition-all"><MdOutlineContentCopy className="text-orange-500"/></div>
                    <div className="bg-[#ffffff9c] rounded-[50%] p-[4px] cursor-pointer hover:bg-[#ffffffe3] transition-all"><FaEye className="text-orange-500"/></div>
                    <div className="bg-[#ffffff9c] rounded-[50%] p-[4px] cursor-pointer hover:bg-[#ffffffe3] transition-all"><MdDelete className="text-orange-500"/></div>
                </div>
            </div>
             <div className="rounded-[10px] h-[85px] overflow-hidden relative">
                <img src={bg} className="h-[100%] w-[100%] object-cover" alt="" />
                <div className="absolute left-[5px] top-[5px] flex gap-1">
                    <div className="bg-[#ffffff9c] rounded-[50%] p-[4px] cursor-pointer hover:bg-[#ffffffe3] transition-all"><MdOutlineContentCopy className="text-orange-500"/></div>
                    <div className="bg-[#ffffff9c] rounded-[50%] p-[4px] cursor-pointer hover:bg-[#ffffffe3] transition-all"><FaEye className="text-orange-500"/></div>
                    <div className="bg-[#ffffff9c] rounded-[50%] p-[4px] cursor-pointer hover:bg-[#ffffffe3] transition-all"><MdDelete className="text-orange-500"/></div>
                </div>
            </div>
        </div>
       </div>

        <Pagination />
      </div>

      {viewCustomerQuiz && (
        <ViewUserQuiz
          handleClosePopup={handleClosePopup}
        />
      )}
      
    </>
  );
};

export default Media;

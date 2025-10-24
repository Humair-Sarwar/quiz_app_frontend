import React, { useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import Pagination from "../../components/Pagination";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddUpdateCategory from "../../components/AddUpdateCategory";
import { IoSearch } from "react-icons/io5";
import bg from '../../assets/images/bg.jpg'
import DeletePopup from "../../components/DeletePopup";

const Categories: React.FC = () => {
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<boolean>(false);
  const [deletePopup, setDeletPopup] = useState<boolean>(false);
  const handleClosePopup = () => {
    setAddCategory(false);
    setEditCategory(false);
    setDeletPopup(false);
  };
  return (
    <>
      <div className="p-5 lg:p-10 h-[calc(100vh - 60px)]">
        <div className="flex justify-between items-start flex-col lg:flex-row md:flex-row lg:items-center md:items-center">
          <h2 className="text-[20px] font-semibold flex items-center gap-2 mb-3">
            <AiFillProduct className="text-[20px]" /> Categories
          </h2>
          <div className="flex w-full justify-end gap-3 items-start flex-col lg:flex-row md:flex-row lg:items-center md:items-center">
            <div className="relative w-full lg:w-auto md:w-auto">
              <IoSearch className="absolute left-3 top-[50%] text-[20px] translate-y-[-50%]" />

              <input
                type="text"
                id="name"
                className="input-target-set-field w-full !ps-9"
                placeholder="Search Category..."
              />
            </div>

            <button
              className="primary-button flex items-center gap-2 w-full lg:w-auto md:w-auto justify-center"
              onClick={() => setAddCategory(true)}
            >
              <FaPlus />
              Add Category
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto mt-8">
          <div className="min-w-max border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100 text-gray-700 uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer accent-[#e04e00] border-gray-300 rounded focus:ring-[#e04e00]"
                    />
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">
                    Sort Order
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-[13px] capitalize whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-gray-800">
                <tr className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer accent-[#e04e00] border-gray-300 rounded focus:ring-[#e04e00]"
                    />
                  </td>
                  <td className="px-6 py-2 text-[13px] whitespace-nowrap">
                    <div className="w-[40px] h-[40px] rounded-3xl overflow-hidden border-1 border-dashed border-[#8d8d8d] object-cover">
                        <img src={bg} alt="" className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                    Coding
                  </td>
                  <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                    coding
                  </td>
                  <td className="px-6 py-4 text-[13px] whitespace-nowrap">1</td>
                  <td className="px-6  text-center">
                    <button
                      onClick={() => setEditCategory(true)}
                      className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                    >
                      <MdModeEdit className="text-[20px]" />
                    </button>
                    <button onClick={()=> setDeletPopup(true)} className="text-red-600 hover:text-red-800 transition cursor-pointer">
                      <MdDelete className="text-[20px]" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Pagination />
      </div>

      {addCategory && (
        <AddUpdateCategory
          component_type={1}
          handleClosePopup={handleClosePopup}
        />
      )}
      {editCategory && (
        <AddUpdateCategory
          component_type={2}
          handleClosePopup={handleClosePopup}
        />
      )}
      {deletePopup && <DeletePopup handleClosePopup={handleClosePopup}/>}
    </>
  );
};

export default Categories;

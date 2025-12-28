import React, { useState } from "react";
import { FaPlus, FaLayerGroup } from "react-icons/fa6";
import Pagination from "../../components/Pagination";
import { MdModeEdit, MdDelete, MdOutlineQuestionAnswer } from "react-icons/md";
import { IoSearch, IoCloudDoneOutline, IoEyeOutline } from "react-icons/io5";
import bg from '../../assets/images/bg.jpg'
import { RiListSettingsLine } from "react-icons/ri";
import AddUpdateQuiz from "../../components/AddUpdateQuiz";

const QuizList: React.FC = () => {
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
      <div className="p-4 lg:p-8 bg-slate-50/50 min-h-screen">
        {/* Page Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <span className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100 text-orange-500">
                <RiListSettingsLine size={24} />
              </span>
              Quiz Inventory
            </h2>
            <p className="text-slate-500 text-sm mt-1 ml-1">Manage, monitor and update your assessment modules.</p>
          </div>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
            <div className="relative group min-w-[280px]">
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all shadow-sm text-sm"
                placeholder="Search quiz title..."
              />
            </div>

            <button
              className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-200 transition-all active:scale-95 cursor-pointer"
              onClick={() => setAddCategory(true)}
            >
              <FaPlus /> Add New Quiz
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest">Preview</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest">Quiz Info</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest text-center">Questions</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {/* Sample Static Row */}
                <tr className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm group-hover:border-orange-200 transition-colors">
                      <img src={bg} alt="Quiz" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">Advanced React Patterns</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">Updated 2 days ago</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg w-fit">
                      <FaLayerGroup className="text-slate-400" /> Development
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700">
                      <MdOutlineQuestionAnswer className="text-orange-400" size={16}/> 15
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-700">
                      <IoCloudDoneOutline size={14} /> Published
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all cursor-pointer">
                        <IoEyeOutline size={18} />
                      </button>
                      <button
                        onClick={() => setEditCategory(true)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                      >
                        <MdModeEdit size={18} />
                      </button>
                      <button 
                        onClick={() => setDeletPopup(true)} 
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

           {/* {!isLoading && ( */}
          <div className="bg-slate-50/50 border-t border-slate-100 p-4">
            <Pagination
              // currentPage={data?.pagination?.currentPage}
              // clickNum={(d: number) => setPage(d)}
              // prevClick={() => setPage(page - 1)}
              // nextClick={() => setPage(page + 1)}
              // page={page}
              // totalPages={totalPages}
              // handlePageSize={(e: any) => {
              //   setPageSize(parseInt(e.target.value));
              //   setPage(1);
              // }}
              // totalItems={totalItems}
              // firstRecord={data?.pagination?.firstRecord}
              // lastRecord={data?.pagination?.lastRecord}
              // pageSize={pageSize}
            />
          </div>
        {/* )} */}
        </div>
      </div>

      {/* Conditional Modals */}
      {addCategory && (
        <AddUpdateQuiz
          component_type={1}
          handleClosePopup={handleClosePopup}
        />
      )}
      {editCategory && (
        <AddUpdateQuiz
          component_type={2}
          handleClosePopup={handleClosePopup}
        />
      )}
    </>
  );
};

export default QuizList;
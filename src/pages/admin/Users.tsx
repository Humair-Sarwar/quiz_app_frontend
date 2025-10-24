import React, { useState } from "react";
import { FaEye, FaUsers } from "react-icons/fa6";
import Pagination from "../../components/Pagination";
import { IoSearch } from "react-icons/io5";
import bg from '../../assets/images/bg.jpg'
import ViewUserQuiz from "../../components/ViewUserQuiz";

const Users: React.FC = () => {
  const [viewCustomerQuiz, setViewCustomerQuiz] = useState<boolean>(false);
  const handleClosePopup = () => {
    setViewCustomerQuiz(false);
  };
  return (
    <>
      <div className="p-5 lg:p-10 h-[calc(100vh - 60px)]">
        <div className="flex justify-between items-start flex-col lg:flex-row md:flex-row lg:items-center md:items-center">
          <h2 className="text-[20px] font-semibold flex items-center gap-2 mb-3 text-nowrap">
            <FaUsers className="text-[20px]" /> Users
          </h2>
          <div className="flex w-full justify-end gap-3 items-start flex-col lg:flex-row md:flex-row lg:items-center md:items-center">
            <div className="relative w-full lg:w-auto md:w-auto">
              <IoSearch className="absolute left-3 top-[50%] text-[20px] translate-y-[-50%]" />

              <input
                type="text"
                id="name"
                className="input-target-set-field w-full !ps-9"
                placeholder="Search User..."
              />
            </div>

          
          </div>
        </div>

        <div className="w-full overflow-x-auto mt-8">
          <div className="min-w-max border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100 text-gray-700 uppercase tracking-wide">
                <tr>
                 
                  <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">
                    Profile Image
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">
                    Cover Image
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">
                    Country
                  </th>
                   <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">
                    Take Quiz's
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-[13px] capitalize whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-gray-800">
                <tr className="hover:bg-gray-50 transition">
                 
                  <td className="px-6 py-2 text-[13px] whitespace-nowrap">
                    <div className="w-[40px] h-[40px] rounded-3xl overflow-hidden border-1 border-dashed border-[#8d8d8d] object-cover">
                        <img src={bg} alt="" className="h-full w-full object-cover" />
                    </div>
                  </td>
                   <td className="px-6 py-2 text-[13px] whitespace-nowrap">
                    <div className="w-[40px] h-[40px] rounded-3xl overflow-hidden border-1 border-dashed border-[#8d8d8d] object-cover">
                        <img src={bg} alt="" className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                    Ali
                  </td>
                  <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                    ali@gmail.com
                  </td>
                  <td className="px-6 py-4 text-[13px] whitespace-nowrap">0335454544</td>
                  <td className="px-6 py-4 text-[13px] whitespace-nowrap">Pakistan</td>
                   <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                    1
                   </td>
                  <td className="px-6  text-center">
                    <button
                      onClick={() => setViewCustomerQuiz(true)}
                      className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                    >
                      <FaEye className="text-[20px]" />
                    </button>
                   
                  </td>
                </tr>
              </tbody>
            </table>
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

export default Users;

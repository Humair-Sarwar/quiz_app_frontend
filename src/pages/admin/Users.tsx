import React, { useState } from "react";
import { FaEye, FaUsers } from "react-icons/fa6";
import {
  IoMailOutline,
  IoCallOutline,
  IoGlobeOutline,
  IoNewspaperOutline,
} from "react-icons/io5";
import Pagination from "../../components/Pagination";
import ViewUserQuiz from "../../components/ViewUserQuiz";
import { useAdminUsers } from "../../hooks/useAdminUsers";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import SearchInput from "../../components/SearchInput";
import no_image from "../../assets/images/no_image.png";
import { FiInbox } from "react-icons/fi";

const Users: React.FC = () => {
  const [viewCustomerQuiz, setViewCustomerQuiz] = useState<boolean>(false);
  const handleClosePopup = () => setViewCustomerQuiz(false);
  const [search, setSearch] = useState<string>("");
  const businessId = useSelector((state: RootState) => state.auth.user_id);
  const [id, setId] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useAdminUsers({
    search,
    page,
    limit: pageSize,
    business_id: businessId,
    type: 1,
  });

  const totalItems = data?.pagination?.totalItems;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const prevClick = () => setPage(page - 1);
  const nextClick = () => setPage(page + 1);
  const clickNum = (n: number) => setPage(n);
  const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value));
    setPage(1);
  };

  return (
    <>
      <div className="p-6 lg:p-10 min-h-screen bg-[#f8fafc]">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl text-white shadow-lg shadow-orange-200">
                <FaUsers size={24} />
              </div>
              Users List
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 ml-1">
              Total Members: {totalItems || 0}
            </p>
          </div>

          <div className="w-full md:w-80">
            <SearchInput
              placeholder={"Search by name or email..."}
              handleSearch={handleSearch}
            />
          </div>
        </div>

        {/* --- Table Container --- */}
        <div className="bg-white rounded-[24px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  {[
                    "Profile Image",
                    "Cover Image",
                    "Name",
                    "Email",
                    "Phone",
                    "Country",
                    "Take Quiz's",
                    "Action",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-5 text-left text-[12px] font-bold text-slate-400 uppercase tracking-tighter whitespace-nowrap"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  Array.from({ length: pageSize }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <td key={i} className="px-6 py-5">
                          <div className="h-4 bg-slate-100 rounded-md w-full"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : data?.data?.length > 0 ? (
                  data.data.map((user: any, index: number) => (
                    <tr
                      key={index}
                      className="hover:bg-orange-50/30 transition-colors group"
                    >
                      {/* Profile Image */}
                      <td className="px-6 py-4">
                        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100 group-hover:scale-110 transition-transform">
                          <img
                            src={
                              user?.image
                                ? `${import.meta.env.VITE_BASE_URL}/uploads/${
                                    user.image
                                  }`
                                : no_image
                            }
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Cover Image */}
                      <td className="px-6 py-4">
                        <div className="w-12 h-8 rounded-lg overflow-hidden border border-slate-100 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">
                          <img
                            src={
                              user?.cover_image
                                ? `${import.meta.env.VITE_BASE_URL}/uploads/${
                                    user.cover_image
                                  }`
                                : no_image
                            }
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 font-bold text-slate-700 whitespace-nowrap">
                        {user?.name || "N/A"}
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <IoMailOutline className="text-orange-400" />
                          {user?.email || "N/A"}
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <IoCallOutline className="text-slate-400" />
                          {user?.phone || "N/A"}
                        </div>
                      </td>

                      {/* Country 1 */}
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-slate-100 rounded-full text-[12px] font-bold text-slate-600 flex items-center w-fit gap-1">
                          <IoGlobeOutline size={14} /> {user?.country || "N/A"}
                        </span>
                      </td>

                      {/* Country 2 (Take Quiz's column as per your code) */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                          <IoNewspaperOutline className="text-orange-500" />
                          {user?.country || "N/A"}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => {
                            setViewCustomerQuiz(true);
                            setId(user?._id);
                          }}
                          className="p-2.5 bg-white border cursor-pointer border-slate-100 rounded-xl text-orange-500 shadow-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-90"
                          title="View Quiz"
                        >
                          <FaEye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                                    <td colSpan={8} className="py-20 text-center">
                                      <div className="flex flex-col items-center gap-3 text-slate-300">
                                        <FiInbox size={48} />
                                        <p className="text-slate-500 font-bold tracking-tight">No User Found</p>
                                      </div>
                                    </td>
                                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Pagination --- */}
        {!isLoading && (
          <div className="mt-6 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <Pagination
              currentPage={data?.pagination?.currentPage}
              clickNum={clickNum}
              prevClick={prevClick}
              nextClick={nextClick}
              page={page}
              totalPages={totalPages}
              handlePageSize={handlePageSize}
              totalItems={totalItems}
              firstRecord={data?.pagination?.firstRecord}
              lastRecord={data?.pagination?.lastRecord}
              pageSize={pageSize}
            />
          </div>
        )}
      </div>

      {viewCustomerQuiz && (
        <ViewUserQuiz id={id} handleClosePopup={handleClosePopup} />
      )}
    </>
  );
};

export default Users;

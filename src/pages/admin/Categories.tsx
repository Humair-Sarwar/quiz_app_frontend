import React, { useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import Pagination from "../../components/Pagination";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddUpdateCategory from "../../components/AddUpdateCategory";

import no_image from "../../assets/images/no_image.png";
import DeletePopup from "../../components/DeletePopup";
import { useAdminCategories } from "../../hooks/useAdminCategories";
import { handleError } from "../../toast";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import SearchInput from "../../components/SearchInput";

interface formDataProps {
  business_id?: string;
  category_name?: string;
  slug?: string;
  sort_order?: number;
  image: "";
}
interface SelectedItem {
  id: string;
  business_id: string;
}

const Categories: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const toggleSelectOne = (id: string, business_id: string) => {
    setSelectedItems((prev) => {
      const exists = prev.some((item) => item.id === id);

      if (exists) {
        return prev.filter((item) => item.id !== id);
      }

      return [...prev, { id, business_id }];
    });
  };

  const toggleSelectAll = () => {
    if (!data?.data) return;

    if (selectedItems.length === data.data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(
        data.data.map((item: any) => ({
          id: item._id,
          business_id: item.business_id,
        }))
      );
    }
  };

  const businessId = useSelector((state: RootState) => state.auth.user_id);
  const [id, setId] = useState("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
  const [formData, setFormData] = useState<formDataProps>({
    business_id: businessId || "",
    category_name: "",
    slug: "",
    sort_order: 1,
    image: "",
  });
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, error } = useAdminCategories({
    search,
    page,
    limit: pageSize,
    business_id: businessId,
  });

  const totalItems = data?.pagination?.totalItems;
  const totalPages = Math.ceil(totalItems / pageSize);
  if (error) {
    handleError("Something went wrong!");
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const prevClick = () => {
    setPage(page - 1);
  };
  const nextClick = () => {
    setPage(page + 1);
  };
  const clickNum = (data: number) => {
    setPage(data);
  };
  const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value));
    setPage(1);
  };

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
      <div className="p-5 lg:p-10 h-[100%]">
        <div className="flex mb-8 justify-between items-start flex-col lg:flex-row md:flex-row lg:items-center md:items-center">
          <h2 className="text-[20px] font-semibold flex items-center gap-2 mb-3">
            <AiFillProduct className="text-[20px]" /> Categories
          </h2>
          <div className="flex w-full justify-end gap-3 items-start flex-col lg:flex-row md:flex-row lg:items-center md:items-center">
            <SearchInput
              placeholder={"Search Category..."}
              handleSearch={handleSearch}
            />
            <button
              className="primary-button flex items-center gap-2 w-full lg:w-auto md:w-auto justify-center"
              onClick={() => {
                setAddCategory(true);
                setFormData((prev) => ({ ...prev, business_id: businessId! }));
              }}
            >
              <FaPlus />
              Add Category
            </button>
          </div>
        </div>
        {selectedItems.length > 0 && (
          <button
            onClick={() => {
              setDeletPopup(true);
            }}
            className="text-red-600 flex items-center mb-2 hover:text-red-800 transition cursor-pointer"
          >
            <MdDelete className="text-[20px]" />{" "}
            <span className="text-[11px]">Delete Selected Categories</span>
          </button>
        )}

        <div className="w-full overflow-x-auto">
          <div className="min-w-max border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100 text-gray-700 uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-3 text-left flex items-center font-semibold text-[13px] capitalize whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={
                        data?.data?.length > 0 &&
                        selectedItems.length === data.data.length
                      }
                      className="w-4 h-4 cursor-pointer accent-[#e04e00]"
                      onChange={toggleSelectAll}
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
                {isLoading ? (
                  Array.from({ length: pageSize }).map((_, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                        <div className="animate-pulse space-y-4">
                          <div className="h-[17px] bg-gray-200 rounded w-[17px]"></div>
                        </div>
                      </td>
                      <td className="px-6 py-2 text-[13px] whitespace-nowrap">
                        <div className="w-[40px] h-[40px] rounded-3xl overflow-hidden border-[#8d8d8d] object-cover">
                          <div className="animate-pulse space-y-4">
                            <div className="h-45 bg-gray-200 rounded w-full"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                        <div className="animate-pulse space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                        <div className="animate-pulse space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                        <div className="animate-pulse space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </div>
                      </td>
                      <td className="px-6  text-center">
                        <div className="animate-pulse flex gap-2 justify-center items-center">
                          <div className="h-4 bg-gray-200 rounded w-4"></div>
                          <div className="h-4 bg-gray-200 rounded w-4"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : data?.data.length > 0 ? (
                  data?.data?.map((category: any, index: any) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedItems.some(
                            (i) => i.id === category._id
                          )}
                          onChange={() =>
                            toggleSelectOne(category._id, category.business_id)
                          }
                          className="w-4 h-4 cursor-pointer accent-[#e04e00]"
                        />
                      </td>
                      <td className="px-6 py-2 text-[13px] whitespace-nowrap">
                        <div className="w-[40px] h-[40px] rounded-3xl overflow-hidden border-1 border-dashed border-[#8d8d8d] object-cover">
                          <img
                            src={
                              category?.image
                                ? import.meta.env.VITE_BASE_URL +
                                  "/uploads/" +
                                  category?.image
                                : no_image
                            }
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                        {category?.category_name}
                      </td>
                      <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                        {category?.slug}
                      </td>
                      <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                        {category?.sort_order}
                      </td>
                      <td className="px-6  text-center">
                        <button
                          onClick={() => {
                            setEditCategory(true);
                            setFormData((prev) => ({
                              ...prev,
                              business_id: category?.business_id || "",
                              category_name: category?.category_name || "",
                              slug: category?.slug || "",
                              sort_order: category?.sort_order || 1,
                              image: category?.image || "",
                            }));
                            setId(category._id);
                          }}
                          className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                        >
                          <MdModeEdit className="text-[20px]" />
                        </button>
                        <button
                          onClick={() => {
                            setDeletPopup(true);
                            setId(category._id);
                          }}
                          className="text-red-600 hover:text-red-800 transition cursor-pointer"
                        >
                          <MdDelete className="text-[20px]" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No data available!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {!isLoading && (
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
        )}
      </div>

      {addCategory && (
        <AddUpdateCategory
          component_type={1}
          handleClosePopup={handleClosePopup}
          formData={formData}
          setFormData={setFormData}
          businessId={businessId ?? undefined}
        />
      )}
      {editCategory && (
        <AddUpdateCategory
          component_type={2}
          handleClosePopup={handleClosePopup}
          formData={{ ...formData, id }}
          setFormData={setFormData}
          businessId={businessId ?? undefined}
        />
      )}

      {deletePopup && (
        <DeletePopup
          selectedItems={selectedItems}
          handleClosePopup={handleClosePopup}
          business_id={businessId}
          id={id}
        />
      )}
      
    </>
  );
};

export default Categories;

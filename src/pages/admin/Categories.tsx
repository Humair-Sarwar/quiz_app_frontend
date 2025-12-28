import React, { useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { FiInbox } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

import Pagination from "../../components/Pagination";
import AddUpdateCategory from "../../components/AddUpdateCategory";
import no_image from "../../assets/images/no_image.png";
import DeletePopup from "../../components/DeletePopup";
import SearchInput from "../../components/SearchInput";
import {
  deleteCategory,
  useAdminCategories,
  useDeleteSelectedCategory,
} from "../../hooks/useAdminCategories";
import { handleError, handleSuccess } from "../../toast";
import type { RootState } from "../../app/store";

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
  // --- LOGIC REMAINS 100% SAME AS YOUR ORIGINAL CODE ---
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const queryClient = useQueryClient();
  const delCategory = deleteCategory();
  const selectedDelCategory = useDeleteSelectedCategory();

  const toggleSelectOne = (id: string, business_id: string) => {
    setSelectedItems((prev) => {
      const exists = prev.some((item) => item.id === id);
      if (exists) return prev.filter((item) => item.id !== id);
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

  const [isVisible, setIsVisible] = useState<boolean>(false);
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
  if (error) handleError("Something went wrong!");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<boolean>(false);
  const [deletePopup, setDeletPopup] = useState<boolean>(false);

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => handleClosePopup(), 300);
  };
  const handleClosePopup = () => {
    setAddCategory(false);
    setEditCategory(false);
    setDeletPopup(false);
  };

  const handleDelete = () => {
    if ((selectedItems?.length ?? 0) > 0) {
      selectedDelCategory.mutate(selectedItems, {
        onSuccess: () => {
          handleSuccess("Selected Category Deleted Successfully!");
          queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
          handleCloseWithAnimation();
          setSelectedItems([]);
        },
        onError: () => handleError("Something went wrong!"),
      });
    } else {
      delCategory.mutate(
        { business_id: businessId!, id: id! },
        {
          onSuccess: () => {
            handleSuccess("Category Deleted Successfully!");
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            handleCloseWithAnimation();
          },
          onError: () => handleError("Something went wrong!"),
        }
      );
    }
  };

  return (
    <div className="p-4 lg:p-10 bg-[#fbfcfd] min-h-screen">
      {/* PROFESSIONAL HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-[#ff5b07]/10 rounded-xl text-[#ff5b07]">
              <AiFillProduct size={24} />
            </div>
            Categories
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium ml-12">
            Manage your product hierarchy and sorting.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <SearchInput
            placeholder="Search Category..."
            handleSearch={handleSearch}
          />
          <button
            className="flex cursor-pointer items-center justify-center gap-2 bg-slate-900 hover:bg-[#ff5b07] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"
            onClick={() => {
              setAddCategory(true);
              setFormData((prev) => ({ ...prev, business_id: businessId! }));
            }}
          >
            <FaPlus /> Add Category
          </button>
        </div>
      </div>

      {/* SELECTED ITEMS NOTIFICATION BAR */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          selectedItems.length > 0 ? "mb-4 h-14" : "h-0"
        }`}
      >
        <div className="bg-slate-900 text-white rounded-xl px-4 h-full flex items-center justify-between shadow-lg border border-slate-700">
          <div className="flex items-center gap-2">
            <span className="bg-[#ff5b07] text-xs font-black px-2 py-1 rounded-md">
              {selectedItems.length}
            </span>
            <span className="text-sm font-semibold tracking-wide">
              Items Selected
            </span>
          </div>
          <button
            onClick={() => setDeletPopup(true)}
            className="flex cursor-pointer items-center gap-2 text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all text-xs font-bold"
          >
            <MdDelete size={18} /> Delete Selected
          </button>
        </div>
      </div>

      {/* MODERN TABLE CONTAINER */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-500 uppercase text-[11px] font-black tracking-widest">
                <th className="px-6 py-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      data?.data?.length > 0 &&
                      selectedItems.length === data.data.length
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 accent-[#ff5b07] cursor-pointer rounded"
                  />
                </th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Category Name</th>
                <th className="px-6 py-4">Slug Path</th>
                <th className="px-6 py-4">Position</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
  Array.from({ length: pageSize }).map((_, idx) => (
    <tr key={idx} className="border-b border-slate-50">
      {/* 1. Checkbox Skeleton */}
      <td className="px-6 py-4">
        <div className="w-4 h-4 bg-slate-100 rounded animate-pulse" />
      </td>
      
      {/* 2. Image Skeleton */}
      <td className="px-6 py-4">
        <div className="w-12 h-12 bg-slate-100 rounded-xl animate-pulse" />
      </td>
      
      {/* 3. Category Name Skeleton */}
      <td className="px-6 py-4">
        <div className="space-y-2">
          <div className="h-4 bg-slate-100 rounded-md w-32 animate-pulse" />
        </div>
      </td>
      
      {/* 4. Slug Path Skeleton */}
      <td className="px-6 py-4">
        <div className="h-6 bg-slate-50 border border-slate-100 rounded-md w-20 animate-pulse" />
      </td>
      
      {/* 5. Position Skeleton */}
      <td className="px-6 py-4">
        <div className="w-8 h-8 bg-orange-50/50 rounded-lg animate-pulse" />
      </td>
      
      {/* 6. Actions Skeleton */}
      <td className="px-6 py-4">
        <div className="flex justify-center gap-2">
          <div className="w-9 h-9 bg-slate-50 rounded-lg animate-pulse" />
          <div className="w-9 h-9 bg-slate-50 rounded-lg animate-pulse" />
        </div>
      </td>
    </tr>
  ))
) : data?.data?.length > 0 ? (
                data.data.map((category: any, index: number) => (
                  <tr
                    key={index}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.some(
                          (i) => i.id === category._id
                        )}
                        onChange={() =>
                          toggleSelectOne(category._id, category.business_id)
                        }
                        className="w-4 h-4 accent-[#ff5b07] cursor-pointer rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-xl border border-slate-200 p-0.5 bg-white shadow-sm group-hover:scale-105 transition-transform">
                        <img
                          src={
                            category?.image
                              ? `${import.meta.env.VITE_BASE_URL}/uploads/${
                                  category.image
                                }`
                              : no_image
                          }
                          alt="cat"
                          className="h-full w-full object-cover rounded-[10px]"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[14px] font-bold text-slate-700 block">
                        {category?.category_name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded-md text-xs font-semibold border border-slate-200">
                        /{category?.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 flex items-center justify-center bg-orange-50 text-[#ff5b07] text-xs font-black rounded-lg border border-orange-100">
                        {category?.sort_order}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditCategory(true);
                            setFormData({
                              business_id: category?.business_id || "",
                              category_name: category?.category_name || "",
                              slug: category?.slug || "",
                              sort_order: category?.sort_order || 1,
                              image: category?.image || "",
                            });
                            setId(category._id);
                          }}
                          className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
                        >
                          <MdModeEdit size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setDeletPopup(true);
                            setId(category._id);
                            setSelectedItems([]);
                          }}
                          className="w-9 cursor-pointer h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-slate-300">
                      <FiInbox size={48} />
                      <p className="text-slate-500 font-bold tracking-tight">
                        No Categories Found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && (
          <div className="bg-slate-50/50 border-t border-slate-100 p-4">
            <Pagination
              currentPage={data?.pagination?.currentPage}
              clickNum={(d: number) => setPage(d)}
              prevClick={() => setPage(page - 1)}
              nextClick={() => setPage(page + 1)}
              page={page}
              totalPages={totalPages}
              handlePageSize={(e: any) => {
                setPageSize(parseInt(e.target.value));
                setPage(1);
              }}
              totalItems={totalItems}
              firstRecord={data?.pagination?.firstRecord}
              lastRecord={data?.pagination?.lastRecord}
              pageSize={pageSize}
            />
          </div>
        )}
      </div>

      {/* MODALS (Kept exactly as your code) */}
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
          handleDelete={handleDelete}
          handleCloseWithAnimation={handleCloseWithAnimation}
          isPendingDel={selectedDelCategory.isPending || delCategory.isPending}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
    </div>
  );
};

export default Categories;

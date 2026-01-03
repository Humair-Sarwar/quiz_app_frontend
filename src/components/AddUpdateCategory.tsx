import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { MdEdit } from "react-icons/md";
import { IoClose, IoCameraSharp, IoSparklesOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { generateSlug } from "../utils/slugGenerate";
import { createCategory, updateCategory } from "../hooks/useAdminCategories";
import { handleError, handleSuccess } from "../toast";
import { useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import UploadImagePanel from "./UploadImagePanel";
import no_image from "../assets/images/no_image.png";
import SpinnerLoader from "./SpinnerLoader";

interface formDataProps {
  business_id?: string | undefined;
  category_name?: string;
  slug?: string;
  sort_order?: number;
  id?: string;
  image: "";
}

interface AddUpdateCategoryProps {
  handleClosePopup: () => void;
  component_type: number;
  formData?: any;
  setFormData?: Dispatch<SetStateAction<formDataProps>>;
  businessId?: string;
}

interface errosProps {
  category_name?: string;
  slug?: string;
  sort_order?: string;
}

const AddUpdateCategory: React.FC<AddUpdateCategoryProps> = ({
  handleClosePopup,
  component_type,
  formData,
  setFormData,
  businessId,
}) => {
  const queryClient = useQueryClient();
  const createCategoryAPI = createCategory();
  const updateCategoryAPI = updateCategory();

  const [imageShow, setImageShow] = useState<string | null>(
    formData?.image || ""
  );
  const [errors, setErrors] = useState<errosProps>({
    category_name: "",
    slug: "",
    sort_order: "",
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [imageUploadPanel, setImageUploadPanel] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleClosePopup();
      setFormData?.({
        business_id: businessId,
        category_name: "",
        slug: "",
        sort_order: 1,
        image: "",
      });
    }, 300);
  };

  useEffect(() => {
    if (formData?.image) {
      setImageShow(formData?.image);
    }
  }, [formData?.image]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: errosProps = {};

    if (!formData?.category_name)
      newErrors.category_name = "Category name is required!";
    if (!formData?.slug) newErrors.slug = "Slug is required!";
    if (!formData?.sort_order || formData?.sort_order <= 0)
      newErrors.sort_order = "Sort order is required!";

    setErrors(newErrors);
    if (Object.keys(newErrors).length == 0) {
      if (component_type == 2) {
        updateCategoryAPI.mutate(
          { ...formData, image: imageShow },
          {
            onSuccess: () => {
              handleSuccess("Category Successfully Updated!");
              queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
              handleCloseWithAnimation();
            },
            onError: () => handleError("Something went wrong!"),
          }
        );
      } else {
        createCategoryAPI.mutate(
          { ...formData, image: imageShow },
          {
            onSuccess: () => {
              handleSuccess("Category Successfully Created!");
              queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
              handleCloseWithAnimation();
            },
            onError: () => handleError("Something went wrong!"),
          }
        );
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData?.((prev) => {
      if (name === "category_name") {
        return { ...prev, category_name: value, slug: generateSlug(value) };
      }
      if (name === "sort_order") {
        return { ...prev, sort_order: Number(value) };
      }
      return { ...prev, [name]: value };
    });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "category_name") {
        if (!value.trim()) {
          newErrors.category_name = "Category name is required!";
          newErrors.slug = "Slug is required!";
        } else {
          delete newErrors.category_name;
          delete newErrors.slug;
        }
      }
      if (name === "slug") {
        if (!value.trim()) newErrors.slug = "Slug is required!";
        else delete newErrors.slug;
      }
      if (name === "sort_order") {
        if (!value || Number(value) <= 0)
          newErrors.sort_order = "Sort order must be > 0!";
        else delete newErrors.sort_order;
      }
      return newErrors;
    });
  };

  const handleClosePopupImage = () => setImageUploadPanel(false);

  return (
    <>
      <Overlay isVisible={isVisible} />

      <div
        className={`fixed inset-0 flex items-center justify-center p-4 z-60 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 translate-y-8"
        }`}
      >
        <div className="bg-white rounded-[32px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.2)] w-full max-w-xl relative overflow-hidden border border-slate-100">
          {/* Header Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#ff5b07] via-orange-400 to-yellow-400"></div>

          <form onSubmit={handleSubmit} className="p-7">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#ff5b07] shadow-inner">
                  {component_type == 1 ? (
                    <IoMdAdd size={24} />
                  ) : (
                    <MdEdit size={24} />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                    {component_type == 1 ? "New Category" : "Modify Details"}
                  </h2>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-1.5">
                    Administrative Console
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseWithAnimation}
                className="w-10 cursor-pointer h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
              >
                <IoClose size={20} />
              </button>
            </div>

            {/* Profile/Image Section */}
            <div className="flex justify-center mb-10">
              <div className="relative group">
                <div className="h-28 w-28 rounded-[35px] bg-slate-100 p-1 ring-4 ring-slate-50 overflow-hidden transition-transform duration-500 group-hover:scale-[1.03]">
                  <img
                    onClick={() => setImageUploadPanel(true)}
                    src={
                      imageShow === ""
                        ? no_image
                        : `${
                            import.meta.env.VITE_BASE_URL
                          }/uploads/${imageShow}`
                    }
                    alt="Category"
                    className="h-full w-full object-cover rounded-[30px] cursor-pointer"
                  />
                </div>

                {/* Image Action Buttons */}
                <div className="absolute -bottom-2 -right-2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => setImageUploadPanel(true)}
                    className="bg-[#ff5b07] cursor-pointer text-white p-2.5 rounded-2xl shadow-lg hover:bg-slate-900 transition-all active:scale-90 border-2 border-white flex items-center gap-1"
                  >
                    <IoCameraSharp size={18} />
                  </button>
                </div>

                {imageShow !== "" && (
                  <button
                    type="button"
                    onClick={() => setImageShow("")}
                    className="absolute -top-2 -right-2 cursor-pointer bg-white text-red-500 p-1.5 rounded-full shadow-md hover:scale-110 transition-all border border-slate-100"
                  >
                    <IoClose size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 group">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-[#ff5b07] transition-colors">
                  Label Name
                </label>
                <input
                  type="text"
                  className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-semibold text-slate-800 placeholder:text-slate-300 ${
                    errors.category_name
                      ? "border-red-100 focus:border-red-400"
                      : "border-transparent focus:border-orange-100 focus:bg-white"
                  }`}
                  placeholder="e.g. Smart Gadgets"
                  name="category_name"
                  value={formData?.category_name}
                  onChange={handleChange}
                />
                {errors.category_name && (
                  <p className="text-red-500 text-[10px] font-bold mt-2 ml-1 uppercase italic tracking-wider animate-pulse">
                    {errors.category_name}
                  </p>
                )}
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">
                  Reference Slug
                </label>
                <input
                  type="text"
                  className="w-full px-5 py-4 bg-slate-100 border-2 border-transparent rounded-2xl font-bold text-slate-400 text-sm cursor-not-allowed italic"
                  placeholder="auto-generated-link"
                  name="slug"
                  value={formData?.slug}
                  readOnly
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-[#ff5b07]">
                  Display Priority
                </label>
                <input
                  type="number"
                  className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold text-slate-800 ${
                    errors.sort_order
                      ? "border-red-100 focus:border-red-400"
                      : "border-transparent focus:border-orange-100 focus:bg-white"
                  }`}
                  placeholder="01"
                  name="sort_order"
                  value={formData?.sort_order <= 0 ? "" : formData?.sort_order}
                  onChange={handleChange}
                />
                {errors.sort_order && (
                  <p className="text-red-500 text-[10px] font-bold mt-2 ml-1 uppercase italic">
                    {errors.sort_order}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex gap-4 flex-col md:flex-row">
              <button
                type="button"
                onClick={handleCloseWithAnimation}
                className="flex-1 py-4 cursor-pointer px-6 text-[12px] font-black text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-[18px] transition-all uppercase tracking-widest border border-transparent hover:border-slate-200"
              >
                Discard
              </button>

              <button
                disabled={
                  createCategoryAPI.isPending || updateCategoryAPI.isPending
                }
                type="submit"
                className={`flex-[2] cursor-pointer relative overflow-hidden py-4 px-6 bg-slate-900 text-white rounded-[18px] font-black text-[12px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-900/20 active:scale-[0.98] ${
                  createCategoryAPI.isPending || updateCategoryAPI.isPending
                    ? "opacity-80 cursor-not-allowed"
                    : "hover:bg-[#ff5b07] hover:shadow-orange-500/40"
                }`}
              >
                {createCategoryAPI.isPending || updateCategoryAPI.isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <SpinnerLoader /> <span>Syncing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <IoSparklesOutline size={16} />
                    {component_type == 1
                      ? "Publish Category"
                      : "Commit Changes"}
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {imageUploadPanel && (
        <UploadImagePanel
          handleClosePopupImage={handleClosePopupImage}
          businessId={businessId ?? undefined}
          setImageShow={setImageShow}
        />
      )}
    </>
  );
};

export default AddUpdateCategory;

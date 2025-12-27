import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoCameraSharp } from "react-icons/io5";
import "react-phone-input-2/lib/style.css";
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
  image: ""
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
  console.log(createCategoryAPI, '::::!!!!')
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
  const [imageUploadPanel, setImageUploadPanel] = useState<boolean>(false)
  useEffect(() => {
    // Slight delay to trigger CSS transition after mount
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
        image: ""
      });
    }, 300); // match your transition duration
  };
useEffect(() => {
  if (formData?.image) {
    setImageShow(formData?.image);
  }
}, [formData?.image]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: errosProps = {};

    if (!formData?.category_name) {
      newErrors.category_name = "Category name is required!";
    }
    if (!formData?.slug) {
      newErrors.slug = "Slug is required!";
    }
    if (!formData?.sort_order || formData?.sort_order <= 0) {
      newErrors.sort_order = "Sort order is required!";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length == 0) {
      if (component_type == 2) {
        updateCategoryAPI.mutate({...formData, image: imageShow}, {
          onSuccess: () => {
            handleSuccess("Category Successfully Updated!");
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            handleCloseWithAnimation();
          },
          onError: () => {
            handleError("Something went wrong!");
          },
        });
      } else {
        createCategoryAPI.mutate({...formData, image: imageShow}, {
          onSuccess: () => {
            handleSuccess("Category Successfully Created!");
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            handleCloseWithAnimation();
          },
          onError: () => {
            handleError("Something went wrong!");
          },
        });
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(businessId, formData, formData.image, "666777");
    setFormData?.((prev) => {
      if (name === "category_name") {
        return {
          ...prev,
          category_name: value,
          slug: generateSlug(value),
        };
      }

      if (name === "sort_order") {
        return {
          ...prev,
          sort_order: Number(value),
        };
      }

      return {
        ...prev,
        [name]: value,
      };
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
        if (!value.trim()) {
          newErrors.slug = "Slug is required!";
        } else {
          delete newErrors.slug;
        }
      }

      if (name === "sort_order") {
        if (!value || Number(value) <= 0) {
          newErrors.sort_order = "Sort order must be greater than 0!";
        } else {
          delete newErrors.sort_order;
        }
      }

      return newErrors;
    });
  };

   const handleClosePopupImage = () => {
    setImageUploadPanel(false);
    
  };

  return (
    <>
      {/* Background overlay */}
      <Overlay isVisible={isVisible} />

      {/* Popup container */}
      <div
        className={`fixed inset-0 flex items-center justify-center py-4 px-4 z-50 transition-all duration-300 ease-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-10"
        }`}
      >
        <div className="bg-white rounded-2xl overflow-y-auto max-h-[100%] shadow-2xl p-6 sm:p-6 w-full max-w-2xl relative transition-all duration-300 ease-in-out">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-semibold flex items-center gap-2">
                {component_type == 1 ? <IoMdAdd /> : <MdEdit />}{" "}
                {component_type == 1 ? "Create" : "Update"} Category
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
              <div onClick={()=>{setImageUploadPanel(true)}} className="relative mb-3 h-[100px] w-[100px] rounded-full border-4 border-white shadow-md group">
                <img
                  src={imageShow == "" ? no_image : import.meta.env.VITE_BASE_URL + "/uploads/" + imageShow}
                  alt="Profile"
                  className="h-full w-full object-cover object-center rounded-full"
                />

                <label
                  htmlFor="profileUpload"
                  className="absolute bottom-[-2px] right-[-2px] z-30 bg-[#cccccc8c] hover:bg-[#e04e00] hover:text-white text-black p-1 rounded-full cursor-pointer shadow transition-all duration-300 flex items-center justify-center"
                >
                  <IoCameraSharp className="text-[18px]" />
                </label>

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
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Enter Category Name"
                  name="category_name"
                  value={formData?.category_name}
                  onChange={handleChange}
                />
                {errors && (
                  <p className="text-red-500 text-[12px] mt-1">
                    {errors.category_name}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="slug" className="block">
                  Slug:
                </label>
                <input
                  type="text"
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Slug"
                  name="slug"
                  value={formData?.slug}
                  onChange={handleChange}
                />
                {errors && (
                  <p className="text-red-500 text-[12px] mt-1">{errors.slug}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="slug" className="block">
                  Sort Order:
                </label>
                <input
                  type="number"
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Sort Order"
                  name="sort_order"
                  value={formData?.sort_order <= 0 ? "" : formData?.sort_order}
                  onChange={handleChange}
                />
                {errors && (
                  <p className="text-red-500 text-[12px] mt-1">
                    {errors.sort_order}
                  </p>
                )}
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
              disabled={createCategoryAPI.isPending || updateCategoryAPI.isPending}
                type="submit"
                className={`rounded-[10px] bg-green-400 py-3 px-4 text-white cursor-pointer hover:bg-green-600 transition-all ${(createCategoryAPI.isPending  || updateCategoryAPI.isPending) && 'bg-green-600 cursor-not-allowed!'}`}
              >
                {createCategoryAPI.isPending || updateCategoryAPI.isPending ? <SpinnerLoader/> : (component_type == 1 ? "Create" : "Update")}
                
              </button>
            </div>
          </form>
        </div>
      </div>
                {imageUploadPanel && <UploadImagePanel
          handleClosePopupImage={handleClosePopupImage}
          businessId={businessId ?? undefined}
          setImageShow={setImageShow}
        />}
      
    </>
  );
};

export default AddUpdateCategory;

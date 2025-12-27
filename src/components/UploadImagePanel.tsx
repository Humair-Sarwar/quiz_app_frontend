import React, { useEffect, useRef, useState } from "react";
import Overlay from "./Overlay";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useMediaImagesShow, useMediaUploadImage } from "../hooks/useMedia";
import { handleError, handleSuccess } from "../toast";
import image_upload_ic from "../assets/images/image-upload.png";
import { useQueryClient } from "@tanstack/react-query";
import Pagination from "./Pagination";
import { MdDelete, MdOutlineContentCopy } from "react-icons/md";
import { FaEye } from "react-icons/fa6";

interface ImageUploadProps {
  handleClosePopupImage: () => void;
  businessId?: string;
  setImageShow: (image: any) => void;
}

const UploadImagePanel: React.FC<ImageUploadProps> = ({ businessId, handleClosePopupImage, setImageShow }) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const imageUploadFunc = useMediaUploadImage();
  const { data, isLoading } = useMediaImagesShow({
    page,
    limit: pageSize,
    business_id: businessId || "",
  });

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleClosePopupImage();
    }, 300);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const uploadFile = (file: File) => {
    if (!businessId) {
      handleError("Business ID missing");
      return;
    }

    const formData = new FormData();
    formData.append("business_id", businessId);
    formData.append("image", file);

    imageUploadFunc.mutate(formData, {
      onSuccess: () => {
        handleSuccess("Image Uploaded Successfully!");
        queryClient.invalidateQueries({ queryKey: ["admin-images"] });
      },
      onError: () => {
        handleError("Something went wrong!");
      },
    });
  };

  const handleFile = (file: File) => {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      handleError("Only JPEG or PNG images are allowed");
      return;
    }

    uploadFile(file); // auto-upload
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  // Pagination helpers
  const totalItems = data?.pagination?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const prevClick = () => setPage((prev) => Math.max(prev - 1, 1));
  const nextClick = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const clickNum = (num: number) => setPage(num);
  const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value));
    setPage(1);
  };
  const handleLoadImg = (image: any) => {
    setImageShow(image);  
    handleCloseWithAnimation()
    console.log('pppoo', image)
  }
  return (
    <>
      <Overlay isVisible={isVisible} />
      <div
        className={`fixed inset-0 flex items-center justify-center py-4 px-4 z-50 transition-all duration-300 ease-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-10"
        }`}
      >
        <div className="bg-white overflow-y-auto max-h-[100%] rounded-2xl shadow-2xl p-6 w-full max-w-[900px] relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[18px] font-semibold flex items-center gap-2">
              <IoMdAdd /> Select or Upload Image
            </h2>
            <button
              onClick={handleCloseWithAnimation}
              className="bg-[#cccccc8c] cursor-pointer rounded-4xl p-[3px] hover:bg-[#e04e00] hover:text-white"
            >
              <IoClose />
            </button>
          </div>

          {/* Upload Area */}
          <div
            onClick={handleClick}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border border-dashed rounded-[10px] px-2 py-6 cursor-pointer transition ${
              isDragging
                ? "bg-amber-100 border-amber-500"
                : "bg-[#fcfcf6] border-amber-400"
            }`}
          >
            <div className="flex justify-center">
              <img src={image_upload_ic} className="w-[100px]" alt="" />
            </div>
            <p className="text-center">
              Drop your image here, or{" "}
              <span className="text-orange-500">browse</span>
            </p>
            <p className="text-center text-[11px] mt-1 text-gray-400">
              Upload 280×280 jpeg/png image
            </p>
          </div>

          {/* Hidden input */}
          <input
            type="file"
            accept="image/jpeg,image/png"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Images Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-4 mt-4">
            {isLoading
              ? Array.from({ length: pageSize }).map((_, idx) => (
                  <div key={idx} className="rounded-[10px] h-[85px] overflow-hidden relative">
                    <div className="animate-pulse h-full w-full bg-gray-200 rounded-[10px]" />
                  </div>
                ))
              : data?.data?.length > 0
              ? data.data.map((image: any, index: number) => (
                  <div key={index} className="rounded-[10px] cursor-pointer h-[85px] overflow-hidden relative">
                    <img
                      src={import.meta.env.VITE_BASE_URL + "/uploads/" + image?.image}
                      className="h-[100%] w-[100%] object-cover"
                      alt="" onClick={()=> handleLoadImg(image?.image)}
                    />
                    <div className="absolute left-[5px] top-[5px] flex gap-1">
                      <div className="bg-[#ffffff9c] rounded-[50%] p-[4px] cursor-pointer hover:bg-[#ffffffe3] transition-all">
                        <MdOutlineContentCopy className="text-orange-500" />
                      </div>
                      <div className="bg-[#ffffff9c] rounded-[50%] p-[4px] cursor-pointer hover:bg-[#ffffffe3] transition-all">
                        <FaEye className="text-orange-500" />
                      </div>
                      <div className="bg-[#ffffff9c] rounded-[50%] p-[4px] cursor-pointer hover:bg-[#ffffffe3] transition-all">
                        <MdDelete className="text-orange-500" />
                      </div>
                    </div>
                  </div>
                ))
              : <p className="text-center">No Image Available!</p>}
          </div>

          {/* Pagination */}
          {!isLoading && data?.pagination && (
            <Pagination
              currentPage={data.pagination.currentPage}
              clickNum={clickNum}
              prevClick={prevClick}
              nextClick={nextClick}
              page={page}
              totalPages={totalPages}
              handlePageSize={handlePageSize}
              totalItems={totalItems}
              firstRecord={data.pagination.firstRecord}
              lastRecord={data.pagination.lastRecord}
              pageSize={pageSize}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UploadImagePanel;

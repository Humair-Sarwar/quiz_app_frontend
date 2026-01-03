import React, { useEffect, useRef, useState } from "react";
import Overlay from "./Overlay";
import { IoClose, IoImagesOutline } from "react-icons/io5";
import {
  useMediaDeleteImage,
  useMediaImagesShow,
  useMediaUploadImage,
} from "../hooks/useMedia";
import { handleError, handleSuccess } from "../toast";
import image_upload_ic from "../assets/images/image-upload.png";
import { useQueryClient } from "@tanstack/react-query";
import Pagination from "./Pagination";
import { MdDelete, MdOutlineContentCopy } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import ImageViewPopup from "./ImageViewPopup";
import DeletePopup from "./DeletePopup";

interface ImageUploadProps {
  handleClosePopupImage: () => void;
  businessId?: string;
  setImageShow: (image: any) => void;
}

const UploadImagePanel: React.FC<ImageUploadProps> = ({
  businessId,
  handleClosePopupImage,
  setImageShow,
}) => {
  const [deletePopup, setDeletPopup] = useState<boolean>(false);
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isVisibleDel, setIsVisibleDel] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const delImage = useMediaDeleteImage();
  const imageUploadFunc = useMediaUploadImage();
  const { data, isLoading } = useMediaImagesShow({
    page,
    limit: pageSize,
    business_id: businessId || "",
  });

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClosePopup = () => {
    setImagePreview(false);
    setDeletPopup(false);
  };

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setIsVisibleDel(false);
    setTimeout(() => {
      handleClosePopupImage();
    }, 300);
  };

  const handleCloseWithAnimation2 = () => {
    setIsVisibleDel(false);
    setTimeout(() => {
      handleClosePopup();
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
    uploadFile(file);
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
    handleCloseWithAnimation();
  };

  const handleDelete = () => {
    if (!id) return;
    delImage.mutate(id, {
      onSuccess: () => {
        handleSuccess("Image Deleted Successfully!");
        queryClient.invalidateQueries({ queryKey: ["admin-images"] });
        handleCloseWithAnimation2();
      },
      onError: () => {
        handleError("Something went wrong!");
      },
    });
  };

  return (
    <>
      <Overlay isVisible={isVisible} />
      <div
        className={`fixed inset-0 flex items-center justify-center p-4 z-[60] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="bg-white rounded-[32px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.2)] w-full max-w-[850px] max-h-[90vh] overflow-hidden flex flex-col border border-slate-100">
          {/* --- Header --- */}
          <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                <IoImagesOutline size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                  Select Asset
                </h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Library & Uploads
                </p>
              </div>
            </div>
            <button
              onClick={handleCloseWithAnimation}
              className="p-2 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all shadow-sm border border-slate-100 cursor-pointer"
            >
              <IoClose size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {/* --- Upload Area --- */}
            <div
              onClick={handleClick}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`group border-2 border-dashed rounded-[24px] p-8 mb-6 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
                isDragging
                  ? "bg-orange-50 border-orange-500 scale-[0.99]"
                  : "bg-slate-50 border-slate-200 hover:bg-white hover:border-orange-400"
              }`}
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <img src={image_upload_ic} className="w-10 opacity-80" alt="" />
              </div>
              <p className="text-sm font-bold text-slate-700">
                Drop image here or{" "}
                <span className="text-orange-500">browse</span>
              </p>
              <p className="text-[11px] mt-1 text-slate-400 font-medium">
                Supports JPEG, PNG (Recommended 280×280)
              </p>
            </div>

            <input
              type="file"
              accept="image/jpeg,image/png"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {/* --- Images Grid --- */}
            <div
              className={`grid gap-4 ${
                data?.data?.length > 0
                  ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
                  : "grid-cols-1"
              }`}
            >
              {isLoading ? (
                <div
                  className={`grid gap-3 grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-6`}
                >
                  {Array.from({ length: pageSize }).map((_, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-xl overflow-hidden border border-slate-100 bg-white p-1.5"
                    >
                      {/* Main Image Area Placeholder */}
                      <div className="w-full h-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center">
                        <IoImagesOutline className="text-slate-200" size={24} />
                      </div>

                      {/* Bottom Detail Bar (mimics the overlay/filename area) */}
                      <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                        <div className="h-2 bg-slate-200/60 rounded-full w-2/3 animate-pulse" />
                        <div className="h-2 bg-slate-200/60 rounded-full w-1/3 animate-pulse" />
                      </div>

                      {/* Subtle shimmer effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </div>
                  ))}
                </div>
              ) : data?.data?.length > 0 ? (
                data.data.map((img: any, index: number) => (
                  <div
                    onClick={() => handleLoadImg(img?.image)}
                    key={index}
                    className="group relative aspect-square cursor-pointer rounded-[18px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <img
                      src={
                        img?.image
                      }
                      className="h-full w-full object-cover cursor-pointer"
                      alt=""
                    />

                    {/* Hover Actions Overlay */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!img?.image) return;
                          navigator.clipboard
                            .writeText(
                              
                                img?.image
                            )
                            .then(() => handleSuccess("Link Copied!"));
                        }}
                        className="p-2 bg-white/20 hover:bg-white text-white hover:text-orange-500 rounded-lg transition-all cursor-pointer"
                        title="Copy Link"
                      >
                        <MdOutlineContentCopy size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview(true);
                          setImage(img?.image);
                        }}
                        className="p-2 bg-white/20 hover:bg-white text-white hover:text-blue-500 rounded-lg transition-all cursor-pointer"
                        title="Quick View"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletPopup(true);
                          setId(img?._id);
                        }}
                        className="p-2 bg-white/20 hover:bg-white text-white hover:text-red-500 rounded-lg transition-all cursor-pointer"
                        title="Delete"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-300">
                  <IoImagesOutline size={48} className="mb-2 opacity-20" />
                  <p className="font-bold text-sm uppercase tracking-widest">
                    No Assets Found
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* --- Pagination Footer --- */}
          {!isLoading && data?.pagination && (
            <div className="p-4 bg-slate-50 border-t border-slate-100">
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
            </div>
          )}

          {/* --- Nested Popups --- */}
          {imagePreview && (
            <div className="fixed inset-0 z-[80]">
              <ImageViewPopup
                handleClosePopup={handleClosePopup}
                image={image}
              />
            </div>
          )}
          {deletePopup && (
            <div className="fixed inset-0 z-[80]">
              <DeletePopup
                handleClosePopup={handleClosePopup}
                business_id={businessId}
                id={id}
                handleDelete={handleDelete}
                isPendingDel={delImage.isPending}
                handleCloseWithAnimation={handleCloseWithAnimation2}
                isVisible={isVisibleDel}
                setIsVisible={setIsVisibleDel}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadImagePanel;

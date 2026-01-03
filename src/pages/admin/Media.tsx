import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { MdDelete, MdOutlineContentCopy, MdPermMedia } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { IoCloudUploadOutline, IoImagesOutline } from "react-icons/io5";
import UploadImg from "../../components/UploadImg";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useMediaDeleteImage, useMediaImagesShow } from "../../hooks/useMedia";
import { handleError, handleSuccess } from "../../toast";
import DeletePopup from "../../components/DeletePopup";
import { useQueryClient } from "@tanstack/react-query";
import ImageViewPopup from "../../components/ImageViewPopup";

const Media: React.FC = () => {
  const [image, setImage] = useState("");
  const [uploadImgPop, setUploadImgPop] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);
  const [deletePopup, setDeletPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const businessId = useSelector((state: RootState) => state.auth.user_id);
  const [id, setId] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24); // Size thoda zyada rakha hai kyunki images ab choti hain

  const { data, isLoading } = useMediaImagesShow({
    page,
    limit: pageSize,
    business_id: businessId || "",
  });

  const queryClient = useQueryClient();
  const delImage = useMediaDeleteImage();

  const totalItems = data?.pagination?.totalItems;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleClosePopup = () => {
    setUploadImgPop(false);
    setDeletPopup(false);
  };

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      setDeletPopup(false);
    }, 300);
  };

  const handleDelete = () => {
    if (!id) return;
    delImage.mutate(id, {
      onSuccess: () => {
        handleSuccess("Image Deleted Successfully!");
        queryClient.invalidateQueries({ queryKey: ["admin-images"] });
        handleCloseWithAnimation();
      },
      onError: () => {
        handleError("Something went wrong!");
      },
    });
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
      <div className="p-6 lg:p-10 min-h-screen bg-[#F9FAFB]">
        {/* --- Header Section (No changes here) --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <div className="p-2.5 bg-white shadow-sm border border-slate-100 rounded-xl text-orange-500">
                <MdPermMedia size={24} />
              </div>
              Media Library
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2 ml-1">
              Manage your digital assets
            </p>
          </div>

          <button
            className="flex items-center gap-2 cursor-pointer px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-[18px] font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all active:scale-95"
            onClick={() => setUploadImgPop(true)}
          >
            <IoCloudUploadOutline size={18} />
            Upload New Image
          </button>
        </div>

        <div className="bg-white p-6 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100">
          <div
            className={`grid gap-3 ${
              data?.data?.length > 0
                ? "grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10"
                : "grid-cols-1"
            }`}
          >
            {isLoading ? (
              <div
                className={`grid gap-3 grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10`}
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
              data.data.map((img: any) => (
                <div
                  key={img._id}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <img
                    src={
                      img.image
                    }
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="media"
                  />

                  {/* Compact Overlay Icons */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5 backdrop-blur-[1px]">
                    <button
                      onClick={() => {
                        if (!img?.image) return;
                        navigator.clipboard
                          .writeText(
                            
                              img?.image
                            
                          )
                          .then(() => handleSuccess("Link copied!"))
                          .catch(() => handleError("Copy failed!"));
                      }}
                      className="p-1.5 cursor-pointer bg-white/20 hover:bg-white text-white hover:text-orange-500 rounded-lg transition-all"
                      title="Copy URL"
                    >
                      <MdOutlineContentCopy size={14} />
                    </button>

                    <button
                      onClick={() => {
                        setImagePreview(true);
                        setImage(img.image);
                      }}
                      className="p-1.5 cursor-pointer bg-white/20 hover:bg-white text-white hover:text-blue-500 rounded-lg transition-all"
                      title="Quick View"
                    >
                      <FaEye size={14} />
                    </button>

                    <button
                      onClick={() => {
                        setDeletPopup(true);
                        setId(img._id);
                      }}
                      className="p-1.5 cursor-pointer bg-white/20 hover:bg-white text-white hover:text-red-500 rounded-lg transition-all"
                      title="Delete Asset"
                    >
                      <MdDelete size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-slate-300">
                <IoImagesOutline size={64} className="opacity-20 mb-4" />
                <p className="font-black uppercase tracking-[0.3em] text-xs">
                  No Assets Found
                </p>
              </div>
            )}
          </div>
        </div>

        {/* --- Pagination (No changes here) --- */}
        {!isLoading && (
          <div className="mt-8 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
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

      {/* Popups remain as they were */}
      {uploadImgPop && (
        <UploadImg
          handleClosePopup={() => setUploadImgPop(false)}
          businessId={businessId ?? undefined}
        />
      )}

      {deletePopup && (
        <DeletePopup
          handleClosePopup={handleClosePopup}
          business_id={businessId}
          id={id}
          handleDelete={handleDelete}
          handleCloseWithAnimation={handleCloseWithAnimation}
          isPendingDel={delImage.isPending}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}

      {imagePreview && (
        <ImageViewPopup
          handleClosePopup={() => setImagePreview(false)}
          image={image}
        />
      )}
    </>
  );
};

export default Media;

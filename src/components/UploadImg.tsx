import React, { useEffect, useRef, useState } from "react";
import Overlay from "./Overlay";
import { IoMdAdd } from "react-icons/io";
import { IoClose, IoCloudUploadOutline, IoImageOutline } from "react-icons/io5";
import { useMediaUploadImage } from "../hooks/useMedia";
import { handleError, handleSuccess } from "../toast";
import image_upload_ic from "../assets/images/image-upload.png";
import { useQueryClient } from "@tanstack/react-query";
import SpinnerLoader from "./SpinnerLoader";

interface ImageUploadProps {
  handleClosePopup: () => void;
  businessId?: string;
}

const UploadImg: React.FC<ImageUploadProps> = ({
  businessId,
  handleClosePopup,
}) => {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const imageUploadFunc = useMediaUploadImage();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleClosePopup();
    }, 300);
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleFile = (file: File) => {
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      handleError("Only JPEG or PNG images are allowed");
      return;
    }
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
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

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents triggering the browse click
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUploadImage = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("business_id", businessId as string);
    formData.append("image", selectedFile as File);

    imageUploadFunc.mutate(formData, {
      onSuccess: () => {
        handleSuccess("Asset uploaded to library!");
        queryClient.invalidateQueries({ queryKey: ["admin-images"] });
        handleCloseWithAnimation();
      },
      onError: () => handleError("Upload failed. Try again."),
    });
  };

  return (
    <>
      <Overlay isVisible={isVisible} />

      <div
        className={`fixed inset-0 flex items-center justify-center p-4 z-[70] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="bg-white rounded-[32px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.2)] w-full max-w-[480px] overflow-hidden border border-slate-100">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-100">
                <IoMdAdd size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight">Add Asset</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">To Media Library</p>
              </div>
            </div>
            <button
              onClick={handleCloseWithAnimation}
              className="p-2 cursor-pointer bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all shadow-sm border border-slate-100"
            >
              <IoClose size={20} />
            </button>
          </div>

          <div className="p-6">
            {/* Upload Area */}
            {!preview ? (
              <div
                onClick={handleClick}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`group relative border-2 border-dashed rounded-[24px] p-8 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
                  isDragging 
                    ? "bg-orange-50 border-orange-500 scale-[0.98]" 
                    : "bg-slate-50 border-slate-200 hover:border-orange-400 hover:bg-white"
                }`}
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <img src={image_upload_ic} className="w-10 opacity-80" alt="upload" />
                </div>
                
                <p className="text-sm font-bold text-slate-700">
                  Drop image here, or <span className="text-orange-500 underline decoration-2 underline-offset-4">browse</span>
                </p>
                <p className="text-[11px] font-medium text-slate-400 mt-2">
                  Supports JPEG, PNG (Max 5MB)
                </p>

                {/* Decorative Dots */}
                <div className="absolute top-4 right-4 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                </div>
              </div>
            ) : (
              /* Preview State */
              <div className="relative group rounded-[24px] overflow-hidden border-2 border-orange-500 shadow-xl shadow-orange-100">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-[280px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2 text-white">
                            <IoImageOutline />
                            <span className="text-xs font-bold truncate max-w-[150px]">{selectedFile?.name}</span>
                        </div>
                        <button
                          onClick={handleRemoveImage}
                          className="bg-white/20 cursor-pointer hover:bg-red-500 backdrop-blur-md text-white p-2 rounded-xl transition-all active:scale-90"
                        >
                          <IoClose size={18} />
                        </button>
                    </div>
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCloseWithAnimation}
                className="flex-1 cursor-pointer px-6 py-3 border border-slate-200 text-slate-600 rounded-[16px] font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                disabled={!preview || imageUploadFunc.isPending}
                onClick={handleUploadImage}
                className={`flex-[2] flex items-center justify-center gap-2 px-6 py-3 rounded-[16px] font-bold text-xs uppercase tracking-widest transition-all shadow-lg ${
                  !preview || imageUploadFunc.isPending
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-slate-900 text-white cursor-pointer hover:bg-orange-600 shadow-orange-100 active:scale-95"
                }`}
              >
                {imageUploadFunc.isPending ? (
                  <SpinnerLoader />
                ) : (
                  <>
                    <IoCloudUploadOutline size={18} />
                    <span>Confirm Upload</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadImg;
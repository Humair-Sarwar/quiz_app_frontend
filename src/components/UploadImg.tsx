import React, { useEffect, useRef, useState } from "react";
import Overlay from "./Overlay";
import { IoMdAdd } from "react-icons/io";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";
import { useMediaUploadImage } from "../hooks/useMedia";
import { handleError, handleSuccess } from "../toast";
import image_upload_ic from '../assets/images/image-upload.png'
import { useQueryClient } from "@tanstack/react-query";
import SpinnerLoader from "./SpinnerLoader";

interface ImageUploadProps {
  handleClosePopup: () => void;
  businessId?: string;
}

const UploadImg: React.FC<ImageUploadProps> = ({businessId, handleClosePopup}) => {
    const queryClient = useQueryClient();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const imageUploadFunc = useMediaUploadImage();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleClosePopup();
    }, 300);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFile = (file: File) => {
  if (!["image/jpeg", "image/png"].includes(file.type)) {
    alert("Only JPEG or PNG images are allowed");
    return;
  }

  setSelectedFile(file); // ✅ store actual file
  setPreview(URL.createObjectURL(file)); // UI preview only
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

  const handleRemoveImage = () => {
  if (preview) {
    URL.revokeObjectURL(preview); // cleanup
  }
  setPreview(null);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

const handleUploadImage = () => {
    const formData = new FormData();
  formData.append("business_id", businessId as string);
  formData.append("image", selectedFile as File);
    imageUploadFunc.mutate(formData, {
        onSuccess: ()=>{
            handleSuccess("Image Uploaded Successfully!")
            queryClient.invalidateQueries({ queryKey: ["admin-images"] });
            handleCloseWithAnimation();
        },
        onError: ()=>{
            handleError('Something went wrong!')
        }
    })
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
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-[500px] relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[18px] font-semibold flex items-center gap-2">
              <IoMdAdd /> Upload Image
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
            <div className="flex justify-center"><img src={image_upload_ic} className="w-[100px]" alt="" /></div>
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

          {/* Preview */}
          {preview && (
            <div className="mt-4">
              <h3 className="text-[13px]">Preview Image:</h3>
              <div className="relative">
                <img
                src={preview}
                alt="Preview"
                className="mt-2 w-full h-[230px] object-cover rounded-[10px] border-dashed border-gray-400 border"
              />
                <button
              onClick={handleRemoveImage}
              className="bg-[#cccccc8c] rounded-4xl p-[3px] absolute right-[-10px] cursor-pointer top-[-10px] hover:bg-[#e04e00] hover:text-white"
            >
              <IoClose />
            </button>
              </div>
              
            </div>
          )}

          <div className="flex justify-end mt-3">
            <button disabled={!preview || imageUploadFunc.isPending}
            
            onClick={handleUploadImage}
  className={`mini-primary-button flex items-center gap-2 ${imageUploadFunc.isPending && 'bg-[#e04e00]! cursor-not-allowed!'} ${
    !preview ? "bg-[#e5e5e5]! text-[#9b9b9b]! cursor-not-allowed! opacity-50" : ""
  }`}>
             {imageUploadFunc.isPending ? (
    <>
      <SpinnerLoader/>
    </>
  ) : (
    <>
      <IoCloudUploadOutline />
      <span>Upload Now</span>
    </>
  )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadImg;

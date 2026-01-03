import React, { useEffect, useState } from "react";
import no_image from "../../assets/images/no_image.png";
import { FaUserCog } from "react-icons/fa";
import { IoCameraSharp, IoClose, IoMailOutline, IoPersonOutline } from "react-icons/io5";
import {
  useAdminUserProfile,
  useUpdateAdminUser,
} from "../../hooks/useAdminUsers";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import UploadImagePanel from "../../components/UploadImagePanel";
import { handleError, handleSuccess } from "../../toast";
import { useQueryClient } from "@tanstack/react-query";

const ProfileSettings: React.FC = () => {
  const updateAdminUserAPI = useUpdateAdminUser();
  const queryClient = useQueryClient();
  const [imageUploadPanel, setImageUploadPanel] = useState<boolean>(false);
  const businessId = useSelector((state: RootState) => state.auth.user_id);
  
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    image: string;
  }>({
    image: "",
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({
    name: "",
    email: "",
  });

  const [imageShow, setImageShow] = useState<string | null>(null);

  const { data, isLoading } = useAdminUserProfile({
    id: businessId,
    type: 2,
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data.data.name || "",
        email: data.data.email || "",
        image: data.data.image || "",
      });
      setImageShow(data.data.image || "");
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (!value.trim()) setErrors((prev) => ({ ...prev, email: "Email is required" }));
      else if (!/\S+@\S+\.\S+/.test(value)) setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      else setErrors((prev) => ({ ...prev, email: "" }));
    }
    if (name === "name") {
      if (!value.trim()) setErrors((prev) => ({ ...prev, name: "Name is required" }));
      else setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleSave = () => {
    const newErrors: { email?: string; name?: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required!";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format!";
    }
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      updateAdminUserAPI.mutate(
        { ...formData, id: businessId, image: imageShow },
        {
          onSuccess: () => {
            handleSuccess("Profile successfully updated!");
            queryClient.invalidateQueries({ queryKey: ["admin-users-profile"] });
          },
          onError: () => handleError("Something went wrong!"),
        }
      );
    }
  };

  const handleClosePopupImage = () => setImageUploadPanel(false);

  return (
    <div className="p-4 lg:p-8 min-h-screen bg-slate-50/50">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
             <FaUserCog className="text-orange-500" />
          </div>
          Profile Settings
        </h2>
        <p className="text-slate-500 text-sm mt-1 ml-12">Update your personal information and profile picture.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          /* Modern Skeleton Loader */
          <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 animate-pulse">
            <div className="flex flex-col items-center mb-10">
              <div className="w-24 h-24 bg-slate-200 rounded-full mb-4" />
              <div className="h-4 bg-slate-200 rounded w-32" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-16" />
                  <div className="h-12 bg-slate-200 rounded-xl w-full" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center justify-center mb-10">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden cursor-pointer bg-slate-100 ring-1 ring-slate-100">
                    <img
                      onClick={() => setImageUploadPanel(true)}
                      src={!imageShow ? no_image : imageShow}
                      alt="Profile"
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                    {/* Overlay on hover */}
                    <div 
                       onClick={() => setImageUploadPanel(true)}
                       className="absolute inset-0 bg-black/20 opacity-0 rounded-[50%] group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                        <IoCameraSharp className="text-white text-2xl" />
                    </div>
                  </div>

                  {/* Remove Button */}
                  {imageShow && (
                    <button
                      onClick={() => setImageShow("")}
                      className="absolute -top-1 -right-1 z-10 bg-white hover:bg-red-500 text-slate-400 hover:text-white w-7 h-7 rounded-full cursor-pointer shadow-md transition-all border border-slate-100 flex items-center justify-center"
                    >
                      <IoClose size={16} />
                    </button>
                  )}

                  {/* Camera Icon Trigger */}
                  <button
                    onClick={() => setImageUploadPanel(true)}
                    className="absolute -bottom-1 -right-1 z-10 bg-orange-500 hover:bg-orange-600 text-white w-9 h-9 rounded-full cursor-pointer shadow-lg transition-all border-4 border-white flex items-center justify-center"
                  >
                    <IoCameraSharp size={18} />
                  </button>
                </div>
                <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Profile Photo</p>
              </div>

              {/* Form Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                    <IoPersonOutline className="text-orange-500" /> Full Name
                  </label>
                  <input
                    value={formData?.name}
                    onChange={handleChange}
                    name="name"
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 ${
                      errors.name ? "border-red-400 bg-red-50/30" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs font-medium ml-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                    <IoMailOutline className="text-orange-500" /> Email Address
                  </label>
                  <input
                    value={formData?.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 ${
                      errors.email ? "border-red-400 bg-red-50/30" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs font-medium ml-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="bg-slate-50/80 px-8 py-5 border-t border-slate-100 flex justify-end items-center gap-4">
               <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Please make sure your details are correct before saving.</p>
               <button 
                 disabled={updateAdminUserAPI.isPending}
                 className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-200 transition-all active:scale-95 disabled:opacity-70 cursor-pointer" 
                 onClick={handleSave}
               >
                 {updateAdminUserAPI.isPending ? "Updating..." : "Save Changes"}
               </button>
            </div>
          </div>
        )}
      </div>

      {/* Media Library Popup */}
      {imageUploadPanel && (
        <UploadImagePanel
          handleClosePopupImage={handleClosePopupImage}
          businessId={businessId ?? undefined}
          setImageShow={setImageShow}
        />
      )}
    </div>
  );
};

export default ProfileSettings;
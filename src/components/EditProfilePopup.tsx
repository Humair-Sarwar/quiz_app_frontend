import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdEdit } from "react-icons/md";
import { IoClose, IoCameraSharp } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Overlay from "./Overlay";
import no_image from "../assets/images/no_image.png"; // Placeholder image path
import type { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateProfileUser } from "../hooks/useCustomer";
import { handleError, handleSuccess } from "../toast";

interface EditProfileProps {
  handleClosePopup: () => void;
  formData: any;
  setFormData: Dispatch<SetStateAction<any>>;
}

const EditProfilePopup: React.FC<EditProfileProps> = ({
  handleClosePopup,
  formData,
  setFormData,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});

  // Previews for images
  const [previews, setPreviews] = useState({
    image: formData?.image
      ? `${import.meta.env.VITE_BASE_URL}/uploads/${formData.image}`
      : null,
    cover_image: formData?.cover_image
      ? `${import.meta.env.VITE_BASE_URL}/uploads/${formData.cover_image}`
      : null,
  });

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(handleClosePopup, 300);
  };

  const queryClient = useQueryClient();
  const updateUserProfile = useUpdateProfileUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData((prev: any) => ({ ...prev, [name]: file })); // Save actual file

      // Set preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev: any) => ({ ...prev, phone: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const newErrors: any = {};
    if (!formData?.name?.trim()) newErrors.name = "Name is required!";
    if (!formData?.email?.trim()) newErrors.email = "Email is required!";
    if (!formData?.phone || formData?.phone.length < 10)
      newErrors.phone = "Valid phone is required!";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Create FormData object to send files
      const data = new FormData();
      data.append("user_id", formData.user_id);
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("country", formData.country || "");

      // Append files if they are File objects (newly selected)
      if (formData.image instanceof File) data.append("image", formData.image);
      if (formData.cover_image instanceof File)
        data.append("cover_image", formData.cover_image);

      updateUserProfile.mutate(data, {
        onSuccess: () => {
          handleSuccess("Profile Successfully Updated!");
          queryClient.invalidateQueries({ queryKey: ["student-user"] });
          handleCloseWithAnimation();
        },
        onError: () => handleError("Something went wrong!"),
      });
    }
  };

  return (
    <>
      <Overlay isVisible={isVisible} />
      <div className="fixed inset-0 flex items-center justify-center py-4 px-4 z-55">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={
            isVisible
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.9, y: 20 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl w-full max-w-2xl relative border border-slate-100"
        >
          <form onSubmit={handleSubmit} className="flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <MdEdit className="text-[#ff5b07]" />
                </div>
                Edit Profile
              </h2>
              <button
                type="button"
                onClick={handleCloseWithAnimation}
                className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-[#ff5b07] hover:text-white transition-all"
              >
                <IoClose size={20} />
              </button>
            </div>

            <div className="overflow-y-auto p-8 pt-4">
              {/* Cover Image Section */}
              <div className="w-full h-[140px] relative mb-16">
                <img
                  src={previews.cover_image || no_image}
                  alt="Background"
                  className="object-cover h-full w-full rounded-3xl shadow-inner bg-slate-100"
                />
                <label className="absolute top-3 right-3 bg-white/90 hover:bg-[#ff5b07] hover:text-white p-2 rounded-xl cursor-pointer shadow-sm transition-all text-slate-600">
                  <IoCameraSharp size={18} />
                  <input
                    type="file"
                    name="cover_image"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>

                {/* Profile Image Avatar */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[-45px] h-[100px] w-[100px] rounded-[2rem] border-[6px] border-white shadow-xl overflow-hidden group">
                  <img
                    src={previews.image || no_image}
                    alt="Profile"
                    className="h-full w-full object-cover bg-slate-50"
                  />
                  <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <IoCameraSharp className="text-white" size={24} />
                    <input
                      type="file"
                      name="image"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              {/* Other Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <CustomInput
                  onChange={handleChange}
                  error={errors.name}
                  label="Full Name"
                  name="name"
                  value={formData?.name}
                />
                <CustomInput
                  onChange={handleChange}
                  error={errors.email}
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData?.email}
                />

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
                    Phone Number
                  </label>
                   <PhoneInput
  country={"us"}
  // ✅ .toString() use karein taaki number hamesha string ban jaye
  value={formData?.phone ? formData.phone.toString() : ""}
  onChange={handlePhoneChange}
  inputStyle={{
    width: '100%',
    height: '56px',
    borderRadius: '1rem',
    border: errors.phone ? '2px solid #ef4444' : '2px solid transparent',
    backgroundColor: '#f8fafc',
    fontSize: '14px',
    fontWeight: '600'
  }}
  buttonStyle={{
    backgroundColor: 'transparent',
    border: 'none',
    paddingLeft: '10px'
  }}
/>

                  {errors.phone && (
                    <p className="text-red-500 text-xs font-medium ml-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <CustomInput
                  onChange={handleChange}
                  name="country"
                  label="Country"
                  value={formData?.country}
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-50 flex justify-end gap-3 bg-slate-50/50">
              <button
                type="button"
                onClick={handleCloseWithAnimation}
                className="px-6 py-3 cursor-pointer rounded-xl font-black uppercase text-[11px] text-slate-500 hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 cursor-pointer rounded-xl font-black uppercase text-[11px] bg-slate-900 text-white hover:bg-[#ff5b07] shadow-lg transition-all"
              >
                {updateUserProfile.isPending ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

const CustomInput = ({
  label,
  type = "text",
  value,
  onChange,
  name,
  error,
}: any) => (
  <div className="space-y-2">
    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
      {label}
    </label>
    <input
      onChange={onChange}
      value={value || ""}
      type={type}
      name={name}
      className={`w-full px-5 py-4 bg-slate-50 border-2 ${
        error ? "border-red-500" : "border-transparent"
      } rounded-2xl focus:bg-white focus:border-orange-100 transition-all outline-none font-semibold text-slate-700 text-sm`}
    />
    {error && <p className="text-red-500 text-xs font-medium ml-1">{error}</p>}
  </div>
);

export default EditProfilePopup;

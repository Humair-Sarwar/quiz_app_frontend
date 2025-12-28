import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdEdit } from "react-icons/md";
import { IoClose, IoCameraSharp } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Overlay from "./Overlay";
import bg from "../assets/images/bg.jpg";
import my_pic from "../assets/images/my-pic.jpg";

interface EditProfileProps {
  handleClosePopup: () => void;
}

const EditProfilePopup: React.FC<EditProfileProps> = ({ handleClosePopup }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(handleClosePopup, 300);
  };

  return (
    <>
      <Overlay isVisible={isVisible} />

      <div className="fixed inset-0 flex items-center justify-center py-4 px-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl w-full max-w-2xl relative border border-slate-100"
        >
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col max-h-[90vh]">
            
            {/* Header */}
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
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-[#ff5b07] hover:text-white transition-all cursor-pointer"
              >
                <IoClose size={20} />
              </button>
            </div>

            <div className="overflow-y-auto p-8 pt-4">
              {/* Image Upload Section */}
              <div className="w-full h-[120px] relative mb-16">
                <img
                  src={bg}
                  alt="Background"
                  className="object-cover h-full w-full rounded-3xl shadow-inner"
                />
                <label className="absolute top-3 right-3 bg-white/90 hover:bg-[#ff5b07] hover:text-white p-2 rounded-xl cursor-pointer shadow-sm transition-all text-slate-600">
                  <IoCameraSharp size={18} />
                  <input type="file" className="hidden" />
                </label>

                {/* Profile Image Avatar */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[-45px] h-[100px] w-[100px] rounded-[2rem] border-[6px] border-white shadow-xl overflow-hidden group">
                  <img src={my_pic} alt="Profile" className="h-full w-full object-cover" />
                  <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <IoCameraSharp className="text-white" size={24} />
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <CustomInput label="Full Name" placeholder="John Doe" id="name" />
                <CustomInput label="Email Address" placeholder="john@example.com" id="email" type="email" />
                
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Phone Number</label>
                  <PhoneInput
                    country={"us"}
                    value={phone}
                    onChange={setPhone}
                    inputStyle={{
                      width: '100%',
                      height: '56px',
                      borderRadius: '1rem',
                      border: '2px solid transparent',
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
                </div>

                <CustomInput label="Country" placeholder="United States" id="country" />
              </div>
            </div>

            {/* Sticky Footer Buttons */}
            <div className="p-6 border-t border-slate-50 flex justify-end gap-3 bg-slate-50/50">
              <button
                type="button"
                onClick={handleCloseWithAnimation}
                className="px-6 cursor-pointer py-3 rounded-xl font-black uppercase tracking-widest text-[11px] text-slate-500 hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 cursor-pointer rounded-xl font-black uppercase tracking-widest text-[11px] bg-slate-900 text-white hover:bg-[#ff5b07] shadow-lg shadow-slate-200 transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

// Internal Helper Component for clean code
const CustomInput = ({ label, placeholder, id, type = "text" }: any) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-100 transition-all outline-none font-semibold text-slate-700 text-sm"
    />
  </div>
);

export default EditProfilePopup;
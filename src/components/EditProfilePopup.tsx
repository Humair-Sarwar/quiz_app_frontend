import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import bg from "../assets/images/bg.jpg";
import my_pic from "../assets/images/my-pic.jpg";
import { IoCameraSharp } from "react-icons/io5";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

interface EditProfileProps {
  handleClosePopup: () => void;
}

const EditProfilePopup: React.FC<EditProfileProps> = ({ handleClosePopup }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    // Slight delay to trigger CSS transition after mount
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleClosePopup();
    }, 300); // match your transition duration
  };

  return (
    <>
      {/* Background overlay */}
      <Overlay isVisible={isVisible}/>

      {/* Popup container */}
      <div
        className={`fixed inset-0 flex items-center justify-center py-4 px-4 z-50 transition-all duration-300 ease-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-10"
        }`}
      >
        <div className="bg-white rounded-2xl overflow-y-auto max-h-[100%] shadow-2xl p-6 sm:p-6 w-full max-w-2xl relative transition-all duration-300 ease-in-out">
          <form action="">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-semibold flex items-center gap-2">
                <MdEdit /> Edit Profile
              </h2>
              <button
                type="button"
                onClick={handleCloseWithAnimation}
                className="bg-[#cccccc8c] rounded-4xl p-[3px] cursor-pointer transition-all text-black hover:bg-[#e04e00] hover:text-white"
              >
                <IoClose />
              </button>
            </div>

            {/* Background + profile image */}
            <div className="w-full h-[100px] relative mb-16">
              <img
                src={bg}
                alt="Background"
                className="object-cover h-full w-full rounded-2xl shadow"
              />

              <label
                htmlFor="bgUpload"
                className="absolute top-2 right-2 bg-[#cccccc8c] hover:bg-[#e04e00] hover:text-white text-black px-1 py-1 rounded-4xl cursor-pointer text-sm font-medium transition-colors duration-300"
              >
                <IoCameraSharp className="text-[20px]" />
              </label>
              <input
                type="file"
                id="bgUpload"
                className="hidden"
                onChange={() => {}}
              />

              {/* Profile image */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-50px] h-[100px] w-[100px] rounded-full border-4 border-white shadow-md group">
                <img
                  src={my_pic}
                  alt="Profile"
                  className="h-full w-full object-cover object-center rounded-full"
                />

                <label
                  htmlFor="profileUpload"
                  className="absolute bottom-[-2px] right-[-2px] z-30 bg-[#cccccc8c] hover:bg-[#e04e00] hover:text-white text-black p-1 rounded-full cursor-pointer shadow transition-all duration-300 flex items-center justify-center"
                >
                  <IoCameraSharp className="text-[18px]" />
                </label>

                <input
                  type="file"
                  id="profileUpload"
                  className="hidden"
                  onChange={() => console.log()}
                />
              </div>
            </div>

            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block">
                  Full Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Enter Your Name"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="block">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Enter Your Email"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="phone" className="block">
                  Phone:
                </label>
                <div className="mt-1">
                  <PhoneInput
                    country={"us"}
                    value={phone}
                    onChange={(value) => setPhone(value)}
                    inputClass="input-target-set-field !w-full phone-input-target !h-auto"
                    buttonClass="!bg-transparent"
                    dropdownClass="!bg-white"
                    enableSearch={true}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="country" className="block">
                  Country:
                </label>
                <input
                  type="text"
                  id="country"
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Enter Your Country"
                />
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
                type="submit"
                className="rounded-[10px] bg-green-400 py-3 px-4 text-white cursor-pointer hover:bg-green-600 transition-all"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfilePopup;

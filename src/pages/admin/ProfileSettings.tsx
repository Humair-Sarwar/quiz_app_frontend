import React, { useState } from "react";
import my_pic from "../../assets/images/my-pic.jpg";
import ViewUserQuiz from "../../components/ViewUserQuiz";
import { FaUserCog } from "react-icons/fa";
import { IoCameraSharp } from "react-icons/io5";

const ProfileSettings: React.FC = () => {
  const [viewCustomerQuiz, setViewCustomerQuiz] = useState<boolean>(false);
  const handleClosePopup = () => {
    setViewCustomerQuiz(false);
  };
  return (
    <>
      <div className="p-5 lg:p-10 h-[calc(100vh - 60px)]">
        <div className="flex justify-between items-start flex-col lg:flex-row md:flex-row lg:items-center md:items-center">
          <h2 className="text-[20px] font-semibold flex items-center gap-2 mb-3 text-nowrap">
            <FaUserCog className="text-[20px]" /> Profile Settings
          </h2>
      
        </div>

       <div className="p-4 bg-white rounded-[10px] mt-5 shadow">
      <div className="flex justify-center">
        <div className="relative mb-3 h-[100px] w-[100px] rounded-full border-4 border-white shadow-md group">
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


 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-1">
                <label htmlFor="name" className="block">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Enter Your Name"
                />
              </div>

              <div className="md:col-span-1">
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

            

              </div>

 <hr className="my-5 text-[#cccccc9a]"/>
            <div className="flex justify-end">
                <button className="primary-button">Save Changes</button>
            </div>

       </div>

      </div>

      {viewCustomerQuiz && (
        <ViewUserQuiz
          handleClosePopup={handleClosePopup}
        />
      )}
      
    </>
  );
};

export default ProfileSettings;

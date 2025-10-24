import React, { useState } from "react";
import ViewUserQuiz from "../../components/ViewUserQuiz";
import { IoCameraSharp, IoSettingsSharp } from "react-icons/io5";

import my_pic from "../../assets/images/my-pic.jpg";
import PhoneInput from "react-phone-input-2";
import { MdDeleteForever } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("general");
  const [viewCustomerQuiz, setViewCustomerQuiz] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const handleClosePopup = () => setViewCustomerQuiz(false);

  // ✅ Tab data (easy to expand later)
  const tabs = [
    { id: "general", label: "General" },
    { id: "social_links", label: "Social Links" },
    { id: "website_services", label: "Website Services" },
  ];

  // ✅ Render tab content dynamically
  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div>
            <div className="flex gap-15 my-5">
              {" "}
              <div className="flex items-center">
                <h3 className="font-semibold mr-3">Header</h3>
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
              <div className="flex items-center">
                <h3 className="font-semibold mr-3">Footer</h3>
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
            </div>





  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label htmlFor="name" className="block">
                  Title:
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Enter Your Site Title"
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

              <div className="md:col-span-1">
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

               <div className="md:col-span-3">
<label htmlFor="phone" className="block">
                  Description:
                </label>
                <textarea name="" id="" className="textarea-target-form-x"></textarea>
               </div>
              </div>


            <div className="my-3 flex items-center gap-5">
               <div className="mt-6">
                 <label htmlFor="whatsapp-chat-icon" className="flex items-center gap-2 text-[14px]"><input
                      type="checkbox"
                      id="whatsapp-chat-icon"
                      className="w-4 h-4 cursor-pointer accent-[#e04e00] border-gray-300 rounded focus:ring-[#e04e00]"
                    /> Show WhatsApp Chat Icon</label>
               </div>
                 <div className="min-w-[38%]">
                <label htmlFor="phone" className="block">
                  WhatsApp No:
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
            </div>

<hr className="my-5 text-[#cccccc9a]"/>
            <h3 className="text-lg font-semibold mb-3">Promotional Items</h3>
            
            <div className="flex flex-col items-start gap-4">
                <div className="w-[500px]">
                <label htmlFor="name" className="block">
                  Item 1:
                </label>
                <div className="flex items-center gap-3">
                    <input
                  type="text"
                  id="name"
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Enter text..."
                />
                <div className="cursor-pointer text-[22px] text-red-500 hover:text-red-600 transition-all"><MdDeleteForever /></div>
                </div>
              </div>
                <button className="mini-primary-button">Add Item</button>
            </div>
            <hr className="my-5 text-[#cccccc9a]"/>
            <div className="flex justify-end">
                <button className="primary-button">Save Changes</button>
            </div>
          </div>
        );
      case "social_links":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-3">Social Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
             <div className="">
                <label htmlFor="email" className="block">
                  Facebook:
                </label>
                  <div className="relative w-full lg:w-auto md:w-auto">
                              <FaFacebookF className="absolute left-3 top-[50%] text-[20px] translate-y-[-50%]" />
                
                              <input
                                type="text"
                                id="name"
                                className="input-target-set-field w-full !ps-9"
                                placeholder="https://example.com"
                              />
                            </div>
              </div>
              <div className="">
                <label htmlFor="email" className="block">
                  Tiktok:
                </label>
                  <div className="relative w-full lg:w-auto md:w-auto">
                              <FaTiktok className="absolute left-3 top-[50%] text-[20px] translate-y-[-50%]" />
                
                              <input
                                type="text"
                                id="name"
                                className="input-target-set-field w-full !ps-9"
                                placeholder="https://example.com"
                              />
                            </div>
              </div>
               <div className="">
                <label htmlFor="email" className="block">
                  Instagram:
                </label>
                  <div className="relative w-full lg:w-auto md:w-auto">
                              <FaInstagram className="absolute left-3 top-[50%] text-[20px] translate-y-[-50%]" />
                
                              <input
                                type="text"
                                id="name"
                                className="input-target-set-field w-full !ps-9"
                                placeholder="https://example.com"
                              />
                            </div>
              </div>
               <div className="">
                <label htmlFor="email" className="block">
                  WhatsApp:
                </label>
                  <div className="relative w-full lg:w-auto md:w-auto">
                              <FaWhatsapp className="absolute left-3 top-[50%] text-[20px] translate-y-[-50%]" />
                
                              <input
                                type="text"
                                id="name"
                                className="input-target-set-field w-full !ps-9"
                                placeholder="https://example.com"
                              />
                            </div>
              </div>
            </div>
            <hr className="my-5 text-[#cccccc9a]"/>
            <div className="flex justify-end">
                <button className="primary-button">Save Changes</button>
            </div>

          </div>
        );
      case "website_services":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-3">Website Mode</h3>
            <div className="flex gap-8">
                  <label htmlFor="active-website" className="flex items-center gap-2 text-[14px]"><input
                      type="radio"
                      id="active-website"
                      className="w-4 h-4 cursor-pointer accent-[#e04e00] border-gray-300 rounded focus:ring-[#e04e00]"
                    /> Active Website</label>
                     <label htmlFor="active-website" className="flex items-center gap-2 text-[14px]"><input
                      type="radio"
                      id="active-website"
                      className="w-4 h-4 cursor-pointer accent-[#e04e00] border-gray-300 rounded focus:ring-[#e04e00]"
                    /> Active Coming Soon Page
</label>
                     <label htmlFor="active-website" className="flex items-center gap-2 text-[14px]"><input
                      type="radio"
                      id="active-website"
                      className="w-4 h-4 cursor-pointer accent-[#e04e00] border-gray-300 rounded focus:ring-[#e04e00]"
                    /> Active Maintenance Page</label>
            </div>
             <hr className="my-5 text-[#cccccc9a]"/>
            <div className="flex justify-end">
                <button className="primary-button">Save Changes</button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="p-5 lg:p-10 h-[calc(100vh-60px)]">
        {/* Header */}
        <div className="flex justify-between items-start flex-col lg:flex-row md:flex-row lg:items-center md:items-center">
          <h2 className="text-[20px] font-semibold flex items-center gap-2 mb-3 text-nowrap">
            <IoSettingsSharp className="text-[20px]" /> Settings
          </h2>
        </div>

        {/* Tabs */}
        <div className="p-4 bg-white rounded-[10px] mt-5 shadow">
          <div className="border-b border-gray-200 mb-5 flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 cursor-pointer py-2 rounded-t-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>{renderTabContent()}</div>
        </div>
      </div>

      {viewCustomerQuiz && <ViewUserQuiz handleClosePopup={handleClosePopup} />}
    </>
  );
};

export default Settings;

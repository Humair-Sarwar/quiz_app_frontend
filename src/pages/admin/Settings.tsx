import React, { useState } from "react";
import ViewUserQuiz from "../../components/ViewUserQuiz";
import { IoCameraSharp, IoSettingsSharp, IoGlobeOutline, IoMailOutline } from "react-icons/io5";
import my_pic from "../../assets/images/my-pic.jpg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Ensure CSS is imported
import { MdDeleteForever, MdOutlinePostAdd } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("general");
  const [viewCustomerQuiz, setViewCustomerQuiz] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const handleClosePopup = () => setViewCustomerQuiz(false);

  const tabs = [
    { id: "general", label: "General", icon: <IoSettingsSharp /> },
    { id: "social_links", label: "Social Links", icon: <FaFacebookF /> },
    { id: "website_services", label: "Website Mode", icon: <IoGlobeOutline /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="animate-in fade-in duration-500">
            {/* Logo Upload Section */}
            <div className="flex flex-wrap gap-10 mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-700">Header Logo</h3>
                  <p className="text-[11px] text-slate-400">Displayed on Top</p>
                </div>
                <div className="relative h-20 w-20 rounded-2xl border-2 border-white shadow-lg overflow-hidden group">
                  <img src={my_pic} alt="Header" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                  <label className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <IoCameraSharp className="text-white text-xl" />
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
              <div className="w-[1px] bg-slate-200 hidden md:block" />
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-700">Footer Logo</h3>
                  <p className="text-[11px] text-slate-400">Displayed on Bottom</p>
                </div>
                <div className="relative h-20 w-20 rounded-2xl border-2 border-white shadow-lg overflow-hidden group">
                  <img src={my_pic} alt="Footer" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                  <label className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <IoCameraSharp className="text-white text-xl" />
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* General Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">Site Title</label>
                <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all" placeholder="Enter Site Title" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">Support Email</label>
                <div className="relative">
                  <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all" placeholder="support@site.com" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">Contact Phone</label>
                <PhoneInput
                  country={"us"}
                  value={phone}
                  onChange={(val) => setPhone(val)}
                  inputClass="!w-full !h-[42px] !rounded-xl !border-slate-200 !focus:border-orange-500"
                  buttonClass="!border-slate-200 !rounded-l-xl"
                />
              </div>
              <div className="md:col-span-3 space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">Meta Description</label>
                <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all min-h-[100px]" placeholder="Write site description..."></textarea>
              </div>
            </div>

            {/* WhatsApp Integration */}
            <div className="mt-8 p-5 bg-green-50/50 rounded-2xl border border-green-100 flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 accent-green-600 rounded cursor-pointer" />
                <span className="text-sm font-bold text-slate-700">Enable WhatsApp Chat</span>
              </label>
              <div className="flex-1 min-w-[250px] space-y-1">
                <label className="text-[12px] font-bold text-green-700 ml-1 uppercase">WhatsApp Number</label>
                <PhoneInput
                  country={"us"}
                  value={phone}
                  inputClass="!w-full !h-[42px] !rounded-xl !border-green-200"
                  buttonClass="!border-green-200 !rounded-l-xl"
                />
              </div>
            </div>

            <hr className="my-8 border-slate-100" />
            <h3 className="text-md font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MdOutlinePostAdd className="text-orange-500 text-xl" /> Promotional Ticker Items
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 max-w-xl group">
                <div className="flex-1">
                  <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" placeholder="Flash Sale: 50% Off!..." />
                </div>
                <button className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer">
                  <MdDeleteForever size={24} />
                </button>
              </div>
              <button className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer px-1">
                <MdOutlinePostAdd size={18} /> Add New Item
              </button>
            </div>
          </div>
        );

      case "social_links":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Facebook", icon: <FaFacebookF className="text-blue-600" />, placeholder: "https://facebook.com/yourpage" },
              { label: "Instagram", icon: <FaInstagram className="text-pink-600" />, placeholder: "https://instagram.com/yourprofile" },
              { label: "Tiktok", icon: <FaTiktok className="text-black" />, placeholder: "https://tiktok.com/@yourhandle" },
              { label: "WhatsApp", icon: <FaWhatsapp className="text-green-600" />, placeholder: "https://wa.me/yournumber" },
            ].map((social, i) => (
              <div key={i} className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 ml-1">{social.label}</label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg group-focus-within:bg-orange-50 transition-colors">
                    {social.icon}
                  </div>
                  <input type="text" className="w-full pl-14 pr-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all shadow-sm" placeholder={social.placeholder} />
                </div>
              </div>
            ))}
          </div>
        );

      case "website_services":
        return (
          <div className="animate-in fade-in duration-500">
            <h3 className="text-md font-bold text-slate-800 mb-6">Website Status Mode</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: "active", label: "Live Website", desc: "Site is visible to all" },
                { id: "soon", label: "Coming Soon", desc: "Shows countdown page" },
                { id: "maintenance", label: "Maintenance", desc: "Undergoing updates" },
              ].map((mode) => (
                <label key={mode.id} className="relative flex flex-col p-5 border rounded-2xl cursor-pointer hover:bg-orange-50/30 transition-all border-slate-200 has-[:checked]:border-orange-500 has-[:checked]:ring-2 has-[:checked]:ring-orange-200">
                  <input type="radio" name="site-mode" className="absolute top-4 right-4 w-5 h-5 accent-orange-600" />
                  <span className="font-bold text-slate-800">{mode.label}</span>
                  <span className="text-[11px] text-slate-500 mt-1">{mode.desc}</span>
                </label>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 lg:p-8 min-h-screen bg-slate-50/30">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100 text-orange-500">
              <IoSettingsSharp size={24} />
            </div>
            Configuration Settings
          </h2>
          <p className="text-slate-500 text-sm mt-2 ml-1">Manage your website's core appearance and social presence.</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
          {/* Tabs Navigation */}
          <div className="px-6 pt-6 border-b border-slate-50 flex gap-2 overflow-x-auto overflow-y-hidden no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-2xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-slate-50 text-orange-600 border-x border-t border-slate-100 -mb-[1px]"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50/50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content Area */}
          <div className="p-8">
            {renderTabContent()}
          </div>

          {/* Sticky Footer Actions */}
          <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex justify-end items-center gap-4">
            <button className="px-6 py-2.5 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors cursor-pointer">
              Discard
            </button>
            <button className="px-10 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-200 transition-all active:scale-95 cursor-pointer">
              Save All Changes
            </button>
          </div>
        </div>
      </div>

      {viewCustomerQuiz && <ViewUserQuiz handleClosePopup={handleClosePopup} />}
    </div>
  );
};

export default Settings;
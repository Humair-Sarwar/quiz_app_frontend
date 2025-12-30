import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineLightBulb, HiOutlineLogout } from "react-icons/hi";
import { MdDashboard, MdPermMedia } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { RiListSettingsLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { IoSettingsSharp, IoClose } from "react-icons/io5";
import Overlay from "../../components/Overlay";

const sidebarConstants = [
  { title: "Dashboard", url: "/admin/dashboard", icon: <MdDashboard /> },
  { title: "Categories", url: "/admin/categories", icon: <AiFillProduct /> },
  { title: "Quiz List", url: "/admin/quiz-list", icon: <RiListSettingsLine /> },
  { title: "Users", url: "/admin/users", icon: <FaUsers /> },
  { title: "Media", url: "/admin/media", icon: <MdPermMedia /> },
];

const secondaryLinks = [
  { title: "Profile Settings", url: "/admin/profile-settings", icon: <FaUserCog /> },
  { title: "Settings", url: "/admin/settings", icon: <IoSettingsSharp /> },
];

interface AdminSidebarProps {
  showHideSidebar: boolean;
  handlehideSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ showHideSidebar, handlehideSidebar }) => {
  const navigate = useNavigate()

  const handleLogout = ()=>{
    localStorage.clear();
    navigate("/login");
  }
  
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `text-[15px] font-medium transition-all duration-300 flex items-center gap-3 rounded-xl py-3 px-4 mb-1 group whitespace-nowrap ${
      isActive
        ? "bg-[#ff5b07] text-white shadow-lg shadow-[#ff5b0740]"
        : "text-slate-500 hover:bg-orange-50 hover:text-[#ff5b07]"
    }`;

  return (
    <>
      {/* Scrollbar Customization - Inline CSS to keep it slim */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0; 
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff5b07;
        }
      `}</style>

      <div
        className={`w-[280px] ${
          showHideSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } transition-transform duration-300 p-5 h-screen fixed left-0 top-0 bg-white border-r border-slate-100 shadow-xl lg:shadow-none z-51 flex flex-col overflow-x-hidden`}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={handlehideSidebar}
          className="lg:hidden absolute right-4 top-5 bg-slate-100 p-2 rounded-full hover:bg-orange-100 hover:text-[#ff5b07] transition-colors z-10"
        >
          <IoClose size={20} />
        </button>

        {/* LOGO */}
        <div className="flex items-center gap-2 px-4 mb-8 mt-2 flex-shrink-0">
          <div className="w-10 h-10 bg-[#ff5b07] rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
            <HiOutlineLightBulb className="text-white text-2xl" />
          </div>
          <h3 className="font-black text-2xl tracking-tight text-slate-800">
            Quiz<span className="text-[#ff5b07]">Master</span>
          </h3>
        </div>

        {/* MAIN MENU - Added 'custom-scrollbar' class */}
        <div className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar pr-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Main Menu</p>
          <ul className="mb-6">
            {sidebarConstants.map((list, index) => (
              <li key={index}>
                <NavLink to={list.url} onClick={handlehideSidebar} className={linkStyle}>
                  <span className="text-xl flex-shrink-0">{list.icon}</span>
                  <span className="truncate">{list.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Configuration</p>
          <ul className="mb-4">
            {secondaryLinks.map((list, index) => (
              <li key={index}>
                <NavLink to={list.url} onClick={handlehideSidebar} className={linkStyle}>
                  <span className="text-xl flex-shrink-0">{list.icon}</span>
                  <span className="truncate">{list.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-6 border-t border-slate-50 flex-shrink-0">
          <button
            className="w-full text-[15px] cursor-pointer font-bold text-slate-500 flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 group whitespace-nowrap"
            onClick={() => {handlehideSidebar(); handleLogout()}}
          >
            <HiOutlineLogout className="text-xl group-hover:rotate-12 transition-transform flex-shrink-0" />
            <span>Logout Account</span>
          </button>
          
          <div className="mt-4 p-3 bg-slate-50 rounded-2xl flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center font-bold text-[#ff5b07] text-xs flex-shrink-0">
               AD
             </div>
             <div className="flex flex-col overflow-hidden text-ellipsis">
                <span className="text-[12px] font-bold text-slate-800 truncate">Admin Panel</span>
                <span className="text-[10px] text-slate-400">v2.0.4 Live</span>
             </div>
          </div>
        </div>
      </div>

      {showHideSidebar && <Overlay isVisible={true} />}
    </>
  );
};

export default AdminSidebar;
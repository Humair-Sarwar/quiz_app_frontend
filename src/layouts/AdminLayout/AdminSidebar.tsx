import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdDashboard, MdPermMedia } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { RiListSettingsLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { IoLogOutOutline, IoSettingsSharp } from "react-icons/io5";
import Overlay from "../../components/Overlay";
import { IoClose } from "react-icons/io5";


const sidebarConstants = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: <MdDashboard className="text-[20px]"/>,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: <AiFillProduct className="text-[20px]" />,
  },
  {
    title: "Quiz List",
    url: "/admin/quiz-list",
    icon: <RiListSettingsLine className="text-[20px]" />,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: <FaUsers className="text-[20px]" />
,
  },
//   {
//     title: "Email Templates",
//     url: "/admin/email-templates",
//     icon: <MdMarkEmailRead className="text-[20px]" />
// ,
//   },
{
    title: "Media",
    url: "/admin/media",
    icon: <MdPermMedia className="text-[20px]" />
,
  },
  {
    title: "Profile Settings",
    url: "/admin/profile-settings",
    icon: <FaUserCog className="text-[20px]" />
,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: <IoSettingsSharp className="text-[20px]" />

  },
];

interface AdminSidebarProps{
    showHideSidebar: boolean;
    handlehideSidebar: ()=>void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({showHideSidebar, handlehideSidebar}) => {
    
  return (
    <>
      <div className={`w-[280px] ${showHideSidebar ? 'admin-sidebar-target-show' : 'admin-sidebar-target'} p-3 h-[100vh] fixed left-0 top-0 bg-white shadow-lg overflow-y-auto`}>
       
       <button
                       type="button"
                       onClick={handlehideSidebar}
                       className="absolute right-4 bg-[#cccccc8c] hidden close-icon-sidebar-target rounded-4xl p-[3px] cursor-pointer transition-all text-black hover:bg-[#e04e00] hover:text-white"
                     >
                       <IoClose />
                     </button>
        <NavLink
          to="/"
          className="flex items-center gap-1 mx-5 my-3 justify-center"
        >
          <h3 className="font-bold text-2xl primary-color-text">Quiz</h3>
          <HiOutlineLightBulb className="text-3xl" />
        </NavLink>
        <h5 className="text-[13px] ms-2 font-semibold">Admin</h5>
        <ul>
          {sidebarConstants?.map((list) => (
            <>
            <li>
              <NavLink
                to={list?.url}
                onClick={handlehideSidebar}
                className={({ isActive }) =>
    `text-[16px] transition-all flex items-center gap-2 rounded-[10px] py-2 px-3 mb-1 border-1 border-transparent ${
      isActive
        ? " bg-[#ff5b07] text-white "
        : "hover:bg-[rgb(255, 248, 245)] hover:text-black hover:border-1 hover:border-[#ff5b07]"
    }`
  }



//   className={({ isActive }) =>
//     `w-full inline-block p-2 rounded-[8px] ${
//       isActive
//         ? "active-btn-style"
//         : " inactive-btn-style"
//     }`
//   }
              >
                {list?.icon} {list?.title}
              </NavLink>
            </li>





</>

          ))}

           <li>
              <NavLink
                to={''}
                onClick={handlehideSidebar}
                className={({ isActive }) =>
    `text-[16px] transition-all flex items-center gap-2 rounded-[10px] py-2 px-3 mb-1 border-1 border-transparent ${
      isActive
        ? " bg-[#ff5b07] text-white "
        : "hover:bg-[rgb(255, 248, 245)] hover:text-black hover:border-1 hover:border-[#ff5b07]"
    }`
  }

              >
                <IoLogOutOutline className="text-[20px]" />
              Logout
              </NavLink>
            </li>
        </ul>
      </div>
      {showHideSidebar && <Overlay isVisible={showHideSidebar ? true : false}/>}
    </>
  );
};

export default AdminSidebar;

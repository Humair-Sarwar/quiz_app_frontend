import React, { useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import Overlay from "../../components/Overlay";
import { CiBoxList } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";  
import { TfiDashboard } from "react-icons/tfi";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <header className="bg-[#fff5ed] border-b border-[#d7d7d7]">
        <div className="container max-w-[1400px] px-4 py-5 mx-auto flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-1">
            <h3 className="font-bold text-2xl primary-color-text">Quiz</h3>
            <HiOutlineLightBulb className="text-3xl" />
          </NavLink>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-white p-1 mobile-menu-btn"
          >
            <MdOutlineMenu className="text-[22px]" />
          </button>
          <nav className="desktop-menu-website">
            <ul className="flex items-center gap-6 justify-between">
              <li>
                <NavLink to="/" className={({ isActive }) =>
    `transition-all ${
      isActive
        ? " text-[#ff5b07]"
        : " hover:text-[#ff5b07]"
    }`
  }>Home</NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) =>
    `transition-all ${
      isActive
        ? " text-[#ff5b07]"
        : " hover:text-[#ff5b07]"
    }`
  } to="/categories">Categories</NavLink>
              </li>
              <li>
                <a href="">FAQs</a>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <div className="relative user-button-target-icons p-3 cursor-pointer user-icon-none-target">
  <FaRegUser className="text-[20px]" />
  <div className="bg-white p-4 inner-box rounded-2xl shadow absolute top-10 left-[50%] translate-x-[-50%]">
    <ul>

<li>
        <NavLink to={'/admin/dashboard'}  className={({ isActive }) =>
    `transition-all text-nowrap text-[14px] flex items-center gap-2 mb-2 ${
      isActive
        ? " text-[#ff5b07]"
        : " hover:text-[#b8450b]"
    }`
  }>
          <TfiDashboard /> Dashboard
        </NavLink>
      </li>


      <li>
        <NavLink to={'/user/quiz-list'}  className={({ isActive }) =>
    `transition-all text-nowrap text-[14px] flex items-center gap-2 mb-2 ${
      isActive
        ? " text-[#ff5b07]"
        : " hover:text-[#b8450b]"
    }`
  }>
          <CiBoxList /> Solved Quiz List
        </NavLink>
      </li>
      <li>
        <NavLink to={'/user/profile-info'} className={({ isActive }) =>
    `transition-all text-nowrap text-[14px] flex items-center gap-2 ${
      isActive
        ? " text-[#ff5b07]"
        : " hover:text-[#b8450b]"
    }`
  }>
          <FaRegUser /> Profile Info
        </NavLink>
      </li>
    </ul>
  </div>
</div>

            <NavLink to="/login" className="p-[10px 20px] inline-block">
              Log in
            </NavLink>
            <NavLink to="/join-now" className="primary-button">
              Join Now
            </NavLink>
            <button className="text-2xl cursor-pointer text-red-500"><IoLogOutOutline /></button>
          </div>
        </div>
      </header>
      <div className={`bg-white rounded-2xl !z-4 p-3 py-3 w-[300px] ${showMenu ? 'mobile-menu-target-show mobile-menu-target' : 'mobile-menu-target'}`}>
        <div className="text-end mb-2">
          <button className="close-btn" onClick={() => setShowMenu(!showMenu)}>
            <IoClose />
          </button>
        </div>
        <nav>
          <ul>
            <li className="w-full mb-1">
              <NavLink
                to={"/"}
                
                 className={({ isActive }) =>
    `w-full inline-block p-2 rounded-[8px] ${
      isActive
        ? "active-btn-style"
        : " inactive-btn-style"
    }`
  }
              >
                Home
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to={"/categories"}
                className={({ isActive }) =>
    `w-full inline-block p-2 rounded-[8px] ${
      isActive
        ? "active-btn-style"
        : " inactive-btn-style"
    }`
  }
              >
                Categories
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to={"/faq"}
                className={({ isActive }) =>
    `w-full inline-block p-2 rounded-[8px] ${
      isActive
        ? "active-btn-style"
        : " inactive-btn-style"
    }`
  }
              >
                FAQs
              </NavLink>
            </li>
                  <h3 className="font-semibold mt-4 m-2 text-[#7c7c7c]">User Dashboard Navigations</h3>
            <li className="w-full">
        <NavLink to={'/user/quiz-list'} className={({ isActive }) =>
    `text-nowrap flex  w-full items-center p-2 rounded-[8px] gap-2 ${
      isActive
        ? "active-btn-style"
        : " inactive-btn-style"
    }`
  }>
          <CiBoxList /> Solved Quiz List
        </NavLink>
      </li>
      <li className="w-full">
        <NavLink to={'/user/profile-info'} className={({ isActive }) =>
    `text-nowrap flex  w-full items-center p-2 rounded-[8px] gap-2 ${
      isActive
        ? "active-btn-style"
        : " inactive-btn-style"
    }`
  }>
          <FaRegUser /> Profile Info
        </NavLink>
      </li>
          </ul>
        </nav>
      </div>
      {showMenu && <Overlay isVisible={showMenu}/>}
    </>
  );
};

export default Header;

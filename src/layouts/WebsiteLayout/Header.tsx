import React, { useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import Overlay from "../../components/Overlay";

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
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/categories">Categories</NavLink>
              </li>
              <li>
                <a href="">FAQs</a>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <FaRegUser className="text-[20px]"/>
            <NavLink to="/login" className="p-[10px 20px] inline-block">
              Log in
            </NavLink>
            <NavLink to="/join-now" className="primary-button">
              Join Now
            </NavLink>
          </div>
        </div>
      </header>
      <div className={`bg-white rounded-2xl p-3 py-3 w-[300px] ${showMenu ? 'mobile-menu-target-show mobile-menu-target' : 'mobile-menu-target'}`}>
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
                className={
                  "w-full inline-block p-2 rounded-[8px] active-btn-style"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to={"/"}
                className={"w-full inline-block p-2 rounded-[8px]"}
              >
                Categories
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to={"/"}
                className={"w-full inline-block p-2 rounded-[8px]"}
              >
                FAQs
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {showMenu && <Overlay/>}
    </>
  );
};

export default Header;

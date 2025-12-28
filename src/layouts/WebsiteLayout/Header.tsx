import React, { useState, useEffect } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoLogOutOutline, IoChevronDownOutline } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { TfiDashboard } from "react-icons/tfi";
import Overlay from "../../components/Overlay";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  
  const userType = Number(localStorage.getItem("user_type"));

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `relative font-medium transition-colors duration-200 py-2 ${
      isActive ? "text-[#ff5b07]" : "text-slate-600 hover:text-[#ff5b07]"
    }`;

  const activeIndicator = (isActive: boolean) => 
    isActive ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#ff5b07] after:rounded-full" : "";

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3" 
          : "bg-[#fff5ed] py-5"
        }`}
      >
        <div className="container max-w-[1400px] px-6 mx-auto flex items-center justify-between">
          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-[#ff5b07] rounded-xl text-white shadow-lg shadow-orange-200 group-hover:rotate-12 transition-transform">
              <HiOutlineLightBulb className="text-2xl" />
            </div>
            <h3 className="font-black text-2xl tracking-tight text-slate-800">
              Quiz<span className="text-[#ff5b07]">Master</span>
            </h3>
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              <li>
                <NavLink to="/" className={(props) => `${navLinkStyles(props)} ${activeIndicator(props.isActive)}`}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/categories" className={(props) => `${navLinkStyles(props)} ${activeIndicator(props.isActive)}`}>Categories</NavLink>
              </li>
              <li>
                <NavLink to="/faq" className={(props) => `${navLinkStyles(props)} ${activeIndicator(props.isActive)}`}>FAQs</NavLink>
              </li>
            </ul>
          </nav>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            {userType === 1 || userType === 2 ? (
              <div className="flex items-center gap-3">
                {/* Profile Dropdown Trigger */}
                <div className="relative group hidden sm:block">
                  <button className="flex items-center gap-2 bg-white border border-slate-200 py-1.5 px-3 rounded-full hover:border-[#ff5b07] transition-all cursor-pointer">
                    <div className="w-8 h-8 bg-orange-100 text-[#ff5b07] rounded-full flex items-center justify-center">
                      <FaRegUser size={14} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">Account</span>
                    <IoChevronDownOutline className="text-slate-400 group-hover:rotate-180 transition-transform" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 overflow-hidden">
                      {userType === 2 && (
                        <NavLink to="/admin/dashboard" className="flex items-center gap-3 p-3 text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-[#ff5b07] rounded-xl transition-colors">
                          <TfiDashboard /> Dashboard
                        </NavLink>
                      )}
                      {userType === 1 && (
                        <>
                          <NavLink to="/user/quiz-list" className="flex items-center gap-3 p-3 text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-[#ff5b07] rounded-xl transition-colors">
                            <CiBoxList /> Solved Quizzes
                          </NavLink>
                          <NavLink to="/user/profile-info" className="flex items-center gap-3 p-3 text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-[#ff5b07] rounded-xl transition-colors">
                            <FaRegUser /> My Profile
                          </NavLink>
                        </>
                      )}
                      <hr className="my-1 border-slate-100" />
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <IoLogOutOutline size={18} /> Logout
                      </button>
                    </div>
                  </div>
                </div>

                {/* Logout Button (Direct) */}
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors sm:hidden"
                >
                  <IoLogOutOutline size={24} />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <NavLink to="/login" className="px-5 py-2 text-sm font-bold text-slate-700 hover:text-[#ff5b07] transition-colors">
                  Log in
                </NavLink>
                <NavLink to="/join-now" className="bg-[#ff5b07] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-orange-200 hover:bg-[#e65206] transition-all hover:-translate-y-0.5">
                  Join Now
                </NavLink>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMenu(true)}
              className="lg:hidden p-2 bg-white rounded-xl border border-slate-200 text-slate-700 shadow-sm"
            >
              <MdOutlineMenu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to push content below fixed header */}
      <div className="h-[80px]"></div>

      {/* MOBILE DRAWER */}
      <div 
        className={`fixed top-0 right-0 h-full w-[300px] bg-white z-[60] shadow-2xl transition-transform duration-300 transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-xl text-slate-800">Menu</h3>
            <button 
              onClick={() => setShowMenu(false)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <IoClose size={24} />
            </button>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              <MobileItem to="/" label="Home" onClick={() => setShowMenu(false)} />
              <MobileItem to="/categories" label="Categories" onClick={() => setShowMenu(false)} />
              <MobileItem to="/faq" label="FAQs" onClick={() => setShowMenu(false)} />
              
              {(userType === 1 || userType === 2) && (
                <>
                  <div className="pt-4 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Dashboard</div>
                  {userType === 2 && <MobileItem to="/admin/dashboard" label="Admin Dashboard" icon={<TfiDashboard />} onClick={() => setShowMenu(false)} />}
                  <MobileItem to="/user/quiz-list" label="Solved Quizzes" icon={<CiBoxList />} onClick={() => setShowMenu(false)} />
                  <MobileItem to="/user/profile-info" label="My Profile" icon={<FaRegUser />} onClick={() => setShowMenu(false)} />
                </>
              )}
            </ul>
          </nav>

          {!userType && (
            <div className="mt-auto space-y-3">
              <NavLink to="/login" className="block w-full text-center py-3 font-bold text-slate-700 border border-slate-200 rounded-xl">Login</NavLink>
              <NavLink to="/join-now" className="block w-full text-center py-3 font-bold text-white bg-[#ff5b07] rounded-xl shadow-lg shadow-orange-100">Join Now</NavLink>
            </div>
          )}
        </div>
      </div>

      <Overlay isVisible={showMenu} closeOverlay={() => setShowMenu(false)} />
    </>
  );
};

// Sub-component for Mobile Items to keep code DRY
const MobileItem = ({ to, label, onClick, icon }: any) => (
  <li>
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl font-medium transition-all ${
          isActive 
          ? "bg-orange-50 text-[#ff5b07]" 
          : "text-slate-600 hover:bg-slate-50"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  </li>
);

export default Header;
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // ✨ Now being used below
import { FaListCheck, FaUserGear, FaBarsStaggered } from "react-icons/fa6";
import { HiOutlineLogout, HiOutlineLightningBolt, HiOutlineX } from "react-icons/hi";
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useProfileUser } from '../../hooks/useCustomer';
import no_image from "../../assets/images/no_image.png";

const UserSidebar: React.FC = () => {
  const businessId = useSelector((state: RootState) => state.auth.user_id);
  const { data } = useProfileUser({
      user_id: businessId!,
    });
  const [isOpen, setIsOpen] = useState(false);

  const navGroups = [
    {
      title: "Main Dashboard",
      links: [{ path: "/user/quiz-list", label: "Solved Quizzes", icon: FaListCheck }],
    },
    {
      title: "Preferences",
      links: [{ path: "/user/profile-info", label: "Profile Settings", icon: FaUserGear }],
    }
  ];

  

  return (
    <>
      {/* Mobile Trigger Bar */}
      <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center gap-3">
          <img src={data?.data?.image
                              ? `${import.meta.env.VITE_BASE_URL}/uploads/${
                                  data?.data?.image
                                }`
                              : no_image} alt="User" className="w-10 h-10 rounded-xl object-cover" />
          <span className="font-black text-slate-800 text-sm mr-4">Dashboard</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-slate-900 text-white rounded-xl active:scale-95 transition-all z-[15]"
        >
          {isOpen ? <HiOutlineX size={20} /> : <FaBarsStaggered size={20} />}
        </button>
      </div>

      {/* --- MOBILE OVERLAY & SIDEBAR --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[14] p-4 bg-white/80 backdrop-blur-lg mt-20 lg:hidden"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="h-full"
            >
              <SidebarContent navGroups={navGroups} data={data} setIsOpen={setIsOpen} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DESKTOP SIDEBAR --- */}
      <div className="hidden lg:block lg:w-[400px] lg:sticky lg:top-6 lg:h-fit bg-white rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100">
        <SidebarContent data={data} navGroups={navGroups} />
      </div>
    </>
  );
};

// Sub-component to keep code clean and DRY
const SidebarContent = ({ navGroups, setIsOpen, data }: { navGroups: any[], setIsOpen?: (val: boolean) => void; data: any }) =>{
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
  <div className="bg-white rounded-[2.5rem] z-0! relative p-6 h-full lg:p-0 overflow-y-auto max-h-screen lg:max-h-none shadow-2xl lg:shadow-none border border-slate-100 lg:border-none">
    {/* 1. User Mini Card */}
    <div className="mb-10 p-4 bg-slate-50 rounded-[2rem] border border-slate-100/50 flex items-center gap-4">
      <div className="relative">
        <img src={
                            data?.data?.image
                              ? `${import.meta.env.VITE_BASE_URL}/uploads/${
                                  data?.data?.image
                                }`
                              : no_image
                          } alt="User" className="w-12 h-12 rounded-2xl object-cover shadow-md" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
      </div>
      <div>
        <h4 className="text-sm font-black text-slate-800 leading-tight">{data?.data?.name}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Quiz Pro</p>
      </div>
    </div>

    {/* 2. Navigation Groups */}
    {navGroups.map((group, groupIdx) => (
      <div key={group.title} className={groupIdx !== 0 ? 'mt-10 lg:mt-12' : ''}>
        <h5 className='text-[10px] font-black uppercase tracking-[0.25em] text-[#ff5b07] opacity-60 mb-6 ml-4'>
          {group.title}
        </h5>
        <ul className='space-y-1.5'>
          {group.links.map((link: any) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={() => setIsOpen?.(false)}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 px-5 py-4 rounded-[1.25rem] transition-all duration-500 font-bold text-[13px] overflow-hidden ${
                    isActive ? "text-[#ff5b07]" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/80"
                  }`
                }
              >
                <link.icon className={`text-lg transition-all duration-500 relative z-10 group-hover:scale-110`} />
                <span className="relative z-10">{link.label}</span>
                <NavLink to={link.path}>
                  {({ isActive }) => isActive && (
                    <motion.div 
                      layoutId="sidebarActiveBG"
                      className="absolute inset-0 bg-gradient-to-r from-orange-50 to-white border-r-4 border-[#ff5b07]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </NavLink>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    ))}

    {/* 3. Stats Card */}
    <div className="mt-12 p-5 bg-[#ff5b07] rounded-[2rem] relative overflow-hidden group shadow-lg shadow-orange-200">
      <HiOutlineLightningBolt className="absolute -right-4 -top-4 text-white/10 text-8xl rotate-12 group-hover:rotate-0 transition-transform duration-700" />
      <p className="text-white/80 text-[10px] font-black uppercase tracking-widest relative z-10">Current Rank</p>
      <h3 className="text-white text-xl font-black mt-1 relative z-10">Gold League</h3>
      <div className="mt-3 w-full bg-white/20 h-1.5 rounded-full relative z-10">
        <div className="bg-white h-full w-[75%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
      </div>
    </div>

    {/* 4. Logout Action */}
    <div className='mt-8 pt-6 border-t border-slate-100 mb-4'>
      <button onClick={handleLogout} className='w-full cursor-pointer flex items-center gap-3 px-5 py-4 rounded-[1.25rem] text-slate-400 font-bold text-[13px] hover:bg-red-50 hover:text-red-500 transition-all group'>
        <div className="p-2 bg-slate-50 group-hover:bg-red-100 transition-colors rounded-xl">
          <HiOutlineLogout className="text-lg transition-transform group-hover:-translate-x-1" />
        </div>
        Logout Account
      </button>
    </div>
  </div>
);
}
  
  

export default UserSidebar;
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlineHome, HiOutlineQuestionMarkCircle } from 'react-icons/hi2';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-[#fafafa] flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* --- BACKGROUND DECO --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-2xl w-full relative z-10 text-center">
        
        {/* --- ILLUSTRATION BOX --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          {/* Floating Ghost / 404 Element */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10rem] md:text-[15rem] font-black text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.05)] select-none leading-none italic"
          >
            404
          </motion.div>
          
          {/* Absolute Center Label */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-slate-900 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.4em] px-6 py-2 rounded-full shadow-2xl">
                Lost in Space
             </div>
          </div>
        </motion.div>

        {/* --- TEXT CONTENT --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            A quiet place, <br />
            <span className="text-[#ff5b07]">but the wrong one.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-md mx-auto mb-10 font-medium">
            We couldn't find the page you're looking for. It might have been moved or simply never existed.
          </p>
        </motion.div>

        {/* --- INTERACTIVE ACTIONS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
          >
            <HiOutlineArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>

          <NavLink
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#ff5b07] text-white px-10 py-4 rounded-2xl font-bold text-sm hover:bg-[#e65206] transition-all shadow-lg shadow-orange-200 active:scale-95"
          >
            <HiOutlineHome className="text-lg" />
            Return Home
          </NavLink>
        </motion.div>

        {/* --- FOOTER LINKS --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-8 border-t border-slate-100 pt-8"
        >
          <NavLink to="/help" className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-2">
            <HiOutlineQuestionMarkCircle className="text-base" /> Help Center
          </NavLink>
          <span className="w-1 h-1 bg-slate-200 rounded-full" />
          <NavLink to="/report-issue" className="text-xs font-bold text-slate-400 hover:text-slate-600">
            Report an Issue
          </NavLink>
        </motion.div>

      </div>
    </div>
  );
};

export default PageNotFound;
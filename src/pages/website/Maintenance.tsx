import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineWrenchScrewdriver, HiOutlineCheckBadge, HiOutlineBellAlert, HiOutlineArrowPath } from 'react-icons/hi2';

const Maintenance: React.FC = () => {
  return (
    <div className="min-h-[100dvh] bg-white flex py-10 items-center justify-center px-6 relative overflow-hidden">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        
        {/* --- ANIMATED ICON --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-block mb-12"
        >
          <div className="w-32 h-32 bg-orange-50 rounded-[2.5rem] flex items-center justify-center text-[#ff5b07] text-5xl relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-dashed border-orange-200 rounded-[2.5rem]"
            />
            <HiOutlineWrenchScrewdriver />
          </div>
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-4 -right-4 bg-slate-900 text-white p-3 rounded-2xl shadow-xl"
          >
            <HiOutlineCheckBadge className="text-xl text-green-400" />
          </motion.div>
        </motion.div>

        {/* --- TEXT CONTENT --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Refining the <br />
            <span className="text-[#ff5b07]">Experience.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-lg mx-auto mb-12 font-medium leading-relaxed">
            We’re currently performing scheduled maintenance to improve system stability and performance. We'll be back online shortly.
          </p>
        </motion.div>

        {/* --- STATUS CARDS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
        >
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
              <HiOutlineBellAlert className="text-xl" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</p>
              <p className="text-sm font-bold text-slate-700">Deploying Updates</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
              <HiOutlineArrowPath className="text-xl animate-spin-slow" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estimate</p>
              <p className="text-sm font-bold text-slate-700">~ 15 Minutes</p>
            </div>
          </div>
        </motion.div>

        {/* --- ACTION BUTTON --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button 
            onClick={() => window.location.reload()}
            className="group inline-flex items-center gap-3 bg-[#ff5b07] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#e65206] transition-all shadow-lg shadow-orange-100 active:scale-95"
          >
            Check for updates
            <HiOutlineArrowPath className="text-lg group-hover:rotate-180 transition-transform duration-500" />
          </button>
          
          <p className="mt-8 text-xs font-bold text-slate-400">
            Follow our <a href="#" className="text-[#ff5b07] hover:underline">System Status</a> page for live updates.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default Maintenance;
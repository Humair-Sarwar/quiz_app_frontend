import React from 'react';
import { motion } from 'framer-motion';
import Pagination from '../../components/Pagination';
import { FaEye, FaListCheck } from "react-icons/fa6";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

const AttempetedQuizList: React.FC = () => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className='w-full'
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className='text-2xl font-bold text-slate-900 flex items-center gap-3'>
            <div className="p-2 bg-orange-100 rounded-lg">
              <FaListCheck className="text-[#ff5b07]" size={20} />
            </div>
            Solved Quiz List
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Review your performance and past attempts.</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-hidden bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Sr. #</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Quiz Name</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Category</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 text-center">Questions</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Score Stats</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {/* This is a single row example. In a real app, you would map over your data here */}
              <motion.tr 
                variants={rowVariants}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                <td className="px-6 py-4 text-sm font-bold text-slate-400">01</td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-[#ff5b07] transition-colors">
                    General Knowledge Quiz
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Attempted 2 days ago</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase rounded-full tracking-wider">
                    General
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-sm font-bold text-slate-700">10</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-green-600 uppercase">Correct: 8</span>
                      <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div className="bg-green-500 h-full w-[80%]"></div>
                      </div>
                    </div>
                    <div className="h-6 w-[1px] bg-slate-100"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-red-400 uppercase">Wrong: 1</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-[#ff5b07] hover:border-orange-100 rounded-xl shadow-sm transition-all"
                    >
                      <FaEye size={18} />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Footer Integration */}
        <div className="p-6 bg-slate-50/30 border-t border-slate-100">
           <Pagination />
        </div>
      </div>
    </motion.div>
  );
}

export default AttempetedQuizList;
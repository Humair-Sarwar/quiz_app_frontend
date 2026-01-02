import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { IoClose, IoAnalyticsOutline } from "react-icons/io5";
import "react-phone-input-2/lib/style.css";
import { HiOutlineLightBulb } from "react-icons/hi";
import AttempedQuiz from "./AttempedQuiz";

interface ViewUserQuizProps {
  handleClosePopup: () => void;
  attempts?: any;
}

const ViewUserQuiz: React.FC<ViewUserQuizProps> = ({ handleClosePopup, attempts }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleClosePopup();
    }, 300);
  };

  return (
    <>
      <Overlay isVisible={isVisible} />

      <div
        className={`fixed inset-0 flex items-center justify-center p-4 z-[60] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-20"
        }`}
      >
        <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.2)] w-full max-w-2xl max-h-[90vh] flex flex-col relative border border-slate-100">
          
          {/* Header */}
          <div className="px-8 py-6 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-200 ring-4 ring-orange-50">
                <HiOutlineLightBulb size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  Quiz Performance
                </h2>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-0.5">
                  Detailed Attempt Analysis
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseWithAnimation}
              className="group relative bg-slate-100 hover:bg-red-500 p-2.5 rounded-2xl transition-all duration-300 cursor-pointer shadow-sm active:scale-90"
            >
              <IoClose className="text-slate-500 group-hover:text-white transition-colors" size={20} />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Attempts</p>
                    <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 
                        {attempts?.length || 0} Quizzes
                    </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Insight</p>
                    <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <IoAnalyticsOutline className="text-orange-500" /> Data Verified
                    </p>
                </div>
            </div>

            <div className="relative">
                {/* Yahan attempts pass kar diye hain */}
                <AttempedQuiz attempts={attempts} />
            </div>
          </div>

          <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex justify-end">
            <button 
                onClick={handleCloseWithAnimation}
                className="px-6 cursor-pointer py-2.5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
            >
                Done
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </>
  );
};

export default ViewUserQuiz;
import React, { useState, useEffect } from "react";
import Overlay from "./Overlay";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import ProgressBar from "./ProgressBar";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import CircularProgress from "./CircularProgress";
import { SlBadge } from "react-icons/sl";
import { LiaCheckCircle } from "react-icons/lia";
import { MdOutlineCancel } from "react-icons/md";

const QuizPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isReview, setIsReview] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const options = [
    "Hyper Text Markup Language",
    "Home Tool Markup Language",
    "Hyperlinks and Text Markup Language",
    "Hyper Transfer Markup Language",
  ];

  return (
    <>
      <Overlay isVisible={isVisible} />

      <div className={`fixed inset-0 flex items-center justify-center py-5 px-4 z-50 transition-all duration-500 ease-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}>
        
        <div className="bg-white overflow-hidden flex flex-col max-h-[90vh] rounded-[2.5rem] shadow-2xl w-full max-w-2xl relative">
          
          {/* Sticky Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-20">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#ff5b07]">
                  <SlBadge size={20} />
               </div>
               <div>
                  <h2 className="font-bold text-slate-900 leading-none">HTML5 Master Quiz</h2>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Coding Category</p>
               </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <IoMdClose size={24} className="text-slate-400" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 sm:p-10 custom-scrollbar">
            {!isFinished ? (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                     <span className="text-xs font-black text-[#ff5b07] uppercase tracking-tighter">Question 05 of 10</span>
                     <span className="text-xs font-bold text-slate-400 italic">Timer: 02:00</span>
                  </div>
                  <ProgressBar progress={50} />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8 leading-snug">
                  What does HTML stand for?
                </h3>

                <div className="grid grid-cols-1 gap-4 mb-10">
                  {options.map((option, index) => (
                    <label
                      key={index}
                      className={`group flex items-center gap-4 border-2 rounded-2xl px-5 py-4 cursor-pointer transition-all duration-300 ${
                        selectedOption === option
                          ? "bg-orange-50 border-[#ff5b07] shadow-md shadow-orange-100"
                          : "border-slate-100 hover:border-orange-200 bg-white"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedOption === option ? "border-[#ff5b07] bg-[#ff5b07]" : "border-slate-200"
                      }`}>
                        {selectedOption === option && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <input type="radio" className="hidden" onChange={() => setSelectedOption(option)} checked={selectedOption === option} />
                      <span className={`font-bold transition-colors ${selectedOption === option ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"}`}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-50">
                  <button className="flex-1 py-4 px-6 rounded-xl font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center gap-2">
                    <IoIosArrowBack /> Previous
                  </button>
                  <button 
                    onClick={() => setIsFinished(true)}
                    className="flex-[2] py-4 px-8 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#ff5b07] shadow-lg shadow-orange-100 transition-all active:scale-95"
                  >
                    Submit Answer
                  </button>
                </div>
              </>
            ) : (
              <ResultView isReview={isReview} setIsReview={setIsReview} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const ResultView = ({ isReview, setIsReview }: any) => (
  <div className="text-center">
    {!isReview ? (
      <>
        <div className="mb-8">
           <h3 className="text-3xl font-black text-slate-900">Quiz Completed!</h3>
           <p className="text-slate-400 font-medium">Here is how you performed today.</p>
        </div>
        
        <div className="flex justify-center mb-10">
          <CircularProgress progress={50} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
           <StatCard icon={<SlBadge />} label="Questions" value="7" color="bg-blue-50 text-blue-600" />
           <StatCard icon={<LiaCheckCircle />} label="Correct" value="2" color="bg-emerald-50 text-emerald-600" />
           <StatCard icon={<MdOutlineCancel />} label="Incorrect" value="4" color="bg-rose-50 text-rose-600" />
           <StatCard icon={<IoPlaySkipForwardOutline />} label="Skipped" value="1" color="bg-amber-50 text-amber-600" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
           <button onClick={() => setIsReview(true)} className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Review Answers</button>
           <button className="flex-[2] py-4 bg-[#ff5b07] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all">Try Again</button>
        </div>
      </>
    ) : (
      <div className="text-left">
         <h3 className="text-2xl font-bold  text-slate-900 mb-6 flex items-center gap-2">
            Review Mode <span className="text-[10px] bg-orange-100 text-[#ff5b07] px-2 py-1 rounded-md">3 Mistakes</span>
         </h3>
         <div className="space-y-6">
            {[1, 2, 3].map((q) => (
              <div key={q} className="p-6 rounded-[2rem] border border-slate-100 bg-slate-50/50">
                 <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Question {q}</p>
                 <h4 className="font-bold text-slate-800 mb-4">What does HTML stand for?</h4>
                 <div className="space-y-2">
                    <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-bold flex items-center gap-2">
                       <MdOutlineCancel /> Your Answer: Home Tool Markup
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-sm font-bold flex items-center gap-2">
                       <LiaCheckCircle /> Correct Answer: Hyper Text Markup Language
                    </div>
                 </div>
              </div>
            ))}
         </div>
         <button onClick={() => setIsReview(false)} className="mt-8 w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors underline underline-offset-8">Back to Summary</button>
      </div>
    )}
  </div>
);

const StatCard = ({ icon, label, value, color }: any) => (
  <div className={`p-4 rounded-3xl ${color} flex flex-col items-center justify-center`}>
     <div className="text-2xl mb-1">{icon}</div>
     <span className="text-xl font-black leading-none">{value}</span>
     <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70 mt-1">{label}</span>
  </div>
);

export default QuizPopup;
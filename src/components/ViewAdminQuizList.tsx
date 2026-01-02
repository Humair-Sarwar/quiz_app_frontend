import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { IoClose, IoTimeOutline, IoListOutline, IoCheckmarkCircle, IoRadioButtonOn, IoCheckboxOutline } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import no_image from "../assets/images/no_image.png";

interface ImageViewProps {
  handleClosePopup?: () => void;
  handleViewDataQuiz: any; // Passing the quiz object directly
}

const ViewAdminQuizList: React.FC<ImageViewProps> = ({
  handleClosePopup,
  handleViewDataQuiz
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const quiz = handleViewDataQuiz;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleClosePopup?.();
    }, 300);
  };

  if (!quiz) return null;

  return (
    <>
      <Overlay isVisible={isVisible} />

      <div
        className={`fixed inset-0 flex items-center justify-center p-4 z-[80] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isVisible 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-10"
        }`}
      >
        <div className="bg-slate-50 rounded-[32px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] w-full max-w-[750px] max-h-[90vh] overflow-hidden relative border border-white flex flex-col">
          
          {/* --- Header --- */}
          <div className="sticky top-0 z-20 p-5 flex justify-between items-center bg-white border-b border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-100">
                <IoListOutline size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 leading-tight">Quiz Details</h2>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Preview Mode</p>
              </div>
            </div>
            
            <button
              onClick={handleCloseWithAnimation}
              className="p-2 cursor-pointer bg-slate-50 hover:bg-red-500 text-slate-500 hover:text-white rounded-xl transition-all active:scale-90"
            >
              <IoClose size={22} />
            </button>
          </div>

          {/* --- Scrollable Content --- */}
          <div className="overflow-y-auto flex-1 p-6 space-y-6 custom-scrollbar">
            
            {/* Quiz Hero Section */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6">
              <div className="h-32 w-full md:w-32 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0">
                <img
                  src={quiz?.image
                                ? `${import.meta.env.VITE_BASE_URL}/uploads/${
                                    quiz.image
                                  }`
                                : no_image}
                  alt="Quiz Cover"
                  className="h-full w-full object-cover"
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                />
              </div>
              
              <div className="flex-1 space-y-3">
                <h1 className="text-2xl font-bold text-slate-800">{quiz.quiz_title}</h1>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                    <MdCategory size={14} />
                    {quiz.category_name}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold">
                    <IoTimeOutline size={14} />
                    {quiz.quiz_time}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                Sort Order: {quiz.quiz_sort_order}
                  </div>
                </div>
              </div>
            </div>

            {/* Questions Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Questions ({quiz.total_questions})</h3>
                <div className="h-px flex-1 bg-slate-200 ml-4"></div>
              </div>

              {quiz.question_group?.map((group: any, idx: number) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  {/* Question Header */}
                  <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                       <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 bg-slate-800 text-white rounded-md text-[10px] font-bold">
                        Q{idx + 1}
                       </span>
                       <h4 className="font-semibold text-slate-800">{group.question_title}</h4>
                    </div>
                    <span className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-slate-200 text-slate-400 whitespace-nowrap">
                      {group.question_time}
                    </span>
                  </div>

                  {/* Options List */}
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.options?.map((opt: any, optIdx: number) => (
                      <div 
                        key={optIdx} 
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                          opt.answer 
                            ? "bg-green-50 border-green-200 ring-1 ring-green-100" 
                            : "bg-slate-50 border-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {group.question_type === 1 ? (
                            <IoRadioButtonOn className={opt.answer ? "text-green-500" : "text-slate-300"} />
                          ) : (
                            <IoCheckboxOutline className={opt.answer ? "text-green-500" : "text-slate-300"} />
                          )}
                          <span className={`text-sm ${opt.answer ? "font-bold text-green-700" : "text-slate-600"}`}>
                            {opt.option_label}
                          </span>
                        </div>
                        {opt.answer && (
                          <IoCheckmarkCircle className="text-green-500" size={18} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- Footer --- */}
          <div className="p-5 bg-white border-t border-slate-100 flex justify-end gap-3">
             <button 
                onClick={handleCloseWithAnimation}
                className="px-6 cursor-pointer py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95"
             >
                Got it
             </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ViewAdminQuizList;
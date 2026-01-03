import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import SolvedQuizCheck from "./SolvedQuizCheck";

interface Props {
  attempts?: any[];
}

const AttempedQuiz: React.FC<Props> = ({ attempts }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  if (!attempts || attempts.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          No quiz attempts found
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="space-y-3">
        {attempts.map((quiz, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={quiz._id || index}
              className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
                isOpen 
                ? "border-orange-200 bg-orange-50/30 shadow-md" 
                : "border-gray-100 bg-white shadow-sm hover:border-gray-200"
              }`}
            >
              {/* Accordion Header - Quiz Title & Date */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none cursor-pointer group"
              >
                <div className="flex flex-col">
                  <span className={`text-base font-bold transition-colors ${
                    isOpen ? "text-orange-600" : "text-gray-700 group-hover:text-gray-900"
                  }`}>
                    {quiz.quiz_title}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1">
                    Attempted on: {new Date(quiz.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className={`p-1.5 rounded-full transition-all duration-300 ${
                  isOpen ? "bg-orange-500 text-white rotate-180" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {/* Accordion Content */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-auto opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 pt-0 border-t border-orange-100/50 mt-2">
                  <div className="py-4">
                    <SolvedQuizCheck 
                        questionGroup={quiz.question_group} 
                        isVisible={isOpen} 
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttempedQuiz;
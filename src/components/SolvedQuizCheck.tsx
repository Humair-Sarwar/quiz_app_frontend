import React from 'react';
import { LiaCheckCircle } from 'react-icons/lia';
import { MdOutlineCancel } from 'react-icons/md';

interface Option {
  option_label: string;
  is_correct: boolean; 
  answer: boolean;     
}

interface Question {
  question_title: string;
  options: Option[];
}

interface Props {
  isVisible?: boolean; // Prop name fixed here
  questionGroup?: Question[];
}

const SolvedQuizCheck: React.FC<Props> = ({ isVisible, questionGroup }) => {
  // Agar isVisible false ho toh component kuch render nahi karega
  if (!isVisible || !questionGroup || questionGroup.length === 0) return null;

  return (
    <div className="mt-4 transition-all duration-500 ease-in-out">
      {questionGroup.map((question, index) => (
        <div key={index} className="mb-10 border-b border-gray-100 pb-8 last:border-0">
          <h3 className="text-lg font-bold mb-6 text-slate-800 flex gap-2">
            <span className="text-orange-500 font-mono">Q{index + 1}.</span>
            {question.question_title}
          </h3>

          <div className="space-y-4">
            {question.options.map((option, optIdx) => {
              const isCorrect = option.is_correct === true;
              const isSelected = option.answer === true;

              // logic for visual states
              let borderClass = "border-slate-100 opacity-60";
              let bgClass = "bg-white";
              let Icon = <div className="w-6 h-6 mr-3 border-2 border-slate-100 rounded-full" />;

              if (isCorrect) {
                borderClass = "border-green-500 ring-1 ring-green-100 opacity-100";
                bgClass = "bg-green-50/50";
                Icon = <LiaCheckCircle className="text-2xl mr-3 text-green-600" />;
              } else if (isSelected && !isCorrect) {
                borderClass = "border-red-500 ring-1 ring-red-100 opacity-100";
                bgClass = "bg-red-50/50";
                Icon = <MdOutlineCancel className="text-2xl mr-3 text-red-600" />;
              }

              return (
                <div
                  key={optIdx}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${borderClass} ${bgClass}`}
                >
                  <div className="flex items-center">
                    {Icon}
                    <span className={`text-sm font-semibold ${isCorrect ? 'text-green-800' : isSelected ? 'text-red-800' : 'text-slate-500'}`}>
                      {option.option_label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCorrect && (
                      <span className="text-[10px] font-black uppercase bg-green-200 text-green-700 px-2 py-1 rounded-md tracking-wider">
                        Correct
                      </span>
                    )}
                    {isSelected && !isCorrect && (
                      <span className="text-[10px] font-black uppercase bg-red-200 text-red-700 px-2 py-1 rounded-md tracking-wider">
                        Your Pick
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SolvedQuizCheck;
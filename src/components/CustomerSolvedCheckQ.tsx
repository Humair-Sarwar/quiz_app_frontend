import React from 'react';
import { LiaCheckCircle } from 'react-icons/lia';
import { MdOutlineCancel } from 'react-icons/md';

interface Option {
  label: string;
  is_correct: boolean;
}

interface Question {
  question_title: string;
  status: "correct" | "incorrect" | "skipped";
  user_choice: string | null;
  correct_answer: string | null;
  options: Option[]; 
}

interface Props {
  isVisible?: boolean;
  questionGroup?: Question[];
}

const CustomerSolvedCheckQ: React.FC<Props> = ({ isVisible, questionGroup }) => {
  if (!isVisible || !questionGroup || questionGroup.length === 0) return null;

  return (
    <div className="mt-4 space-y-10">
      {questionGroup.map((question, index) => (
        <div key={index} className="border-b border-gray-100 pb-8 last:border-0">
          {/* Question Title */}
          <h3 className="text-lg font-bold mb-6 text-slate-800 flex gap-2">
            <span className="text-orange-500 font-mono">Q{index + 1}.</span>
            {question.question_title}
          </h3>

          <div className="space-y-3">
            {question.options?.map((option, optIdx) => {
              const isSelected = option.label === question.user_choice;
              const isCorrect = option.is_correct;

              let borderClass = "border-slate-100";
              let bgClass = "bg-white";
              let textClass = "text-slate-500";
              let Icon = <div className="w-5 h-5 mr-3 border-2 border-slate-200 rounded-full" />;

              if (isCorrect) {
                borderClass = "border-green-500 ring-1 ring-green-100";
                bgClass = "bg-green-50/50";
                textClass = "text-green-800";
                Icon = <LiaCheckCircle className="text-2xl mr-3 text-green-600" />;
              } else if (isSelected && !isCorrect) {
                borderClass = "border-red-500 ring-1 ring-red-100";
                bgClass = "bg-red-50/50";
                textClass = "text-red-800";
                Icon = <MdOutlineCancel className="text-2xl mr-3 text-red-600" />;
              }

              return (
                <div
                  key={optIdx}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${borderClass} ${bgClass}`}
                >
                  <div className="flex items-center">
                    {Icon}
                    <span className={`text-sm font-semibold ${textClass}`}>
                      {option.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCorrect && (
                      <span className="text-[9px] font-black uppercase bg-green-200 text-green-700 px-2 py-1 rounded-md tracking-wider">
                        Correct Answer
                      </span>
                    )}
                    {isSelected && !isCorrect && (
                      <span className="text-[9px] font-black uppercase bg-red-200 text-red-700 px-2 py-1 rounded-md tracking-wider">
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

export default CustomerSolvedCheckQ;
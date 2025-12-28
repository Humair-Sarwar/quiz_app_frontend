import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import SolvedQuizCheck from "./SolvedQuizCheck";

interface FAQ {
  question: string;
  answer: string;
}

const quizs: FAQ[] = [
  {
    question: "What is this platform about?",
    answer: "Our platform allows users to solve challenges, earn rewards, and improve their skills.",
  },
  {
    question: "How do I start earning rewards?",
    answer: "Simply create an account, participate in challenges, and collect points.",
  },
  {
    question: "Is there a cost to join?",
    answer: "No, signing up is completely free.",
  },
  {
    question: "Can I access the platform on mobile?",
    answer: "Yes! Our site is fully responsive and optimized for all devices.",
  },
];

const AttempedQuiz: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="space-y-3">
        {quizs.map((quiz, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
                isOpen 
                ? "border-orange-200 bg-orange-50/30 shadow-md" 
                : "border-gray-100 bg-white shadow-sm hover:border-gray-200"
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none cursor-pointer group"
              >
                <span className={`text-base font-semibold transition-colors ${
                  isOpen ? "text-orange-600" : "text-gray-700 group-hover:text-gray-900"
                }`}>
                  {quiz.question}
                </span>
                <div className={`p-1 rounded-full transition-all duration-300 ${
                  isOpen ? "bg-orange-500 text-white rotate-180" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {/* Accordion Content with Smooth Animation */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 pt-0 border-t border-orange-100/50 mt-2">
                   {/* Pass proper classes to handle content hiding */}
                  <div className="py-4">
                    <SolvedQuizCheck closeIndx={isOpen ? "" : "hidden"} />
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
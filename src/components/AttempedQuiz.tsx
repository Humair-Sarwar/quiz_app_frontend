import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SolvedQuizCheck from "./SolvedQuizCheck";

interface FAQ {
  question: string;
  answer: string;
}

const quizs: FAQ[] = [
  {
    question: "What is this platform about?",
    answer:
      "Our platform allows users to solve challenges, earn rewards, and improve their skills in a fun and engaging way.",
  },
  {
    question: "How do I start earning rewards?",
    answer:
      "Simply create an account, participate in challenges, and collect points for every correct solution. You can redeem points for exclusive rewards.",
  },
  {
    question: "Is there a cost to join?",
    answer:
      "No, signing up is completely free. You only need an account to start participating in challenges.",
  },
  {
    question: "Can I access the platform on mobile?",
    answer:
      "Yes! Our site is fully responsive and optimized for all devices, including smartphones and tablets.",
  },
];

const AttempedQuiz: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (

    <>
    {/* Right Accordion */}
    <div className="w-full">
      <div className="space-y-4">
        {quizs.map((quiz, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl bg-white shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
            >
              <span className="text-lg font-medium text-gray-800">
                {quiz.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <div
              className={`transition-all duration-300 ${
                openIndex === index ? " p-5 pt-0" : "max-h-0"
              }`}
            >
              <SolvedQuizCheck closeIndx = {openIndex === index ? "" : "overflow-hidden max-h-0"}/>
            </div>
          </div>
        ))}
      </div>
    </div>
</>
  );
};

export default AttempedQuiz;

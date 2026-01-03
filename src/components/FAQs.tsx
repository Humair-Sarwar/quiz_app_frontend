import React, { useState } from "react";
import { Plus } from "lucide-react"; // Using Plus for a more modern 'Expand' feel

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is this platform about?",
    answer: "Our platform allows users to solve challenges, earn rewards, and improve their skills in a fun and engaging way through interactive knowledge-based quizzes.",
  },
  {
    question: "How do I start earning rewards?",
    answer: "Simply create an account, participate in challenges, and collect points for every correct solution. You can redeem points for exclusive rewards in our marketplace.",
  },
  {
    question: "Is there a cost to join?",
    answer: "No, signing up is completely free. We believe in accessible learning for everyone. You only need an account to track your progress and start participating.",
  },
  {
    question: "Can I access the platform on mobile?",
    answer: "Yes! Our site is fully responsive and optimized for all devices, including smartphones and tablets, ensuring you can learn on the go.",
  },
];

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full space-y-5">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        
        return (
          <div
            key={index}
            className={`group transition-all duration-500 rounded-[2.5rem] border ${
              isOpen 
                ? "bg-white border-[#ff5b07]/20 shadow-[0_30px_60px_-15px_rgba(255,91,7,0.15)]" 
                : "bg-white/40 border-slate-200/60 hover:border-[#ff5b07]/30 shadow-sm"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-7 md:p-9 text-left focus:outline-none"
            >
              <div className="flex items-center gap-5">
                {/* Visual Numbering or Decorative Dot */}
                <span className={`hidden sm:flex w-8 h-8 rounded-xl items-center justify-center text-xs font-black transition-all duration-500 ${
                    isOpen ? "bg-[#ff5b07] text-white" : "bg-slate-100 text-slate-400 group-hover:bg-orange-100 group-hover:text-[#ff5b07]"
                }`}>
                    {index + 1}
                </span>
                <span className={`text-lg md:text-xl font-extrabold tracking-tight transition-all duration-300 ${
                    isOpen ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                }`}>
                    {faq.question}
                </span>
              </div>

              {/* Modern Plus/Close Icon Toggle */}
              <div className={`flex-shrink-0 w-12 cursor-pointer h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                isOpen 
                ? "bg-slate-900 text-white rotate-45 shadow-lg shadow-slate-200" 
                : "bg-white text-slate-400 border border-slate-100 group-hover:border-[#ff5b07] group-hover:text-[#ff5b07]"
              }`}>
                <Plus size={24} strokeWidth={2.5} />
              </div>
            </button>

            {/* Smoother Height Animation using Grid */}
            <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}>
              <div className="overflow-hidden">
                <div className="px-9 pb-9 md:px-12 md:pb-12">
                   <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8"></div>
                   <p className="text-slate-500 leading-relaxed text-lg max-w-3xl">
                      {faq.answer}
                   </p>
                   {/* Optional CTA link inside FAQ */}
                   <button className="mt-6 text-[#ff5b07] font-bold text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-8 transition-all">
                     Learn More &rarr;
                   </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
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

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-[#fff5ed]" id="faq">
  <div className="container mx-auto max-w-[1400px] px-4 flex flex-col lg:flex-row justify-between items-start gap-12">
    {/* Left Content */}
    <div className="lg:w-1/2 text-center lg:text-left">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-5">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 text-base sm:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore fugit,
        saepe veniam iste quasi animi!
      </p>
    </div>

    {/* Right Accordion */}
    <div className="lg:w-1/2 w-full">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl bg-white shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
            >
              <span className="text-lg font-medium text-gray-800">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 p-5 pt-0" : "max-h-0"
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

  );
};

export default FAQAccordion;

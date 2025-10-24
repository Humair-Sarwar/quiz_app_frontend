import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { IoClose } from "react-icons/io5";
import "react-phone-input-2/lib/style.css";
import { HiOutlineLightBulb } from "react-icons/hi";
import AttempedQuiz from "./AttempedQuiz";


interface ViewUserQuizProps {
  handleClosePopup: () => void;
}

const ViewUserQuiz: React.FC<ViewUserQuizProps> = ({ handleClosePopup }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Slight delay to trigger CSS transition after mount
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleClosePopup();
    }, 300); // match your transition duration
  };

  return (
    <>
      {/* Background overlay */}
      <Overlay isVisible={isVisible}/>

      {/* Popup container */}
      <div
        className={`fixed inset-0 flex items-center justify-center py-4 px-4 z-50 transition-all duration-300 ease-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-10"
        }`}
      >
        <div className="bg-white rounded-2xl overflow-y-auto max-h-[100%] shadow-2xl p-6 sm:p-6 w-full max-w-2xl relative transition-all duration-300 ease-in-out">
        
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-semibold flex items-center gap-2">
                <HiOutlineLightBulb className="text-[22px]"/> Customer Attempted Quiz
              </h2>
              <button
                type="button"
                onClick={handleCloseWithAnimation}
                className="bg-[#cccccc8c] rounded-4xl p-[3px] cursor-pointer transition-all text-black hover:bg-[#e04e00] hover:text-white"
              >
                <IoClose />
              </button>
            </div>

            

              <AttempedQuiz/>
          

           
        </div>
      </div>
    </>
  );
};

export default ViewUserQuiz;

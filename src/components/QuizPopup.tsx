import React, { useState, useEffect } from "react";
import Overlay from "./Overlay";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import ProgressBar from "./ProgressBar";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import CircularProgress from "./CircularProgress";
import { SlBadge } from "react-icons/sl";
import { LiaCheckCircle } from "react-icons/lia";
import { MdOutlineCancel } from "react-icons/md";

const QuizPopup: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false); // ✨ for animation mount
  const [isReview, setIsReview] = useState<boolean>(false);

  useEffect(() => {
    // Slight delay to trigger CSS transition after mount
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const options = [
    "Hyper Text Markup Language",
    "Home Tool Markup Language",
    "Hyperlinks and Text Markup Language",
    "Hyper Transfer Markup Language",
  ];

  const handleFinished = () => {
    setIsFinished(true);
  };

  return (
    <>
      {/* Background overlay with fade-in */}
      <Overlay isVisible={isVisible}/>

      {/* Popup container */}
      <div
        className={`fixed inset-0 flex items-center justify-center py-5 px-4 z-50 transition-all duration-500 ease-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-10"
        }`}
      >
        <div className="bg-white overflow-y-auto max-h-[100%]  rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl relative transition-all duration-500 ease-in-out">
          {!isFinished ? (
            <>
              <div className="mb-4">
                <ProgressBar progress={50} />
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-[14px]">
                  Category: <span className="font-semibold">Coding</span>
                </p>
                <p className="text-[14px]">
                  Quiz: <span className="font-semibold">HTML5</span>
                </p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-[14px]">
                  Time: <span className="font-semibold">02:00</span>
                </p>
                <p className="text-[14px]">
                  Total Questions: <span className="font-semibold">05/10</span>
                </p>
              </div>

              <h3 className="text-xl sm:text-1xl font-semibold mb-6">
                Q1. What does HTML stand for?
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-all duration-200 ${
                      selectedOption === option
                        ? "bg-orange-50 border-orange-500 text-orange-600"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedOption === option
                          ? "border-orange-500"
                          : "border-gray-400"
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          selectedOption === option
                            ? "bg-orange-500"
                            : "bg-transparent"
                        }`}
                      ></span>
                    </span>

                    <input
                      type="radio"
                      name="quiz-option"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                      className="hidden"
                    />
                    <span className="text-sm sm:text-base">{option}</span>
                  </label>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <button className="mini-primary-button flex items-center gap-1">
                    <IoIosArrowBack /> Prev
                  </button>
                  <button className="mini-secondary-button">Skip</button>
                </div>
                <div className="flex gap-2 items-center">
                  <button className="mini-primary-button flex items-center gap-1">
                    Next <IoIosArrowForward />
                  </button>
                  <button
                    className="mini-success-button"
                    onClick={handleFinished}
                  >
                    Submit Test
                  </button>
                </div>
              </div>
            </>
          ) : (
            isReview == false ? <>
              <h3 className="text-2xl text-center font-semibold">Quiz Result</h3>
              <div className="flex justify-center items-center my-7">
                <CircularProgress progress={50} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="rounded-2xl bg-[#a3c3f0b7] p-3 text-center">
                  <div className="flex justify-center items-center text-[#516ea6]">
                    <SlBadge className="text-3xl" />
                  </div>
                  <p className="text-2xl font-semibold my-2">7</p>
                  <p className="text-[13px]">Total Questions</p>
                </div>
                <div className="rounded-2xl bg-[#d3f3e3] p-3 text-center">
                  <div className="flex justify-center items-center text-[#4db484]">
                    <LiaCheckCircle className="text-3xl" />
                  </div>
                  <p className="text-2xl font-semibold my-2">2</p>
                  <p className="text-[13px]">Correct</p>
                </div>
                <div className="rounded-2xl bg-[#f4d7d7] p-3 text-center">
                  <div className="flex justify-center items-center text-[#cf2237]">
                    <MdOutlineCancel className="text-3xl" />
                  </div>
                  <p className="text-2xl font-semibold my-2 text-[#cf2237]">4</p>
                  <p className="text-[13px]">Incorrect</p>
                </div>
                <div className="rounded-2xl bg-[#f4f2c1] p-3 text-center">
                  <div className="flex justify-center items-center text-[#dace2c]">
                    <IoPlaySkipForwardOutline className="text-3xl" />
                  </div>
                  <p className="text-2xl font-semibold my-2">1</p>
                  <p className="text-[13px]">Skipped</p>
                </div>
              </div>
              <div className="flex justify-center items-center mt-7 gap-3">
                <button className="mini-primary-button" onClick={()=> setIsReview(true)}>Review</button>
                <button className="mini-secondary-button">Close</button>
                <button className="mini-third-button">Retake</button>
              </div>
            </> : 
            <>
            <h3 className="text-2xl text-center font-semibold mb-5">Review Answers</h3>
            <div className="mb-8">
                <h3 className="text-xl sm:text-1xl font-semibold mb-6">
                Q1. What does HTML stand for?
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                <button className="review-answer-button review-answer-button-incorrect mb-3 flex"><MdOutlineCancel className="text-2xl mr-1" /> Hyper Text Markup Language</button>
                <button className="review-answer-button mb-3 flex">Hyper Text Markup Language</button>
              <button className="review-answer-button review-answer-button-correct mb-3 flex"><LiaCheckCircle className="text-2xl mr-1" /> Hyper Text Markup Language</button>
              <button className="review-answer-button mb-3 flex">Hyper Text Markup Language</button>
              </div>
            </div>
            <div className="mb-8">
                <h3 className="text-xl sm:text-1xl font-semibold mb-6">
                Q1. What does HTML stand for?
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                <button className="review-answer-button review-answer-button-incorrect mb-3 flex"><MdOutlineCancel className="text-2xl mr-1" /> Hyper Text Markup Language</button>
                <button className="review-answer-button mb-3 flex">Hyper Text Markup Language</button>
              <button className="review-answer-button review-answer-button-correct mb-3 flex"><LiaCheckCircle className="text-2xl mr-1" /> Hyper Text Markup Language</button>
              <button className="review-answer-button mb-3 flex">Hyper Text Markup Language</button>
              </div>
            </div>
            <div className="mb-8">
                <h3 className="text-xl sm:text-1xl font-semibold mb-6">
                Q1. What does HTML stand for?
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                <button className="review-answer-button review-answer-button-incorrect mb-3 flex"><MdOutlineCancel className="text-2xl mr-1" /> Hyper Text Markup Language</button>
                <button className="review-answer-button mb-3 flex">Hyper Text Markup Language</button>
              <button className="review-answer-button review-answer-button-correct mb-3 flex"><LiaCheckCircle className="text-2xl mr-1" /> Hyper Text Markup Language</button>
              <button className="review-answer-button mb-3 flex">Hyper Text Markup Language</button>
              </div>
            </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizPopup;

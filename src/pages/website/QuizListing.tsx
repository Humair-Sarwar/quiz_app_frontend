import React, { useState } from 'react'
import coding from "../../assets/images/coding.png";
import Pagination from "../../components/Pagination";
import QuizPopup from '../../components/QuizPopup';

const QuizListing: React.FC = () => {
    const [startQuiz, setStartQuiz] = useState<boolean>(false);
  return (
    <>
        <div className="bg-[#f0f0f0] w-full">
        <div className="container mx-auto  max-w-[1400px] py-15 px-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-center mb-5 text-3xl lg:text-4xl">
              Coding
            </h2>
            <input
              type="text"
              className="input-target-set-field"
              placeholder="Search Quiz..."
            />
          </div>

          <div className="my-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              <div className="p-4 rounded-2xl text-center mx-2 category-box-target my-5 bg-white">
                <div className="flex justify-center items-center box-image">
                  <img src={coding} alt="" />
                </div>
                <h3 className="text-lg font-semibold my-3">HTML5</h3>
                <button className='mini-primary-button' onClick={()=>setStartQuiz(true)}>Start Quiz</button>
              </div>
              
            </div>




            <Pagination/>

          </div>
        </div>
      </div>
      {startQuiz && <QuizPopup/>}
      
    </>
  )
}

export default QuizListing

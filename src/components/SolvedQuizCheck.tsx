import React from 'react'
import { LiaCheckCircle } from 'react-icons/lia'
import { MdOutlineCancel } from 'react-icons/md'

interface SolvedQuizCheckProp{
    closeIndx: string
}

const SolvedQuizCheck: React.FC<SolvedQuizCheckProp> = ({closeIndx}) => {
  return (
    <>
    <div className={closeIndx}>
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
                </div>
                </>
  )
}

export default SolvedQuizCheck

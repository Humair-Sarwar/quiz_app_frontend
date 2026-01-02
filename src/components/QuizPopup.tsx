import React, { useState, useEffect, useMemo } from "react";
import Overlay from "./Overlay";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import ProgressBar from "./ProgressBar";
import { SlBadge } from "react-icons/sl";
import { useGetQuizResult, useQuizStartData, useRetakeQuiz, useSaveAttemptedQuiz } from "../hooks/useCustomer";
import CircularProgress from "./CircularProgress";
import { LiaCheckCircle } from "react-icons/lia";
import { MdOutlineCancel } from "react-icons/md";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";
import { handleError } from "../toast";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const QuizPopup: React.FC<{ onClose: () => void; quiz_id: string; user_attempted_quiz_id?: string | null }> = ({ onClose, quiz_id, user_attempted_quiz_id }) => {
  const businessId = useSelector((state: RootState) => state.auth.user_id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [isReview, setIsReview] = useState(false);
  
  const queryClient = useQueryClient();
  const retakeQuizAPI = useRetakeQuiz();
  const { data: startData, isLoading: isQuizLoading } = useQuizStartData({ quiz_id });
  const { mutate: saveQuiz, isPending: isSubmitting } = useSaveAttemptedQuiz();
  
  const { data: resultResponse, isLoading: isResultLoading } = useGetQuizResult(
    { id: attemptId || "" },
    { enabled: !!attemptId } 
  );

  const resultData = (resultResponse as any)?.data;
  const quizData = startData?.data;
  const questions = useMemo(() => quizData?.question_group || [], [quizData]);
  const currentQuestion = questions[currentIndex];
  const isOptionSelected = !!userAnswers[currentIndex];

  useEffect(() => {
    if (user_attempted_quiz_id) {
      setAttemptId(user_attempted_quiz_id);
      setIsFinished(true);
    }
  }, [user_attempted_quiz_id]);

  const resetTimer = () => {
    if (quizData?.quiz_time && quizData.quiz_time !== "N/A") {
      const timeMatch = quizData.quiz_time.match(/\d+/);
      if (timeMatch) {
        const timeValue = parseInt(timeMatch[0]);
        let totalSeconds = quizData.quiz_time.toLowerCase().includes("min") ? timeValue * 60 : timeValue;
        setTimeLeft(totalSeconds);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
    if (!user_attempted_quiz_id) resetTimer();
  }, [quizData, user_attempted_quiz_id]);

  useEffect(() => {
    if (timeLeft === null || isFinished || isSubmitting) return;
    if (timeLeft <= 0) { handleSubmit(); return; }
    const timer = setInterval(() => setTimeLeft((prev) => (prev !== null ? prev - 1 : null)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, isSubmitting]);

  const handleOptionSelect = (optionLabel: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = { 
      question_title: currentQuestion.question_title, 
      selected_label: optionLabel 
    };
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    if (isFinished || isSubmitting) return;
    const finalPayload = {
      user_id: localStorage.getItem("user_id") || "",
      quiz_id: quiz_id,
      quiz_title: quizData?.quiz_title || "",
      question_group: questions.map((q: any, qIdx: number) => ({
        question_title: q.question_title,
        options: q.options.map((opt: any) => ({
          option_label: opt.option_label,
          answer: userAnswers[qIdx]?.selected_label === opt.option_label
        }))
      }))
    };
    saveQuiz(finalPayload, {
      onSuccess: (response) => {
        setAttemptId(response.data._id);
        setIsFinished(true);
        queryClient.invalidateQueries({ queryKey: ["quiz-list-website"] });
        queryClient.invalidateQueries({ queryKey: ["student-attempted-quiz-list"] });
      },
      onError: (err) => { console.error(err); alert("Failed to save quiz."); }
    });
  };

  const handleRetake = () => {
    const currentAttemptId = attemptId || user_attempted_quiz_id;
    
    retakeQuizAPI.mutate(
      { user_id: businessId!, id: currentAttemptId! },
      {
        onSuccess: () => {
          // Reset states for a fresh start
          setCurrentIndex(0);
          setUserAnswers([]);
          setIsFinished(false);
          setIsReview(false);
          setAttemptId(null);
          resetTimer();
          queryClient.invalidateQueries({ queryKey: ["quiz-start"] });
          queryClient.invalidateQueries({ queryKey: ["quiz-list-website"] });
          queryClient.invalidateQueries({ queryKey: ["student-attempted-quiz-list"] });
        },
        onError: () => handleError("Something went wrong!"),
      }
    );
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isQuizLoading) return <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center font-bold">Loading Quiz...</div>;

  return (
    <>
      <Overlay isVisible={isVisible} />
      <div className={`fixed inset-0 flex items-center justify-center py-5 px-4 z-55 transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        <div className="bg-white overflow-hidden flex flex-col max-h-[90vh] rounded-[2.5rem] shadow-2xl w-full max-w-2xl relative">
          
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-20">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#ff5b07]"><SlBadge size={20} /></div>
               <div>
                <h2 className="font-bold text-slate-900 leading-none">{quizData?.quiz_title}</h2>
                <p className="text-[11px] text-gray-500 capitalize">{quizData?.category_id?.category_name}</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
              {timeLeft !== null && !isFinished && (
                <div className={`px-4 py-2 rounded-xl font-bold text-sm ${timeLeft < 20 ? "bg-red-50 text-red-600 animate-pulse border border-red-100" : "bg-slate-50 text-slate-600"}`}>
                  {formatTime(timeLeft)}
                </div>
              )}
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full cursor-pointer"><IoMdClose size={24}/></button>
            </div>
          </div>

          <div className="overflow-y-auto p-6 sm:p-10 custom-scrollbar">
            {!isFinished ? (
              <>
                <div className="mb-8">
                  <span className="text-xs font-black text-[#ff5b07] uppercase">Question {currentIndex + 1} of {questions.length}</span>
                  <ProgressBar progress={((currentIndex + 1) / questions.length) * 100} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8">{currentQuestion?.question_title}</h3>
                <div className="grid grid-cols-1 gap-4 mb-10">
                  {currentQuestion?.options.map((option: any, index: number) => {
                    const isSelected = userAnswers[currentIndex]?.selected_label === option.option_label;
                    return (
                      <label key={index} className={`group flex items-center gap-4 border-2 rounded-2xl px-5 py-4 cursor-pointer transition-all ${isSelected ? "bg-orange-50 border-[#ff5b07]" : "border-slate-100 hover:border-orange-200"}`}>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-[#ff5b07] bg-[#ff5b07]" : "border-slate-200"}`}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <input type="radio" className="hidden" onChange={() => handleOptionSelect(option.option_label)} checked={isSelected} />
                        <span className={`font-bold ${isSelected ? "text-slate-900" : "text-slate-500"}`}>{option.option_label}</span>
                      </label>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between gap-4 pt-6">
                  <button onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)} disabled={currentIndex === 0 || isSubmitting} className="flex-1 py-4 font-bold text-slate-400 disabled:opacity-30 cursor-pointer">
                    <div className="flex items-center justify-center gap-2"><IoIosArrowBack /> Previous</div>
                  </button>
                  <button onClick={() => currentIndex === questions.length - 1 ? handleSubmit() : setCurrentIndex(currentIndex + 1)} disabled={!isOptionSelected || isSubmitting} className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[11px] disabled:bg-slate-200 cursor-pointer hover:bg-[#ff5b07] transition-all">
                    {isSubmitting ? "Submitting..." : (currentIndex === questions.length - 1 ? "Submit Quiz" : "Next Question")}
                  </button>
                </div>
              </>
            ) : (
              <div className="py-4">
                {(isResultLoading || !resultData) ? (
                  <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff5b07] mx-auto mb-4"></div>
                    <p className="font-bold text-slate-600">Calculating Your Score...</p>
                  </div>
                ) : (
                  <ResultView 
                    result={resultData} 
                    isReview={isReview} 
                    setIsReview={setIsReview} 
                    onClose={onClose} 
                    onRetake={handleRetake}
                    isRetaking={retakeQuizAPI.isPending}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// ResultView
const ResultView = ({ result, isReview, setIsReview, onClose, onRetake, isRetaking }: any) => {
  const finalScore = result?.score ?? Math.round((result.correct / result.total_questions) * 100);

  return (
    <div className="text-center">
      {!isReview ? (
        <>
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"><SlBadge size={40} /></div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Well Done!</h2>
          <div className="flex justify-center mb-10"><CircularProgress progress={finalScore} /></div>
          <div className="grid grid-cols-2 gap-4 mb-10">
             <StatCard icon={<SlBadge />} label="Questions" value={result?.total_questions} color="bg-blue-50 text-blue-600" />
             <StatCard icon={<LiaCheckCircle />} label="Correct" value={result?.correct} color="bg-emerald-50 text-emerald-600" />
             <StatCard icon={<MdOutlineCancel />} label="Incorrect" value={result?.incorrect} color="bg-rose-50 text-rose-600" />
             <StatCard icon={<IoPlaySkipForwardOutline />} label="Skipped" value={result?.skipped} color="bg-amber-50 text-amber-600" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
             <button onClick={() => setIsReview(true)} className="flex-1 py-4 cursor-pointer bg-slate-100 rounded-2xl font-semibold hover:bg-slate-200">Review</button>
             <button onClick={onRetake} disabled={isRetaking} className="flex-1 py-4 cursor-pointer bg-[#ff5b07] disabled:bg-orange-300 rounded-2xl text-white font-semibold hover:bg-[#cb4b0a]">
               {isRetaking ? "Wait..." : "Retake"}
             </button>
             <button onClick={onClose} className="flex-1 py-4 bg-slate-900 cursor-pointer text-white rounded-2xl font-semibold hover:bg-[#ff5b07]">Close</button>
          </div>
        </>
      ) : (
        /* Review Mode Logic Same as Before */
        <div className="text-left animate-in fade-in duration-500">
           {/* ... Review Mode UI ... */}
           <h3 className="text-2xl font-bold mb-6 text-slate-900 flex justify-between items-center">Review Mode <span className="text-sm font-medium text-slate-400">{result?.total_questions} Qs</span></h3>
           <div className="space-y-6">
            {result?.detailed_questions?.map((q: any, idx: number) => (
              <div key={idx} className="p-6 rounded-[2rem] border border-slate-100 bg-white shadow-sm mb-4">
                <p className="text-[#ff5b07] text-[10px] font-black uppercase mb-2">Question {idx + 1}</p>
                <h4 className="font-bold text-slate-800 mb-6 text-lg">{q.question_title}</h4>
                <div className="flex flex-col gap-3 mb-6">
                  {q.all_options.map((opt: any, i: number) => {
                    const isUserChoice = q.user_choice === opt.label;
                    const isCorrect = opt.is_correct;
                    return (
                      <div key={i} className={`w-full px-5 py-4 rounded-2xl border-2 text-sm font-bold flex justify-between items-center ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : isUserChoice && !isCorrect ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-slate-50 border-transparent text-slate-500'}`}>
                        <span>{opt.label}</span>
                        {isCorrect && <LiaCheckCircle size={20} className="text-emerald-500" />}
                        {isUserChoice && !isCorrect && <MdOutlineCancel size={20} className="text-rose-500" />}
                      </div>
                    );
                  })}
                </div>
                <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${q.status === 'correct' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>
                  {q.status === 'correct' ? <LiaCheckCircle size={20}/> : <MdOutlineCancel size={20}/>}
                  <span>{q.status === 'correct' ? "Correct!" : `Correct: ${q.correct_answer}`}</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setIsReview(false)} className="mt-8 w-full py-4 text-slate-400 font-bold underline cursor-pointer">Back to Summary</button>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: any) => (
  <div className={`p-4 rounded-3xl ${color} flex flex-col items-center justify-center transition-transform hover:scale-105`}>
     <div className="text-2xl mb-1">{icon}</div>
     <span className="text-xl font-black">{value}</span>
     <span className="text-[10px] font-bold uppercase mt-1 opacity-70">{label}</span>
  </div>
);

export default QuizPopup;
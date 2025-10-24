import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import my_pic from "../assets/images/my-pic.jpg";
import { IoCameraSharp } from "react-icons/io5";
import "react-phone-input-2/lib/style.css";
import { IoMdAdd } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import CategoriesPanel from "./CategoriesPanel";


interface AddUpdateQuizProps {
  handleClosePopup: () => void;
  component_type: number;
}

// Option inside each question
interface QuizOption {
  option_label: string;
  option_sort_order: number;
  answer: boolean;
}

// Each question in the quiz
interface QuestionGroup {
  question_title: string;
  question_sort_order: number;
  question_type: number;
  question_time: string;
  options: QuizOption[];
}

// Entire quiz structure
interface AddQuiz {
  quiz_title: string;
  quiz_sort_order: number;
  quiz_time: string;
  category_id: string;
  question_group: QuestionGroup[];
}

const AddUpdateQuiz: React.FC<AddUpdateQuizProps> = ({
  handleClosePopup,
  component_type,

}) => {


 const [categoryPanelHS, setCategoryPanelHS] = useState<boolean>(false);
  const handleClosePopupHS = () => {
    setCategoryPanelHS(false);
  };


  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [addQuiz, setAddQuiz] = useState<AddQuiz>({
    quiz_title: "",
    quiz_sort_order: 1,
    quiz_time: "",
    category_id: "",
    question_group: [
      {
        question_title: "",
        question_sort_order: 1,
        question_type: 1,
        question_time: "",
        options: [
          {
            option_label: "",
            option_sort_order: 1,
            answer: false,
          },
        ],
      },
    ],
  });

  const handleAddQuestionOptions = ()=>{
    const newQuestionAdd = {
        question_title: "",
        question_sort_order: 1,
        question_type: 2,
        question_time: "",
        options: [
          {
            option_label: "",
            option_sort_order: 1,
            answer: false,
          },
        ],
      }
    setAddQuiz((prev)=>(
        {...prev, question_group: [...prev.question_group, newQuestionAdd]}
    ))
  }

 const handleAddMoreOptions = (questionIndex: number) => {
  const newOption = {
    option_label: "",
    option_sort_order: 1,
    answer: false,
  };

  setAddQuiz((prev) => ({
    ...prev,
    question_group: prev.question_group.map((question, qIndex) =>
      qIndex === questionIndex
        ? {
            ...question,
            options: [...question.options, newOption],
          }
        : question
    ),
  }));
};

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
  console.log(addQuiz, "--->>>");
  return (
    <>
      {/* Background overlay */}
      <Overlay isVisible={isVisible} />

      {/* Popup container */}
      <div
        className={`fixed inset-0 flex items-center justify-center py-4 px-4 z-50 transition-all duration-300 ease-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-10"
        }`}
      >
        <div className="bg-white rounded-2xl overflow-y-auto max-h-[100%] shadow-2xl p-6 sm:p-6 w-full lg:w-[850px] relative transition-all duration-300 ease-in-out">
          <form action="">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-semibold flex items-center gap-2">
                {component_type == 1 ? <IoMdAdd /> : <MdEdit />}{" "}
                {component_type == 1 ? "Create" : "Update"} Quiz
              </h2>
              <button
                type="button"
                onClick={handleCloseWithAnimation}
                className="bg-[#cccccc8c] rounded-4xl p-[3px] cursor-pointer transition-all text-black hover:bg-[#e04e00] hover:text-white"
              >
                <IoClose />
              </button>
            </div>

            <div className="flex justify-center items-center">
              {/* Profile image */}
              <div className="relative mb-3 h-[100px] w-[100px] rounded-full border-4 border-white shadow-md group">
                <img
                  src={my_pic}
                  alt="Profile"
                  className="h-full w-full object-cover object-center rounded-full"
                />

                <label
                  htmlFor="profileUpload"
                  className="absolute bottom-[-2px] right-[-2px] z-30 bg-[#cccccc8c] hover:bg-[#e04e00] hover:text-white text-black p-1 rounded-full cursor-pointer shadow transition-all duration-300 flex items-center justify-center"
                >
                  <IoCameraSharp className="text-[18px]" />
                </label>

                <input
                  type="file"
                  id="profileUpload"
                  className="hidden"
                  onChange={() => console.log()}
                />
              </div>
            </div>

            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-4">
                <label htmlFor="quiz_title" className="block">
                  Quiz Title:
                </label>
                <input
                  value={addQuiz.quiz_title}
                  type="text"
                  id="quiz_title"
                  onChange={(e) =>
                    setAddQuiz((prev) => ({
                      ...prev,
                      quiz_title: e.target.value,
                    }))
                  }
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Enter Quiz Title"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="quiz_sort_order" className="block">
                  Sort Order:
                </label>
                <input
                  type="number"
                  id="quiz_sort_order"
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Sort Order"
                  value={addQuiz?.quiz_sort_order}
                  onChange={(e) =>
                    setAddQuiz((prev) => ({
                      ...prev,
                      quiz_sort_order: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="quiz_time" className="block mb-1">
                  Quiz Time(min):
                </label>
                <select
                  name="quiz_time"
                  onChange={(e) =>
                    setAddQuiz((prev) => ({
                      ...prev,
                      quiz_time: e.target.value,
                    }))
                  }
                  value={addQuiz.quiz_time}
                  className="w-full bg-white border border-gray-300 rounded-lg px-2 py-3 text-gray-700 text-[16px] shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
             hover:border-orange-400 transition-all cursor-pointer"
                >
                  <option value="">Select</option>
                  <option value="30 sec">30 sec</option>
                  <option value="1 min">1 min</option>
                  <option value="1.5 min">1.5 min</option>
                  <option value="2 min">2 min</option>
                  <option value="5 min">5 min</option>
                  <option value="10 min">10 min</option>
                  <option value="20 min">20 min</option>
                  <option value="30 min">30 min</option>
                  <option value="40 min">40 min</option>
                  <option value="50 min">50 min</option>
                  <option value="N/A">N/A</option>
                </select>
              </div>

              <div className="md:col-span-4">
                <button type="button" onClick={()=> setCategoryPanelHS(true)} className="mini-primary-button w-full">
                  Select Category
                </button>
              </div>
              <hr className="w-full md:col-span-4 text-gray-300" />
               <AnimatePresence initial={false}>
              {addQuiz?.question_group?.map((qu_group, i)=>(
                <>
                <div className="md:col-span-4">
                  <div className="flex justify-between items-center"><h3 className="text-nowrap font-semibold">
                  Set New Question Group ({i + 1})
                </h3>
                <button onClick={()=>(
                  setAddQuiz((prev)=>(
                    {...prev, question_group: prev.question_group.filter((_, indx)=>(
                      indx != i
                    ))}
                  ))
                )} type="button" className="border-1 cursor-pointer border-red-700 text-red-700 rounded-[5px] p-[2px]"><IoClose />
</button></div>
                
              </div>
              <div className="md:col-span-1">
                <label htmlFor={`question_title${i}`} className="block">
                  Question Title:
                </label>
                <input
                  type="text"
                  id={`question_title${i}`}
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Enter Title"
                  name="question_title"
                  value={addQuiz.question_group[i].question_title}
                  onChange={(e)=>(
                    setAddQuiz((prev)=>(
                        {...prev, question_group: prev.question_group.map((q, idx)=>(
                            idx == i ? {...q, question_title: e.target.value} : q
                        ))}
                    ))
                  )}
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor={`question_sort_order${i + 1}`} className="block">
                  Sort Order:
                </label>
                <input
                  type="number"
                  id={`question_sort_order${i + 1}`}
                  className="mt-1 input-target-set-field w-full"
                  placeholder="Sort Order"
                  value={addQuiz.question_group[i].question_sort_order}
                  onChange={(e)=>(
                    setAddQuiz((prev)=>(
                        {...prev, question_group: prev.question_group.map((q, idx)=>(
                            idx == i ? {...q, question_sort_order: Number(e.target.value)} : q
                        ))}
                    ))
                  )}
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor={`quiz-timequestion_time${i}`} className="block mb-1">
                  Type:
                </label>
                <select
                  className="w-full bg-white border border-gray-300 rounded-lg px-2 py-3 text-gray-700 text-[16px] shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
             hover:border-orange-400 transition-all cursor-pointer"
             id={`quiz-timequestion_time${i}`}
             value={addQuiz.question_group[i].question_type}
             onChange={(e)=>(
                setAddQuiz((prev)=>(
                    {...prev, question_group: prev.question_group.map((q, idx)=>(
                        idx == i ? {...q, question_type: Number(e.target.value)} : q
                    ))}
                ))
             )}
                >
                  <option value="1">Single Select(Radio)</option>
                  <option value="2">Multiple Select(Checkbox)</option>
                </select>
              </div>
              <div className="md:col-span-1">
                <label htmlFor={`question_time${i}`} className="block mb-1">
                  Question Time:
                </label>
                <select
                  className="w-full bg-white border border-gray-300 rounded-lg px-2 py-3 text-gray-700 text-[16px] shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
             hover:border-orange-400 transition-all cursor-pointer"
             id={`question_time${i}`}
             value={addQuiz.question_group[i].question_time}
             onChange={(e)=>(
                setAddQuiz((prev)=>(
                    {...prev, question_group: prev.question_group.map((q, idx)=>(
                        idx == i ? {...q, question_time: e.target.value} : q
                    ))}
                ))
             )}
                >
                  <option value="">Select</option>
                  <option value="30 sec">30 sec</option>
                  <option value="1 min">1 min</option>
                  <option value="1.5 min">1.5 min</option>
                  <option value="2 min">2 min</option>
                  <option value="5 min">5 min</option>
                  <option value="10 min">10 min</option>
                  <option value="20 min">20 min</option>
                  <option value="30 min">30 min</option>
                  <option value="40 min">40 min</option>
                  <option value="50 min">50 min</option>
                  <option value="N/A">N/A</option>
                </select>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-nowrap font-semibold">Options</h3>
              </div>
                <AnimatePresence initial={false}>
  {qu_group?.options?.map((_, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
      className="md:col-span-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* --- your existing inputs go here --- */}
        
        {/* Option Label */}
        <div className="md:col-span-7">
          <label htmlFor={`option_label${index}${i}`} className="block">
            Option Label ({index + 1}):
          </label>
          <input
            type="text"
            className="mt-1 input-target-set-field w-full"
            placeholder="Enter Label"
            value={addQuiz.question_group[i].options[index].option_label}
            onChange={(e) =>
              setAddQuiz((prev) => ({
                ...prev,
                question_group: prev.question_group.map((qg, idxx) =>
                  idxx === i
                    ? {
                        ...qg,
                        options: qg.options.map((op, iidd) =>
                          iidd === index
                            ? { ...op, option_label: e.target.value }
                            : op
                        ),
                      }
                    : qg
                ),
              }))
            }
          />
        </div>

        {/* Sort Order */}
        <div className="md:col-span-2">
          <label htmlFor={`option_sort_order${i}${index}`} className="block">
            Sort Order:
          </label>
          <input
            type="number"
            className="mt-1 input-target-set-field w-full"
            placeholder="Sort Order"
            value={addQuiz.question_group[i].options[index].option_sort_order}
            onChange={(e) =>
              setAddQuiz((prev) => ({
                ...prev,
                question_group: prev.question_group.map((qg, idxx) =>
                  idxx === i
                    ? {
                        ...qg,
                        options: qg.options.map((op, iidd) =>
                          iidd === index
                            ? {
                                ...op,
                                option_sort_order: Number(e.target.value),
                              }
                            : op
                        ),
                      }
                    : qg
                ),
              }))
            }
          />
        </div>

        {/* Answer */}
        <div className="md:col-span-2">
          <label htmlFor={`answer${i}${index}`} className="block mb-1">
            Answer:
          </label>
          <select
            className="w-full bg-white border border-gray-300 rounded-lg px-2 py-3 text-gray-700"
            value={String(addQuiz.question_group[i].options[index].answer)}
            onChange={(e) =>
              setAddQuiz((prev) => ({
                ...prev,
                question_group: prev.question_group.map((qg, qIdx) =>
                  qIdx === i
                    ? {
                        ...qg,
                        options: qg.options.map((op, opIdx) =>
                          opIdx === index
                            ? { ...op, answer: e.target.value === "true" }
                            : op
                        ),
                      }
                    : qg
                ),
              }))
            }
          >
            <option value={"false"}>False</option>
            <option value={"true"}>True</option>
          </select>
        </div>

        {/* Remove Button */}
        <div className="md:col-span-1">
          <button
            onClick={() =>
              setAddQuiz((prev) => ({
                ...prev,
                question_group: prev.question_group.map((qg, indx) =>
                  indx === i
                    ? {
                        ...qg,
                        options: qg.options.filter((_, iidd) => iidd !== index),
                      }
                    : qg
                ),
              }))
            }
            type="button"
            className="md:mt-10 border-1 cursor-pointer border-red-700 text-red-700 rounded-[5px] p-[2px]"
          >
            <IoClose />
          </button>
        </div>
      </div>
    </motion.div>
  ))}
</AnimatePresence>

             

              <div className="md:col-span-4 flex justify-end">
                <button onClick={()=>handleAddMoreOptions(i)} type="button" className="mini-primary-button flex items-center">
                  <FaPlus /> Add More Options
                </button>
              </div>
 <hr className="w-full md:col-span-4 text-gray-300" />
              
                </>
              ))}
</AnimatePresence>
              <div className="md:col-span-4">
                <button onClick={handleAddQuestionOptions} type="button" className="mini-primary-button flex items-center">
                  <FaPlus /> Add Question/Options
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseWithAnimation}
                className="rounded-[10px] border border-red-400 bg-transparent py-3 px-4 text-red-400 cursor-pointer hover:text-red-500 hover:border-red-500 transition-all"
              >
                Cancel
              </button>
              <button type="submit" className="primary-button">
                Draft
              </button>
              <button
                type="submit"
                className="rounded-[10px] bg-green-400 py-3 px-4 text-white cursor-pointer hover:bg-green-600 transition-all"
              >
                {component_type == 1 ? "Publish" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>

     <CategoriesPanel categoryPanelHS={categoryPanelHS} handleClosePopupHS={handleClosePopupHS}/>
    </>
  );
};

export default AddUpdateQuiz;

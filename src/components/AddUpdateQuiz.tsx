import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import {
  MdEdit,
  MdOutlineQuiz,
  MdOutlineTimer,
  MdOutlineSort,
} from "react-icons/md";
import { IoClose, IoCameraSharp, IoTrashOutline } from "react-icons/io5";
import no_image from "../assets/images/no_image.png";
import { FaPlus } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CategoriesPanel from "./CategoriesPanel";
import type { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateQuizList, useUpdateQuiz } from "../hooks/useAdminQuiz";
import { handleError, handleSuccess } from "../toast";
import UploadImagePanel from "./UploadImagePanel";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

// --- Interfaces ---
interface QuizOption {
  option_label: string;
  option_sort_order: number;
  answer: boolean;
}

interface QuestionGroup {
  question_title: string;
  question_sort_order: number;
  question_type: number;
  question_time: string;
  options: QuizOption[];
}

interface FormDataProps {
  business_id: string;
  image: string;
  quiz_title: string;
  quiz_sort_order: number;
  quiz_time: string;
  category_id: string;
  question_group: QuestionGroup[];
  status: boolean;
}

interface errorProps {
  quiz_title: string;
  quiz_sort_order: string;
  category: string;
  quiz_time: string;
  question_group: {
    question_title: string;
    question_sort_order: string;
    question_time: string;
    options: {
      option_label: string;
      option_sort_order: string;
    }[];
  }[];
}

interface AddUpdateQuizProps {
  handleClosePopup: () => void;
  component_type: number;
  formData: any;
  setFormData: Dispatch<SetStateAction<FormDataProps>>;
  id?: string | undefined;
  selectedCategory: any;
  setSelectedCategory: Dispatch<
    SetStateAction<{ category_id: string; category_name: string }>
  >;
}

const AddUpdateQuiz: React.FC<AddUpdateQuizProps> = ({
  handleClosePopup,
  component_type,
  setFormData,
  formData,
  id,
  selectedCategory,
  setSelectedCategory,
}) => {
  const businessId = useSelector((state: RootState) => state.auth.user_id);
  const [imageUploadPanel, setImageUploadPanel] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const createQuizList = useCreateQuizList();
  const updateQuizListAPI = useUpdateQuiz();
  const [categoryPanelHS, setCategoryPanelHS] = useState<boolean>(false);
  const handleClosePopupHS = () => setCategoryPanelHS(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [imageShow, setImageShow] = useState<string | null>(
    formData?.image || ""
  );

  const [errors, setErrors] = useState<errorProps>({
    quiz_title: "",
    quiz_sort_order: "",
    category: "",
    quiz_time: "",
    question_group: [],
  });

  // --- Validation Logic ---
  const validateForm = (data: any) => {
    let isValid = true;
    const newErrors: errorProps = {
      quiz_title: !data.quiz_title ? "Quiz title is required" : "",
      quiz_sort_order: !data.quiz_sort_order ? "Sort order is required" : "",
      quiz_time: !data.quiz_time ? "Quiz time is required" : "",
      category: !selectedCategory?.category_id ? "Category is required" : "",
      question_group: data.question_group.map((q: any) => {
        const qTitleErr = !q.question_title ? "Question title is required" : "";
        const qSortErr = !q.question_sort_order ? "Required" : "";
        const qTimeErr = !q.question_time ? "Time required" : "";

        const optionsErrors = q.options.map((opt: any) => ({
          option_label: !opt.option_label ? "Option label is required" : "",
          option_sort_order: !opt.option_sort_order ? "Required" : "",
        }));

        if (
          qTitleErr ||
          qSortErr ||
          qTimeErr ||
          optionsErrors.some((o: any) => o.option_label || o.option_sort_order)
        ) {
          isValid = false;
        }

        return {
          question_title: qTitleErr,
          question_sort_order: qSortErr,
          question_time: qTimeErr,
          options: optionsErrors,
        };
      }),
    };

    if (
      newErrors.quiz_title ||
      newErrors.quiz_sort_order ||
      newErrors.quiz_time ||
      newErrors.category
    ) {
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const renderError = (message: string | undefined) => {
    return message ? (
      <span className="text-[11px] text-red-500 font-bold ml-1 mt-1 block animate-pulse">
        {message}
      </span>
    ) : null;
  };

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);
  useEffect(() => {
    if (formData?.image) setImageShow(formData?.image);
  }, [formData?.image]);
  useEffect(() => {
    if (selectedCategory?.category_id)
      setErrors((prev) => ({ ...prev, category: "" }));
  }, [selectedCategory]);

  const handleAddQuestionOptions = () => {
    const newQuestionAdd = {
      question_title: "",
      question_sort_order: formData.question_group.length + 1,
      question_type: 2,
      question_time: "N/A",
      options: [{ option_label: "", option_sort_order: 1, answer: false }],
    };
    setFormData((prev) => ({
      ...prev,
      question_group: [...prev.question_group, newQuestionAdd],
    }));
  };

  const handleAddMoreOptions = (questionIndex: number) => {
    const newOption = { option_label: "", option_sort_order: 1, answer: false };
    setFormData((prev) => ({
      ...prev,
      question_group: prev.question_group.map((question, qIndex) =>
        qIndex === questionIndex
          ? { ...question, options: [...question.options, newOption] }
          : question
      ),
    }));
  };

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setSelectedCategory({ category_id: "", category_name: "" });
    setFormData({
      business_id: businessId || "",
      image: "",
      quiz_title: "",
      quiz_sort_order: 1,
      quiz_time: "",
      category_id: "",
      question_group: [
        {
          question_title: "",
          question_sort_order: 1,
          question_type: 1,
          question_time: "N/A",
          options: [{ option_label: "", option_sort_order: 1, answer: false }],
        },
      ],
      status: false,
    });
    setErrors({
      quiz_title: "",
      quiz_sort_order: "",
      category: "",
      quiz_time: "",
      question_group: [],
    });
    setTimeout(() => handleClosePopup(), 300);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(formData)) {
      const payload = {
        ...formData,
        status: true,
        image: imageShow,
        category_id: selectedCategory?.category_id,
        id,
      };
      const action = component_type === 1 ? createQuizList : updateQuizListAPI;
      action.mutate(payload, {
        onSuccess: () => {
          handleSuccess(
            component_type === 1
              ? "Quiz Successfully Created!"
              : "Quiz Successfully Updated!"
          );
          queryClient.invalidateQueries({ queryKey: ["admin-quiz"] });
          handleCloseWithAnimation();
        },
        onError: () => handleError("Something went wrong!"),
      });
    } else {
      handleError("Please fix the errors in the form");
    }
  };

  const handleDraft = () => {
    if (validateForm(formData)) {
      const action = component_type === 1 ? createQuizList : updateQuizListAPI;
      action.mutate(
        {
          ...formData,
          image: imageShow,
          status: false,
          category_id: selectedCategory?.category_id,
          id,
        },
        {
          onSuccess: () => {
            handleSuccess("Quiz Saved as Draft!");
            queryClient.invalidateQueries({ queryKey: ["admin-quiz"] });
            handleCloseWithAnimation();
          },
          onError: () => handleError("Something went wrong!"),
        }
      );
    } else {
      handleError("Validation failed for Draft");
    }
  };

  return (
    <>
      <Overlay isVisible={isVisible} />
      <div
        className={`fixed inset-0 flex items-center justify-center py-6 px-4 z-[60] transition-all duration-500 overflow-hidden ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-50 rounded-3xl overflow-hidden shadow-2xl w-full lg:w-[900px] max-h-[92vh] flex flex-col relative"
        >
          {/* Header */}
          <div className="bg-white px-8 py-5 flex justify-between items-center border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl">
                {component_type === 1 ? (
                  <MdOutlineQuiz size={22} />
                ) : (
                  <MdEdit size={22} />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  {component_type === 1 ? "Create New" : "Update"} Quiz
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Build your quiz with custom questions
                </p>
              </div>
            </div>
            <button
              onClick={handleCloseWithAnimation}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <IoClose size={24} />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 custom-scrollbar">
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="relative group mx-auto md:mx-0">
                  <div
                    className={`h-32 w-32 rounded-[2rem] bg-white shadow-inner p-1 ring-4 overflow-hidden transition-all duration-300 ${
                      errors.quiz_title ? "ring-red-100" : "ring-white"
                    }`}
                  >
                    <img
                      onClick={() => setImageUploadPanel(true)}
                      src={
                        imageShow === ""
                          ? no_image
                          : `${
                              import.meta.env.VITE_BASE_URL
                            }/uploads/${imageShow}`
                      }
                      alt="Quiz"
                      className="h-full w-full object-cover rounded-[1.8rem] cursor-pointer"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setImageUploadPanel(true)}
                    className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-2.5 rounded-2xl shadow-xl hover:bg-slate-800 transition-all border-4 border-slate-50 cursor-pointer"
                  >
                    <IoCameraSharp size={18} />
                  </button>
                  {imageShow !== "" && (
                    <button
                      type="button"
                      onClick={() => setImageShow("")}
                      className="absolute -top-2 -right-2 cursor-pointer bg-white text-red-500 p-1.5 rounded-full shadow-md hover:scale-110 transition-all border border-slate-100"
                    >
                      <IoClose size={14} />
                    </button>
                  )}
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 ml-1 mb-1.5 block">
                      Quiz Title
                    </label>
                    <input
                      value={formData.quiz_title}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          quiz_title: e.target.value,
                        }));
                        if (e.target.value)
                          setErrors((prev) => ({ ...prev, quiz_title: "" }));
                      }}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                        errors.quiz_title
                          ? "border-red-400 bg-red-50/30"
                          : "border-slate-100 bg-white focus:border-orange-400"
                      }`}
                      placeholder="e.g. Modern Web Development Quiz"
                    />
                    {renderError(errors.quiz_title)}
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700 ml-1 mb-1.5 flex items-center gap-1">
                      <MdOutlineSort /> Sort Order
                    </label>
                    <input
                      type="number"
                      value={formData.quiz_sort_order}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          quiz_sort_order: Number(e.target.value),
                        }));
                        if (e.target.value)
                          setErrors((prev) => ({
                            ...prev,
                            quiz_sort_order: "",
                          }));
                      }}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                        errors.quiz_sort_order
                          ? "border-red-400 bg-red-50/30"
                          : "border-slate-100 bg-white focus:border-orange-400"
                      }`}
                    />
                    {renderError(errors.quiz_sort_order)}
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700 ml-1 mb-1.5 flex items-center gap-1">
                      <MdOutlineTimer /> Total Quiz Time
                    </label>
                    <select
                      value={formData.quiz_time}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          quiz_time: e.target.value,
                        }));
                        if (e.target.value)
                          setErrors((prev) => ({ ...prev, quiz_time: "" }));
                      }}
                      className={`w-full px-4 py-3 rounded-xl border-2 outline-none appearance-none cursor-pointer transition-all ${
                        errors.quiz_time
                          ? "border-red-400 bg-red-50/30"
                          : "border-slate-100 bg-white focus:border-orange-400"
                      }`}
                    >
                      <option value="">Select Time</option>
                      <option value="N/A">N/A</option>
                      <option value="30 sec">30 seconds</option>
                      <option value="1 min">1 minute</option>
                      <option value="5 min">5 minutes</option>
                    </select>
                    {renderError(errors.quiz_time)}
                  </div>
                </div>
              </div>

              <div>
                <div className="p-1 bg-slate-200/50 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setCategoryPanelHS(true)}
                    className={`w-full py-4 px-6 rounded-xl flex justify-between items-center transition-all bg-white shadow-sm hover:shadow-md cursor-pointer ${
                      errors.category ? "ring-2 ring-red-400" : ""
                    }`}
                  >
                    <span className="font-bold text-slate-600">
                      {selectedCategory?.category_name
                        ? `Category: ${selectedCategory.category_name}`
                        : "Click to select a Category"}
                    </span>
                    <div className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                      Change
                    </div>
                  </button>
                </div>
                {renderError(errors.category)}
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <h3 className="text-lg font-extrabold text-slate-800">
                    Questions & Answers
                  </h3>
                 
                </div>

                <AnimatePresence>
                  {formData?.question_group?.map((qu_group: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="bg-slate-50/80 px-6 py-4 flex justify-between items-center border-b border-slate-100">
                        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">
                          Question #{i + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              question_group: prev.question_group.filter(
                                (_, idx) => idx !== i
                              ),
                            }))
                          }
                          className="text-red-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        >
                          <IoTrashOutline size={20} />
                        </button>
                      </div>

                      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1 mb-1 block">
                            Question Text
                          </label>
                          <input
                            placeholder="Type your question here..."
                            value={qu_group.question_title}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                question_group: prev.question_group.map(
                                  (q, idx) =>
                                    idx === i
                                      ? { ...q, question_title: e.target.value }
                                      : q
                                ),
                              }));
                              if (e.target.value && errors.question_group[i]) {
                                const newQErrors = [...errors.question_group];
                                newQErrors[i].question_title = "";
                                setErrors((prev) => ({
                                  ...prev,
                                  question_group: newQErrors,
                                }));
                              }
                            }}
                            className={`w-full px-4 py-3 bg-slate-50 rounded-xl border-2 transition-all outline-none font-medium ${
                              errors.question_group[i]?.question_title
                                ? "border-red-300 bg-red-50/20"
                                : "border-transparent focus:border-slate-200 focus:bg-white"
                            }`}
                          />
                          {renderError(
                            errors.question_group[i]?.question_title
                          )}
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1 mb-1 block">
                            Time Limit
                          </label>
                          <select
                            value={qu_group.question_time}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                question_group: prev.question_group.map(
                                  (q, idx) =>
                                    idx === i
                                      ? { ...q, question_time: e.target.value }
                                      : q
                                ),
                              }));
                              if (e.target.value && errors.question_group[i]) {
                                const newQErrors = [...errors.question_group];
                                newQErrors[i].question_time = "";
                                setErrors((prev) => ({
                                  ...prev,
                                  question_group: newQErrors,
                                }));
                              }
                            }}
                            className={`w-full px-4 py-3 bg-slate-50 rounded-xl border-2 outline-none cursor-pointer ${
                              errors.question_group[i]?.question_time
                                ? "border-red-300 bg-red-50/20"
                                : "border-transparent focus:border-slate-200"
                            }`}
                          >
                            <option value="">Select</option>
                            <option value="N/A">N/A</option>
                            <option value="30 sec">30 sec</option>
                            <option value="1 min">1 min</option>
                          </select>
                          {renderError(errors.question_group[i]?.question_time)}
                        </div>

                        <div className="md:col-span-3 space-y-3">
                          <div className="flex justify-between items-center px-1">
                            <span className="text-sm font-bold text-slate-700">
                              Answer Options
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAddMoreOptions(i)}
                              className="text-orange-500 hover:text-orange-600 text-xs font-black uppercase tracking-tighter cursor-pointer"
                            >
                              + Add Option
                            </button>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            {qu_group.options.map((opt: any, index: number) => (
                              <div key={index}>
                                <div className="flex gap-3 items-start bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                  <div className="flex-1">
                                    <input
                                      placeholder={`Option ${index + 1}`}
                                      value={opt.option_label}
                                      onChange={(e) => {
                                        setFormData((prev) => ({
                                          ...prev,
                                          question_group:
                                            prev.question_group.map(
                                              (qg, qIdx) =>
                                                qIdx === i
                                                  ? {
                                                      ...qg,
                                                      options: qg.options.map(
                                                        (o, oIdx) =>
                                                          oIdx === index
                                                            ? {
                                                                ...o,
                                                                option_label:
                                                                  e.target
                                                                    .value,
                                                              }
                                                            : o
                                                      ),
                                                    }
                                                  : qg
                                            ),
                                        }));
                                        if (
                                          e.target.value &&
                                          errors.question_group[i]?.options[
                                            index
                                          ]
                                        ) {
                                          const newQErrors = [
                                            ...errors.question_group,
                                          ];
                                          newQErrors[i].options[
                                            index
                                          ].option_label = "";
                                          setErrors((prev) => ({
                                            ...prev,
                                            question_group: newQErrors,
                                          }));
                                        }
                                      }}
                                      className={`w-full px-3 py-2 rounded-lg bg-white border outline-none text-sm ${
                                        errors.question_group[i]?.options[index]
                                          ?.option_label
                                          ? "border-red-300"
                                          : "border-slate-200"
                                      }`}
                                    />
                                  </div>
                                  <div className="w-28">
                                    <select
                                      value={String(opt.answer)}
                                      onChange={(e) =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          question_group:
                                            prev.question_group.map(
                                              (qg, qIdx) =>
                                                qIdx === i
                                                  ? {
                                                      ...qg,
                                                      options: qg.options.map(
                                                        (o, oIdx) =>
                                                          oIdx === index
                                                            ? {
                                                                ...o,
                                                                answer:
                                                                  e.target
                                                                    .value ===
                                                                  "true",
                                                              }
                                                            : o
                                                      ),
                                                    }
                                                  : qg
                                            ),
                                        }))
                                      }
                                      className={`w-full px-2 py-2 rounded-lg text-xs font-bold border outline-none cursor-pointer ${
                                        opt.answer
                                          ? "bg-green-50 border-green-200 text-green-600"
                                          : "bg-white border-slate-200 text-slate-400"
                                      }`}
                                    >
                                      <option value="false">Wrong</option>
                                      <option value="true">Correct</option>
                                    </select>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        question_group: prev.question_group.map(
                                          (qg, qIdx) =>
                                            qIdx === i
                                              ? {
                                                  ...qg,
                                                  options: qg.options.filter(
                                                    (_, oIdx) => oIdx !== index
                                                  ),
                                                }
                                              : qg
                                        ),
                                      }))
                                    }
                                    className="p-2 text-slate-300 hover:text-red-500 cursor-pointer"
                                  >
                                    <IoClose size={18} />
                                  </button>
                                </div>
                                {renderError(
                                  errors.question_group[i]?.options[index]
                                    ?.option_label
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                 <button
                    type="button"
                    onClick={handleAddQuestionOptions}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-orange-500 transition-all shadow-lg cursor-pointer"
                  >
                    <FaPlus size={12} /> Add New Question
                  </button>
              </div>
            </form>
          </div>

          <div className="bg-white p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={handleCloseWithAnimation}
              className="order-3 sm:order-1 px-8 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleDraft}
              className="order-2 px-8 py-3 rounded-xl font-bold border-2 border-slate-100 text-slate-600 hover:border-slate-800 hover:text-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaSave size={14} /> Save Draft
            </button>
            <button
              onClick={() =>
                (
                  document.querySelector("form") as HTMLFormElement
                )?.requestSubmit()
              }
              type="button"
              className="order-1 sm:order-3 px-10 py-3 rounded-xl font-bold bg-orange-500 text-white shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all active:scale-95 cursor-pointer"
            >
              {component_type === 1 ? "Publish Quiz" : "Update Quiz"}
            </button>
          </div>
        </motion.div>
      </div>

      <CategoriesPanel
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        categoryPanelHS={categoryPanelHS}
        handleClosePopupHS={handleClosePopupHS}
      />
      {imageUploadPanel && (
        <UploadImagePanel
          handleClosePopupImage={() => setImageUploadPanel(false)}
          businessId={businessId ?? undefined}
          setImageShow={setImageShow}
        />
      )}
    </>
  );
};

export default AddUpdateQuiz;

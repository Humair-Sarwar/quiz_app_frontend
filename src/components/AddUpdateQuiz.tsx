import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import no_image from "../assets/images/no_image.png";
import { IoCameraSharp } from "react-icons/io5";
import "react-phone-input-2/lib/style.css";
import { IoMdAdd } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import CategoriesPanel from "./CategoriesPanel";
import type { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateQuizList, useUpdateQuiz } from "../hooks/useAdminQuiz";
import { handleError, handleSuccess } from "../toast";
import UploadImagePanel from "./UploadImagePanel";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

// Interfaces
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
  // Errors State
  const [errors, setErrors] = useState<errorProps>({
    quiz_title: "",
    quiz_sort_order: "",
    category: "",
    quiz_time: "",
    question_group: [],
  });

  const validateForm = (data: any) => {
    let isValid = true;

    const newErrors: errorProps = {
      quiz_title: !data.quiz_title ? "Quiz title is required" : "",
      quiz_sort_order: !data.quiz_sort_order ? "Sort order is required" : "",
      quiz_time: !data.quiz_time ? "Quiz time is required" : "", // ✅ ADDED
      category: !selectedCategory?.category_id ? "Category is required" : "",
      question_group: data.question_group.map((q: any) => {
        const qTitleErr = !q.question_title ? "Question title is required" : "";
        const qSortErr = !q.question_sort_order ? "Required" : "";
        const qTimeErr = !q.question_time ? "Question time is required" : ""; // ✅ ADDED

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
      newErrors.quiz_time || // ✅
      newErrors.category
    ) {
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Real-time Validation (onChange)
  useEffect(() => {
    validateForm(formData);
  }, [formData]);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);
  useEffect(() => {
    if (formData?.image) {
      setImageShow(formData?.image);
    }
  }, [formData?.image]);
  useEffect(() => {
    if (selectedCategory?.category_id) {
      setErrors((prev) => ({ ...prev, category: "" }));
    }
  }, [selectedCategory]);
  const handleAddQuestionOptions = () => {
    const newQuestionAdd = {
      question_title: "",
      question_sort_order: formData.question_group.length + 1,
      question_type: 2,
      question_time: "",
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
      status: false,
    });
    setTimeout(() => handleClosePopup(), 300);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(formData)) {
      if (component_type == 1) {
        createQuizList.mutate(
          {
            ...formData,
            status: true,
            image: imageShow,
            category_id: selectedCategory?.category_id,
          },
          {
            onSuccess: () => {
              handleSuccess("Quiz Successfully Created!");
              queryClient.invalidateQueries({ queryKey: ["admin-quiz"] });
              handleCloseWithAnimation();
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
                status: false,
              });
            },
            onError: () => handleError("Something went wrong!"),
          }
        );
      } else {
        updateQuizListAPI.mutate(
          {
            ...formData,
            status: true,
            image: imageShow,
            id,
            category_id: selectedCategory?.category_id,
          },
          {
            onSuccess: () => {
              handleSuccess("Quiz Successfully Updated!");
              queryClient.invalidateQueries({ queryKey: ["admin-quiz"] });
              handleCloseWithAnimation();
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
                status: false,
              });
            },
            onError: () => handleError("Something went wrong!"),
          }
        );
      }
    } else {
      handleError("Please fix the errors in the form");
    }
  };

  const handleDraft = () => {
    if (validateForm(formData)) {
      if (component_type == 1) {
        createQuizList.mutate(
          {
            ...formData,
            image: imageShow,
            status: false,
            category_id: selectedCategory?.category_id,
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
        updateQuizListAPI.mutate(
          {
            ...formData,
            image: imageShow,
            id,
            status: false,
            category_id: selectedCategory?.category_id,
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
      }
    } else {
      handleError("Validation failed for Draft");
    }
  };
  const handleClosePopupImage = () => setImageUploadPanel(false);
  return (
    <>
      <Overlay isVisible={isVisible} />
      <div
        className={`fixed inset-0 flex items-center justify-center py-4 px-4 z-50 transition-all duration-300 ease-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-10"
        }`}
      >
        <div className="bg-white rounded-2xl overflow-y-auto max-h-[100%] shadow-2xl p-6 sm:p-6 w-full lg:w-[850px] relative transition-all duration-300 ease-in-out">
          <form onSubmit={handleSubmit}>
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
              <div className="relative group">
                <div className="h-28 w-28 rounded-[35px] bg-slate-100 p-1 ring-4 ring-slate-50 overflow-hidden transition-transform duration-500 group-hover:scale-[1.03]">
                  <img
                    onClick={() => setImageUploadPanel(true)}
                    src={
                      imageShow === ""
                        ? no_image
                        : `${
                            import.meta.env.VITE_BASE_URL
                          }/uploads/${imageShow}`
                    }
                    alt="Category"
                    className="h-full w-full object-cover rounded-[30px] cursor-pointer"
                  />
                </div>

                {/* Image Action Buttons */}
                <div className="absolute -bottom-2 -right-2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => setImageUploadPanel(true)}
                    className="bg-[#ff5b07] cursor-pointer text-white p-2.5 rounded-2xl shadow-lg hover:bg-slate-900 transition-all active:scale-90 border-2 border-white flex items-center gap-1"
                  >
                    <IoCameraSharp size={18} />
                  </button>
                </div>

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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-4">
                <label htmlFor="quiz_title" className="block">
                  Quiz Title:
                </label>
                <input
                  value={formData.quiz_title}
                  type="text"
                  id="quiz_title"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      quiz_title: e.target.value,
                    }))
                  }
                  className={`mt-1 input-target-set-field w-full ${
                    errors.quiz_title ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Quiz Title"
                />
                {errors.quiz_title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.quiz_title}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="quiz_sort_order" className="block">
                  Sort Order:
                </label>
                <input
                  type="number"
                  id="quiz_sort_order"
                  className={`mt-1 input-target-set-field w-full ${
                    errors.quiz_sort_order ? "border-red-500" : ""
                  }`}
                  placeholder="Sort Order"
                  value={formData?.quiz_sort_order}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      quiz_sort_order: Number(e.target.value),
                    }))
                  }
                />
                {errors.quiz_sort_order && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.quiz_sort_order}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1">Quiz Time(min):</label>
                <select
                  value={formData.quiz_time}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      quiz_time: e.target.value,
                    }))
                  }
                  className={`w-full bg-white border rounded-lg px-2 py-3 ${"border-gray-300"}`}
                >
                  <option value="">Select</option>
                  <option value="30 sec">30 sec</option>
                  <option value="1 min">1 min</option>
                  <option value="5 min">5 min</option>
                </select>

                {errors.quiz_time && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.quiz_time}
                  </p>
                )}
              </div>

              <div className="md:col-span-4">
                <button
                  type="button"
                  onClick={() => setCategoryPanelHS(true)}
                  className={`mini-primary-button w-full ${
                    errors.category ? "border border-red-500" : ""
                  }`}
                >
                  Select Category
                  {selectedCategory?.category_name &&
                    " : " + selectedCategory.category_name}
                </button>

                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>

              <hr className="w-full md:col-span-4 text-gray-300" />

              <AnimatePresence initial={false}>
                {formData?.question_group?.map((qu_group: any, i: number) => (
                  <React.Fragment key={i}>
                    <div className="md:col-span-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-nowrap font-semibold">
                          Set New Question Group ({i + 1})
                        </h3>
                        <button
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              question_group: prev.question_group.filter(
                                (_, indx) => indx !== i
                              ),
                            }))
                          }
                          type="button"
                          className="border-1 cursor-pointer border-red-700 text-red-700 rounded-[5px] p-[2px]"
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <label>Question Title:</label>
                      <input
                        type="text"
                        className={`mt-1 input-target-set-field w-full ${
                          errors.question_group[i]?.question_title
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="Enter Title"
                        value={qu_group.question_title}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            question_group: prev.question_group.map((q, idx) =>
                              idx === i
                                ? { ...q, question_title: e.target.value }
                                : q
                            ),
                          }))
                        }
                      />
                      {errors.question_group[i]?.question_title && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.question_group[i].question_title}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-1">
                      <label>Sort Order:</label>
                      <input
                        type="number"
                        className={`mt-1 input-target-set-field w-full ${
                          errors.question_group[i]?.question_sort_order
                            ? "border-red-500"
                            : ""
                        }`}
                        value={qu_group.question_sort_order}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            question_group: prev.question_group.map((q, idx) =>
                              idx === i
                                ? {
                                    ...q,
                                    question_sort_order: Number(e.target.value),
                                  }
                                : q
                            ),
                          }))
                        }
                      />
                      {errors.question_group[i]?.question_sort_order && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.question_group[i].question_sort_order}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-1">
                      <label className="block mb-1">Type:</label>
                      <select
                        className="w-full bg-white border border-gray-300 rounded-lg px-2 py-3"
                        value={qu_group.question_type}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            question_group: prev.question_group.map((q, idx) =>
                              idx === i
                                ? {
                                    ...q,
                                    question_type: Number(e.target.value),
                                  }
                                : q
                            ),
                          }))
                        }
                      >
                        <option value="1">Single Select(Radio)</option>
                        <option value="2">Multiple Select(Checkbox)</option>
                      </select>
                    </div>

                    <div className="md:col-span-1">
                      <label className="block mb-1">Question Time:</label>
                      <select
                        className={`w-full bg-white border rounded-lg px-2 py-3 
      
    "border-gray-300
    `}
                        value={qu_group.question_time}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            question_group: prev.question_group.map((q, idx) =>
                              idx === i
                                ? { ...q, question_time: e.target.value }
                                : q
                            ),
                          }))
                        }
                      >
                        <option value="">Select</option>
                        <option value="30 sec">30 sec</option>
                        <option value="1 min">1 min</option>
                      </select>

                      {errors.question_group[i]?.question_time && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.question_group[i].question_time}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-4">
                      <h3 className="font-semibold">Options</h3>
                    </div>

                    <AnimatePresence initial={false}>
                      {qu_group?.options?.map((opt: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="md:col-span-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="md:col-span-7">
                              <label>Option Label ({index + 1}):</label>
                              <input
                                type="text"
                                className={`mt-1 input-target-set-field w-full ${
                                  errors.question_group[i]?.options[index]
                                    ?.option_label
                                    ? "border-red-500"
                                    : ""
                                }`}
                                placeholder="Enter Label"
                                value={opt.option_label}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    question_group: prev.question_group.map(
                                      (qg, idxx) =>
                                        idxx === i
                                          ? {
                                              ...qg,
                                              options: qg.options.map(
                                                (o, iidd) =>
                                                  iidd === index
                                                    ? {
                                                        ...o,
                                                        option_label:
                                                          e.target.value,
                                                      }
                                                    : o
                                              ),
                                            }
                                          : qg
                                    ),
                                  }))
                                }
                              />
                              {errors.question_group[i]?.options[index]
                                ?.option_label && (
                                <p className="text-red-500 text-xs mt-1">
                                  {
                                    errors.question_group[i].options[index]
                                      .option_label
                                  }
                                </p>
                              )}
                            </div>

                            <div className="md:col-span-2">
                              <label>Sort Order:</label>
                              <input
                                type="number"
                                className={`mt-1 input-target-set-field w-full ${
                                  errors.question_group[i]?.options[index]
                                    ?.option_sort_order
                                    ? "border-red-500"
                                    : ""
                                }`}
                                value={opt.option_sort_order}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    question_group: prev.question_group.map(
                                      (qg, idxx) =>
                                        idxx === i
                                          ? {
                                              ...qg,
                                              options: qg.options.map(
                                                (o, iidd) =>
                                                  iidd === index
                                                    ? {
                                                        ...o,
                                                        option_sort_order:
                                                          Number(
                                                            e.target.value
                                                          ),
                                                      }
                                                    : o
                                              ),
                                            }
                                          : qg
                                    ),
                                  }))
                                }
                              />
                              {errors.question_group[i]?.options[index]
                                ?.option_sort_order && (
                                <p className="text-red-500 text-xs mt-1">
                                  Req.
                                </p>
                              )}
                            </div>

                            <div className="md:col-span-2">
                              <label className="block mb-1">Answer:</label>
                              <select
                                className="w-full bg-white border border-gray-300 rounded-lg px-2 py-3"
                                value={String(opt.answer)}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    question_group: prev.question_group.map(
                                      (qg, qIdx) =>
                                        qIdx === i
                                          ? {
                                              ...qg,
                                              options: qg.options.map(
                                                (o, opIdx) =>
                                                  opIdx === index
                                                    ? {
                                                        ...o,
                                                        answer:
                                                          e.target.value ===
                                                          "true",
                                                      }
                                                    : o
                                              ),
                                            }
                                          : qg
                                    ),
                                  }))
                                }
                              >
                                <option value="false">False</option>
                                <option value="true">True</option>
                              </select>
                            </div>

                            <div className="md:col-span-1">
                              <button
                                type="button"
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    question_group: prev.question_group.map(
                                      (qg, idxx) =>
                                        idxx === i
                                          ? {
                                              ...qg,
                                              options: qg.options.filter(
                                                (_, iidd) => iidd !== index
                                              ),
                                            }
                                          : qg
                                    ),
                                  }))
                                }
                                className="md:mt-10 text-red-700 p-1"
                              >
                                <IoClose />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <div className="md:col-span-4 flex justify-end">
                      <button
                        onClick={() => handleAddMoreOptions(i)}
                        type="button"
                        className="mini-primary-button flex items-center gap-1"
                      >
                        <FaPlus /> Add More Options
                      </button>
                    </div>
                    <hr className="w-full md:col-span-4 text-gray-300" />
                  </React.Fragment>
                ))}
              </AnimatePresence>

              <div className="md:col-span-4">
                <button
                  onClick={handleAddQuestionOptions}
                  type="button"
                  className="mini-primary-button flex items-center gap-1"
                >
                  <FaPlus /> Add Question/Options
                </button>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseWithAnimation}
                className="rounded-[10px] border border-red-400 bg-transparent py-3 px-4 text-red-400 cursor-pointer hover:bg-red-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDraft}
                className="primary-button"
              >
                Draft
              </button>
              <button
                type="submit"
                className="rounded-[10px] bg-green-400 py-3 px-4 text-white cursor-pointer hover:bg-green-600 transition-all"
              >
                {component_type === 1 ? "Publish" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <CategoriesPanel
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        categoryPanelHS={categoryPanelHS}
        handleClosePopupHS={handleClosePopupHS}
      />

      {imageUploadPanel && (
        <UploadImagePanel
          handleClosePopupImage={handleClosePopupImage}
          businessId={businessId ?? undefined}
          setImageShow={setImageShow}
        />
      )}
    </>
  );
};
export default AddUpdateQuiz;
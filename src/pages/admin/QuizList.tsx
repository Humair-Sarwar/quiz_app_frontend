import React, { useState } from "react";
import { FaPlus, FaLayerGroup } from "react-icons/fa6";
import Pagination from "../../components/Pagination";
import { MdModeEdit, MdDelete, MdOutlineQuestionAnswer } from "react-icons/md";
import {
  IoAlertCircleOutline,
  IoCloudDoneOutline,
  IoEyeOutline,
} from "react-icons/io5";
import { RiListSettingsLine } from "react-icons/ri";
import AddUpdateQuiz from "../../components/AddUpdateQuiz";
import { useAdminGetQuiz, useDeleteQuiz } from "../../hooks/useAdminQuiz";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import SearchInput from "../../components/SearchInput";
import { FiInbox } from "react-icons/fi";
import no_image from "../../assets/images/no_image.png";
import DeletePopup from "../../components/DeletePopup";
import { handleError, handleSuccess } from "../../toast";
import { useQueryClient } from "@tanstack/react-query";

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

const QuizList: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<boolean>(false);
  const [deletePopup, setDeletPopup] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const deleteQuiz = useDeleteQuiz();
  const [selectedCategory, setSelectedCategory] = useState<{
    category_id: string;
    category_name: string;
  }>({ category_id: "", category_name: "" });
  const businessId = useSelector((state: RootState) => state.auth.user_id);
  const [id, setId] = useState("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState<string>("");
  const [formData, setFormData] = useState<FormDataProps>({
    business_id: businessId!,
    image: "",
    quiz_title: "",
    quiz_sort_order: 1,
    quiz_time: "",
    category_id: "695346fbdf102678203f12e6",
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
  const { data, isLoading } = useAdminGetQuiz({
    search,
    page,
    limit: pageSize,
    business_id: businessId,
  });

  const totalItems = data?.pagination?.totalItems;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const prevClick = () => setPage(page - 1);
  const nextClick = () => setPage(page + 1);
  const clickNum = (n: number) => setPage(n);
  const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value));
    setPage(1);
  };
  const handleClosePopup = () => {
    setAddCategory(false);
    setEditCategory(false);
    setDeletPopup(false);
  };
const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => handleClosePopup(), 300);
  };
   const handleDelete = () => {
      
        deleteQuiz.mutate(
          { business_id: businessId!, id: id! },
          {
            onSuccess: () => {
              handleSuccess("Quiz Deleted Successfully!");
              queryClient.invalidateQueries({ queryKey: ["admin-quiz"] });
              handleCloseWithAnimation();
            },
            onError: () => handleError("Something went wrong!"),
          }
        );
      
    };

  return (
    <>
      <div className="p-4 lg:p-8 bg-slate-50/50 min-h-screen">
        {/* Page Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <span className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100 text-orange-500">
                <RiListSettingsLine size={24} />
              </span>
              Quiz Inventory
            </h2>
            <p className="text-slate-500 text-sm mt-1 ml-1">
              Manage, monitor and update your assessment modules.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
            <SearchInput
              placeholder="Search Quiz..."
              handleSearch={handleSearch}
            />

            <button
              className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-200 transition-all active:scale-95 cursor-pointer"
              onClick={() => setAddCategory(true)}
            >
              <FaPlus /> Add New Quiz
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest text-nowrap">
                    Preview
                  </th>
                  <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest text-nowrap">
                    Quiz Info
                  </th>
                  <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest text-nowrap">
                    Category
                  </th>
                  <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest text-nowrap text-center">
                    Questions
                  </th>
                  <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest text-nowrap">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest text-nowrap text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {/* Sample Static Row */}
                {isLoading ? (
                  Array.from({ length: pageSize }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <td key={i} className="px-6 py-5">
                          <div className="h-4 bg-slate-100 rounded-md w-full"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : data?.data?.length > 0 ? (
                  data?.data?.map((quiz: any, index: any) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm group-hover:border-orange-200 transition-colors">
                          <img
                            src={
                              quiz?.image
                                ? `${import.meta.env.VITE_BASE_URL}/uploads/${
                                    quiz.image
                                  }`
                                : no_image
                            }
                            alt="Quiz"
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">
                            {quiz?.quiz_title}
                          </span>
                          <span className="text-[11px] text-slate-400 mt-0.5">
                            Created:{" "}
                            {new Date(quiz?.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                          <span className="text-[11px] text-slate-400 mt-0.5">
                            Last Updated:{" "}
                            {new Date(quiz?.updatedAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg w-fit">
                          <FaLayerGroup className="text-slate-400" />{" "}
                          {quiz?.category_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700">
                          <MdOutlineQuestionAnswer
                            className="text-orange-400"
                            size={16}
                          />{" "}
                          {quiz?.total_questions}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${
                            quiz?.status
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {quiz?.status ? (
                            <>
                              <IoCloudDoneOutline size={14} /> Published
                            </>
                          ) : (
                            <>
                              <IoAlertCircleOutline size={14} /> Draft
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all cursor-pointer">
                            <IoEyeOutline size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setEditCategory(true);

                              setFormData({
                                business_id: businessId || "",
                                image: quiz?.image || "",
                                quiz_title: quiz?.quiz_title || "",
                                quiz_sort_order: quiz?.quiz_sort_order || 1,
                                quiz_time: quiz?.quiz_time || "",
                                category_id:
                                  quiz?.category_id ||
                                  "695346fbdf102678203f12e6",
                                question_group: quiz?.question_group?.length
                                  ? quiz.question_group.map((q: any) => ({
                                      question_title: q.question_title || "",
                                      question_sort_order:
                                        q.question_sort_order || 1,
                                      question_type: q.question_type || 1,
                                      question_time: q.question_time || "",
                                      options: q.options?.length
                                        ? q.options.map((op: any) => ({
                                            option_label: op.option_label || "",
                                            option_sort_order:
                                              op.option_sort_order || 1,
                                            answer: op.answer || false,
                                          }))
                                        : [
                                            {
                                              option_label: "",
                                              option_sort_order: 1,
                                              answer: false,
                                            },
                                          ],
                                    }))
                                  : [
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
                                status: quiz?.status ?? false,
                              });

                              setId(quiz?._id);
                              setSelectedCategory({category_id: quiz?.category_id, category_name: quiz?.category_name})
                            }}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                          >
                            <MdModeEdit size={18} />
                          </button>

                          <button
                            onClick={() => {
                            setDeletPopup(true);
                            setId(quiz._id);
                          }}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                          >
                            <MdDelete size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3 text-slate-300">
                        <FiInbox size={48} />
                        <p className="text-slate-500 font-bold tracking-tight">
                          No Quiz Found
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {!isLoading && (
            <div className="mt-6 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
              <Pagination
                currentPage={data?.pagination?.currentPage}
                clickNum={clickNum}
                prevClick={prevClick}
                nextClick={nextClick}
                page={page}
                totalPages={totalPages}
                handlePageSize={handlePageSize}
                totalItems={totalItems}
                firstRecord={data?.pagination?.firstRecord}
                lastRecord={data?.pagination?.lastRecord}
                pageSize={pageSize}
              />
            </div>
          )}
        </div>
      </div>

      {/* Conditional Modals */}
      {addCategory && (
        <AddUpdateQuiz
          formData={formData}
          setFormData={setFormData}
          component_type={1}
          handleClosePopup={handleClosePopup}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      {editCategory && (
        <AddUpdateQuiz
          id={id}
          formData={formData}
          setFormData={setFormData}
          component_type={2}
          handleClosePopup={handleClosePopup}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      {deletePopup && (
        <DeletePopup
          handleClosePopup={handleClosePopup}
          business_id={businessId}
          id={id}
          handleDelete={handleDelete}
          handleCloseWithAnimation={handleCloseWithAnimation}
          isPendingDel={deleteQuiz?.isPending}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
    </>
  );
};

export default QuizList;

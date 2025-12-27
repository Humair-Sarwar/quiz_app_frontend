import React, { useState } from "react";
import coding from "../../assets/images/coding.png";
import Pagination from "../../components/Pagination";
import QuizPopup from "../../components/QuizPopup";
import useQuizList from "../../hooks/useQuizList";
import { handleError } from "../../toast";
import { useLocation } from "react-router-dom";

const QuizListing: React.FC = () => {
  const location = useLocation();
  const lastSegment = location.pathname.split("/");
  console.log("last segment:", lastSegment[lastSegment.length - 1]);
  const slug = lastSegment[lastSegment.length - 1];
  const [search, setSearch] = useState<string>("");
  const [startQuiz, setStartQuiz] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, error, isLoading } = useQuizList({
    search,
    category_slug: slug,
    limit: pageSize,
    page,
  });
  const totalItems = data?.pagination?.totalItems;
  const totalPages = Math.ceil(totalItems / pageSize);
  if (error) {
    handleError("Something went wrong!");
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };
  const prevClick = () => {
    setPage(page - 1);
  };
  const nextClick = () => {
    setPage(page + 1);
  };
  const clickNum = (data: number) => {
    setPage(data);
  };
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
              onChange={handleSearch}
            />
          </div>

          {isLoading ? (
            // <div className="flex justify-center items-center">
            //   <MainSpinnerLoader />
            // </div>
            <div className="my-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                <div className="p-4 rounded-2xl text-center m-2 category-box-target bg-white">
                  <div className="animate-pulse space-y-4">
                    <div className="h-45 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="flex justify-center items-center">
                      <div className="h-9 bg-gray-200 rounded w-[80px]"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl text-center m-2 category-box-target bg-white">
                  <div className="animate-pulse space-y-4">
                    <div className="h-45 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="flex justify-center items-center">
                      <div className="h-9 bg-gray-200 rounded w-[80px]"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl text-center m-2 category-box-target bg-white">
                  <div className="animate-pulse space-y-4">
                    <div className="h-45 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="flex justify-center items-center">
                      <div className="h-9 bg-gray-200 rounded w-[80px]"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl text-center m-2 category-box-target bg-white">
                  <div className="animate-pulse space-y-4">
                    <div className="h-45 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="flex justify-center items-center">
                      <div className="h-9 bg-gray-200 rounded w-[80px]"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl text-center m-2 category-box-target bg-white">
                  <div className="animate-pulse space-y-4">
                    <div className="h-45 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="flex justify-center items-center">
                      <div className="h-9 bg-gray-200 rounded w-[80px]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : data?.data?.length === 0 ? (
            <p className="text-center">No data available!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {data?.data?.map((quiz: { _id: string; quiz_title: string }) => (
                <div className="my-10" key={quiz?._id}>
                  <div className="p-4 rounded-2xl text-center mx-2 category-box-target my-5 bg-white">
                    <div className="flex justify-center items-center box-image">
                      <img src={coding} alt="" />
                    </div>
                    <h3 className="text-lg font-semibold my-3">
                      {quiz?.quiz_title}
                    </h3>
                    <button
                      className="mini-primary-button"
                      onClick={() => setStartQuiz(true)}
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Pagination
            currentPage={data?.pagination?.currentPage}
            prevClick={prevClick}
            firstRecord={data?.pagination?.firstRecord}
            lastRecord={data?.pagination?.lastRecord}
            nextClick={nextClick}
            handlePageSize={handlePageSize}
            pageSize={pageSize}
            totalPages={totalPages}
            totalItems={totalItems}
            clickNum={clickNum}
            page={page}
          />
        </div>
      </div>
      {startQuiz && <QuizPopup />}
    </>
  );
};

export default QuizListing;

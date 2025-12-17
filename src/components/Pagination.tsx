import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  page: number;
  totalPages: number;
  prevClcik: () => void;
  nextClick: () => void;
  clickNum: (data: number) => void;
  currentPage: number;
  handlePageSize?: () => void;
  totalItems: number;
  firstRecord: number;
  lastRecord: number;
  pageSize: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  firstRecord,
  pageSize,
  lastRecord,
  handlePageSize,
  totalItems,
  totalPages,
  prevClcik,
  nextClick,
  clickNum,
  currentPage,
}) => {
  return (
    <div className="flex items-center flex-col gap-3 lg:flex-row md:flex-row justify-center space-x-2 mt-8">
      {totalPages > 0 && (
        <div className="text-[13px] mr-5">
          Showing {firstRecord}-{lastRecord} of {totalItems}
        </div>
      )}

      <div className="flex gap-2">
        <button
          disabled={page === 1 || totalPages == 0}
          onClick={prevClcik}
          className={`px-3 py-2 rounded-md border ${page === 1 || totalPages == 0 ? 'bg-gray-100 !cursor-not-allowed' : 'bg-white'} border-gray-300 hover:bg-gray-100  cursor-pointer`}
        >
          <IoIosArrowBack />
        </button>
        {Array.from({ length: totalPages }, (_, i: number) => (
          <button
            key={i + 1}
            onClick={() => clickNum(i + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage == i + 1
                ? "bg-orange-500 text-white"
                : "border border-gray-300 bg-white hover:bg-gray-100"
            }  cursor-pointer`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages || totalPages == 0}
          onClick={nextClick}
          className={`px-3 py-2 rounded-md border ${page === totalPages || totalPages == 0 ? 'bg-gray-100 !cursor-not-allowed' : 'bg-white'} border-gray-300 hover:bg-gray-100  cursor-pointer`}
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div className="text-[13px] ml-5">
        Rows per page:
        <select
          name=""
          value={pageSize}
          onChange={handlePageSize}
          id=""
          className="border cursor-pointer border-[#aeaeae] outline-none rounded-[5px] p-1 ml-2"
        >
          {[2, 5, 10, 15, 25, 50, 60].map((size) => (
            <option
              key={size}
              value={size}
              className={`hover:bg-black cursor-pointer border ${
                pageSize === size ? "bg-orange-500 text-white" : ""
              }`}
            >
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;

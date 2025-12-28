import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuChevronDown } from "react-icons/lu";

interface PaginationProps {
  page: number;
  totalPages: number;
  prevClick: () => void;
  nextClick: () => void;
  clickNum: (data: number) => void;
  currentPage: number;
  handlePageSize?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
  prevClick,
  nextClick,
  clickNum,
  currentPage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Options list ko thoda bada rakha hai scroll check karne ke liye
  const options = [2, 5, 10, 15, 20, 25, 30, 40, 50, 60, 100];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSelectOption = (value: number) => {
    if (handlePageSize) {
      handlePageSize({
        target: { value: value.toString() },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-5 py-2">
      {/* 1. Records Info */}
      {totalPages > 0 && (
        <div className="text-[13px] font-bold text-slate-500 bg-slate-100/50 px-4 py-2 rounded-full border border-slate-100">
          Showing <span className="text-slate-900">{firstRecord}</span> to{" "}
          <span className="text-slate-900">{lastRecord}</span> of{" "}
          <span className="text-[#ff5b07]">{totalItems}</span> entries
        </div>
      )}

      {/* 2. Main Controls */}
      <div className="flex items-center gap-1.5">
        <button
          disabled={page === 1 || totalPages === 0}
          onClick={prevClick}
          className={`p-2.5 rounded-xl border transition-all duration-200 ${
            page === 1 || totalPages === 0
              ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
              : "bg-white border-slate-200 text-slate-600 hover:border-[#ff5b07] hover:text-[#ff5b07] cursor-pointer shadow-sm active:scale-90"
          }`}
        >
          <IoIosArrowBack size={18} />
        </button>

        <div className="flex items-center gap-1.5 mx-1">
          {Array.from({ length: totalPages }, (_, i: number) => (
            <button
              key={i + 1}
              onClick={() => clickNum(i + 1)}
              className={`min-w-[38px] h-[38px] flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 ${
                currentPage === i + 1
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200 scale-105"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-800 cursor-pointer"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={nextClick}
          className={`p-2.5 rounded-xl border transition-all duration-200 ${
            page === totalPages || totalPages === 0
              ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
              : "bg-white border-slate-200 text-slate-600 hover:border-[#ff5b07] hover:text-[#ff5b07] cursor-pointer shadow-sm active:scale-90"
          }`}
        >
          <IoIosArrowForward size={18} />
        </button>
      </div>

      {/* 3. CUSTOM ROWS PER PAGE DROPDOWN WITH SCROLL */}
      <div className="flex items-center gap-3 text-[13px] font-bold text-slate-500">
        <span className="hidden sm:block">Per Page:</span>
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center justify-between min-w-[80px] px-4 py-2.5 bg-white border-2 cursor-pointer rounded-xl transition-all duration-300 ${
              isOpen ? "border-[#ff5b07] shadow-lg shadow-orange-50" : "border-slate-100 hover:border-slate-300 shadow-sm"
            }`}
          >
            <span className="text-sm font-semibold text-slate-900">{pageSize}</span>
            <LuChevronDown 
              size={14} 
              className={`text-slate-400 transition-transform duration-300 ml-2 ${isOpen ? "rotate-180 text-[#ff5b07]" : ""}`} 
            />
          </div>

          {/* POPUP MENU WITH SCROLLBAR */}
          {isOpen && (
            <div className="absolute bottom-full mb-2 right-0 w-full min-w-[85px] bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
              {/* max-h-48 (12rem) ya max-h-60 use karein options ke liye */}
              <div className="py-1 max-h-48 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {options.map((option) => (
                  <div
                    key={option}
                    onClick={() => onSelectOption(option)}
                    className={`px-4 py-2.5 text-sm font-bold cursor-pointer transition-all ${
                      pageSize === option 
                        ? "bg-orange-50 text-[#ff5b07]" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
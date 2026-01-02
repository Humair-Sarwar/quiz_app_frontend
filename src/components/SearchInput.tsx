import type React from "react";
import { IoSearch } from "react-icons/io5";

interface SearchInputProps {
    placeholder: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, handleSearch }) => {
  return (
    <div className="relative w-full lg:w-72 md:w-64 group">
      {/* Icon with focus color transition */}
      <IoSearch 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff5b07] transition-colors duration-300" 
        size={18}
      />
      
      <input
        type="text"
        className="w-full bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl py-3 pl-11 pr-4 
                   outline-none transition-all duration-300
                   placeholder:text-slate-400 placeholder:font-normal
                   focus:border-[#ff5b07] focus:ring-4 focus:ring-orange-500/5 
                   shadow-sm hover:border-slate-300"
        placeholder={placeholder}
        onChange={handleSearch}
      />

      {/* Subtle border shine effect on hover */}
      <div className="absolute inset-0 rounded-xl pointer-events-none border border-transparent group-hover:border-slate-200 transition-all duration-300"></div>
    </div>
  );
};

export default SearchInput;
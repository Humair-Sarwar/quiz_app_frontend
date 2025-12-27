
import type React from "react";
import { IoSearch } from "react-icons/io5";

interface SearchInputProps {
    placeholder: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>)=> void;
}

const SearchInput: React.FC<SearchInputProps> = ({placeholder, handleSearch}) => {
  return (
    <div className="relative w-full lg:w-auto md:w-auto">
                  <IoSearch className="absolute left-3 top-[50%] text-[20px] translate-y-[-50%]" />
    
                  <input
                    type="text"
                    className="input-target-set-field w-full !ps-9"
                    placeholder={placeholder}
                    onChange={handleSearch}
                  />
                </div>
  )
}

export default SearchInput

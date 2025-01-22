import React from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchInput = ({ onChange }) => {
  const handleInputChange = (event) => {
    onChange(event.target.value); 
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center mt-10">
      <div className="text-center mb-6">
        <h1 className="text-gray-600 text-lg font-semibold tracking-widest">
          <span className="mr-2">~</span> MENU <span className="ml-2">~</span>
        </h1>
      </div>

      <div className="w-full">
        <Search
          placeholder="Search"
          allowClear
          className="rounded-lg shadow-sm"
          size="large"
          onChange={handleInputChange} 
        />
      </div>
    </div>
  );
};

export default SearchInput;

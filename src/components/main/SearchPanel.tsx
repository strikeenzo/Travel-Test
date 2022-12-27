import React from "react";

import SearchForm from "./SearchForm";

const SearchPanel: React.FC = (): JSX.Element => {
  return (
    <div className="container mx-auto bg-[#10091D]/[.2] backdrop-blur-[5px] rounded-[5px] sm:px-[30px] px-[10px] py-[20px]">
      <div className="mt-[30px]">
        <SearchForm />
      </div>
    </div>
  );
};

export default SearchPanel;

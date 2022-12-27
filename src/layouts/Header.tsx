import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = (): JSX.Element => {
  return (
    <div className="top-0 absolute w-full z-50 bg-[#10091D]/[.3]">
      <div className="container mx-auto flex h-[80px] items-center px-[10px]">
        <Link
          className="mr-auto w-[165px] h-[15px] text-white text-[22px]"
          to="/"
        >
          Travel
        </Link>
      </div>
    </div>
  );
};

export default Header;

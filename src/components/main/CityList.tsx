import React from "react";

import { City } from "../../types";

interface ICityProps {
  cityList: City[] | undefined;
  onSelect(arg: City): void;
}

const CityList: React.FC<ICityProps> = ({
  cityList,
  onSelect,
}): JSX.Element => {
  return (
    <ul className="absolute top-[67px] left-0 lg:w-[760px] sm:w-[500px] bg-white max-h-[350px] overflow-auto shadow-[0px_4px_10px_rgba(0,0,0,0.2)] z-50">
      {cityList?.length ? (
        cityList?.map((city, index) => {
          return (
            <li
              key={index}
              onClick={() => onSelect(city)}
              className="text-[#10091D] font-open_sans border-b hover:bg-[#F3E351] active:bg-[#F3E351]/[.7] px-[15px] py-[9px] flex justify-between items-cemter"
            >
              <p className="sm:text-[16px] text-[14px] leading-[22px]">
                {city.name}
              </p>
              <p className="text-[14px] leading-[19px] xl:inline hidden">
                Press enter to select
              </p>
            </li>
          );
        })
      ) : (
        <li className="text-[#10091D] font-open_sans border-b hover:bg-[#F3E351] active:bg-[#F3E351]/[.7] px-[15px] py-[9px] flex justify-between items-cemter">
          Type to search
        </li>
      )}
    </ul>
  );
};

export default CityList;

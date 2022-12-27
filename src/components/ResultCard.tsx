import React from "react";
import moment from "moment";

import arrow from "../assets/img/landing/arrow.png";
import { FlightItemProps, ResultCardProps } from "../types";

const FligthItem: React.FC<FlightItemProps> = ({ item }): JSX.Element => {
  return (
    <div className="text-white opacity-[.3] flex items-center justify-center">
      <div className="md:w-[20%] w-[30%]">
        <p className="font-bold text-[24px] leading-[45px] uppercase">
          {item.from.name}
        </p>
      </div>
      <div className="w-[8%] flex justify-center md:mr-[10px]">
        <img src={arrow} alt="arrow" />
      </div>
      <div className="md:w-[20%] w-[30%]">
        <p className="font-bold text-[24px] leading-[45px] uppercase">
          {item.to.name}
        </p>
      </div>
      <div className="md:w-[15%] w-[30%] ml-4">
        <p className="text-[22px] leading-[30px]">
          ({Math.floor(item.distance ? item.distance : 0)}m)
        </p>
      </div>
      <div className="md:w-[15%] w-[30%]">
        <p className="text-[22px] leading-[30px]">
          {moment(item.dateFrom).format("YYYY-MM-DD")}
        </p>
      </div>
      <div className="md:w-[15%] w-[30%]">
        <p className="text-[22px] leading-[30px]">
          {item.passengers} {"passengers"}
        </p>
      </div>
    </div>
  );
};

const ResultCard: React.FC<ResultCardProps> = (props): JSX.Element => {
  return (
    <div className="max-w-[952px] mx-auto bg-[#10091D]/[.7] rounded-[10px] backdrop-blur-[5px] sm:px-[30px] px-[10px] lg:pt-[60px] pt-[30px] pb-[40px]">
      <div className="mx-auto w-full">
        {props.items.map((item, index) => (
          <FligthItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ResultCard;

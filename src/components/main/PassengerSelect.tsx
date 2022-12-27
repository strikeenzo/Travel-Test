import React, { useState } from "react";

import plusIcon from "../../assets/img/main/plus.png";
import minusIcon from "../../assets/img/main/minus.png";

interface IPassengerProps {
  onSelect(arg: string[]): void;
  preData: string[];
}

const passengersMock = [
  ["Adult", "18-64"],
  ["Senior", "65+"],
  ["Youth", "12-17"],
  ["Child", "2-11"],
  ["Seat Infant", "under 2"],
  ["Lap Infant", "under 2"],
];

const PassengerSelect: React.FC<IPassengerProps> = ({
  onSelect,
  preData,
}): JSX.Element => {
  const preCounts = preData[1]?.split(",");
  const [passengerCount, setPassengerCount] = useState({
    adult: Number(preCounts[0]),
    senior: Number(preCounts[1]),
    youth: Number(preCounts[2]),
    child: Number(preCounts[3]),
    seat: Number(preCounts[4]),
    lap: Number(preCounts[5]),
  });

  const plusCount = (index) => {
    switch (index) {
      case 0:
        setPassengerCount({
          ...passengerCount,
          adult: passengerCount.adult + 1,
        });
        break;
      case 1:
        setPassengerCount({
          ...passengerCount,
          senior: passengerCount.senior + 1,
        });
        break;
      case 2:
        setPassengerCount({
          ...passengerCount,
          youth: passengerCount.youth + 1,
        });
        break;
      case 3:
        setPassengerCount({
          ...passengerCount,
          child: passengerCount.child + 1,
        });
        break;
      case 4:
        setPassengerCount({ ...passengerCount, seat: passengerCount.seat + 1 });
        break;

      default:
        setPassengerCount({ ...passengerCount, lap: passengerCount.lap + 1 });
        break;
    }
  };

  const minusCount = (index) => {
    switch (index) {
      case 0:
        setPassengerCount({
          ...passengerCount,
          adult: passengerCount.adult - 1 > 0 ? passengerCount.adult - 1 : 0,
        });
        break;
      case 1:
        setPassengerCount({
          ...passengerCount,
          senior: passengerCount.senior - 1 > 0 ? passengerCount.senior - 1 : 0,
        });
        break;
      case 2:
        setPassengerCount({
          ...passengerCount,
          youth: passengerCount.youth - 1 > 0 ? passengerCount.youth - 1 : 0,
        });
        break;
      case 3:
        setPassengerCount({
          ...passengerCount,
          child: passengerCount.child - 1 > 0 ? passengerCount.child - 1 : 0,
        });
        break;
      case 4:
        setPassengerCount({
          ...passengerCount,
          seat: passengerCount.seat - 1 > 0 ? passengerCount.seat - 1 : 0,
        });
        break;

      default:
        setPassengerCount({
          ...passengerCount,
          lap: passengerCount.lap - 1 > 0 ? passengerCount.lap - 1 : 0,
        });
        break;
    }
  };

  const getCount = (index) => {
    switch (index) {
      case 0:
        return passengerCount.adult;
      case 1:
        return passengerCount.senior;
      case 2:
        return passengerCount.youth;
      case 3:
        return passengerCount.child;
      case 4:
        return passengerCount.seat;

      default:
        return passengerCount.lap;
    }
  };

  const totalCount = () => {
    let str = "";

    if (passengerCount.adult > 0) {
      str += `adult ${passengerCount.adult}`;
    }

    if (passengerCount.senior > 0) {
      str += `  senior ${passengerCount.senior}`;
    }

    if (passengerCount.youth > 0) {
      str += `  youth ${passengerCount.youth}`;
    }

    if (passengerCount.child > 0) {
      str += `  child ${passengerCount.child}`;
    }

    if (passengerCount.seat > 0) {
      str += `  seat ${passengerCount.seat}`;
    }

    if (passengerCount.lap > 0) {
      str += `  lap ${passengerCount.lap}`;
    }

    const { adult, senior, youth, child, seat, lap } = passengerCount;

    if (adult + senior + youth + child + seat + lap === 0)
      setPassengerCount({ ...passengerCount, adult: 1 });

    return `${
      adult + senior + youth + child + seat + lap === 0
        ? 1
        : adult + senior + youth + child + seat + lap
    }:${str}`;
  };

  const selectedCounts = `${passengerCount.adult},${passengerCount.senior},${passengerCount.youth},${passengerCount.child},${passengerCount.seat},${passengerCount.lap}`;

  return (
    <div
      onBlur={() => onSelect([totalCount(), selectedCounts])}
      tabIndex={-1}
      id="selectUsers"
      className="absolute top-[67px] left-0 py-[15px] px-[30px] bg-white sm:w-[330px] w-[300px]"
    >
      <div className="space-y-[18px]">
        {passengersMock.map((data, index) => (
          <div className="flex justify-between" key={index}>
            <span className="font-open_sans text-[16px] text-[#494949] leading-[22px]">
              {data[0]}
              <span className="ml-[6px] font-open_sans text-[#10091D] text-[12px] leading-[14px]">
                {data[1]}
              </span>
            </span>
            <div className="flex items-center space-x-[10px]">
              <img src={minusIcon} onClick={() => minusCount(index)} alt="" />
              <span>{getCount(index)}</span>
              <img src={plusIcon} onClick={() => plusCount(index)} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PassengerSelect;

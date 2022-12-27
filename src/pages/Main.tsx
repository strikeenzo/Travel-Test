import React, { useContext, useEffect } from "react";

import SearchPanel from "../components/main/SearchPanel";
import { FlightContext } from "../App";
import { City } from "../types";

const MainPage: React.FC = (): JSX.Element => {
  const flightContext = useContext(FlightContext);

  useEffect(() => {
    flightContext.setFlightState([
      {
        current: {} as City,
        destination: {} as City,
        dateFrom: new Date(),
        passengers: "",
      },
    ]);
  }, []);

  return (
    <>
      <div className="relative">
        <div className="bg-[url('assets/img/landing/background.png')] bg-cover bg-center md:h-[1000px] h-[1200px]"></div>
        <div className="bg-[#10091D] opacity-[0.7] w-full h-[1000px] absolute top-0"></div>
        <div className="absolute xl:top-[260px] md:top-[200px] top-[120px] w-full px-[10px] z-10">
          <SearchPanel />
        </div>
      </div>
    </>
  );
};

export default MainPage;

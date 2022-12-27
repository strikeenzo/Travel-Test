import React, { useEffect, useState } from "react";

import ResultCard from "../components/ResultCard";
import { CalcItem } from "../types";

const ResultPage: React.FC = (): JSX.Element => {
  const { search } = window.location;
  const [result, setResult] = useState([] as CalcItem[]);

  useEffect(() => {
    setResult([] as CalcItem[]);

    for (let i = 0; ; i++) {
      const query = new URLSearchParams(search).get(`${i}`);
      if (!query) break;
      setResult((prev) => [...prev, JSON.parse(query)]);
    }
  }, [search]);

  return (
    <div className="relative">
      <div className="bg-[url('assets/img/landing/background.png')] bg-cover bg-center md:h-[1000px] h-[1000px]"></div>
      <div className="bg-[#10091D] opacity-[0.7] w-full h-[1000px] absolute top-0"></div>
      <div className="absolute lg:top-[260px] md:top-[150px] top-[100px] w-full md:px-[24px] px-[10px]">
        <ResultCard items={result} />
      </div>
    </div>
  );
};

export default ResultPage;

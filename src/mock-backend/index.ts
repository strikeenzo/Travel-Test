import { initialItems } from "./data";
import { executeCalc, executeSearch } from "./execute";
import { City, CalcItem } from "../types";

type UseCheckout = {
  search: (keyword: string) => Promise<City[]>;
  calc: (cities: CalcItem[]) => Promise<CalcItem[]>;
};

export const useCheckout = (): UseCheckout => {
  return {
    search: async (keyword: string) => {
      const res = await executeSearch(keyword, initialItems);
      return res;
    },

    calc: async (items: CalcItem[]) => {
      const result = executeCalc(items);
      return result;
    },
  };
};

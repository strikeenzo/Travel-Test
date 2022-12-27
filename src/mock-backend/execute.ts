import haversine from "haversine-distance";

import { sleep } from "./utils";
import { City, CalcItem } from "../types";

export const executeSearch = async (
  keyword: string,
  cities: City[]
): Promise<City[]> => {
  await sleep(100);

  let updatedCities = [] as City[];

  cities.map((city) => {
    if (city.name.toLowerCase().includes(keyword.toLowerCase())) {
      updatedCities.push(city);
    }

    return city;
  });

  return updatedCities;
};

export const executeCalc = async (items: CalcItem[]): Promise<CalcItem[]> => {
  await sleep(100);

  const result = items.map((item: CalcItem) => {
    item.distance = haversine(
      {
        latitude: item.from.latitude,
        longitude: item.to.longitude,
      },
      {
        latitude: item.to.latitude,
        longitude: item.to.longitude,
      }
    );
    return item;
  });

  return result;
};

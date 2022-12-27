export type City = {
  name: string;
  longitude: number;
  latitude: number;
};

export type CalcItem = {
  from: City;
  to: City;
  distance?: number;
  dateFrom: Date;
  passengers: string;
};

export type FlightItemProps = {
  item: CalcItem;
};

export type ResultCardProps = {
  items: CalcItem[];
};

export type IFlightState = {
  current: City;
  destination: City;
  dateFrom: Date;
  passengers: string;
};

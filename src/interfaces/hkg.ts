export type DepartureData = DayFlight[];

export interface DayFlight {
  date: string;
  arrival: boolean;
  cargo: boolean;
  list: FlightListItem[];
}

export interface FlightListItem {
  // 时间
  time: string;
  flight: FlightAirline[];
  // 状态
  status: string;
  // 一般是 null
  statusCode: null | any;
  // 目的地 (IATA)
  destination: string[];
  // 航站楼
  terminal: string;
  // 值机区
  aisle: string;
  // 登机口
  gate: string;
}

export interface FlightAirline {
  // 航班号
  no: string;
  // ICAO 航空公司代码
  airline: string;
}

export interface DisplayDepartureData {
  date: Date;
  flight: FlightListItem;
}

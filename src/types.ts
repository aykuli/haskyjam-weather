export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface HistoryItem {
  id: number;
  city: string;
  color: string;
  coordinates: Coordinates;
}

interface HourlyData {
  time: number;
  summary: string;
  icon: string;
  precipIntensity: number;
  precipProbability: number;
  precipType: string;
  precipAccumulation: number;
  temperature: number;
  apparentTemperature: number;
  dewPoint: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windGust: number;
  windBearing: number;
  cloudCover: number;
  uvIndex: number;
  visibility: number;
  ozone: number;
}

export interface Weather48HoursProp {
  summary: string;
  icon: string;
  data: Array<HourlyData>;
}

export interface StoreType {
  currentTab: string;
  coordinates: Coordinates;
  city: string;
  country: string;
  temperature: number | null;
  weatherInfo: string;
  weather48Hours: Weather48HoursProp | null;
  weatherWeek: any;
  history: Array<HistoryItem>;
}

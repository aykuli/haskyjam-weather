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
  weatherWeek: WeatherWeekProp | null;
  history: Array<HistoryItem>;
}

interface DailyData {
  time: number;
  summary: string;
  icon: string;
  sunriseTime: number;
  sunsetTime: number;
  moonPhase: number;
  precipIntensity: number;
  precipIntensityMax: number;
  precipIntensityMaxTime: number;
  precipProbability: number;
  precipType: string;
  precipAccumulation: number;
  temperatureHigh: number;
  temperatureHighTime: number;
  temperatureLow: number;
  temperatureLowTime: number;
  apparentTemperatureHigh: number;
  apparentTemperatureHighTime: number;
  apparentTemperatureLow: number;
  apparentTemperatureLowTime: number;
  dewPoint: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windGust: number;
  windGustTime: number;
  windBearing: number;
  cloudCover: number;
  uvIndex: number;
  uvIndexTime: number;
  visibility: number;
  ozone: number;
  temperatureMin: number;
  temperatureMinTime: number;
  temperatureMax: number;
  temperatureMaxTime: number;
  apparentTemperatureMin: number;
  apparentTemperatureMinTime: number;
  apparentTemperatureMax: number;
  apparentTemperatureMaxTime: number;
}

export interface WeatherWeekProp {
  summary: string;
  icon: string;
  data: Array<DailyData>;
}

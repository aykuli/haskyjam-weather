import {
  REFRESH_COORDINATES,
  CHANGE_CURRENT_TAB,
  CHANGE_CITY,
  CHANGE_COUNTRY,
  CHANGE_TODAY_WEATHER_INFO,
  CHANGE_CURRENT_TEMPERATURE,
  CHANGE_WEATHER_FOR_NEXT_48_HOURS,
  CHANGE_WEEK_WEATHER,
  ADD_CITY_TO_HISTORY,
  DELETE_CITY_FROM_HISTORY,
  CLEAR_HISTORY,
} from './action-types';
import { HistoryItem, Weather48HoursProp, WeatherWeekProp } from '../types';

interface CurrentTabProps {
  type: string;
  currentTab: string;
}

interface CityProps {
  type: string;
  city: string;
}

interface CountryProps {
  type: string;
  country: string;
}

interface WeatherInfoProps {
  type: string;
  weatherInfo: string;
}

interface TemperatureProps {
  type: string;
  temperature: number;
}

interface HistoryProps {
  type: string;
  history: HistoryItem;
}

interface Weather48Props {
  type: string;
  weather48Hours: Weather48HoursProp | null;
}

interface WeekWeatherProps {
  type: string;
  weatherWeek: any | null;
}

interface Type {
  type: string;
}

export const refreshCoordinates = ({ latitude, longitude }: any) => {
  return { type: REFRESH_COORDINATES, coordinates: { latitude, longitude } };
};

export const changeCurrentTab = (currentTab: string): CurrentTabProps => {
  console.log('currentTab: ', currentTab);
  return {
    type: CHANGE_CURRENT_TAB,
    currentTab,
  };
};

export const changeCity = (city: string): CityProps => {
  return {
    type: CHANGE_CITY,
    city,
  };
};

export const changeCountry = (country: string): CountryProps => {
  return {
    type: CHANGE_COUNTRY,
    country,
  };
};

export const changeWeatherInfo = (weatherInfo: string): WeatherInfoProps => {
  return {
    type: CHANGE_TODAY_WEATHER_INFO,
    weatherInfo,
  };
};

export const changeCurrentTemperature = (temperature: number): TemperatureProps => {
  return {
    type: CHANGE_CURRENT_TEMPERATURE,
    temperature,
  };
};

export const changeWeatherForNext48Hours = (weather48Hours: Weather48HoursProp): Weather48Props => {
  return {
    type: CHANGE_WEATHER_FOR_NEXT_48_HOURS,
    weather48Hours,
  };
};

export const changeWeatherWeek = (weatherWeek: WeatherWeekProp): WeekWeatherProps => {
  return {
    type: CHANGE_WEEK_WEATHER,
    weatherWeek,
  };
};

export const addCityToHistory = (history: HistoryItem): HistoryProps => {
  return {
    type: ADD_CITY_TO_HISTORY,
    history,
  };
};

export const removeCityToHistory = (id: string): Type => {
  console.log('id: ', id);
  return {
    type: DELETE_CITY_FROM_HISTORY,
  };
};

export const clearHistory = (): Type => {
  return {
    type: CLEAR_HISTORY,
  };
};

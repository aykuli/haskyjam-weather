import {
  REFRESH_COORDINATES,
  CHANGE_CURRENT_TAB,
  CHANGE_CITY,
  CHANGE_COUNTRY,
  CHANGE_TODAY_WEATHER_INFO,
  CHANGE_CURRENT_TEMPERATURE,
  ADD_CITY_TO_HISTORY,
} from './action-types';

export interface StringType {
  str: string;
}

export interface CurrentTabProps {
  type: string;
  currentTab: string;
}

export interface CityProps {
  type: string;
  city: string;
}

export interface CountryProps {
  type: string;
  country: string;
}

export interface WeatherInfoProps {
  type: string;
  weatherInfo: string;
}

export interface TemperatureProps {
  type: string;
  temperature: number;
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

export const addCityToHistory = (history: any): any => {
  console.log('changeHistory action: ', history);
  return {
    type: ADD_CITY_TO_HISTORY,
    history,
  };
};

import {
  REFRESH_COORDINATES,
  CHANGE_CURRENT_TAB,
  CHANGE_CITY,
  CHANGE_COUNTRY,
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

export const refreshCoordinates = ({ latitude, longitude }: any) => {
  return { type: REFRESH_COORDINATES, coordinates: { latitude, longitude } };
};

export const changeCurrentTab = (currentTab: string): CurrentTabProps => ({
  type: CHANGE_CURRENT_TAB,
  currentTab,
});

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

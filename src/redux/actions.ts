import { REFRESH_COORDINATES, CHANGE_CURRENT_TAB, CHANGE_CITY } from './action-types';

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

export const refreshCoordinates = ({ latitude, longitude }: any) => {
  return { type: REFRESH_COORDINATES, coordinates: { latitude, longitude } };
};

export const changeCurrentTab = ({ str }: StringType): CurrentTabProps => ({
  type: CHANGE_CURRENT_TAB,
  currentTab: str,
});

export const changeCity = (city: string): CityProps => {
  return {
    type: CHANGE_CITY,
    city,
  };
};

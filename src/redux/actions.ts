import { REFRESH_COORDINATES, CHANGE_CURRENT_TAB } from './action-types';

export interface StringType {
  tab: string;
}

export interface CurrentTabProps {
  type: string;
  currentTab: string;
}
export const refreshCoordinates = ({ latitude, longitude }: any) => {
  return { type: REFRESH_COORDINATES, coordinates: { latitude, longitude } };
};

export const changeCurrentTab = ({ tab }: StringType): CurrentTabProps => ({
  type: CHANGE_CURRENT_TAB,
  currentTab: tab,
});

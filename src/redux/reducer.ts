import {
  REFRESH_COORDINATES,
  CHANGE_CURRENT_TAB,
  CHANGE_CITY,
  CHANGE_COUNTRY,
} from './action-types';
import { NAVBAR_BTNS } from '../constantas/common';

const initialState = {
  currentTab: NAVBAR_BTNS[0],
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  city: '',
  country: '',
  temperature: '',
  weather48Hours: null,
  weatherWeek: null,
};

const reducer = (state = initialState, action: any) => {
  console.log('action: ', action);

  switch (action.type) {
    case REFRESH_COORDINATES:
      return {
        ...state,
        coordinates: action.coordinates,
      };
    case CHANGE_CURRENT_TAB:
      return {
        ...state,
        currentTab: action.str,
      };
    case CHANGE_CITY:
      return {
        ...state,
        city: action.city,
      };
    case CHANGE_COUNTRY:
      return {
        ...state,
        country: action.country,
      };
    default:
      return state;
  }
};

export default reducer;

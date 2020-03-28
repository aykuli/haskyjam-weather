import {
  REFRESH_COORDINATES,
  CHANGE_CURRENT_TAB,
  CHANGE_CITY,
  CHANGE_COUNTRY,
  CHANGE_TODAY_WEATHER_INFO,
  CHANGE_CURRENT_TEMPERATURE,
  ADD_CITY_TO_HISTORY,
  CHANGE_WEATHER_FOR_NEXT_48_HOURS,
} from './action-types';
import { NAVBAR_BTNS, CITIES_LIST } from '../constantas/common';
import { StoreType } from '../types';

const ls = localStorage.getItem(CITIES_LIST);
const history = ls === null ? [] : JSON.parse(ls);

const initialState: StoreType = {
  currentTab: NAVBAR_BTNS[0],
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  city: '',
  country: '',
  temperature: null,
  weatherInfo: '',
  weather48Hours: null,
  weatherWeek: {},
  history,
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
        currentTab: action.currentTab,
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
    case CHANGE_TODAY_WEATHER_INFO:
      return {
        ...state,
        weatherInfo: action.weatherInfo,
      };
    case CHANGE_CURRENT_TEMPERATURE:
      return {
        ...state,
        temperature: action.temperature,
      };
    case ADD_CITY_TO_HISTORY:
      return {
        ...state,
        history: [...state.history, action.history],
      };
    case CHANGE_WEATHER_FOR_NEXT_48_HOURS:
      return {
        ...state,
        weather48Hours: action.weather48Hours,
      };
    default:
      return state;
  }
};

export default reducer;

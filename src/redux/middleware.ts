import store from './store';
import { ADD_CITY_TO_HISTORY, CLEAR_HISTORY, DELETE_CITY_FROM_HISTORY } from './action-types';
import { CITIES_LIST } from '../constantas/common';

const middleware = () => {
  return (next: any) => {
    return (action: any) => {
      if (action.type === ADD_CITY_TO_HISTORY) {
        const state = store.getState();
        const newHistory = [...state.history, action.history];

        localStorage.removeItem(CITIES_LIST);
        localStorage.setItem(CITIES_LIST, JSON.stringify(newHistory));
      }
      if (action.type === CLEAR_HISTORY) {
        localStorage.removeItem(CITIES_LIST);
      }
      if (action.type === DELETE_CITY_FROM_HISTORY) {
        const state = store.getState();
        const newHistory = state.history.filter((item) => item.id !== action.id);

        localStorage.removeItem(CITIES_LIST);
        localStorage.setItem(CITIES_LIST, JSON.stringify(newHistory));
      }
      return next(action);
    };
  };
};

export default middleware;

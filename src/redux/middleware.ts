import store from './store';
import { ADD_CITY_TO_HISTORY } from './action-types';
import { CITIES_LIST } from '../constantas/common';

const middleware = () => {
  return (next: any) => {
    return (action: any) => {
      if (action.type === ADD_CITY_TO_HISTORY) {
        console.log('\n\nthere i want to save in localStorage ', action.history);
        console.log('store: ', store.getState());
        const state = store.getState();
        localStorage.removeItem(CITIES_LIST);
        localStorage.setItem(CITIES_LIST, JSON.stringify(state.history));
      }
      return next(action);
    };
  };
};

export default middleware;

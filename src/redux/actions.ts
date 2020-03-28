import REFRESH_DATA from './constantas/action-types';

const refreshData = payload => {
  return { type: REFRESH_DATA, payload };
};

export default refreshData;

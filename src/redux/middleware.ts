const middleware = () => {
  return (next: any) => {
    return (action: any) => {
      // console.log('action: ', action);
      // // console.log('store: ', store);
      // if (action.type === REFRESH_FILTERED_DATA) {
      //   console.log('action type REFRESH_FILTERED_DATA', action.payload);
      // return store.dispatch({ type: REFRESH_FILTERED_DATA });
      // }
      return next(action);
    };
  };
};

export default middleware;

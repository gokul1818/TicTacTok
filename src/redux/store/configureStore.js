import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

export default reducers => {
  return configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools: true,
  });
};

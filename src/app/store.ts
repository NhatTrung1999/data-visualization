import { configureStore } from '@reduxjs/toolkit';
import paramsReducer from '../features/paramsSlice';
import dynamicSqlReducer from '../features/dynamicSqlSlice';

export const store = configureStore({
  reducer: {
    params: paramsReducer,
    dynamicSql: dynamicSqlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

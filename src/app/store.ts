import { configureStore } from '@reduxjs/toolkit';
import paramsReducer from '../features/paramsSlice';
import dynamicSqlReducer from '../features/dynamicSqlSlice';
import chartReducer from '../features/chartSlice';

export const store = configureStore({
  reducer: {
    params: paramsReducer,
    dynamicSql: dynamicSqlReducer,
    chart: chartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

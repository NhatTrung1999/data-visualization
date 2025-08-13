import { createSlice } from '@reduxjs/toolkit';
import type { IParamsState } from '../types';

const initialState: IParamsState = {
  paramsState: {
    host: '',
    database: '',
    username: '',
    password: '',
    querysql: '',
  },
};

export const paramsSlice = createSlice({
  name: 'params',
  initialState,
  reducers: {
    setParams: (state, action) => {
      state.paramsState = { ...action.payload };
    },
  },
});

export const { setParams } = paramsSlice.actions;

export default paramsSlice.reducer;

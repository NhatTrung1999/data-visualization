import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import dynamicSqlApi from '../api/dynamicSqlApi';
import type { IDynamicSqlState, IParams } from '../types';

export const getColumns = createAsyncThunk(
  'dynamicSql/get-columns',
  async (payload: IParams, { rejectWithValue }) => {
    try {
      const response = await dynamicSqlApi.getColumns(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error || '');
    }
  }
);

const initialState: IDynamicSqlState = {
  columnState: { columns: [], columnCount: 0 },
  checkedColumns: [],
  loading: false,
  error: null,
};

const dynamicSqlSlice = createSlice({
  name: 'dynamicSql',
  initialState,
  reducers: {
    setCheckedColumns: (state, action: PayloadAction<string>) => {
      state.checkedColumns = state.checkedColumns.includes(action.payload)
        ? state.checkedColumns.filter((col) => col !== action.payload)
        : [...state.checkedColumns, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColumns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getColumns.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.columnState = action.payload;
      })
      .addCase(getColumns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCheckedColumns } = dynamicSqlSlice.actions;

export default dynamicSqlSlice.reducer;

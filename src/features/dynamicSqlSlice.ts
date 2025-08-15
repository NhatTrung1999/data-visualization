import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import dynamicSqlApi from '../api/dynamicSqlApi';
import type { IDynamicSqlState, IExecuteQuery, IParams } from '../types';

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

export const executeQuery = createAsyncThunk(
  'dynamicSql/execute-query',
  async (payload: IExecuteQuery, { rejectWithValue }) => {
    try {
      const response = await dynamicSqlApi.executeQuery(payload);
      return response;
    } catch (error: any) {
      // console.log(error);
      return rejectWithValue(error.response.data.message || '');
    }
  }
);

const initialState: IDynamicSqlState = {
  columnState: { columns: [], columnCount: 0 },
  table: {
    columns: [],
    data: [],
    limit: 10,
    page: 1,
    totalRecords: 0,
  },
  checkedColumns: [],
  aggregateFunction: '',
  clauseOption: '',
  topNCount: 5,
  page: 1,
  limit: 10,
  totalRecords: 0,
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
    setAggregateFunction: (state, action: PayloadAction<string>) => {
      // console.log(action.payload);
      state.aggregateFunction = action.payload
    },
    setClauseOption: (state, action: PayloadAction<string>) => {
      // console.log(action.payload);
      state.clauseOption = action.payload
    },
    setTopNCount: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.topNCount = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.page = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.limit = action.payload
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

    builder
      .addCase(executeQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(executeQuery.fulfilled, (state, action) => {
        state.table = { ...action.payload };
      })
      .addCase(executeQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCheckedColumns,
  setAggregateFunction,
  setClauseOption,
  setTopNCount,
  setPage,
  setLimit,
} = dynamicSqlSlice.actions;

export default dynamicSqlSlice.reducer;

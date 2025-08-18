import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IChartState {
  optionChart: { value: string; label: string }[];
  selectedChart: string;
  xAxis: { value: string; label: string }[];
  yAxis: { value: string; label: string }[];
}

const initialState: IChartState = {
  optionChart: [
    { value: '', label: 'No visualization' },
    { value: 'Line', label: 'Line' },
    { value: 'Bar', label: 'Bar' },
    { value: 'Pie', label: 'Pie' },
    { value: 'Scatter', label: 'Scatter' },
  ],
  selectedChart: '',
  xAxis: [],
  yAxis: [],
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setSelectedChart: (state, action: PayloadAction<string>) => {
      state.selectedChart = action.payload;
    },
    setXAxis: (state, action: PayloadAction<string[]>) => {
      state.xAxis = action.payload.map((item) => ({
        value: item,
        label: item,
      }));
    },
    setYAxis: (state, action: PayloadAction<string[]>) => {
      state.yAxis = action.payload.map((item) => ({
        value: item,
        label: item,
      }));
    },
  },
});

export const { setSelectedChart, setXAxis, setYAxis } = chartSlice.actions;

export default chartSlice.reducer;

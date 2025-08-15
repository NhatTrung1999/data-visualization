import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IChartState {
  optionChart: { value: string; label: string }[];
}

const initialState: IChartState = {
  optionChart: [
    { value: '', label: 'No visualization' },
    { value: 'Line', label: 'Line' },
    { value: 'Bar', label: 'Bar' },
    { value: 'Pie', label: 'Pie' },
    { value: 'Scatter', label: 'Scatter' },
  ],
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setOptionChart: (state, action: PayloadAction<string>) => {
      state.optionChart = state.optionChart.filter(
        (item) => item.label === action.payload
      );
    },
  },
});

export const { setOptionChart } = chartSlice.actions;

export default chartSlice.reducer;

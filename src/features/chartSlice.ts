import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ChartStroke } from '../types';

interface IChartState {
  optionChart: { value: string; label: string }[];
  selectedChart: string;
  xAxis: { value: string; label: string }[];
  selectedXAxis: string;
  yAxis: { value: string; label: string }[];
  selectedYAxis: string;
  chartStroke: { value: string; label: string }[];
  selectedChartStroke?: ChartStroke;
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
  selectedXAxis: '',
  yAxis: [],
  selectedYAxis: '',
  chartStroke: [
    { value: 'smooth', label: 'smooth' },
    { value: 'straight', label: 'straight' },
    { value: 'stepline', label: 'stepline' },
    { value: 'linestep', label: 'linestep' },
    { value: 'monotoneCubic', label: 'monotoneCubic' },
  ],
  selectedChartStroke: 'straight',
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
    setSelectedXAxis: (state, action: PayloadAction<string>) => {
      state.selectedXAxis = action.payload;
    },
    setSelectedYAxis: (state, action: PayloadAction<string>) => {
      state.selectedYAxis = action.payload;
    },
    setSelectedChartStroke: (state, action: PayloadAction<string>) => {
      state.selectedChartStroke = action.payload as ChartStroke
    }
  },
});

export const {
  setSelectedChart,
  setXAxis,
  setYAxis,
  setSelectedXAxis,
  setSelectedYAxis,
  setSelectedChartStroke
} = chartSlice.actions;

export default chartSlice.reducer;

import type { CurveType } from 'recharts/types/shape/Curve';
import { BarCharts, LineCharts, PieCharts, ScatterCharts } from './Charts';

interface IRenderChart {
  chartType: string;
  chartData: any[];
  xAxis: string;
  yAxis: string;
  propertiesCharts: string[];
  type?: string;
  legendType: string;
  strokeWidth: number;
}

const RenderCharts = ({
  chartType,
  chartData,
  xAxis,
  yAxis,
  propertiesCharts,
  type,
  legendType,
  strokeWidth,
}: IRenderChart) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc107', '#ff7300', '#00C49F'];
  switch (chartType) {
    case 'line':
      return (
        <LineCharts
          propertiesCharts={propertiesCharts}
          chartData={chartData}
          xAxis={xAxis}
          colors={colors}
          type={type}
          legendType={legendType}
          strokeWidth={strokeWidth}
        />
      );
    case 'bar':
      return (
        <BarCharts
          propertiesCharts={propertiesCharts}
          chartData={chartData}
          xAxis={xAxis}
          colors={colors}
        />
      );
    case 'pie':
      return (
        <PieCharts
          propertiesCharts={propertiesCharts}
          xAxis={xAxis}
          chartData={chartData}
          colors={colors}
          yAxis={yAxis}
        />
      );
    case 'scatter':
      return (
        <ScatterCharts
          propertiesCharts={propertiesCharts}
          xAxis={xAxis}
          chartData={chartData}
          yAxis={yAxis}
        />
      );
    default:
      return <div style={{ width: '100%', height: '100%' }} />;
  }
};

export default RenderCharts;

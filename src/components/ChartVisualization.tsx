import type { CurveType } from 'recharts/types/shape/Curve';
import PropertiesLine from './PropertiesChart/PropertiesLine';
import type { LegendType } from 'recharts';
import {
  PropertiesBar,
  PropertiesPie,
  PropertiesScatter,
} from './PropertiesChart';

interface IChartVisualization {
  headTables: string[];
  chartType: string;
  xAxis: string;
  yAxis: string;
  setChartType: (value: string) => void;
  setXAxis: (value: string) => void;
  setYAxis: (value: string) => void;
  type?: CurveType;
  setType?: (value: CurveType) => void;
  legendType?: LegendType;
  setLegendType?: (value: LegendType) => void;
  strokeWidth: number;
  setStrokeWidth: (value: number) => void;
}

const ChartVisualization = ({
  headTables,
  chartType,
  xAxis,
  yAxis,
  setChartType,
  setXAxis,
  setYAxis,
  type,
  setType,
  legendType,
  setLegendType,
  strokeWidth,
  setStrokeWidth,
}: IChartVisualization) => {
  const renderPropertiesChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <PropertiesLine
            xAxis={xAxis}
            yAxis={yAxis}
            setXAxis={setXAxis}
            setYAxis={setYAxis}
            axises={headTables}
            type={type}
            setType={setType}
            legendType={legendType}
            setLegendType={setLegendType}
            strokeWidth={strokeWidth}
            setStrokeWidth={setStrokeWidth}
          />
        );
      case 'bar':
        return (
          <PropertiesBar
            xAxis={xAxis}
            yAxis={yAxis}
            setXAxis={setXAxis}
            setYAxis={setYAxis}
            axises={headTables}
            legendType={legendType}
            setLegendType={setLegendType}
          />
        );
      case 'pie':
        return (
          <PropertiesPie
            xAxis={xAxis}
            setXAxis={setXAxis}
            yAxis={yAxis}
            setYAxis={setYAxis}
            axises={headTables}
            legendType={legendType}
            setLegendType={setLegendType}
          />
        );
      case 'scatter':
        return (
          <PropertiesScatter
            xAxis={xAxis}
            setXAxis={setXAxis}
            yAxis={yAxis}
            setYAxis={setYAxis}
            axises={headTables}
          />
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div className="w-[300px] h-[calc(100%-70px)] bg-slate-100 border-l border-t border-gray-300 absolute right-0 bottom-0 p-2">
      <div className="text-lg font-bold text-blue-300 text-center p-2">
        Chart Visualization
      </div>
      <select
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
        className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none"
      >
        <option value="">No visualization</option>
        <option value="bar">Bar</option>
        <option value="line">Line</option>
        <option value="pie">Pie</option>
        <option value="scatter">Scatter</option>
      </select>
      <div className="text-lg font-bold text-blue-300 text-center mt-2">
        Properties
      </div>
      {renderPropertiesChart()}
    </div>
  );
};

export default ChartVisualization;

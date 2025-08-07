import {
  CartesianGrid,
  Legend,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
  type LegendType,
} from 'recharts';
import type { CurveType } from 'recharts/types/shape/Curve';

interface ILine {
  chartData: any[];
  xAxis: string;
  propertiesCharts: string[];
  colors: string[];
  type?: CurveType;
  legendType?: LegendType;
  strokeWidth: number;
}

const LineCharts = ({
  chartData,
  xAxis,
  propertiesCharts,
  colors,
  type,
  legendType,
  strokeWidth,
}: ILine) => {
  console.log(type);
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis || 'name'} />
        <YAxis />
        <Tooltip />
        <Legend />
        {propertiesCharts.map((column, index) => (
          <Line
            key={index}
            type={type}
            dataKey={column}
            stroke={colors[index % colors.length]}
            activeDot={{ r: 8 }}
            legendType={legendType}
            strokeWidth={strokeWidth}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineCharts;

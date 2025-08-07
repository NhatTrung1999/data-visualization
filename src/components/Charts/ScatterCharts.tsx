import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface IScatter {
  chartData: any[];
  xAxis: string;
  propertiesCharts: string[];
  yAxis: string;
}

const ScatterCharts = ({
  xAxis,
  yAxis,
  propertiesCharts,
  chartData,
}: IScatter) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <ScatterChart
        width={500}
        height={300}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid />
        <XAxis dataKey={xAxis || 'name'} />
        <YAxis dataKey={yAxis || propertiesCharts[0] || 'pv'} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Data" data={chartData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterCharts;

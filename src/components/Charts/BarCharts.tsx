import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface IBar {
  chartData: any[];
  xAxis: string;
  propertiesCharts: string[];
  colors: string[];
}

const BarCharts = ({ chartData, xAxis, propertiesCharts, colors }: IBar) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis || 'name'} />
        <YAxis />
        <Tooltip />
        <Legend />
        {propertiesCharts.map((column, index) => (
          <Bar
            key={index}
            dataKey={column}
            fill={colors[index % colors.length]}
            legendType="diamond"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface IPie {
  chartData: any[];
  xAxis: string;
  propertiesCharts: string[];
  colors: string[];
  yAxis: string;
}

const PieCharts = ({ chartData, xAxis, propertiesCharts, colors, yAxis }: IPie) => {
  return (
    <ResponsiveContainer width='100%' height={500}>
      <PieChart width={500} height={300}>
        <Pie
          data={chartData}
          dataKey={yAxis || propertiesCharts[0] || 'pv'}
          nameKey={xAxis || 'name'}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieCharts;

import PropertiesBarChart from './PropertiesBarChart';
import PropertiesLineChart from './PropertiesLineChart';
import PropertiesPieChart from './PropertiesPieChart';
import PropertiesScatterChart from './PropertiesScatterChart';

const PropertiesChartView = ({
  selectedChart,
  selectedXAxis,
  selectedYAxis,
  xAxis,
  yAxis,
  setSelectedXAxis,
  setSelectedYAxis
}: {
  selectedChart?: string;
  selectedXAxis: string;
  selectedYAxis: string;
  xAxis: { value: string; label: string }[];
  yAxis: { value: string; label: string }[];
  setSelectedXAxis?: (value: string) => void
  setSelectedYAxis?: (value: string) => void
}) => {
  switch (selectedChart) {
    case 'Bar':
      return (
        <PropertiesBarChart
          xAxis={xAxis}
          yAxis={yAxis}
          selectedXAxis={selectedXAxis}
          selectedYAxis={selectedYAxis}
          setSelectedXAxis={setSelectedXAxis}
          setSelectedYAxis={setSelectedYAxis}
        />
      );
    case 'Line':
      return (
        <PropertiesLineChart
          xAxis={xAxis}
          yAxis={yAxis}
          selectedXAxis={selectedXAxis}
          selectedYAxis={selectedYAxis}
          setSelectedXAxis={setSelectedXAxis}
          setSelectedYAxis={setSelectedYAxis}
        />
      );
    case 'Pie':
      return (
        <PropertiesPieChart
          xAxis={xAxis}
          yAxis={yAxis}
          selectedXAxis={selectedXAxis}
          selectedYAxis={selectedYAxis}
          setSelectedXAxis={setSelectedXAxis}
          setSelectedYAxis={setSelectedYAxis}
        />
      );
    case 'Scatter':
      return (
        <PropertiesScatterChart
          xAxis={xAxis}
          yAxis={yAxis}
          selectedXAxis={selectedXAxis}
          selectedYAxis={selectedYAxis}
          setSelectedXAxis={setSelectedXAxis}
          setSelectedYAxis={setSelectedYAxis}
        />
      );
    default:
      break;
  }
};

export default PropertiesChartView;

import Label from '../ui/label';
import Select from '../ui/select';
const PropertiesPieChart = ({
  selectedXAxis,
  selectedYAxis,
  xAxis,
  yAxis,
  setSelectedXAxis,
  setSelectedYAxis,
}: {
  selectedXAxis: string;
  selectedYAxis: string;
  xAxis: { value: string; label: string }[];
  yAxis: { value: string; label: string }[];
  setSelectedXAxis?: (value: string) => void;
  setSelectedYAxis?: (value: string) => void;
}) => {
  return (
    <>
      <div>
        <Label>Labels</Label>
        <Select
          options={xAxis}
          defaultValue={selectedXAxis}
          onChange={(xAxisValue) => setSelectedXAxis?.(xAxisValue)}
        />
      </div>
      <div>
        <Label>Value</Label>
        <Select
          options={yAxis}
          defaultValue={selectedYAxis}
          onChange={(yAxisValue) => setSelectedYAxis?.(yAxisValue)}
        />
      </div>
    </>
  );
};

export default PropertiesPieChart;

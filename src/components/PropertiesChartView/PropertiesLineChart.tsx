import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedChartStroke } from '../../features/chartSlice';
import Label from '../ui/label';
import Select from '../ui/select';
const PropertiesLineChart = ({
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
  const { chartStroke, selectedChartStroke } = useAppSelector((state) => state.chart);

  // console.log(chartStroke);
  const dispatch = useAppDispatch()

  return (
    <>
      <div>
        <Label>X Axis</Label>
        <Select
          options={xAxis}
          defaultValue={selectedXAxis}
          onChange={(value) => setSelectedXAxis?.(value)}
        />
      </div>
      <div>
        <Label>Y Axis</Label>
        <Select
          options={yAxis}
          defaultValue={selectedYAxis}
          onChange={(value) => setSelectedYAxis?.(value)}
        />
      </div>
      <div>
        <Label>Stroke</Label>
        <Select
          options={chartStroke}
          defaultValue={selectedChartStroke as string}
          onChange={(value) => dispatch(setSelectedChartStroke(value))}
        />
      </div>
    </>
  );
};

export default PropertiesLineChart;

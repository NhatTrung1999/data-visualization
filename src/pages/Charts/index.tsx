import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ChartsView from '../../components/Chart/ChartsView';
import Card from '../../components/common/Card';
import Label from '../../components/ui/label';
import Select from '../../components/ui/select';
import {
  setSelectedChart,
  setXAxis,
  setYAxis,
} from '../../features/chartSlice';

const Charts = () => {
  const { optionChart, selectedChart, xAxis, yAxis } = useAppSelector(
    (state) => state.chart
  );
  const { columnState } = useAppSelector((state) => state.dynamicSql);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setXAxis(columnState.columns));
    dispatch(setYAxis(columnState.columns));
  }, []);

  const handleSelectChange = (value: string) => {
    console.log('Selected value:', value);
  };

  const handleSelectedChart = (value: string) => {
    dispatch(setSelectedChart(value));
  };
  // console.log(columnState);

  return (
    <div className="space-y-6 flex gap-6 xl:flex-row md:flex-col xsm:flex-col">
      <ChartsView className="flex-1" selectedChart={selectedChart} />
      <Card
        title="Chart Visualization"
        className="xl:w-[300px] h-full md:w-full xsm:w-full"
      >
        <Select
          options={optionChart}
          onChange={handleSelectedChart}
          defaultValue={selectedChart}
        />
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90 text-center">
          Properties
        </h3>
        <div>
          <Label>X Axis</Label>
          <Select options={xAxis} onChange={handleSelectChange} />
        </div>
        <div>
          <Label>Y Axis</Label>
          <Select options={yAxis} onChange={handleSelectChange} />
        </div>
      </Card>
    </div>
  );
};

export default Charts;

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ChartsView from '../../components/Chart/ChartsView';
import Card from '../../components/common/Card';
import Label from '../../components/ui/label';
import Select from '../../components/ui/select';
import { setOptionChart } from '../../features/chartSlice';

const Charts = () => {
  const { optionChart } = useAppSelector((state) => state.chart);
  const dispatch = useAppDispatch()
  const handleSelectChange = (value: string) => {
    console.log('Selected value:', value);
  };

  const handleOptionChart = (value: string) => {
    dispatch(setOptionChart(value))
  }

  return (
    <div className="space-y-6 flex gap-6 xl:flex-row md:flex-col xsm:flex-col">
      <ChartsView className="flex-1" />
      <Card
        title="Chart Visualization"
        className="xl:w-[300px] h-full md:w-full xsm:w-full"
      >
        <Select options={optionChart} onChange={handleOptionChart} />
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90 text-center">
          Properties
        </h3>
        <div>
          <Label>X Axis</Label>
          <Select options={[]} onChange={handleSelectChange} />
        </div>
        <div>
          <Label>Y Axis</Label>
          <Select options={[]} onChange={handleSelectChange} />
        </div>
      </Card>
    </div>
  );
};

export default Charts;

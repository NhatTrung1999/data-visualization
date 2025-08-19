// import { useEffect } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ChartsView from '../../components/Chart/ChartsView';
import Card from '../../components/common/Card';
import Select from '../../components/ui/select';
import {
  setSelectedChart,
  setSelectedXAxis,
  setSelectedYAxis,
  setXAxis,
  setYAxis,
} from '../../features/chartSlice';
import PropertiesChartView from '../../components/PropertiesChartView';

const Charts = () => {
  const {
    optionChart,
    selectedChart,
    xAxis,
    yAxis,
    selectedXAxis,
    selectedYAxis,
  } = useAppSelector((state) => state.chart);
  const { table } = useAppSelector((state) => state.dynamicSql);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setXAxis(table.columns));
    dispatch(setYAxis(table.columns));
  }, []);

  const handleSelectedChart = (value: string) => {
    dispatch(setSelectedChart(value));
  };

  const handleSelectedXAxis = (value: string) => {
    dispatch(setSelectedXAxis(value))
  }

  const handleSelectedYAxis = (value: string) => {
    dispatch(setSelectedYAxis(value))
  }

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
        <PropertiesChartView
          selectedChart={selectedChart}
          selectedXAxis={selectedXAxis}
          selectedYAxis={selectedYAxis}
          xAxis={xAxis}
          yAxis={yAxis}
          setSelectedXAxis={handleSelectedXAxis}
          setSelectedYAxis={handleSelectedYAxis}
        />
        {/* <div>
          <Label>X Axis</Label>
          <Select
            options={xAxis}
            defaultValue={selectedXAxis}
            onChange={(xAxisValue) => dispatch(setSelectedXAxis(xAxisValue))}
          />
        </div>
        <div>
          <Label>Y Axis</Label>
          <Select
            options={yAxis}
            defaultValue={selectedYXis}
            onChange={(yAxisValue) => dispatch(setSelectedXAxis(yAxisValue))}
          />
        </div> */}
      </Card>
    </div>
  );
};

export default Charts;

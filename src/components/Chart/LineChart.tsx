import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import Card from '../common/Card';
import { useAppSelector } from '../../app/hooks';

const LineChart = ({ className }: { className?: string }) => {
  const { selectedChartStroke, selectedXAxis, selectedYAxis } = useAppSelector(
    (state) => state.chart
  );
  const {
    table: { data },
  } = useAppSelector((state) => state.dynamicSql);

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: selectedChartStroke,
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: data.map((item) => {
        if (item[selectedXAxis] !== null) {
          return item[selectedXAxis];
        }
      }),
    },
    
  };

  const series = [
    {
      name: selectedXAxis,
      data: data.map((item) => {
        if (item[selectedYAxis] !== null) {
          return item[selectedYAxis];
        }
      }),
    },
  ];

  return (
    <Card title="Chart View" className={className}>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div id="chartEight" className="min-w-[1000px]">
          <Chart
            key={selectedXAxis}
            options={options}
            series={series}
            type="line"
            height={500}
          />
        </div>
      </div>
    </Card>
  );
};

export default LineChart;

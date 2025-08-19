import Card from '../common/Card';
import type { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { useAppSelector } from '../../app/hooks';

const PieChart = ({ className }: { className?: string }) => {
  const { selectedXAxis, selectedYAxis } = useAppSelector(
    (state) => state.chart
  );
  const {
    table: { data },
  } = useAppSelector((state) => state.dynamicSql);

  const options: ApexOptions = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: data.map((item) => {
      if (item[selectedXAxis] !== null) {
        return item[selectedXAxis];
      }
    }),
    // dataLabels: {
    //   enabled: true,
    //   style: {
    //     colors: ['#fff']
    //   }
    // },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };
  const series = data.map((item) => {
    if (item[selectedYAxis] !== null) {
      return item[selectedYAxis];
    }
  });
  return (
    <Card title="Chart View" className={className}>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div id="chartOne" className="min-w-[1000px]">
          <ReactApexChart
            options={options}
            series={series}
            type="pie"
            height={550}
          />
        </div>
      </div>
    </Card>
  );
};

export default PieChart;

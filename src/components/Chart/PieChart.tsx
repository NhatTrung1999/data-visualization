import Card from '../common/Card';
import type { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ className }: { className?: string }) => {
  const options: ApexOptions = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
  const series = [44, 55, 13, 43, 22];
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

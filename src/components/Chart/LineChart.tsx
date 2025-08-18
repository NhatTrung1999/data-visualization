import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import Card from '../common/Card';

const LineChart = ({ className }: { className?: string }) => {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    // title: {
    //   text: 'Product Trends by Month',
    //   align: 'left',
    // },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
  };

  const series = [
    {
      name: 'Desktops',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];

  return (
    <Card title="Chart View" className={className}>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div id="chartEight" className="min-w-[1000px]">
          <Chart options={options} series={series} type="line" height={500} />
        </div>
      </div>
    </Card>
  );
};

export default LineChart;

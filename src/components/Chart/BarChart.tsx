import type { ApexOptions } from 'apexcharts';
import Card from '../common/Card';
import Chart from 'react-apexcharts';
import { useAppSelector } from '../../app/hooks';

const BarChart = ({ className }: { className?: string }) => {
  const { selectedXAxis, selectedYAxis } = useAppSelector(
    (state) => state.chart
  );
  const {
    table: { data },
  } = useAppSelector((state) => state.dynamicSql);

  const options: ApexOptions = {
    colors: ['#465fff'],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'bar',
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '39%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    xaxis: {
      categories: data.map((item) => {
        if (item[selectedXAxis] !== null) {
          return item[selectedXAxis];
        }
      }),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Outfit',
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
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
        <div id="chartOne" className="min-w-[1000px]">
          <Chart options={options} series={series} type="bar" height={550} />
        </div>
      </div>
    </Card>
  );
};

export default BarChart;

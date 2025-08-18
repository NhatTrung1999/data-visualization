import Card from '../common/Card';
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

const NoChart = ({ className }: { className?: string }) => {
  const options: ApexOptions = {};
  return (
    <Card title="Chart View" className={className}>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div id="chartOne" className="min-w-[1000px]">
          <ReactApexChart
            options={options}
            series={[]}
            // type="bar"
            height={550}
          />
        </div>
      </div>
    </Card>
  );
};

export default NoChart;

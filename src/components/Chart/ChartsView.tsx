import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';
import ScatterChart from './ScatterChart';
import NoChart from './NoChart';

const ChartsView = ({
  className,
  selectedChart,
}: {
  className?: string;
  selectedChart: string;
}) => {
  switch (selectedChart) {
    case 'Line':
      return <LineChart className={className} />;
    case 'Bar':
      return <BarChart className={className} />;
    case 'Pie':
      return <PieChart className={className} />;
    case 'Scatter':
      return <ScatterChart className={className} />;
    default:
      return <NoChart className={className} />;
  }
};

export default ChartsView;

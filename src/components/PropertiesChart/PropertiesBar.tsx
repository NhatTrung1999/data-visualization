import type { LegendType } from 'recharts';
import { legendTypes } from '../../utils/charts';

interface IPropertiesBar {
  xAxis: string;
  setXAxis: (value: string) => void;
  axises: string[];
  yAxis: string;
  setYAxis: (value: string) => void;
  legendType?: LegendType;
  setLegendType?: (value: LegendType) => void;
}

const PropertiesBar = ({
  xAxis,
  setXAxis,
  axises,
  yAxis,
  setYAxis,
  legendType,
  setLegendType,
}: IPropertiesBar) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="text-lg font-bold text-blue-300">X Axis</div>
        <select
          value={xAxis}
          onChange={(e) => setXAxis(e.target.value)}
          className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none"
        >
          <option value="">Select X Axis</option>
          {axises.map((axis, index) => (
            <option key={index} value={axis}>
              {axis}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="text-lg font-bold text-blue-300">Y Axis</div>
        <select
          value={yAxis}
          onChange={(e) => setYAxis(e.target.value)}
          className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none"
        >
          <option value="">Select Y Axis</option>
          {axises.map((axis, index) => (
            <option key={index} value={axis}>
              {axis}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="text-lg font-bold text-blue-300">Legend Type</div>
        <select
          value={legendType as string}
          onChange={(e) => setLegendType?.(e.target.value as LegendType)}
          className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none"
        >
          {legendTypes.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PropertiesBar;

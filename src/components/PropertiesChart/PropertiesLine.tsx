import type { CurveType } from "recharts/types/shape/Curve";
import { legendTypes, lineTypes, strokeWidthLines } from "../../utils/charts";
import type { LegendType } from "recharts";

interface IPropertiesLine {
  xAxis: string;
  setXAxis: (value: string) => void;
  axises: string[];
  yAxis: string;
  setYAxis: (value: string) => void;
  type?: CurveType
  setType?: (value: CurveType) => void
  legendType?: LegendType
  setLegendType?: (value: LegendType) => void
  strokeWidth: number
  setStrokeWidth: (value: number) => void
}

const PropertiesLine = ({
  xAxis,
  setXAxis,
  axises,
  yAxis,
  setYAxis,
  type,
  setType,
  legendType,
  setLegendType,
  strokeWidth,
  setStrokeWidth
}: IPropertiesLine) => {
  console.log(type);
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
        <div className="text-lg font-bold text-blue-300">Type</div>
        <select value={type as string} onChange={(e) => setType?.(e.target.value as CurveType)} className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none">
          {lineTypes.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="text-lg font-bold text-blue-300">Legend Type</div>
        <select value={legendType as string} onChange={(e) => setLegendType?.(e.target.value as LegendType)} className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none">
          {legendTypes.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="text-lg font-bold text-blue-300">Stroke Width</div>
        <select value={strokeWidth} onChange={(e) => setStrokeWidth(Number(e.target.value))} className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none">
          <option value="1">1</option>
          {strokeWidthLines.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PropertiesLine;

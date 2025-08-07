interface IPropertiesScatter {
  xAxis: string;
  setXAxis: (value: string) => void;
  axises: string[];
  yAxis: string;
  setYAxis: (value: string) => void;
}

const PropertiesScatter = ({
  xAxis,
  setXAxis,
  axises,
  yAxis,
  setYAxis,
}: IPropertiesScatter) => {
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
    </div>
  );
};

export default PropertiesScatter;

interface IChartVisualization {
  headTables: string[];
  chartType: string;
  xAxis: string;
  yAxis: string;
  setChartType: (value: string) => void;
  setXAxis: (value: string) => void;
  setYAxis: (value: string) => void;
}

const ChartVisualization = ({
  headTables,
  chartType,
  xAxis,
  yAxis,
  setChartType,
  setXAxis,
  setYAxis,
}: IChartVisualization) => {
  return (
    <div className="w-[300px] h-[calc(100%-70px)] bg-slate-100 border-l border-t border-gray-300 absolute right-0 bottom-0 p-2">
      <div className="text-lg font-bold text-blue-300 text-center p-2">
        Chart Visualization
      </div>
      <select
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
        className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none"
      >
        <option value="">No visualization</option>
        <option value="bar">Bar</option>
        <option value="line">Line</option>
        <option value="pie">Pie</option>
        <option value="scatter">Scatter</option>
      </select>
      <div className="text-lg font-bold text-blue-300 text-center mt-2">
        Properties
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <div className="text-lg font-bold text-blue-300">X Axis</div>
          <select
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none"
          >
            <option value="">Select X Axis</option>
            {headTables.map((column, index) => (
              <option key={index} value={column}>
                {column}
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
            {headTables.map((column, index) => (
              <option key={index} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ChartVisualization;

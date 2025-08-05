interface ISidebar {
  columns: string[];
  checkedColumns: string[];
  aggregateFunction: string;
  clause: string;
  topNCount: number;
  isLoading: boolean;
  handleCheckboxChange: (column: string) => void;
  setAggregateFunction: (value: string) => void;
  setClause: (value: string) => void;
  setTopNCount: (value: number) => void;
  handleCreateTable: () => void
}

const Sidebar = ({
  columns,
  checkedColumns,
  aggregateFunction,
  clause,
  topNCount,
  isLoading,
  handleCheckboxChange,
  setAggregateFunction,
  setClause,
  setTopNCount,
  handleCreateTable
}: ISidebar) => {
  return (
    <div className="2xl:w-xs xl:w-ws lg:w-3xs overflow-auto">
      <div className="bg-blue-500 h-[70px] text-2xl font-bold flex justify-center items-center text-white">
        LYV
      </div>
      <div className="p-2 flex flex-col gap-2">
        <div>
          <div className="text-lg font-bold text-blue-300">Columns</div>
          <div className="h-96 border rounded-md border-gray-300 p-2 overflow-y-auto flex flex-col gap-2">
            {columns.map((column, i) => (
              <label
                key={i}
                htmlFor={`column-${i}`}
                className="flex bg-slate-300 p-2 rounded-md items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={`column-${i}`}
                  className="size-4 accent-blue-500"
                  checked={checkedColumns.includes(column)}
                  onChange={() => handleCheckboxChange(column)}
                />
                <div
                  className="text-base font-semibold text-blue-400 truncate whitespace-nowrap"
                  title={column}
                >
                  {column}
                </div>
              </label>
            ))}
          </div>
        </div>
        <div>
          <div className="text-lg font-bold text-blue-300">
            Aggregate Functions
          </div>
          <select
            value={aggregateFunction}
            onChange={(e) => setAggregateFunction(e.target.value)}
            className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none"
          >
            <option value="">Choose option</option>
            <option value="SUM">Sum</option>
            <option value="AVG">Average</option>
            <option value="MAX">Max</option>
            <option value="MIN">Min</option>
            <option value="TOP_N">Top N</option>
          </select>
        </div>
        <div>
          <div className="text-lg font-bold text-blue-300">Clause</div>
          <select
            value={clause}
            onChange={(e) => setClause(e.target.value)}
            className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none"
          >
            <option value="">Choose option</option>
            <option value="GROUP BY">Group By</option>
          </select>
        </div>
        {aggregateFunction === 'TOP_N' && (
          <div>
            <div className="text-lg font-bold text-blue-300">TOP N Count</div>
            <input
              type="number"
              min="1"
              max="1000"
              value={topNCount}
              onChange={(e) => setTopNCount(Number(e.target.value))}
              className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none"
              placeholder="Enter TOP N count (1-1000)"
            />
          </div>
        )}
        <button
          className="bg-blue-400 w-full text-white font-bold py-2 text-base rounded-md cursor-pointer"
          onClick={() => handleCreateTable()}
          disabled={isLoading}
        >
          Create Table
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

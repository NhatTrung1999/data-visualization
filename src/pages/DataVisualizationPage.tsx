import { useEffect, useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { FaChartColumn } from 'react-icons/fa6';
import axios from 'axios';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ISearchParams {
  host?: string;
  database?: string;
  username?: string;
  password?: string;
  querysql?: string;
}

const DataVisualizationPage = () => {
  const [searchParams] = useSearchParams();

  let params: ISearchParams = {
    host: searchParams.get('host') || undefined,
    database: searchParams.get('database') || undefined,
    username: searchParams.get('username') || undefined,
    password: searchParams.get('password') || undefined,
    querysql: searchParams.get('querysql') || undefined,
  };

  const [openSidebar, setOpenSidebar] = useState(true);
  const [openChart, setOpenChart] = useState<boolean>(false);
  const [columns, setColumns] = useState<string[]>([]);
  const [checkedColumns, setCheckedColumns] = useState<string[]>([]);
  const [aggregateFunction, setAggregateFunction] = useState<string>('');
  const [topNCount, setTopNCount] = useState<number>(5);
  const [clause, setClause] = useState<string>('');
  const [headTables, setHeadTables] = useState<string[]>([]);
  const [bodyTables, setBodyTables] = useState<any[]>([]);
  const [chartType, setChartType] = useState<string>('line');
  const [xAxis, setXAxis] = useState<string>('');
  const [yAxis, setYAxis] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3001/data-visualization/get-columns',
          params
        );
        setColumns(response.data.columns);
      } catch (error: any) {
        console.error(error);
        toast.error(`${error.response?.data?.message || error.message}`);
      }
    };

    fetchData();
  }, []);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleCharts = () => {
    setOpenChart(!openChart);
  };

  const handleCheckboxChange = (column: string) => {
    setCheckedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleCreateTable = async () => {
    if (checkedColumns.length === 0 || !aggregateFunction) {
      toast.warn('Please select columns and an aggregate function');
      return;
    }

    if (
      aggregateFunction === 'TOP_N' &&
      (!topNCount || topNCount < 1 || topNCount > 1000)
    ) {
      toast.warn('Please enter a valid TOP N count (1-1000)');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/data-visualization/execute-query',
        {
          ...params,
          checkedColumns,
          aggregateFunction,
          topNCount: aggregateFunction === 'TOP_N' ? topNCount : undefined,
          clause,
          page,
          limit,
        }
      );
      setHeadTables(response.data.columns);
      setBodyTables(response.data.data);
      setTotalRecords(response.data.totalRecords);
      // Set default X and Y axis

      setXAxis(response.data.columns[0] || '');
      setYAxis(response.data.columns[1] || '');
    } catch (error: any) {
      console.error('Error creating table:', error);
      toast.error(`${error.response?.data?.message || error.message}`);
    }
    // console.log(clause);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
    handleCreateTable();
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalRecords / limit)) {
      setPage(newPage);
      handleCreateTable();
    }
  };

  const renderChart = () => {
    const chartData = bodyTables.length > 0 ? bodyTables : [];
    const colors = ['#8884d8', '#82ca9d', '#ffc107', '#ff7300', '#00C49F'];

    switch (chartType) {
      case 'line':
        return (
          <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis || 'name'} />
            <YAxis />
            <Tooltip />
            <Legend />
            {headTables.map((column, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={column}
                stroke={colors[index % colors.length]}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis || 'name'} />
            <YAxis />
            <Tooltip />
            <Legend />
            {headTables.map((column, index) => (
              <Bar
                key={index}
                dataKey={column}
                fill={colors[index % colors.length]}
              />
            ))}
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart width={500} height={300}>
            <Pie
              data={chartData}
              dataKey={yAxis || headTables[0] || 'pv'}
              nameKey={xAxis || 'name'}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      case 'scatter':
        return (
          <ScatterChart
            width={500}
            height={300}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid />
            <XAxis dataKey={xAxis || 'name'} />
            <YAxis dataKey={yAxis || headTables[0] || 'pv'} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Data" data={chartData} fill="#8884d8" />
          </ScatterChart>
        );
      default:
        return <div style={{ width: '100%', height: '100%' }} />;
    }
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(totalRecords / limit);
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 3) {
        pages.push('...');
      }
      const startPage = Math.max(2, page - 1);
      const endPage = Math.min(totalPages - 1, page + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages.map((p, index) =>
      p === '...' ? (
        <li
          key={`ellipsis-${index}`}
          className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300"
        >
          ...
        </li>
      ) : (
        <li key={p}>
          <button
            onClick={() => handlePageChange(p as number)}
            className={`flex items-center justify-center text-sm py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
              p === page ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'
            }`}
          >
            {p}
          </button>
        </li>
      )
    );
  };

  return (
    <div className="flex h-screen">
      {/* sidebar */}
      {openSidebar ? (
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
                    <div className="text-base font-semibold text-blue-400">
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
                {/* <option value="ORDER BY">Order By</option> */}
              </select>
            </div>
            {aggregateFunction === 'TOP_N' && (
              <div>
                <div className="text-lg font-bold text-blue-300">
                  TOP N Count
                </div>
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
              onClick={handleCreateTable}
            >
              Create Table
            </button>
          </div>
        </div>
      ) : null}

      {/* content */}
      <div className="flex-1 flex flex-col relative">
        <div className="bg-[#efefef] h-[70px] text-3xl text-gray-500 font-bold flex justify-center items-center relative">
          <div
            className="absolute left-5 text-gray-500 cursor-pointer"
            onClick={handleOpenSidebar}
          >
            <IoMenu className="size-8" />
          </div>
          Data Visualization
          <div
            className="absolute right-5 text-gray-500 cursor-pointer"
            onClick={handleCharts}
          >
            <FaChartColumn />
          </div>
        </div>

        <div className="bg-gray-300 flex-1 p-2 overflow-y-auto max-w-full">
          <div className="max-w-full h-[700px] bg-white rounded-md p-2 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-blue-300">Table</div>
              <form className="max-w-[60px] font-semibold">
                <select
                  value={limit}
                  onChange={handleLimitChange}
                  className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-md block w-full p-1 outline-none"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </form>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex-1 w-full 2xl:max-w-[1600px] xl:max-w-[1099px] lg:max-w-[747px] whitespace-nowrap mx-auto">
              <table className="text-sm text-left rtl:text-right text-gray-500 table-auto min-w-full">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                  <tr>
                    {headTables.map((headTable, i) => (
                      <th scope="col" className="px-6 py-3" key={i}>
                        {headTable}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bodyTables.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="bg-white border-b border-gray-200 hover:bg-gray-50"
                    >
                      {headTables.map((item, index) => (
                        <td key={index} className="px-6 py-4">
                          {row[item] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-1"
              aria-label="Table navigation"
            >
              <span className="text-sm text-gray-500 font-semibold">
                Showing{' '}
                <span className="font-semibold text-gray-900">
                  {(page - 1) * limit + 1}-
                  {Math.min(page * limit, totalRecords)}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-gray-900">
                  {totalRecords}
                </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px font-semibold">
                <li>
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
                {renderPageNumbers()}
                <li>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === Math.ceil(totalRecords / limit)}
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <div className="w-full min-h-[500px] bg-white rounded-md p-2 mt-2 flex flex-col gap-2">
            <div className="text-lg font-bold text-blue-300">Chart</div>
            <ResponsiveContainer width="100%" height={500}>
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </div>

        {openChart && (
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
        )}
      </div>
    </div>
  );
};

export default DataVisualizationPage;

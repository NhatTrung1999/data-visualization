import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { FaChartColumn } from 'react-icons/fa6';
import axios from 'axios';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useSearchParams } from 'react-router-dom';
import { format } from 'sql-formatter';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

interface ISearchParams {
  host?: string;
  database?: string;
  username?: string;
  password?: string;
  querysql?: string;
}

const DataVisualizationPage = () => {
  const [searchParams] = useSearchParams();

  const params: ISearchParams = {
    host: searchParams.get('host') || undefined,
    database: searchParams.get('database') || undefined,
    username: searchParams.get('username') || undefined,
    password: searchParams.get('password') || undefined,
    querysql: searchParams.get('querysql') || undefined,
  };
  console.log(format(params.querysql || '', { language: 'sql' }));

  const [openSidebar, setOpenSidebar] = useState(true);
  const [openChart, setOpenChart] = useState<boolean>(false);
  const [textarea, setTextarea] = useState<string | undefined>(params.querysql);
  const [columns, setColumns] = useState<string[]>([]);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(e.target.value);
  };

  const handleQuery = async () => {
    const response = await axios.post(
      'http://localhost:3001/sql/execute-query',
      { query: textarea }
    );
    setColumns(response.data.columns);
  };

  const handleCharts = () => {
    setOpenChart(!openChart);
  };
  return (
    <div className=" flex h-screen">
      {/* sidebar */}
      {openSidebar ? (
        <div className="w-xs overflow-y-auto">
          <div className="bg-blue-500 h-[70px] text-2xl font-bold flex justify-center items-center text-white">
            LYV
          </div>
          <div className="p-2 flex flex-col gap-2">
            <div>
              <div className="text-lg font-bold text-blue-300">SQL Editor</div>
              <textarea
                className="border w-full rounded-md outline-none border-gray-300 p-2 text-gray-400 font-semibold text-lg"
                rows={5}
                value={textarea}
                onChange={handleChangeTextarea}
              ></textarea>
            </div>
            <button
              className="bg-blue-400 w-full text-white font-bold py-2 text-base rounded-md cursor-pointer"
              onClick={handleQuery}
            >
              Query
            </button>
            <div>
              <div className="text-lg font-bold text-blue-300">Columns</div>
              <div className="h-40 border rounded-md border-gray-300 p-2 overflow-y-auto flex flex-col gap-2">
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
              <select className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none">
                <option value="">Choose option</option>
                <option value="">Sum</option>
                <option value="">Average</option>
                <option value="">Max</option>
                <option value="">Min</option>
                <option value="">Top N</option>
              </select>
            </div>
            {/* <div>
              <div className="text-lg font-bold text-blue-300">Type Map</div>
              <select className="w-full border border-blue-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none">
                <option value="">Choose option</option>
                <option value="">Column</option>
                <option value="">Line</option>
                <option value="">Pie</option>
                <option value="">Scatter plot</option>
              </select>
            </div> */}
            <button className="bg-blue-400 w-full text-white font-bold py-2 text-base rounded-md cursor-pointer">
              Create Report
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
        <div className="bg-gray-300 flex-1 p-2 overflow-y-auto">
          <div className="w-full h-[500px] bg-white rounded-md p-2 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-blue-300">Table</div>

              <form className="max-w-[60px] font-semibold">
                <select className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-md  block w-full p-1 ">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </form>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex-1">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Accessories
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Available
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Weight
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4">3.0 lb.</td>
                    <td className="flex items-center px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4">3.0 lb.</td>
                    <td className="flex items-center px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4">3.0 lb.</td>
                    <td className="flex items-center px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4">3.0 lb.</td>
                    <td className="flex items-center px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4">3.0 lb.</td>
                    <td className="flex items-center px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4">3.0 lb.</td>
                    <td className="flex items-center px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4">3.0 lb.</td>
                    <td className="flex items-center px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4">3.0 lb.</td>
                    <td className="flex items-center px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">Yes</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4">3.0 lb.</td>
                    <td className="flex items-center px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-1"
              aria-label="Table navigation"
            >
              <span className="text-sm text-gray-500 font-semibold">
                Showing{' '}
                <span className="font-semibold text-gray-900 ">1-10</span> of{' '}
                <span className="font-semibold text-gray-900 ">1000</span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px font-semibold">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
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
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
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
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="w-full h-[500px] bg-white rounded-md p-2 mt-2 flex flex-col gap-2">
            <div className="text-lg font-bold text-blue-300">Chart</div>
            <ResponsiveContainer width={'100%'} height={'100%'}>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {openChart && (
          <div className="w-[300px] h-[calc(100%-70px)] bg-slate-100 border-l border-t border-gray-300 absolute right-0 bottom-0 p-2">
            <div className="text-lg font-bold text-blue-300 text-center p-2">
              Chart Visualization
            </div>
            <select className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none">
              <option value="">No visualization</option>
              <option value="">Bar</option>
              <option value="">Line</option>
              <option value="">Pie</option>
              <option value="">Scatter plot</option>
            </select>

            <div className="text-lg font-bold text-blue-300 text-center mt-2">
              Properties
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <div className="text-lg font-bold text-blue-300">X Axis</div>
                <select className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none">
                  <option value="">No visualization</option>
                  <option value="">Bar</option>
                  <option value="">Line</option>
                  <option value="">Pie</option>
                  <option value="">Scatter plot</option>
                </select>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-300">Y Axis</div>
                <select className="w-full border border-gray-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none">
                  <option value="">No visualization</option>
                  <option value="">Bar</option>
                  <option value="">Line</option>
                  <option value="">Pie</option>
                  <option value="">Scatter plot</option>
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

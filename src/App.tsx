import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import axios from 'axios';
import {
  Line,
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from 'victory';

const series = [
  {
    name: 'Canada',
    data: [
      3.9670002, 5.2650003, 6.201, 7.8010006, 9.694, 11.214001, 11.973001,
      12.250001, 12.816001, 13.413001, 13.626961, 14.30356, 15.295461,
    ],
  },
];

const symbols = ['circle', 'diamond', 'plus', 'square', 'triangleUp'];

const App: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [textarea, setTextarea] = useState<string>('');
  const [columns, setColumns] = useState<string[]>([]);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(e.target.value);
    // console.log(e.target.value);
  };

  // const header = [
  //   {
  //     title: 'ID',
  //     key: 'id',
  //   },
  //   {
  //     title: 'Country',
  //     key: 'country',
  //   },
  //   {
  //     title: 'Sold by',
  //     key: 'soldBy',
  //   },
  //   {
  //     title: 'Client',
  //     key: 'client',
  //   },
  //   {
  //     title: 'Description',
  //     key: 'description',
  //   },
  //   {
  //     title: 'Value',
  //     key: 'value',
  //   },
  //   {
  //     title: 'Item Count',
  //     key: 'itemCount',
  //   },
  // ];
  // const data = [
  //   {
  //     id: 1,
  //     country: 'Canada',
  //     soldBy: 'Bill',
  //     client: 'Cerberus Corp.',
  //     description: 'Prothean artifacts',
  //     value: 6250,
  //     itemCount: 50,
  //   },
  //   {
  //     id: 2,
  //     country: 'Canada',
  //     soldBy: 'Bill',
  //     client: 'Strickland Propane',
  //     description: 'Propane and prop.',
  //     value: 2265,
  //     itemCount: 20,
  //   },
  //   {
  //     id: 3,
  //     country: 'USA',
  //     soldBy: 'Ted',
  //     client: 'Dunder Mifflin',
  //     description: 'Assorted paper-mi',
  //     value: 4700,
  //     itemCount: 10,
  //   },
  //   {
  //     id: 4,
  //     country: 'USA',
  //     soldBy: 'Ted',
  //     client: 'Utopia Planitia Shi',
  //     description: 'Dilithium, duraniu',
  //     value: 21750,
  //     itemCount: 250,
  //   },
  //   {
  //     id: 5,
  //     country: 'USA',
  //     soldBy: 'Ted',
  //     client: 'Glengarry Estates',
  //     description: 'Desks, phones, cof',
  //     value: 5000,
  //     itemCount: 5,
  //   },
  //   {
  //     id: 6,
  //     country: 'Germany',
  //     soldBy: 'Angela',
  //     client: 'Wayne Enterprises',
  //     description: 'Suit armor and rur',
  //     value: 35000,
  //     itemCount: 25,
  //   },
  //   {
  //     id: 7,
  //     country: 'Germany',
  //     soldBy: 'Angela',
  //     client: 'Stark Industries',
  //     description: 'Armor and rocket',
  //     value: 25000,
  //     itemCount: 10,
  //   },
  //   {
  //     id: 8,
  //     country: 'Germany',
  //     soldBy: 'Angela',
  //     client: 'Nakatomi Trading',
  //     description: 'Fire extinguishers',
  //     value: 15000,
  //     itemCount: 50,
  //   },
  //   {
  //     id: 9,
  //     country: 'UK',
  //     soldBy: 'Jill',
  //     client: 'Spacely Sprocket',
  //     description: 'Anti-gravity propu',
  //     value: 25250,
  //     itemCount: 50,
  //   },
  //   {
  //     id: 10,
  //     country: 'UK',
  //     soldBy: 'Jill',
  //     client: 'Cyberdyne Systems',
  //     description: 'Skynet prototype',
  //     value: 95000,
  //     itemCount: 5,
  //   },
  //   {
  //     id: 11,
  //     country: 'UK',
  //     soldBy: 'Jill',
  //     client: 'Weyland Corp.',
  //     description: 'Cryostasis pods',
  //     value: 40000,
  //     itemCount: 20,
  //   },
  //   {
  //     id: 12,
  //     country: 'Canada',
  //     soldBy: 'Bill',
  //     client: 'Black Mesa',
  //     description: 'Resonance cascade',
  //     value: 12500,
  //     itemCount: 12,
  //   },
  //   {
  //     id: 13,
  //     country: 'USA',
  //     soldBy: 'Ted',
  //     client: 'Oscorp',
  //     description: 'Gene therapy kits',
  //     value: 21500,
  //     itemCount: 30,
  //   },
  //   {
  //     id: 14,
  //     country: 'Germany',
  //     soldBy: 'Angela',
  //     client: 'Umbrella Corp.',
  //     description: 'Virus samples',
  //     value: 31500,
  //     itemCount: 8,
  //   },
  //   {
  //     id: 15,
  //     country: 'UK',
  //     soldBy: 'Jill',
  //     client: 'British Secret Serv',
  //     description: 'Gadgets and weapon',
  //     value: 18500,
  //     itemCount: 18,
  //   },
  //   {
  //     id: 16,
  //     country: 'USA',
  //     soldBy: 'Ted',
  //     client: 'Planet Express',
  //     description: 'Delivery drones',
  //     value: 21000,
  //     itemCount: 60,
  //   },
  //   {
  //     id: 17,
  //     country: 'Germany',
  //     soldBy: 'Angela',
  //     client: 'Vault-Tec',
  //     description: 'Vault gear',
  //     value: 30000,
  //     itemCount: 40,
  //   },
  //   {
  //     id: 18,
  //     country: 'Canada',
  //     soldBy: 'Bill',
  //     client: 'Blue Sun Corp.',
  //     description: 'Cortex modules',
  //     value: 17800,
  //     itemCount: 22,
  //   },
  //   {
  //     id: 19,
  //     country: 'UK',
  //     soldBy: 'Jill',
  //     client: 'Tyrell Corp.',
  //     description: 'Replicant units',
  //     value: 98000,
  //     itemCount: 6,
  //   },
  //   {
  //     id: 20,
  //     country: 'USA',
  //     soldBy: 'Ted',
  //     client: 'Cyberpunk Inc.',
  //     description: 'Augment packages',
  //     value: 45000,
  //     itemCount: 25,
  //   },
  //   // Dòng 21–100 (sinh dữ liệu tiếp theo đây)
  //   ...Array.from({ length: 80 }, (_, i) => ({
  //     id: 21 + i,
  //     country: ['USA', 'Canada', 'Germany', 'UK'][i % 4],
  //     soldBy: ['Bill', 'Ted', 'Angela', 'Jill'][i % 4],
  //     client: `Client ${i + 1}`,
  //     description: [
  //       'Tech supplies',
  //       'Industrial units',
  //       'Defense modules',
  //       'Energy cells',
  //     ][i % 4],
  //     value: Math.floor(Math.random() * 90000 + 1000),
  //     itemCount: Math.floor(Math.random() * 250 + 1),
  //   })),
  // ];

  // const [currentPage, setCurrentPage] = useState(1);
  // const [defaultItemsPerPage, setDefaultItemsPerPage] = useState('10');
  // const [selected, setSelected] = useState('');

  // const itemsPerPage = 10;
  // const Item = [
  //   { label: '10', value: '10' },
  //   { label: '20', value: '20' },
  //   { label: '50', value: '50' },
  //   { label: '100', value: '100' },
  // ];

  // const totalPages = Math.ceil(data.length / Number(defaultItemsPerPage));

  // const paginatedData = data.slice(
  //   (currentPage - 1) * Number(defaultItemsPerPage),
  //   currentPage * Number(defaultItemsPerPage)
  // );
  // const series = [
  //   {
  //     name: 'Canada',
  //     data: [
  //       3.9670002, 5.2650003, 6.201, 7.8010006, 9.694, 11.214001, 11.973001,
  //       12.250001, 12.816001, 13.413001, 13.626961, 14.30356, 15.295461,
  //     ],
  //   },
  // ];
  // console.log(series[0].data.map((d, i) => i + 2010));

  const handleQuery = async () => {
    // console.log(textarea);
    const response = await axios.post(
      'http://localhost:3001/sql/execute-query',
      { query: textarea }
    );
    setColumns(response.data.columns);
    // console.log();
  };

  return (
    <div className=" flex h-screen">
      {/* sidebar */}
      {openSidebar ? (
        <div className="w-sm overflow-y-auto">
          <div className="bg-blue-500 h-[70px] text-2xl font-bold flex justify-center items-center text-white">
            LYV
          </div>
          <div className="p-2 flex flex-col gap-2">
            <div>
              <div className="text-lg font-bold text-blue-300">SQL Editor</div>
              <textarea
                className="border w-full rounded-md outline-none border-blue-300 p-2 text-gray-400 font-semibold text-lg"
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
              <div className="h-40 border rounded-md border-blue-300 p-2 overflow-y-auto flex flex-col gap-2">
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
              <div className="text-lg font-bold text-blue-300">Type Report</div>
              <select className="w-full border border-blue-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none">
                <option value="">Choose option</option>
                <option value="">Sum</option>
                <option value="">Average</option>
                <option value="">Max</option>
                <option value="">Min</option>
                <option value="">Top N</option>
              </select>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-300">Type Map</div>
              <select className="w-full border border-blue-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none">
                <option value="">Choose option</option>
                <option value="">Column</option>
                <option value="">Line</option>
                <option value="">Pie</option>
                <option value="">Scatter plot</option>
              </select>
            </div>
            <button className="bg-blue-400 w-full text-white font-bold py-2 text-base rounded-md cursor-pointer">
              Create Report
            </button>
          </div>
        </div>
      ) : null}

      {/* content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-[#efefef] h-[70px] text-3xl text-gray-500 font-bold flex justify-center items-center relative">
          <div
            className="absolute left-5 text-gray-500 cursor-pointer"
            onClick={handleOpenSidebar}
          >
            <IoMenu className="size-8" />
          </div>
          Data Visualization
        </div>
        <div className="bg-gray-300 flex-1 p-2 overflow-y-auto">
          <div className="w-full h-[500px] bg-amber-50 rounded-md p-2 flex flex-col gap-2">
            <div className="text-lg font-bold text-blue-300">Table</div>
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden h-full flex flex-col">
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Product name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Brand
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-4 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
                      >
                        Apple iMac 27&#34;
                      </th>
                      <td className="px-4 py-3">PC</td>
                      <td className="px-4 py-3">Apple</td>
                      <td className="px-4 py-3">300</td>
                      <td className="px-4 py-3">$2999</td>
                      <td className="px-4 py-3 flex items-center justify-end">
                        <button
                          id="apple-imac-27-dropdown-button"
                          data-dropdown-toggle="apple-imac-27-dropdown"
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none "
                          type="button"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        <div
                          id="apple-imac-27-dropdown"
                          className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow "
                        >
                          <ul
                            className="py-1 text-sm text-gray-700 "
                            aria-labelledby="apple-imac-27-dropdown-button"
                          >
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100 "
                              >
                                Show
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100 "
                              >
                                Edit
                              </a>
                            </li>
                          </ul>
                          <div className="py-1">
                            <a
                              href="#"
                              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 "
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
                      >
                        Apple iMac 20&#34;
                      </th>
                      <td className="px-4 py-3">PC</td>
                      <td className="px-4 py-3">Apple</td>
                      <td className="px-4 py-3">200</td>
                      <td className="px-4 py-3">$1499</td>
                      <td className="px-4 py-3 flex items-center justify-end">
                        <button
                          id="apple-imac-20-dropdown-button"
                          data-dropdown-toggle="apple-imac-20-dropdown"
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none "
                          type="button"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        <div
                          id="apple-imac-20-dropdown"
                          className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow "
                        >
                          <ul
                            className="py-1 text-sm text-gray-700 "
                            aria-labelledby="apple-imac-20-dropdown-button"
                          >
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100 "
                              >
                                Show
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100 "
                              >
                                Edit
                              </a>
                            </li>
                          </ul>
                          <div className="py-1">
                            <a
                              href="#"
                              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 "
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <nav
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-2"
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-gray-500 ">
                  Showing
                  <span className="font-semibold text-gray-900 ">1-10</span>
                  of
                  <span className="font-semibold text-gray-900 ">1000</span>
                </span>
                <ul className="inline-flex items-stretch -space-x-px">
                  <li>
                    <a
                      href="#"
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
                          fill-rule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
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
                      className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700"
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
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="w-full h-[500px] bg-white rounded-md p-2 mt-2">
            <VictoryChart
              theme={VictoryTheme.clean}
              style={{ parent: { width: '100%' } }}
            >
              <VictoryLine
                data={series[0].data.map((d, i) => ({
                  x: i + 2010,
                  y: d,
                }))}
              />
            </VictoryChart>
          </div>
          {/* Table */}
          {/* <div className="w-full h-full bg-white p-4 rounded shadow overflow-auto">
            <div className="h-[15%]">
              <Select
                label="Items per page"
                options={Item}
                value={defaultItemsPerPage}
                onChange={setDefaultItemsPerPage}
                placeholder="Items per page"
              />
            </div>
            <div className="h-[65%] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-300 ">
                <thead className="bg-gray-100">
                  <tr>
                    {header.map((item) => (
                      <th
                        key={item.key}
                        className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-r border-gray-300 whitespace-nowrap"
                      >
                        {item.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {paginatedData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 text-sm text-gray-800 border-r  border-gray-200">
                        {row.id}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 border-r  border-gray-200">
                        {row.country}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 border-r  border-gray-200">
                        {row.soldBy}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 border-r  border-gray-200">
                        {row.client}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 border-r  border-gray-200">
                        {row.description}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 border-r  border-gray-200">
                        {row.value}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {row.itemCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="h-[20%] flex items-center justify-end">
              <Pagination
                total={totalPages}
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
          <div className="w-full h-full bg-white">
            <VictoryChart theme={VictoryTheme.clean}>
              <VictoryLine
                data={series[0].data.map((d, i) => ({
                  x: i + 2010,
                  y: d,
                }))}
              />
            </VictoryChart>
          </div>
          <div className="w-full h-full bg-white">
            <VictoryChart
              theme={VictoryTheme.clean}
              domain={{ y: [0.5, 5.5] }}
              domainPadding={{ x: 40 }}
            >
              <VictoryGroup offset={20} style={{ data: { width: 15 } }}>
                <VictoryBar
                  data={[
                    { x: '2023 Q1', y: 1 },
                    { x: '2023 Q2', y: 2 },
                    { x: '2023 Q3', y: 3 },
                    { x: '2023 Q4', y: 2 },
                  ]}
                  labels={({ datum }) => datum.y}
                />
                <VictoryBar
                  data={[
                    { x: '2023 Q1', y: 2 },
                    { x: '2023 Q2', y: 3 },
                    { x: '2023 Q3', y: 4 },
                    { x: '2023 Q4', y: 5 },
                  ]}
                  labels={({ datum }) => datum.y}
                />
                <VictoryBar
                  data={[
                    { x: '2023 Q1', y: 1 },
                    { x: '2023 Q2', y: 2 },
                    { x: '2023 Q3', y: 3 },
                    { x: '2023 Q4', y: 4 },
                  ]}
                  labels={({ datum }) => datum.y}
                />
              </VictoryGroup>
            </VictoryChart>
          </div> */}
          {/* <div className="w-full h-100 bg-white"></div> */}
        </div>
      </div>
    </div>
  );
};

export default App;

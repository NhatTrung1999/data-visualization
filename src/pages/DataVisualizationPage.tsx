import { useEffect, useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { FaChartColumn } from 'react-icons/fa6';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ChartVisualization, Sidebar } from '../components';
import RenderCharts from '../components/RenderCharts';
import { Pagination, TableVisualization } from '../components/Table';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleCreateTable = async (
    overrideLimit?: number,
    overridePage?: number
  ) => {
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

    setIsLoading(true);
    try {
      const currentLimit = overrideLimit ?? limit;
      const currentPage = overridePage ?? page;
      console.log(
        'Sending request with limit:',
        currentLimit,
        'page:',
        currentPage
      );
      const response = await axios.post(
        'http://localhost:3001/data-visualization/execute-query',
        {
          ...params,
          checkedColumns,
          aggregateFunction,
          topNCount: aggregateFunction === 'TOP_N' ? topNCount : undefined,
          clause,
          page: currentPage,
          limit: currentLimit,
        }
      );
      setHeadTables(response.data.columns);
      setBodyTables(response.data.data);
      setTotalRecords(response.data.totalRecords);
      // Đảm bảo page hợp lệ
      const totalPages = Math.ceil(response.data.totalRecords / currentLimit);
      if (currentPage > totalPages) {
        setPage(totalPages || 1);
      }
      console.log(response.data.columns);
      setXAxis(response.data.columns[0] || '');
      setYAxis(response.data.columns[1] || '');
    } catch (error: any) {
      console.error('Error creating table:', error);
      toast.error(`${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    setPage(1);
    handleCreateTable(newLimit, 1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalRecords / limit)) {
      setPage(newPage);
      handleCreateTable(undefined, newPage);
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
        <Sidebar
          aggregateFunction={aggregateFunction}
          clause={clause}
          columns={columns}
          checkedColumns={checkedColumns}
          topNCount={topNCount}
          isLoading={isLoading}
          handleCheckboxChange={handleCheckboxChange}
          handleCreateTable={handleCreateTable}
          setAggregateFunction={setAggregateFunction}
          setClause={setClause}
          setTopNCount={setTopNCount}
        />
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
                  disabled={isLoading}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </form>
            </div>
            <TableVisualization
              headTables={headTables}
              bodyTables={bodyTables}
            />
            <Pagination
              page={page}
              limit={limit}
              totalRecords={totalRecords}
              handlePageChange={handlePageChange}
              isLoading={isLoading}
              renderPageNumbers={renderPageNumbers}
            />
            
          </div>

          <div className="w-full min-h-[500px] bg-white rounded-md p-2 mt-2 flex flex-col gap-2">
            <div className="text-lg font-bold text-blue-300">Chart</div>
            <div className="flex-1 h-full">
              <RenderCharts
                chartType={chartType}
                chartData={bodyTables.length > 0 ? bodyTables : []}
                xAxis={xAxis}
                yAxis={yAxis}
                propertiesCharts={headTables}
              />
            </div>
          </div>
        </div>

        {openChart && (
          <ChartVisualization
            headTables={headTables}
            chartType={chartType}
            xAxis={xAxis}
            yAxis={yAxis}
            setChartType={setChartType}
            setXAxis={setXAxis}
            setYAxis={setYAxis}
          />
        )}
      </div>
    </div>
  );
};

export default DataVisualizationPage;

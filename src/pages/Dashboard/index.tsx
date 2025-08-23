import { useEffect } from 'react';
import Card from '../../components/common/Card';
import TableView from '../../components/Tables';
import Checkbox from '../../components/ui/checkbox';
import Label from '../../components/ui/label';
import Select from '../../components/ui/select';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  executeQuery,
  getColumns,
  setAggregateFunction,
  setCheckedColumns,
  setClauseOption,
  setLimit,
  setPage,
  setTopNCount,
} from '../../features/dynamicSqlSlice';
import { useSearchParams } from 'react-router-dom';
import type { IParams } from '../../types';
import { setParams } from '../../features/paramsSlice';
import Input from '../../components/ui/input';
import { toast } from 'react-toastify';

const excelFunctions: { value: string; label: string }[] = [
  { value: '', label: 'Choose option' },
  { value: 'SUM', label: 'SUM' },
  { value: 'AVG', label: 'AVERAGE' },
  { value: 'MAX', label: 'MAX' },
  { value: 'MIN', label: 'MIN' },
  { value: 'TOP_N', label: 'TOP N' },
];

const clauseOptions: { value: string; label: string }[] = [
  { value: '', label: 'Choose option' },
  { value: 'GROUP BY', label: 'Group By' },
  // { value: 'ORDER BY', label: 'Order By' },
];

const Dashboard = () => {
  const {
    columnState,
    checkedColumns,
    table,
    aggregateFunction,
    clauseOption,
    page,
    topNCount,
    limit,
  } = useAppSelector((state) => state.dynamicSql);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  let params: IParams = {
    host: searchParams.get('host') || '',
    database: searchParams.get('database') || '',
    username: searchParams.get('username') || '',
    password: searchParams.get('password') || '',
    querysql: searchParams.get('querysql') || '',
  };

  useEffect(() => {
    const getParams = async () => {
      await dispatch(setParams(params));
    };
    const getCols = async () => {
      await dispatch(getColumns(params));
    };
    getParams();
    getCols();
  }, [searchParams, dispatch]);

  const handleExcelFunctionsChange = (value: string) => {
    dispatch(setAggregateFunction(value));
  };

  const handleClauseOptionsChange = (value: string) => {
    dispatch(setClauseOption(value));
  };

  const handlePageOptionsChange = (value: string) => {
    const newValue = Number(value);
    dispatch(setLimit(newValue));
    dispatch(setPage(1));
    handleCreateTable(newValue, 1);
  };

  const handlePageChange = (newPage: number) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(table.totalRecords / table.limit)
    ) {
      dispatch(setPage(newPage));
      handleCreateTable(undefined, newPage);
    }
  };

  const handleCreateTable = async (
    overrideLimit?: number,
    overridePage?: number
  ) => {
    try {
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

      // console.log(params, aggregateFunction, topNCount, clauseOption, page, limit, checkedColumns);
      // console.log(overrideLimit, overridePage);

      const currentLimit = overrideLimit ?? limit;
      const currentPage = overridePage ?? page;
      let result = await dispatch(
        executeQuery({
          ...params,
          checkedColumns,
          aggregateFunction,
          topNCount: aggregateFunction === 'TOP_N' ? topNCount : undefined,
          clause: clauseOption,
          page: currentPage,
          limit: currentLimit,
        })
      );
      if (executeQuery.rejected.match(result)) {
        // console.log(result.payload);
        toast.error(result.payload as string || 'An error occurred while executing the query');
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred');
    }
  };

  // console.log(errors);

  return (
    <div className="space-y-6 flex gap-6 xl:flex-row md:flex-col xsm:flex-col 2xsm:flex-col 3xsm:flex-col">
      <TableView
        tableHeaders={table.columns}
        tableData={table.data}
        limit={table.limit}
        page={table.page}
        totalRecords={table.totalRecords}
        handlePageOptionsChange={handlePageOptionsChange}
        handlePageChange={handlePageChange}
        className="flex-1"
      />
      <Card
        title="Columns"
        className="xl:w-[300px] h-full md:w-full xsm:w-full 2xsm:flex-col 3xsm:flex-col"
      >
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] h-[300px] p-2 overflow-y-auto no-scrollbar flex flex-col gap-2">
          {columnState.columns.map((col, i) => (
            <Label
              className="select-none rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-2"
              htmlFor={`column-${i}`}
              key={i}
            >
              <Checkbox
                id={`column-${i}`}
                label={col}
                checked={checkedColumns.includes(col)}
                onChange={() => dispatch(setCheckedColumns(col))}
              />
            </Label>
          ))}
        </div>
        <div>
          <Label>Excel Functions</Label>
          <Select
            options={excelFunctions}
            onChange={handleExcelFunctionsChange}
          />
        </div>
        <div>
          <Label>Clause</Label>
          <Select
            options={clauseOptions}
            onChange={handleClauseOptionsChange}
          />
        </div>
        {aggregateFunction === 'TOP_N' && (
          <div>
            <Label>Top N Count</Label>
            <Input
              type="number"
              min="0"
              value={topNCount}
              onChange={(e) => dispatch(setTopNCount(Number(e.target.value)))}
            />
          </div>
        )}
        <button
          onClick={() => handleCreateTable()}
          rel="nofollow"
          className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600 w-full"
        >
          Create Table
        </button>
      </Card>
    </div>
  );
};

export default Dashboard;

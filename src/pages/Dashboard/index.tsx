import { useEffect } from 'react';
import Card from '../../components/common/Card';
import TableView from '../../components/Tables';
import Checkbox from '../../components/ui/checkbox';
import Label from '../../components/ui/label';
import Select from '../../components/ui/select';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getColumns, setCheckedColumns } from '../../features/dynamicSqlSlice';
import { useSearchParams } from 'react-router-dom';
import type { IParams } from '../../types';
import { setParams } from '../../features/paramsSlice';

const Dashboard = () => {
  const { columnState, checkedColumns } = useAppSelector(
    (state) => state.dynamicSql
  );
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

  const options = [
    { value: '', label: 'Choose options' },
    { value: 'Column1', label: 'Column1' },
    { value: 'Column2', label: 'Column2' },
    { value: 'Column3', label: 'Column3' },
    { value: 'Column4', label: 'Column4' },
  ];
  const handleSelectChange = (value: string) => {
    console.log('Selected value:', value);
  };

  const handleCreateTable = async () => {
    console.log(checkedColumns);
  };

  return (
    <div className="space-y-6 flex gap-6 xl:flex-row md:flex-col xsm:flex-col 2xsm:flex-col 3xsm:flex-col">
      <TableView className="flex-1" />
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
        <Select options={options} onChange={handleSelectChange} />
        <Select options={options} onChange={handleSelectChange} />
        <button
          onClick={handleCreateTable}
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

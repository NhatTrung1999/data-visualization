import { useState } from 'react';
import Card from '../../components/common/Card';
import TableView from '../../components/Tables';
import Checkbox from '../../components/ui/checkbox';
import Label from '../../components/ui/label';
import Select from '../../components/ui/select';

const Dashboard = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

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

  return (
    <div className="space-y-6 flex gap-6 xl:flex-row md:flex-col xsm:flex-col">
      <TableView className="flex-1" />
      <Card title="Columns" className="xl:w-[300px] h-full md:w-full xsm:w-full">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] h-[300px] p-2 overflow-y-auto no-scrollbar flex flex-col gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Label
              className="select-none rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-2"
              htmlFor="columns-1"
              key={i}
            >
              <Checkbox
                id="columns-1"
                label="Columns 1"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
            </Label>
          ))}
        </div>
        <Select options={options} onChange={handleSelectChange} />
        <Select options={options} onChange={handleSelectChange} />
        <button
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

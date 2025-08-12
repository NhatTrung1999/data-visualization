import ChartsView from '../../components/Chart/ChartsView';
import Card from '../../components/common/Card';
import Label from '../../components/ui/label';
import Select from '../../components/ui/select';

const Charts = () => {
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
      <ChartsView className="flex-1" />
      <Card title="Chart Visualization" className="xl:w-[300px] h-full md:w-full xsm:w-full">
        <Select options={options} onChange={handleSelectChange} />
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90 text-center">
          Properties
        </h3>
        <div>
          <Label>X Axis</Label>
          <Select options={options} onChange={handleSelectChange} />
        </div>
        <div>
          <Label>Y Axis</Label>
          <Select options={options} onChange={handleSelectChange} />
        </div>
      </Card>
    </div>
  );
};

export default Charts;

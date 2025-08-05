
interface ITableVisualization {
  headTables: string[];
  bodyTables: any[];
}

const TableVisualization = ({
  headTables,
  bodyTables,
}: ITableVisualization) => {
  return (
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
  );
};

export default TableVisualization;

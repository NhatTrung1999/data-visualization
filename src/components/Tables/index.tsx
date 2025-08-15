import Card from '../common/Card';
import Select from '../ui/select';
import Pagination from '../common/Pagination';

const pageOptions: { value: string; label: string }[] = [
  { value: '10', label: '10' },
  { value: '25', label: '25' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
];

export default function TableView({
  page,
  limit,
  totalRecords,
  className,
  tableHeaders = [],
  tableData = [],
  handlePageOptionsChange,
  handlePageChange,
}: {
  page: number;
  limit: number;
  totalRecords: number;
  className?: string;
  tableHeaders: string[];
  tableData: any[];
  handlePageOptionsChange: (value: string) => void;
  handlePageChange: (newPage: number) => void;
}) {
  return (
    <Card title="Columns View" className={className}>
      <div className="flex items-center justify-end">
        <div>
          <Select
            options={pageOptions}
            onChange={handlePageOptionsChange}
            placeholder="Select Option"
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="w-full max-w-[1130px] overflow-x-auto h-[550px] overflow-y-auto">
          <table className="whitespace-nowrap w-full text-sm font-light">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0 text-left">
              <tr>
                {tableHeaders.map((tableHeader, i) => (
                  <th scope="col" className="px-6 py-3" key={i}>
                    {tableHeader}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  {tableHeaders.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      {row[col] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] sticky top-0 bg-white whitespace-nowrap">
              <TableRow>
                {tableHeaders.map((tableHeader, i) => (
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    key={i}
                  >
                    {tableHeader}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody> */}
          {/* <TableRow>
                <TableCell>dvfbdh</TableCell>
              </TableRow> */}
          {/* {tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {tableHeaders.map((col, colIndex) => (
                    <TableCell key={colIndex}>{row[col]}</TableCell>
                  ))}
                </TableRow>
              ))} */}
          {/* {tableData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={order.user.image}
                          alt={order.user.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.user.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.user.role}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.projectName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2">
                      {order.team.images.map((teamImage, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                        >
                          <img
                            width={24}
                            height={24}
                            src={teamImage}
                            alt={`Team member ${index + 1}`}
                            className="w-full size-6"
                          />
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        order.status === 'Active'
                          ? 'success'
                          : order.status === 'Pending'
                          ? 'warning'
                          : 'error'
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order.budget}
                  </TableCell>
                </TableRow>
              ))} */}
          {/* </TableBody>
          </Table> */}
        </div>
      </div>
      <Pagination
        page={page}
        limit={limit}
        totalRecords={totalRecords}
        handlePageChange={handlePageChange}
      />
      {/* <div className="flex flex-row items-center justify-between">
        <div className="text-sm">
          <span className="text-sm text-gray-500 font-semibold">
            Showing <span className="font-semibold text-gray-800">1-10</span> of{' '}
            <span className="font-semibold text-gray-800">1000</span>
          </span>
        </div>
        <div>
          <ul className="flex items-center">
            <li>
              <button className="rounded-l-lg border appearance-none px-2 py-2 text-sm shadow-theme-xs placeholder:text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                <ChevronLeftIcon />
              </button>
            </li>
            <li>
              <button className=" border appearance-none px-3 py-1.25 text-sm shadow-theme-xs placeholder:text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                1
              </button>
            </li>
            <li>
              <button className="rounded-r-lg border appearance-none px-2 py-2 text-sm shadow-theme-xs placeholder:text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                <ChevronRightIcon />
              </button>
            </li>
          </ul>
        </div>
      </div> */}
    </Card>
  );
}

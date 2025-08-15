import { type ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../../assets/icons';
import RenderPageNumbers from './RenderPageNumbers';
interface IPagination {
  page: number;
  limit: number;
  totalRecords: number;
  handlePageChange: (newPage: number) => void;
  renderPageNumbers?: () => ReactNode;
}

const Pagination = ({
  page,
  limit,
  totalRecords,
  handlePageChange,
}: IPagination) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="text-sm">
        <span className="text-sm text-gray-500 font-semibold">
          Showing{' '}
          <span className="font-semibold text-gray-800">
            {(page - 1) * limit + 1}-{Math.min(page * limit, totalRecords)}
          </span>{' '}
          of <span className="font-semibold text-gray-800">{totalRecords}</span>
        </span>
      </div>
      <div>
        <ul className="flex items-center">
          <li>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="rounded-l-lg border appearance-none px-2 py-2 text-sm shadow-theme-xs placeholder:text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            >
              <ChevronLeftIcon />
            </button>
          </li>
          {/* <li>
            <button className="border appearance-none px-3 py-1.25 text-sm shadow-theme-xs placeholder:text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
              1
            </button>
          </li> */}
          <RenderPageNumbers
            limit={limit}
            page={page}
            totalRecords={totalRecords}
            handlePageChange={handlePageChange}
          />
          <li>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === Math.ceil(totalRecords / limit)}
              className="rounded-r-lg border appearance-none px-2 py-2 text-sm shadow-theme-xs placeholder:text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            >
              <ChevronRightIcon />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;

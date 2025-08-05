import { type ReactNode } from 'react';

interface IPagination {
  page: number;
  limit: number;
  totalRecords: number;
  isLoading: boolean;
  handlePageChange: (newPage: number) => void;
  renderPageNumbers: () => ReactNode;
}

const Pagination = ({
  page,
  limit,
  totalRecords,
  isLoading,
  handlePageChange,
  renderPageNumbers,
}: IPagination) => {
  return (
    <nav
      className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-1"
      aria-label="Table navigation"
    >
      <span className="text-sm text-gray-500 font-semibold">
        Showing{' '}
        <span className="font-semibold text-gray-900">
          {(page - 1) * limit + 1}-{Math.min(page * limit, totalRecords)}
        </span>{' '}
        of <span className="font-semibold text-gray-900">{totalRecords}</span>
      </span>
      <ul className="inline-flex items-stretch -space-x-px font-semibold">
        <li>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || isLoading}
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
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === Math.ceil(totalRecords / limit) || isLoading}
            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
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
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

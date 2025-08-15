
const RenderPageNumbers = ({
  limit,
  page,
  totalRecords,
  handlePageChange,
}: {
  limit: number;
  page: number;
  totalRecords: number;
  handlePageChange: (value: number) => void;
}) => {
  const totalPages = Math.ceil(totalRecords / limit);
  const pages: (number | string)[] = [];
  const maxPagesToShow = 5;

  // console.log(totalPages, pages, maxPagesToShow, totalRecords, limit);

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
        className="border appearance-none px-3 py-1.25 text-sm shadow-theme-xs placeholder:text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
      >
        ...
      </li>
    ) : (
      <li key={p}>
        <button
          onClick={() => handlePageChange(p as number)}
          className={`border appearance-none px-3 py-1.25 text-sm shadow-theme-xs placeholder:text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${
            p === page ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'
          }`}
        >
          {p}
        </button>
      </li>
    )
  );
};

export default RenderPageNumbers;

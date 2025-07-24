import React from 'react';

interface PaginationProps {
    total: number;
    current: number;
    onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, current, onChange }) => {
    const generatePages = () => {
        const pages: (number | string)[] = [];

        if (total <= 5) {
            // Show all if total pages <= 7
            for (let i = 1; i <= total; i++) pages.push(i);
        } else {
            pages.push(1); // always show first

            if (current > 2) pages.push('...');

            const start = Math.max(2, current - 1);
            const end = Math.min(total - 1, current + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (current < total - 2) pages.push('...');

            pages.push(total); // always show last
        }
        return pages;
    }
    const pagesToShow = generatePages();

    return (
        <div className="flex items-center justify-center space-x-2 mt-6">
            <button
                onClick={() => onChange(current - 1)}
                disabled={current === 1}
                className="border px-3 py-1 rounded disabled:opacity-50"
            >
                Previous
            </button>

            {pagesToShow.map((p, index) =>
                typeof p === 'number' ? (
                    <button
                        key={index}
                        onClick={() => onChange(p)}
                        className={`border px-3 py-1 rounded ${p === current ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                            }`}
                    >
                        {p}
                    </button>
                ) : (
                    <span key={index} className="px-2 text-gray-500">
                        {p}
                    </span>
                )
            )}

            <button
                onClick={() => onChange(current + 1)}
                disabled={current === total}
                className="border px-3 py-1 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;

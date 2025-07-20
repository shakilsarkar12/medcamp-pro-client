import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const visiblePages = 5;

  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(visiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + visiblePages - 1);

    if (end - start + 1 < visiblePages) {
      start = Math.max(1, end - visiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-between items-center mt-6 px-2 text-xs sm:text-sm text-[#2D91EF]">
      <div>
        Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </div>
      <div className="flex items-center space-x-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-2 py-1 border border-[#2D91EF] rounded hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          &lt;
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`px-2 py-1 border border-[#2D91EF] rounded ${
              page === currentPage
                ? "bg-blue-200 text-blue-800 font-semibold"
                : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-2 py-1 border border-[#2D91EF] rounded hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;

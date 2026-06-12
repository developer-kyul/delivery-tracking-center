import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-4 flex items-center justify-center gap-1">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-border bg-white text-text-secondary transition hover:border-status-border-transit hover:text-status-transit disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={14} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border text-xs font-medium transition ${
            currentPage === page
              ? "border-primary bg-primary font-bold text-white"
              : "border-border bg-white text-text-secondary hover:border-status-border-transit hover:text-status-transit"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-border bg-white text-text-secondary transition hover:border-status-border-transit hover:text-status-transit disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

export default memo(Pagination);

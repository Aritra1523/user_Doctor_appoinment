import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

interface PaginationProps {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Builds a compact page list like: 1, 2, 3, ..., 8  (max 7 slots, with ellipses)
const getPageNumbers = (page: number, totalPages: number): (number | "...")[] => {
  const delta = 1;
  const range: (number | "...")[] = [];
  const rangeStart = Math.max(2, page - delta);
  const rangeEnd = Math.min(totalPages - 1, page + delta);

  range.push(1);
  if (rangeStart > 2) range.push("...");
  for (let i = rangeStart; i <= rangeEnd; i++) range.push(i);
  if (rangeEnd < totalPages - 1) range.push("...");
  if (totalPages > 1) range.push(totalPages);

  return range;
};

export const Pagination = ({ page, limit, totalItems, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const start = totalItems === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalItems);
  const pages = getPageNumbers(page, totalPages);

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm text-slate-500 order-2 sm:order-1">
        Showing <span className="font-semibold text-slate-700">{start}-{end}</span> of{" "}
        <span className="font-semibold text-slate-700">{totalItems}</span> doctors
      </p>

      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-blue-200 hover:text-blue-600 transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronLeftIcon />
        </button>

        {pages.map((p, idx) =>
          p === "..." ? (
            <span key={`ellipsis-${idx}`} className="w-9 h-9 flex items-center justify-center text-slate-400 text-sm">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              aria-current={p === page ? "page" : undefined}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-blue-200 hover:text-blue-600"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-blue-200 hover:text-blue-600 transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};
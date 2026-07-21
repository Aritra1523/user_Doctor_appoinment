import { ChevronDownIcon, SortIcon } from "./Icons";

interface SortDropdownProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  showSortDropdown: boolean;
  setShowSortDropdown: (value: boolean) => void;
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'fees-low', label: 'Fees (Low to High)' },
  { value: 'fees-high', label: 'Fees (High to Low)' },
];

export const SortDropdown = ({
  sortBy,
  setSortBy,
  showSortDropdown,
  setShowSortDropdown,
}: SortDropdownProps) => {
  return (
    <div className="relative">
      <button
        onClick={() => setShowSortDropdown(!showSortDropdown)}
        className="w-full sm:w-auto px-4 py-2.5 bg-white border-2 border-slate-200 hover:border-blue-300 rounded-xl text-sm font-medium text-slate-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
      >
        <SortIcon />
        <span className="hidden sm:inline">Sort By: </span>
        <span className="font-semibold text-blue-600">{sortBy.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        <ChevronDownIcon className={showSortDropdown ? 'rotate-180' : ''} />
      </button>

      {showSortDropdown && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-fadeInUp">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSortBy(option.value);
                setShowSortDropdown(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-200 hover:bg-blue-50 ${
                sortBy === option.value ? 'text-blue-600 font-medium bg-blue-50/50' : 'text-slate-700'
              }`}
            >
              {sortBy === option.value && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mr-2" />
              )}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
import { SearchBar } from "./SearchBar";
import { SortDropdown } from "./SortDropdown";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  showSortDropdown: boolean;
  setShowSortDropdown: (value: boolean) => void;
  totalDoctors: number;
}

export const Header = ({
  search,
  setSearch,
  sortBy,
  setSortBy,
  showSortDropdown,
  setShowSortDropdown,
  totalDoctors,
}: HeaderProps) => (
  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Find Your Doctor
        </span>
        <span className="text-sm font-normal text-slate-400 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
          {totalDoctors} available
        </span>
      </h1>
      <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
        <span>🏥</span>
        Book appointments with trusted healthcare professionals
      </p>
    </div>

    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
      <SearchBar search={search} setSearch={setSearch} />
      <SortDropdown
        sortBy={sortBy}
        setSortBy={setSortBy}
        showSortDropdown={showSortDropdown}
        setShowSortDropdown={setShowSortDropdown}
      />
    </div>
  </div>
);
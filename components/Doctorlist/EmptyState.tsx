import { NoResultsIcon } from "./Icons";

interface EmptyStateProps {
  onReset: () => void;
}

export const EmptyState = ({ onReset }: EmptyStateProps) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center transition-all duration-300 hover:shadow-md">
    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 transition-colors">
      <NoResultsIcon />
    </div>
    <h3 className="text-lg font-semibold text-slate-900">No Doctors Found</h3>
    <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
      Try adjusting your search or filters to find the perfect doctor
    </p>
    <button
      onClick={onReset}
      className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)]"
    >
      Reset Filters
    </button>
  </div>
);
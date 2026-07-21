import { ErrorIcon } from "./Icons";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => (
  <div className="py-16 flex items-center justify-center">
    <div className="bg-white rounded-2xl px-8 py-12 shadow-sm border border-slate-100 max-w-md w-full text-center transition-all duration-300 hover:shadow-md">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
        <ErrorIcon />
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
      <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>
      <button
        onClick={onRetry}
        className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)]"
      >
        Try Again
      </button>
    </div>
  </div>
);
import { SpinnerIcon } from "./Icons";

export const DoctorListSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-200 rounded-lg"></div>
          <div className="h-4 w-64 bg-slate-200 rounded-lg"></div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="h-11 w-[260px] bg-slate-200 rounded-xl"></div>
          <div className="h-11 w-[160px] bg-slate-200 rounded-xl"></div>
        </div>
      </div>

      {/* Doctor Cards Skeleton */}
      {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-16 h-16 rounded-2xl bg-slate-200 flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-32 bg-slate-200 rounded"></div>
                  <div className="h-4 w-16 bg-slate-200 rounded-full"></div>
                </div>
                <div className="h-4 w-24 bg-slate-200 rounded"></div>
                <div className="h-4 w-40 bg-slate-200 rounded"></div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-3 md:gap-4 flex-shrink-0">
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-slate-200 rounded"></div>
                  ))}
                </div>
                <div className="h-3 w-16 bg-slate-200 rounded"></div>
              </div>
              <div className="h-4 w-32 bg-slate-200 rounded"></div>
              <div className="flex gap-2">
                <div className="h-9 w-[100px] bg-slate-200 rounded-xl"></div>
                <div className="h-9 w-[100px] bg-slate-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const LoadingSpinner = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <SpinnerIcon />
      <p className="text-slate-600 font-medium">Loading doctors…</p>
    </div>
  </div>
);
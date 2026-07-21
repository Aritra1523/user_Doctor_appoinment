import React from 'react';

export const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 21L16.65 16.65" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92V19.92C22 20.752 21.4101 21.45 20.5901 21.498C20.3801 21.51 20.17 21.52 19.96 21.52C11.16 21.52 4 14.36 4 5.56C4 5.35 4.01 5.14 4.02 4.93C4.07 4.11 4.77 3.52 5.6 3.52H8.6C9.25 3.52 9.81 3.98 9.94 4.62C10.08 5.26 10.29 5.87 10.56 6.45C10.76 6.9 10.63 7.43 10.26 7.73L8.84 8.93C10.14 11.53 12.47 13.86 15.07 15.16L16.28 13.74C16.58 13.37 17.11 13.24 17.56 13.44C18.14 13.71 18.75 13.92 19.39 14.06C20.03 14.19 20.49 14.75 20.49 15.4V18.4C20.48 19.24 19.92 19.92 19.1 19.98C19.03 19.98 18.97 19.98 18.91 19.98" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="text-yellow-400">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const EmptyStarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="text-slate-300">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const HalfStarIcon = () => (
  <div className="relative inline-block">
    <EmptyStarIcon />
    <div className="absolute inset-0 overflow-hidden w-1/2">
      <StarIcon />
    </div>
  </div>
);

export const SpinnerIcon = () => (
  <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export const ChevronDownIcon = ({ className = "" }) => (
  <svg className={`transition-transform duration-300 ${className}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SortIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7H21M6 12H18M10 17H14" strokeLinecap="round" />
  </svg>
);

export const ErrorIcon = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M12 8V12M12 16H12.01" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const NoResultsIcon = () => (
  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 3.87 7 11 7 11s7-7.13 7-11c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
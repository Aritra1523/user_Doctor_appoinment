import React from 'react';
import { useRouter } from 'next/navigation';

export const DoctorNotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="bg-white rounded-2xl px-8 py-12 shadow-xl max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path d="M12 8V12M12 16H12.01" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Doctor Not Found</h2>
        <p className="text-slate-500 text-sm mt-2">
          The doctor you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <button
          onClick={() => router.push('/doctors')}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 text-sm font-medium"
        >
          Browse Doctors
        </button>
      </div>
    </div>
  );
};
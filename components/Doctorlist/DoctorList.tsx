
"use client";

import { useState } from "react";
import useDoctorList from "@/customHooks/doctor/useDoctorList";
import { Doctor } from "@/typescript/doctor/doctor";
import { Header } from "./Header";
import { DoctorCard } from "./DoctorCard";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { LoadingSpinner, DoctorListSkeleton } from "./Skeleton";
import { useDoctorListHelpers } from "./useDoctorListHelpers";

const DoctorList = () => {
  const { doctors, loading, error } = useDoctorList();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const { getRandomUserImage, getDoctorData, filteredDoctors } = useDoctorListHelpers(
    doctors,
    search,
    sortBy
  );

  // Loading states with progressive enhancement
  if (loading) {
    return (
      <div className="font-sans relative">
        <div className="relative z-10">
          {/* Show header skeleton first for better UX */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <div className="space-y-2 animate-pulse">
              <div className="h-8 w-48 bg-slate-200 rounded-lg"></div>
              <div className="h-4 w-64 bg-slate-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto animate-pulse">
              <div className="h-11 w-[260px] bg-slate-200 rounded-xl"></div>
              <div className="h-11 w-[160px] bg-slate-200 rounded-xl"></div>
            </div>
          </div>
          <DoctorListSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-sans">
        <ErrorState error={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="font-sans relative">
      <div className="relative z-10">
        <Header
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showSortDropdown={showSortDropdown}
          setShowSortDropdown={setShowSortDropdown}
          totalDoctors={filteredDoctors.length}
        />

        {filteredDoctors.length === 0 ? (
          <EmptyState onReset={() => { setSearch(''); setSortBy('featured'); }} />
        ) : (
          <div className="space-y-4">
            {filteredDoctors.map((doctor: Doctor, index: number) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
                index={index}
                getRandomUserImage={getRandomUserImage}
                getDoctorData={getDoctorData}
              />
            ))}
          </div>
        )}
      </div>

      {/* Global Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out both;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default DoctorList;
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useDoctorList from "@/customHooks/doctor/useDoctorList";
import { Doctor } from "@/typescript/doctor/doctor";
import { Header } from "./Header";
import { DoctorCard } from "./DoctorCard";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import {  DoctorListSkeleton } from "./Skeleton";
import { useDoctorListHelpers } from "./useDoctorListHelpers";
import { Pagination } from "./Pagination";

const DEFAULT_LIMIT = 5;
// When searching, fetch (effectively) the whole list in one request so
// search isn't limited to just the 5 doctors on the current page.
const SEARCH_FETCH_LIMIT = 1000;

const DoctorList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get("page"));
  const limitParam = Number(searchParams.get("limit"));
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : DEFAULT_LIMIT;

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const isSearching = search.trim().length > 0;

  
  const effectivePage = isSearching ? 1 : page;
  const effectiveLimit = isSearching ? SEARCH_FETCH_LIMIT : limit;

  const { doctors, loading, error, totalItems, totalPages } = useDoctorList(
    effectivePage,
    effectiveLimit
  );

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    params.set("limit", String(limit));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  
  const { getRandomUserImage, getDoctorData, filteredDoctors } = useDoctorListHelpers(
    doctors,
    search,
    sortBy
  );


  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!loading && !isSearching && page > totalPages) {
      goToPage(totalPages);
    }
  }, [loading, totalPages, isSearching]);

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
          totalDoctors={isSearching ? filteredDoctors.length : totalItems}
        />

        {filteredDoctors.length === 0 ? (
          <EmptyState onReset={() => { setSearch(''); setSortBy('featured'); }} />
        ) : (
          <>
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

            {!isSearching && (
              <Pagination
                page={page}
                limit={limit}
                totalItems={totalItems}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            )}
          </>
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
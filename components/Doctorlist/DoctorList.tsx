

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useDoctorList from "@/customHooks/doctor/useDoctorList";
import { Doctor } from "@/typescript/doctor/doctor";

const DoctorList = () => {
  const router = useRouter();
  const { doctors, loading, error } = useDoctorList();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Generate random user image for each doctor
  const getRandomUserImage = (seed: string) => {
    // Use the seed to generate consistent random values
    const seedHash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const isWoman = seedHash % 2 === 0;
    const imageId = (seedHash % 99) + 1;
    return `https://randomuser.me/api/portraits/${isWoman ? 'women' : 'men'}/${imageId}.jpg`;
  };

  // Generate consistent random data for each doctor
  const getDoctorData = (name: string, index: number) => {
    const seed = name + index;
    const seedHash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Rating between 3.0 and 5.0
    const rating = (3 + (seedHash % 20) / 10).toFixed(1);
    
    // Phone number
    const areaCode = 200 + (seedHash % 900);
    const prefix = 200 + (seedHash % 900);
    const line = 1000 + (seedHash % 9000);
    const phone = `+1 ${areaCode}-${prefix}-${line}`;
    
    // Location
    const locations = [
      '79 King Street, Aberdeen, AB10 1AU',
      '42 Queen Street, Edinburgh, EH2 3JZ',
      '15 Medical Center, Glasgow, G1 2RZ',
      '8 Harley Street, London, W1G 7QJ',
      '22 Broad Street, Birmingham, B1 2HG',
      '5 Portland Street, Manchester, M1 3LA',
      '12 Park Avenue, Leeds, LS1 2RT',
      '3 Cathedral Road, Cardiff, CF1 9BN'
    ];
    const location = locations[seedHash % locations.length];
    
    return { rating, phone, location };
  };

  const filteredDoctors = useMemo(() => {
    let filtered = doctors.filter((doctor: Doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      (typeof doctor.department === "string" 
        ? doctor.department.toLowerCase().includes(search.toLowerCase())
        : doctor.department?.name.toLowerCase().includes(search.toLowerCase()))
    );

    // Sort
    switch (sortBy) {
      case "featured":
        // Keep as is (featured first)
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "fees-low":
        filtered.sort((a, b) => a.fees - b.fees);
        break;
      case "fees-high":
        filtered.sort((a, b) => b.fees - a.fees);
        break;
      default:
        break;
    }

    return filtered;
  }, [doctors, search, sortBy]);

  // SVG Icons
  const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 21L16.65 16.65" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const LocationIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92V19.92C22 20.752 21.4101 21.45 20.5901 21.498C20.3801 21.51 20.17 21.52 19.96 21.52C11.16 21.52 4 14.36 4 5.56C4 5.35 4.01 5.14 4.02 4.93C4.07 4.11 4.77 3.52 5.6 3.52H8.6C9.25 3.52 9.81 3.98 9.94 4.62C10.08 5.26 10.29 5.87 10.56 6.45C10.76 6.9 10.63 7.43 10.26 7.73L8.84 8.93C10.14 11.53 12.47 13.86 15.07 15.16L16.28 13.74C16.58 13.37 17.11 13.24 17.56 13.44C18.14 13.71 18.75 13.92 19.39 14.06C20.03 14.19 20.49 14.75 20.49 15.4V18.4C20.48 19.24 19.92 19.92 19.1 19.98C19.03 19.98 18.97 19.98 18.91 19.98" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const StarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="text-yellow-400">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const EmptyStarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="text-slate-300">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const HalfStarIcon = () => (
    <div className="relative inline-block">
      <EmptyStarIcon />
      <div className="absolute inset-0 overflow-hidden w-1/2">
        <StarIcon />
      </div>
    </div>
  );

  const SpinnerIcon = () => (
    <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="flex flex-col items-center gap-4">
          <SpinnerIcon />
          <p className="text-slate-600 font-medium">Loading Doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="bg-white rounded-2xl px-8 py-12 shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path d="M12 8V12M12 16H12.01" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
          <p className="text-red-500 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right, rgba(37,99,235,0.04), transparent_50%)] pointer-events-none fixed" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left, rgba(124,58,237,0.03), transparent_50%)] pointer-events-none fixed" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Find Your Doctor</span>
              <span className="text-sm font-normal text-slate-400 bg-white px-3 py-1 rounded-full shadow-sm">
                {filteredDoctors.length} available
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Book appointments with trusted healthcare professionals
            </p>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:min-w-[260px] group">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300">
                <SearchIcon />
              </div>
              <input
                placeholder="Search doctors, specialties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm shadow-sm hover:shadow-md"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="w-full sm:w-auto px-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7H21M6 12H18M10 17H14" strokeLinecap="round" />
                </svg>
                Sort By: {sortBy.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                <svg className={`transition-transform duration-300 ${showSortDropdown ? 'rotate-180' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-fadeInUp">
                  {[
                    { value: 'featured', label: 'Featured' },
                    { value: 'name-asc', label: 'Name (A-Z)' },
                    { value: 'name-desc', label: 'Name (Z-A)' },
                    { value: 'fees-low', label: 'Fees (Low to High)' },
                    { value: 'fees-high', label: 'Fees (High to Low)' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-blue-50 ${
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
          </div>
        </div>

        {/* Doctor List */}
        {filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 3.87 7 11 7 11s7-7.13 7-11c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No Doctors Found</h3>
            <p className="text-slate-500 text-sm mt-1">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => { setSearch(''); setSortBy('featured'); }}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 text-sm font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDoctors.map((doctor: Doctor, index: number) => {
              const doctorData = getDoctorData(doctor.name, index);
              const rating = parseFloat(doctorData.rating);
              const fullStars = Math.floor(rating);
              const hasHalfStar = rating - fullStars >= 0.5;
              
              return (
                <div
                  key={doctor._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 hover:border-blue-100 p-5 md:p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex flex-col md:flex-row gap-5">
                    {/* Left - Avatar & Info */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Doctor Image - Using Random User API */}
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg shadow-blue-500/25 bg-gradient-to-br from-blue-500 to-indigo-600">
                        <img
                          src={getRandomUserImage(doctor.name + index)}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to gradient with first letter if image fails
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.className = 'relative w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold';
                              const span = document.createElement('span');
                              span.textContent = doctor.name.charAt(0).toUpperCase();
                              parent.appendChild(span);
                            }
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-bold text-slate-900">
                            {doctor.name}
                          </h3>
                          <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-full border border-blue-100">
                            Featured
                          </span>
                        </div>
                        
                        <p className="text-sm text-blue-600 font-medium mt-0.5">
                          {typeof doctor.department === "string"
                            ? doctor.department
                            : doctor.department?.name}
                        </p>
                        
                        <p className="text-sm text-slate-600 mt-1.5 flex items-center gap-1.5">
                          <LocationIcon />
                          <span>{doctorData.location}</span>
                        </p>
                      </div>
                    </div>

                    {/* Right - Rating & Actions */}
                    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-3 md:gap-4 flex-shrink-0">
                      {/* Rating */}
                      <div className="flex flex-col items-start sm:items-end">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => {
                            if (i < fullStars) {
                              return <StarIcon key={i} />;
                            } else if (i === fullStars && hasHalfStar) {
                              return <HalfStarIcon key={i} />;
                            } else {
                              return <EmptyStarIcon key={i} />;
                            }
                          })}
                          <span className="text-sm font-semibold text-slate-700 ml-1">{doctorData.rating}</span>
                        </div>
                        <span className="text-xs text-slate-400 mt-0.5">(No feedback)</span>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <PhoneIcon />
                        <span>Call: {doctorData.phone}</span>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => router.push(`/doctorDetails/${doctor._id}`)}
                          className="flex-1 sm:flex-none px-4 py-2 border border-blue-200 text-blue-600 hover:bg-blue-50 font-medium rounded-xl transition-all duration-300 text-sm"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => router.push(`/doctorDetails/${doctor._id}`)}
                          className="flex-1 sm:flex-none px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] text-sm"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default DoctorList;
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import SlotList from "../SlotList/SlotList";
import BookAppointment from "../BookAppointment/BookAppointment";
import Image from "next/image";

interface Props {
  id: string;
}

const DoctorDetails = ({ id }: Props) => {
  const router = useRouter();
  const { doctors } = useSelector((state: RootState) => state.doctor);
  const doctor = doctors.find((item: any) => item._id === id);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // SVG Icons
  const BackIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M19 12H5M12 19L5 12L12 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 10H21" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 2V6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 2V6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const FeeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12H16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8V16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ClockIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6V12L16 14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ExperienceIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6V12L16 14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2V6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 18V22" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const LanguageIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12H22" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const SpecializationIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const LocationIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
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

  const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92V19.92C22 20.752 21.4101 21.45 20.5901 21.498C20.3801 21.51 20.17 21.52 19.96 21.52C11.16 21.52 4 14.36 4 5.56C4 5.35 4.01 5.14 4.02 4.93C4.07 4.11 4.77 3.52 5.6 3.52H8.6C9.25 3.52 9.81 3.98 9.94 4.62C10.08 5.26 10.29 5.87 10.56 6.45C10.76 6.9 10.63 7.43 10.26 7.73L8.84 8.93C10.14 11.53 12.47 13.86 15.07 15.16L16.28 13.74C16.58 13.37 17.11 13.24 17.56 13.44C18.14 13.71 18.75 13.92 19.39 14.06C20.03 14.19 20.49 14.75 20.49 15.4V18.4C20.48 19.24 19.92 19.92 19.1 19.98C19.03 19.98 18.97 19.98 18.91 19.98" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const EmailIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6L12 12L20 6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 6H20V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18V6Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const GlobeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12H22" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (!doctor) {
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
          <p className="text-slate-500 text-sm mt-2">The doctor you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push('/doctors')}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 text-sm font-medium"
          >
            Browse Doctors
          </button>
        </div>
      </div>
    );
  }

  // Generate random data for demo
  const rating = (4 + Math.random()).toFixed(1);
  const fullStars = Math.floor(parseFloat(rating));
  const hasHalfStar = parseFloat(rating) - fullStars >= 0.5;
  const experience = 33;
  const specializations = ['Colonoscopy', 'Acute Liver Failure', 'Gastroenterology', 'Endoscopy'];
  const languages = ['English', 'Spanish', 'French', 'Hindi'];
  const availability = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right, rgba(37,99,235,0.04), transparent_50%)] pointer-events-none fixed" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left, rgba(124,58,237,0.03), transparent_50%)] pointer-events-none fixed" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 px-4 py-2.5 mb-6 bg-white border-2 border-slate-200 rounded-xl text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md text-sm font-medium"
        >
          <BackIcon />
          <span>Back to Doctors</span>
        </button>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          
          {/* Left Column - Doctor Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 hover:border-blue-100 p-6 md:p-8 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden shadow-lg shadow-blue-500/25 bg-gradient-to-br from-blue-500 to-indigo-600">
                    {doctor.image ? (
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.className = 'relative w-28 h-28 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-4xl font-bold';
                            const span = document.createElement('span');
                            span.textContent = doctor.name.charAt(0).toUpperCase();
                            parent.appendChild(span);
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                        {doctor.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900">
                        {doctor.name}
                      </h1>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-full border border-blue-100">
                          Featured
                        </span>
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded-full border border-emerald-100 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Available
                        </span>
                      </div>
                      <p className="text-blue-600 font-medium mt-1">
                        {typeof doctor.department === "string"
                          ? doctor.department
                          : doctor.department?.name}
                      </p>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => {
                          if (i < fullStars) {
                            return <StarIcon key={i} />;
                          } else if (i === fullStars && hasHalfStar) {
                            return (
                              <div key={i} className="relative inline-block">
                                <EmptyStarIcon />
                                <div className="absolute inset-0 overflow-hidden w-1/2">
                                  <StarIcon />
                                </div>
                              </div>
                            );
                          } else {
                            return <EmptyStarIcon key={i} />;
                          }
                        })}
                        <span className="text-sm font-semibold text-slate-700 ml-1">{rating}</span>
                      </div>
                      <span className="text-xs text-slate-400">128 reviews</span>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    <div className="bg-slate-50 rounded-xl px-3 py-2.5 text-center hover:bg-blue-50 transition-colors duration-300">
                      <div className="text-xs text-slate-500">Experience</div>
                      <div className="text-sm font-bold text-slate-900">{experience}+ Years</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl px-3 py-2.5 text-center hover:bg-blue-50 transition-colors duration-300">
                      <div className="text-xs text-slate-500">Patients</div>
                      <div className="text-sm font-bold text-slate-900">15K+</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl px-3 py-2.5 text-center hover:bg-blue-50 transition-colors duration-300">
                      <div className="text-xs text-slate-500">Fee</div>
                      <div className="text-sm font-bold text-slate-900">₹{doctor.fees}</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl px-3 py-2.5 text-center hover:bg-blue-50 transition-colors duration-300">
                      <div className="text-xs text-slate-500">Slot</div>
                      <div className="text-sm font-bold text-slate-900">{doctor.schedule.slotDuration}m</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex border-b border-slate-100">
                {['Overview', 'Specializations', 'Languages'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-6 py-3.5 text-sm font-medium transition-all duration-300 relative ${
                      activeTab === tab.toLowerCase()
                        ? 'text-blue-600'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab}
                    {activeTab === tab.toLowerCase() && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-4 animate-fadeInUp">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-2">About</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Dr. {doctor.name} has over {experience} years of experience in the medical field. 
                        Dedicated to providing compassionate, patient-centered care with a focus on 
                        accurate diagnosis and effective treatment. Committed to staying at the forefront 
                        of medical advancements to deliver the highest quality healthcare.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 pt-2">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-slate-600 text-xs mb-1">
                          <ClockIcon />
                          <span>Working Hours</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          {doctor.schedule.startTime} - {doctor.schedule.endTime}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {availability.join(' • ')}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-slate-600 text-xs mb-1">
                          <LocationIcon />
                          <span>Location</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          Medical Center
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          123 Healthcare Blvd, Medical District
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
                        <PhoneIcon />
                        <span className="text-sm text-slate-600">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
                        <EmailIcon />
                        <span className="text-sm text-slate-600">dr.{doctor.name.toLowerCase().replace(/\s/g, '')}@clinic.com</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Specializations Tab */}
                {activeTab === 'specializations' && (
                  <div className="animate-fadeInUp">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Specializations</h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {specializations.map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3 border border-blue-100 hover:bg-blue-100 transition-colors duration-300"
                        >
                          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                            <CheckIcon />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{spec}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 bg-slate-50 rounded-xl p-4">
                      <h4 className="text-xs font-semibold text-slate-700 mb-2">Procedures</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white rounded-full text-xs text-slate-600 shadow-sm">Endoscopy</span>
                        <span className="px-3 py-1 bg-white rounded-full text-xs text-slate-600 shadow-sm">Biopsy</span>
                        <span className="px-3 py-1 bg-white rounded-full text-xs text-slate-600 shadow-sm">Polyp Removal</span>
                        <span className="px-3 py-1 bg-white rounded-full text-xs text-slate-600 shadow-sm">ERCP</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Languages Tab */}
                {activeTab === 'languages' && (
                  <div className="animate-fadeInUp">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Languages Spoken</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {languages.map((lang, index) => (
                        <div
                          key={index}
                          className="bg-slate-50 rounded-xl px-4 py-3 text-center hover:bg-blue-50 transition-colors duration-300 border border-slate-100 hover:border-blue-200"
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <GlobeIcon />
                            <span className="text-sm font-medium text-slate-700">{lang}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            {index === 0 ? 'Native' : index === 1 ? 'Fluent' : 'Conversational'}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-3 bg-emerald-50 rounded-xl px-4 py-3 border border-emerald-100">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm text-emerald-700">Multilingual support available</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Section */}
          <div className="lg:sticky lg:top-8 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Consultation Fee</span>
                  <span className="text-lg font-bold text-slate-900">₹{doctor.fees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Session Duration</span>
                  <span className="text-sm font-semibold text-slate-700">{doctor.schedule.slotDuration} minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Available Days</span>
                  <div className="flex gap-1">
                    {availability.slice(0, 5).map((day, i) => (
                      <span key={i} className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold flex items-center justify-center">
                        {day.slice(0, 3)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 hover:border-blue-100 p-6 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <CalendarIcon />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Book Appointment</h2>
                  <p className="text-xs text-slate-500">Select date and time slot</p>
                </div>
              </div>

              {/* Date Picker */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Select Date
                </label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300">
                    <CalendarIcon />
                  </div>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm shadow-sm hover:shadow-md"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Slot List */}
              {selectedDate ? (
                <div className="mt-4">
                  <SlotList
                    doctorId={doctor._id}
                    date={selectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                  />
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-6 text-center border-2 border-dashed border-slate-200">
                  <div className="flex justify-center mb-2">
                    <CalendarIcon />
                  </div>
                  <p className="text-sm text-slate-500">Select a date to view available slots</p>
                </div>
              )}

              {/* Selected Slot */}
              {selectedTime && (
                <div className="mt-4 bg-blue-50 rounded-xl px-4 py-3 border border-blue-100 flex items-center justify-between animate-fadeInUp">
                  <span className="text-sm text-slate-700">Selected Slot</span>
                  <span className="text-sm font-semibold text-blue-600">{selectedTime}</span>
                </div>
              )}

              {/* Book Appointment Button */}
              <div className="mt-5">
                <BookAppointment
                  doctorId={doctor._id}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                />
              </div>

              {/* Trust Badge */}
              <div className="mt-5 flex items-center justify-center gap-2 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs text-slate-500">Secure booking • Free cancellation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
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

export default DoctorDetails;
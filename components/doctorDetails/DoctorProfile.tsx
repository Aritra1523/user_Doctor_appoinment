import React from 'react';
import { 
  StarIcon, 
  EmptyStarIcon, 
  ClockIcon, 
  LocationIcon, 
  PhoneIcon, 
  EmailIcon,
  CheckIcon,
  GlobeIcon
} from '@/components/doctorDetails/DoctorIcons';
import { Doctor } from '@/typescript/doctor/doctor';

interface DoctorProfileProps {
  doctor: Doctor;
  rating: string;
  fullStars: number;
  hasHalfStar: boolean;
  experience: number;
  specializations: string[];
  languages: string[];
  availability: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DoctorProfile = ({
  doctor,
  rating,
  fullStars,
  hasHalfStar,
  experience,
  specializations,
  languages,
  availability,
  activeTab,
  setActiveTab,
}: DoctorProfileProps) => {
  const getDepartmentName = () => {
    return typeof doctor.department === "string"
      ? doctor.department
      : doctor.department?.name;
  };

  return (
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
                  {getDepartmentName()}
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
                  <span className="text-sm text-slate-600">
                    dr.{doctor.name.toLowerCase().replace(/\s/g, '')}@clinic.com
                  </span>
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
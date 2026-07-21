import { useRouter } from "next/navigation";
import { Doctor } from "@/typescript/doctor/doctor";
import { LocationIcon, PhoneIcon, StarIcon, EmptyStarIcon, HalfStarIcon } from "./Icons";

interface DoctorCardProps {
  doctor: Doctor;
  index: number;
  getRandomUserImage: (seed: string) => string;
  getDoctorData: (name: string, index: number) => {
    rating: string;
    phone: string;
    location: string;
  };
}

export const DoctorCard = ({ doctor, index, getRandomUserImage, getDoctorData }: DoctorCardProps) => {
  const router = useRouter();
  const doctorData = getDoctorData(doctor.name, index);
  const rating = parseFloat(doctorData.rating);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent) {
      parent.className = 'relative w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold';
      const span = document.createElement('span');
      span.textContent = doctor.name.charAt(0).toUpperCase();
      parent.appendChild(span);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 hover:border-blue-100 p-5 md:p-6 transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex flex-col md:flex-row gap-5">
        {/* Left - Avatar & Info */}
        <div className="flex items-start gap-4 flex-1">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg shadow-blue-500/25 bg-gradient-to-br from-blue-500 to-indigo-600">
            <img
              src={getRandomUserImage(doctor.name + index)}
              alt={doctor.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                {doctor.name}
              </h3>
              <span className="px-2.5 py-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-[10px] font-semibold rounded-full border border-blue-100">
                ⭐ Featured
              </span>
            </div>
            
            <p className="text-sm text-blue-600 font-medium mt-0.5">
              {typeof doctor.department === "string"
                ? doctor.department
                : doctor.department?.name}
            </p>
            
            <p className="text-sm text-slate-600 mt-1.5 flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <LocationIcon />
              <span className="truncate">{doctorData.location}</span>
            </p>
          </div>
        </div>

        {/* Right - Rating & Actions */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-3 md:gap-4 flex-shrink-0">
          {/* Rating */}
          <div className="flex flex-col items-start sm:items-end min-w-[120px]">
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
          <div className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
            <PhoneIcon />
            <span className="font-medium">{doctorData.phone}</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => router.push(`/doctorDetails/${doctor._id}`)}
              className="flex-1 sm:flex-none px-4 py-2 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 font-medium rounded-xl transition-all duration-300 text-sm"
            >
              View Profile
            </button>
            <button
              onClick={() => router.push(`/doctorDetails/${doctor._id}`)}
              className="flex-1 sm:flex-none px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:scale-105 active:scale-95 text-sm"
            >
              Book Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
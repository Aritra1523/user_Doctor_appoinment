"use client";

import { useDoctorDetails } from '@/customHooks/doctor/useDoctorDetails';
import { DoctorNotFound } from './DoctorNotFound';
import { BackIcon } from './DoctorIcons';
import { DoctorProfile } from './DoctorProfile';
import { BookingSection } from './BookingSection';


interface Props {
  id: string;
}

const DoctorDetails = ({ id }: Props) => {
  const {
    doctor,
    router,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    activeTab,
    setActiveTab,
    generateDoctorData,
  } = useDoctorDetails(id);

  if (!doctor) {
    return <DoctorNotFound />;
  }

  const { rating, fullStars, hasHalfStar, experience, specializations, languages, availability } = generateDoctorData();

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
          <DoctorProfile
            doctor={doctor}
            rating={rating}
            fullStars={fullStars}
            hasHalfStar={hasHalfStar}
            experience={experience}
            specializations={specializations}
            languages={languages}
            availability={availability}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Right Column - Booking Section */}
          <BookingSection
            doctor={doctor}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            availability={availability}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
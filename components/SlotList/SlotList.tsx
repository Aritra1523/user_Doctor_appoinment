"use client";

import { useEffect } from "react";
import useSlotList from "@/customHooks/sloatList/useSlotList";
import { Clock, Calendar, CheckCircle, XCircle } from "lucide-react";

interface Props {
  doctorId: string;
  date: string;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
}

const SlotList = ({
  doctorId,
  date,
  selectedTime,
  setSelectedTime,
}: Props) => {
  const { slots, loading, error, fetchSlots } = useSlotList();

  useEffect(() => {
    if (doctorId && date) {
      fetchSlots(doctorId, date);
    }
  }, [doctorId, date]);

  if (!date) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center mt-4">
        <Calendar className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
        <p className="text-yellow-700 font-medium">
          Please select a date first
        </p>
      </div>
    );
  }

  const formatTime = (time: string) => {
    if (!time) return "";
    let cleanTime = time.replace(/\s*[AP]M\s*/i, "").trim();
    try {
      const [hours, minutes] = cleanTime.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  };

  const getTimeOfDay = (time: string) => {
    const hour = parseInt(time.split(":")[0]);
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  const groupedSlots = slots.reduce((groups: any, slot: any) => {
    const time = slot.startTime || slot.time;
    const period = getTimeOfDay(time);
    if (!groups[period]) groups[period] = [];
    groups[period].push(slot);
    return groups;
  }, {});

  const periodIcons: any = {
    Morning: "🌅",
    Afternoon: "☀️",
    Evening: "🌙",
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header with date */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-4 border border-teal-100">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-teal-600" />
            Available Slots
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Select your preferred time slot
          </p>
        </div>
        <div className="bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm w-full sm:w-auto">
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            📅 {date}
          </span>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-teal-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading slots...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && slots.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 sm:p-8 text-center">
          <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">
            No slots available
          </h3>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Please try selecting a different date
          </p>
        </div>
      )}

      {/* Slots Grid by Time Period */}
      {!loading && slots.length > 0 && (
        <div className="space-y-6">
          {Object.entries(groupedSlots).map(([period, periodSlots]: [string, any]) => (
            <div key={period} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl">{periodIcons[period]}</span>
                <h3 className="text-base sm:text-lg font-semibold text-gray-700">
                  {period}
                </h3>
                <span className="text-xs sm:text-sm text-gray-400">
                  ({periodSlots.length} {periodSlots.length === 1 ? 'slot' : 'slots'})
                </span>
              </div>

              {/*
                Fixed: instead of stepping through breakpoint column counts
                (sm:4, md:5, lg:6, xl:7) — which forces each button to stretch
                to fill wide tracks on a laptop screen — we use auto-fill with
                a fixed minmax size. Each button stays a consistent ~88px-110px
                wide on every screen size, it just wraps to more columns as the
                container gets wider. This is what keeps the mobile look intact
                while fixing desktop.
              */}
              <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,110px))] gap-2 sm:gap-3">
                {periodSlots.map((slot: any) => {
                  const time = slot.startTime || slot.time;
                  const displayTime = formatTime(time);

                  return (
                    <button
                      key={slot._id}
                      disabled={slot.isBooked}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        relative rounded-lg sm:rounded-xl p-2 sm:p-3 transition-all duration-200 text-center
                        min-h-[60px] sm:min-h-[70px] flex flex-col items-center justify-center
                        ${
                          slot.isBooked
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200 opacity-60"
                            : selectedTime === time
                            ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white border-2 border-teal-700 shadow-lg transform scale-105 ring-2 ring-teal-300"
                            : "bg-white text-gray-800 border-2 border-gray-200 hover:border-teal-400 hover:shadow-md hover:scale-105 cursor-pointer"
                        }
                      `}
                    >
                      {slot.isBooked && (
                        <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2">
                          <span className="bg-red-500 text-white text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                            Booked
                          </span>
                        </div>
                      )}

                      {selectedTime === time && !slot.isBooked && (
                        <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2">
                          <span className="bg-green-500 text-white text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                            ✓
                          </span>
                        </div>
                      )}

                      <div className="text-xs sm:text-sm md:text-base font-bold">
                        {displayTime}
                      </div>

                      {slot.endTime && (
                        <div className="text-[8px] sm:text-xs opacity-75 mt-0.5 hidden sm:block">
                          to {formatTime(slot.endTime)}
                        </div>
                      )}

                      {!slot.isBooked && (
                        <div className="mt-0.5 sm:mt-1 flex items-center">
                          <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400"></span>
                          <span className="text-[8px] sm:text-xs ml-1 text-green-600 hidden xs:inline">
                            Available
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Time Confirmation */}
      {selectedTime && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Selected Time</p>
              <p className="text-base sm:text-lg font-bold text-green-700">
                {formatTime(selectedTime)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedTime("")}
            className="text-xs sm:text-sm text-gray-500 hover:text-red-500 transition-colors font-medium"
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
};

export default SlotList;
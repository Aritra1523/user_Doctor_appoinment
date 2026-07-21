import React from 'react';

import SlotList from '../SlotList/SlotList';
import BookAppointment from '../BookAppointment/BookAppointment';
import { Doctor } from '@/typescript/doctor/doctor';
import { CalendarIcon } from './DoctorIcons';

interface BookingSectionProps {
  doctor: Doctor;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  availability: string[];
}

export const BookingSection = ({
  doctor,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  availability,
}: BookingSectionProps) => {
  return (
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
    </div>
  );
};
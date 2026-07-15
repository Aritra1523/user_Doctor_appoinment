"use client";

import useBookAppointment from "@/customHooks/appointment/useBookAppointment";

interface Props {
  doctorId: string;
  selectedDate: string;
  selectedTime: string;
}

const BookAppointment = ({
  doctorId,
  selectedDate,
  selectedTime,
}: Props) => {
  const { loading, handleBookAppointment } =
    useBookAppointment();

  return (
    <button
      disabled={loading}
      onClick={() =>
        handleBookAppointment(
          doctorId,
          selectedDate,
          selectedTime
        )
      }
      className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-3 mt-5"
    >
      {loading ? "Booking..." : "Book Appointment"}
    </button>
  );
};

export default BookAppointment;
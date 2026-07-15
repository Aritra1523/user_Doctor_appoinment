"use client";

import { useEffect } from "react";
import useSlotList from "@/customHooks/sloatList/useSlotList";

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
      <p className="text-gray-500 mt-4">
        Please select a date first.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold">Available Slots</h2>

      {loading && <p>Loading Slots...</p>}

      {error && (
        <p className="text-red-500">{error}</p>
      )}

      {!loading && slots.length === 0 && (
        <p className="text-gray-500">
          No Slots Available
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {slots.map((slot: any) => {
          const time =
            slot.startTime ||
            slot.time;

          return (
            <button
              key={slot._id}
              disabled={slot.isBooked}
              onClick={() =>
                setSelectedTime(time)
              }
              className={`border rounded-lg p-3 transition
                ${
                  slot.isBooked
                    ? "bg-gray-300 cursor-not-allowed"
                    : selectedTime === time
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-green-100 hover:bg-green-300"
                }`}
            >
              <div className="font-semibold">
                {slot.startTime}
              </div>

              {slot.endTime && (
                <div className="text-sm">
                  {slot.endTime}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedTime && (
        <div className="mt-4 text-green-600 font-semibold">
          Selected Time: {selectedTime}
        </div>
      )}
    </div>
  );
};

export default SlotList;
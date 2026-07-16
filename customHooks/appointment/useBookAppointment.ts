"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { bookAppointment } from "@/redux/slice/appointmentSlice/appointmentSlice";

const useBookAppointment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Fix: Correct the state path
  const { loading } = useSelector((state: RootState) => state.appoinment); // Fixed spelling

  const { user } = useSelector((state: RootState) => state.auth);

  const handleBookAppointment = async (
    doctorId: string,
    date: string,
    time: string,
  ) => {
    if (!date) {
      return Swal.fire({
        icon: "warning",
        title: "Please select a date",
      });
    }

    if (!time) {
      return Swal.fire({
        icon: "warning",
        title: "Please select a slot",
      });
    }

    if (!user) {
      return Swal.fire({
        icon: "error",
        title: "User not logged in",
      });
    }

    try {
      await dispatch(
        bookAppointment({
          doctorId,
          userId: user._id || user.id, // User is now guaranteed to exist
          name: user.name,
          date,
          time,
        }),
      ).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Appointment Booked Successfully",
      });

      router.push("/history");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error.message || "Failed to book appointment",
        text: error.response?.data?.message || "Please try again later",
      });
    }
  };

  return {
    loading,
    handleBookAppointment,
  };
};

export default useBookAppointment;
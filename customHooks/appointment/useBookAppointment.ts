"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { bookAppointment } from "@/redux/slice/appointmentSlice/appointmentSlice";

const useBookAppointment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading } = useSelector((state: RootState) => state.appoinment);

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

    try {
      console.log("user", user);
      await dispatch(
        bookAppointment({
          doctorId,
          userId: user?._id ?? user?.id,
          name: user?.name,
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
        title: error,
      });
    }
  };

  return {
    loading,
    handleBookAppointment,
  };
};

export default useBookAppointment;

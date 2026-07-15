"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getSlotList } from "@/redux/slice/doctor/slotSlice";

const useSlotList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { slots, loading, error } = useSelector(
    (state: RootState) => state.slot
  );

  const fetchSlots = (
    doctorId: string,
    date: string
  ) => {
    dispatch(
      getSlotList({
        doctorId,
        date,
      })
    );
  };

  return {
    slots,
    loading,
    error,
    fetchSlots,
  };
};

export default useSlotList;
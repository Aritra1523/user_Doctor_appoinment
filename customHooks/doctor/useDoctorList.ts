"use client";

import { getDoctorList } from "@/redux/slice/doctor/doctorSlice";
import { AppDispatch,RootState } from "@/redux/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useDoctorList = (page: number = 1, limit: number = 5) => {
  const dispatch = useDispatch<AppDispatch>();
  const { doctors, loading, error, totalItems, totalPages } = useSelector(
    (state: RootState) => state.doctor,
  );
  useEffect(()=>{
    dispatch(getDoctorList({ page, limit }))
  },[dispatch, page, limit])

  return {doctors,loading,error,totalItems,totalPages}
};
export default useDoctorList
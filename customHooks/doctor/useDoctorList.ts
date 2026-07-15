"use client";

import { getDoctorList } from "@/redux/slice/doctor/doctorSlice";
import { AppDispatch,RootState } from "@/redux/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useDoctorList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { doctors, loading, error } = useSelector(
    (state: RootState) => state.doctor,
  );
  useEffect(()=>{
    dispatch(getDoctorList())
  },[dispatch])

  return {doctors,loading,error}
};
export default useDoctorList

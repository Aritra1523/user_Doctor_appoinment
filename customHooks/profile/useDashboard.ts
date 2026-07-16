"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getDashboard } from "@/redux/slice/profileSlice/dashboardSlice";

const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  // Call this when the user clicks the profile icon
  const fetchDashboard = useCallback(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  return {
    data,
    loading,
    error,
    fetchDashboard,
  };
};

export default useDashboard;
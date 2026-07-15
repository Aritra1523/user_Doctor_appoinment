"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getHistory } from "@/redux/slice/history/historySlice";

const useHistory = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { history, loading, error } = useSelector(
    (state: RootState) => state.history
  );

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  return {
    history,
    loading,
    error,
  };
};

export default useHistory;
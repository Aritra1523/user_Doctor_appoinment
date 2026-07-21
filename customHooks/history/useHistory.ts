"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getHistory } from "@/redux/slice/history/historySlice";

const useHistory = (doctorId?: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  const { history, loading, error } = useSelector(
    (state: RootState) => state.history
  );

  useEffect(() => {
    const userId = user?._id || user?.id;

    if (!userId) return;

    dispatch(getHistory({ userId, doctorId }));
  }, [dispatch, user, doctorId]);

  return {
    history,
    loading,
    error,
  };
};

export default useHistory;
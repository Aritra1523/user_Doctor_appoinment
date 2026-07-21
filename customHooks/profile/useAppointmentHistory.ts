"use client";

import { useCallback, useMemo, useState } from "react";
import { getHistory, ApiError, type HistoryItem } from "@/lib/api";
import { getAppointmentTimestamp, isUpcoming } from "@/lib/profile/profileHelpers";
import type { AsyncState, HistoryStats } from "@/typescript/profile/profile";

export default function useAppointmentHistory(userId: string | undefined) {
  const [history, setHistory] = useState<AsyncState<HistoryItem[]>>({
    status: "loading",
  });

  const loadHistory = useCallback(async () => {
    if (!userId) return;
    setHistory({ status: "loading" });
    try {
      const data = await getHistory(userId);
      setHistory({ status: "ready", data });
    } catch (err) {
      setHistory({
        status: "error",
        message:
          err instanceof ApiError
            ? `Couldn't load your history (${err.status ?? "network error"}).`
            : "Couldn't load your history.",
      });
    }
  }, [userId]);

  const nextAppointment = useMemo(() => {
    if (history.status !== "ready") return null;
    return (
      history.data
        .filter(isUpcoming)
        .sort((a, b) => getAppointmentTimestamp(a) - getAppointmentTimestamp(b))[0] ?? null
    );
  }, [history]);

  const recentHistory = useMemo(() => {
    if (history.status !== "ready") return [];
    return history.data
      .filter((h) => !isUpcoming(h))
      .sort((a, b) => getAppointmentTimestamp(b) - getAppointmentTimestamp(a))
      .slice(0, 3);
  }, [history]);

  const stats = useMemo<HistoryStats | null>(() => {
    if (history.status !== "ready") return null;
    return {
      total: history.data.length,
      confirmed: history.data.filter((h) => h.status === "Confirmed").length,
      pending: history.data.filter((h) => h.status === "Pending").length,
    };
  }, [history]);

  return {
    history,
    nextAppointment,
    recentHistory,
    stats,
    loadHistory,
  };
}
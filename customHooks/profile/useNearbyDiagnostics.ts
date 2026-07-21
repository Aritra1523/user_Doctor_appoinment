"use client";

import { useCallback, useState } from "react";
import { getNearbyDiagnostics, ApiError, type DiagnosticCentre } from "@/lib/api";
import useGeolocation from "@/customHooks/Geolocation/useGeolocation";
import type { AsyncState } from "@/typescript/profile/profile";

export default function useNearbyDiagnostics() {
  const geo = useGeolocation();

  const [nearby, setNearby] = useState<AsyncState<DiagnosticCentre[]>>({
    status: "loading",
  });
  const [selectedCentreId, setSelectedCentreId] = useState<string | null>(null);

  const loadNearby = useCallback(async () => {
    if (geo.status !== "ready") return;
    setNearby({ status: "loading" });
    try {
      const data = await getNearbyDiagnostics({ lat: geo.lat, lng: geo.lng });
      setNearby({ status: "ready", data });
    } catch (err) {
      setNearby({
        status: "error",
        message:
          err instanceof ApiError
            ? `Couldn't load nearby centres (${err.status ?? "network error"}).`
            : "Couldn't load nearby centres.",
      });
    }
  }, [geo.status, geo.status === "ready" ? geo.lat : null, geo.status === "ready" ? geo.lng : null]);

  return {
    geo,
    nearby,
    selectedCentreId,
    setSelectedCentreId,
    loadNearby,
  };
}
"use client";

import { useEffect, useState } from "react";

export type GeoState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; lat: number; lng: number };

export default function useGeolocation() {
  const [state, setState] = useState<GeoState>({ status: "loading" });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setState({
        status: "error",
        message: "Your browser doesn't support location access.",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          status: "ready",
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        setState({
          status: "error",
          message:
            err.code === err.PERMISSION_DENIED
              ? "Location access was denied. Enable it in your browser settings to see centres near you."
              : "Couldn't get your location. Try again.",
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60_000 }
    );
  }, []);

  return state;
}
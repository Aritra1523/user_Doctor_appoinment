"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getNearbyDiagnostics, ApiError, type DiagnosticCentre } from "@/lib/api";
import { SectionSkeleton, EmptyState, ErrorState } from "@/components/dashboard/DashboardParts";
import useGeolocation from "@/customHooks/Geolocation/useGeolocation";


const NearbyDiagnosticsMap = dynamic(
  () => import("@/components/Map/NearbyDiagnosticsMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-[#EAEEEC] animate-pulse rounded-2xl" />
    ),
  }
);

type AsyncState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: T };

export default function NearbyDiagnosticsPage() {
  const geo = useGeolocation();
  const [centres, setCentres] = useState<AsyncState<DiagnosticCentre[]>>({
    status: "loading",
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (geo.status !== "ready") return;

    let cancelled = false;
    setCentres({ status: "loading" });

    getNearbyDiagnostics({ lat: geo.lat, lng: geo.lng })
      .then((data) => {
        if (!cancelled) setCentres({ status: "ready", data });
      })
      .catch((err) => {
        if (cancelled) return;
        setCentres({
          status: "error",
          message:
            err instanceof ApiError
              ? `Couldn't load nearby centres (${err.status ?? "network error"}).`
              : "Couldn't load nearby centres.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [geo.status, geo.status === "ready" ? geo.lat : null, geo.status === "ready" ? geo.lng : null]);

  return (
    <div className="min-h-screen bg-[#F4F6F5] text-[#101A17] font-sans">
      <header className="sticky top-0 z-40 bg-[#F4F6F5]/90 backdrop-blur-md border-b border-[#DEE3E0]">
        <div className="max-w-[1100px] mx-auto px-6 py-3.5 flex items-center gap-4">
          <Link
            href="/profile"
            className="text-sm font-medium text-[#5B6864] hover:text-[#101A17] transition-colors"
          >
            ← Back
          </Link>
          <h1 className="font-[family-name:var(--font-fraunces)] italic text-lg text-[#101A17]">
            Diagnostics near you
          </h1>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-6 py-8">
        {geo.status === "loading" && (
          <div className="bg-white border border-[#DEE3E0] rounded-2xl p-10 text-center">
            <p className="text-sm text-[#5B6864]">
              Finding your location…
            </p>
          </div>
        )}

        {geo.status === "error" && (
          <ErrorState message={geo.message} onRetry={() => window.location.reload()} />
        )}

        {geo.status === "ready" && (
          <div className="grid md:grid-cols-[1fr_360px] gap-6">
            {/* Map */}
            <div className="h-[420px] md:h-[560px] rounded-2xl overflow-hidden border border-[#DEE3E0]">
              {centres.status === "ready" ? (
                <NearbyDiagnosticsMap
                  center={{ lat: geo.lat, lng: geo.lng }}
                  centres={centres.data}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-[#EAEEEC] animate-pulse" />
              )}
            </div>

            {/* List */}
            <div>
              <p className="text-[11px] font-[family-name:var(--font-geist-mono)] uppercase tracking-wider text-[#5B6864] mb-3">
                {centres.status === "ready"
                  ? `${centres.data.length} centres found`
                  : "Centres"}
              </p>

              {centres.status === "loading" && <SectionSkeleton rows={4} />}

              {centres.status === "error" && (
                <ErrorState
                  message={centres.message}
                  onRetry={() => setCentres({ status: "loading" })}
                />
              )}

              {centres.status === "ready" && centres.data.length === 0 && (
                <EmptyState
                  icon="🧭"
                  title="No centres found"
                  description="There don't seem to be any diagnostic centres near your current location yet."
                />
              )}

              {centres.status === "ready" && centres.data.length > 0 && (
                <div className="flex flex-col gap-2 max-h-[560px] overflow-y-auto pr-1">
                  {centres.data.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={`text-left bg-white border rounded-2xl p-3.5 transition-colors ${
                        selectedId === c.id
                          ? "border-[#0C8577] ring-1 ring-[#0C8577]"
                          : "border-[#DEE3E0] hover:border-[#0C8577]/40"
                      }`}
                    >
                      <p className="text-sm font-medium text-[#101A17]">{c.name}</p>
                      {c.address && (
                        <p className="text-xs text-[#5B6864] mt-0.5">{c.address}</p>
                      )}
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs font-[family-name:var(--font-geist-mono)] text-[#5B6864]">
                          📍 {c.distanceKm.toFixed(1)} km away
                        </span>
                        {c.rating && (
                          <span className="text-xs font-[family-name:var(--font-geist-mono)] text-[#B8862E]">
                            ★ {c.rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
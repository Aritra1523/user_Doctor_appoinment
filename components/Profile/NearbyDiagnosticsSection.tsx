"use client";

import dynamic from "next/dynamic";
import type { DiagnosticCentre } from "@/lib/api";
import {
  SectionSkeleton,
  EmptyState,
  ErrorState,
} from "@/components/dashboard/DashboardParts";
import type { GeoState } from "@/customHooks/Geolocation/useGeolocation";
import type { AsyncState } from "@/typescript/profile/profile";


const NearbyDiagnosticsMap = dynamic(
  () => import("@/components/Map/NearbyDiagnosticsMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-[#EAEEEC] animate-pulse rounded-2xl" />
    ),
  }
);

interface NearbyDiagnosticsSectionProps {
  geo: GeoState;
  nearby: AsyncState<DiagnosticCentre[]>;
  selectedCentreId: string | null;
  onSelectCentre: (id: string) => void;
  onRetry: () => void;
}

export default function NearbyDiagnosticsSection({
  geo,
  nearby,
  selectedCentreId,
  onSelectCentre,
  onRetry,
}: NearbyDiagnosticsSectionProps) {
  return (
    <section aria-labelledby="nearby-heading">
      <h2
        id="nearby-heading"
        className="text-[11px] font-[family-name:var(--font-geist-mono)] uppercase tracking-wider text-[#5B6864] mb-3"
      >
        Diagnostics nearby
      </h2>

      {geo.status === "ready" && nearby.status === "ready" && (
        <div className="h-[260px] rounded-2xl overflow-hidden border border-[#DEE3E0] mb-3">
          <NearbyDiagnosticsMap
            center={{ lat: geo.lat, lng: geo.lng }}
            centres={nearby.data}
            selectedId={selectedCentreId}
            onSelect={onSelectCentre}
          />
        </div>
      )}

      {(geo.status === "loading" || nearby.status === "loading") && (
        <div className="h-[260px] rounded-2xl bg-[#EAEEEC] animate-pulse mb-3" />
      )}

      {nearby.status === "loading" && <SectionSkeleton rows={3} />}
      {nearby.status === "error" && (
        <ErrorState message={nearby.message} onRetry={onRetry} />
      )}

      {nearby.status === "ready" && nearby.data.length === 0 && (
        <EmptyState
          icon="🧭"
          title="No centres found"
          description="Try enabling location access or search by city instead."
        />
      )}

      {nearby.status === "ready" && nearby.data.length > 0 && (
        <div className="flex flex-col gap-2">
          {nearby.data.slice(0, 3).map((centre) => (
            <button
              key={centre.id}
              onClick={() => onSelectCentre(centre.id)}
              className={`text-left w-full bg-white border rounded-2xl p-3.5 flex items-center justify-between transition-colors ${
                selectedCentreId === centre.id
                  ? "border-[#0C8577] ring-1 ring-[#0C8577]"
                  : "border-[#DEE3E0] hover:border-[#0C8577]/40"
              }`}
            >
              <div>
                <p className="text-sm font-medium text-[#101A17]">
                  {centre.name}
                </p>
                <p className="text-xs text-[#5B6864]">
                  📍 {centre.distanceKm.toFixed(1)} km away
                </p>
              </div>
              {centre.rating && (
                <span className="text-xs font-[family-name:var(--font-geist-mono)] text-[#B8862E] flex-shrink-0">
                  ★ {centre.rating.toFixed(1)}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { DiagnosticCentre } from "@/lib/api";

// ── Fix Leaflet's default marker icons ─────────────────────────────────────
// Leaflet's default icon paths break under webpack/Next.js bundling because it
// resolves marker images relative to the page URL instead of the package.
// Point it at the CDN copies instead of leaving broken (blank) pins.
const userIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "nearby-map-user-marker",
});

const centreIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Props {
  center: { lat: number; lng: number };
  centres: DiagnosticCentre[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}

// Recenters/pans the map whenever the selected centre changes, without
// remounting the whole map (which would reset zoom/pan on every click).
function FlyToSelected({
  centres,
  selectedId,
}: {
  centres: DiagnosticCentre[];
  selectedId?: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;
    const centre = centres.find((c) => c.id === selectedId);
    if (centre) {
      map.flyTo([centre.lat, centre.lng], Math.max(map.getZoom(), 14), {
        duration: 0.5,
      });
    }
  }, [selectedId, centres, map]);

  return null;
}

export default function NearbyDiagnosticsMap({
  center,
  centres,
  selectedId,
  onSelect,
}: Props) {
  const safeCentres = Array.isArray(centres) ? centres : [];

  if (!Array.isArray(centres)) {
    console.error(
      "NearbyDiagnosticsMap: expected `centres` to be an array, got:",
      centres
    );
  }

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[center.lat, center.lng]} icon={userIcon}>
        <Popup>You are here</Popup>
      </Marker>

      {safeCentres.map((c) => (
        <Marker
          key={c.id}
          position={[c.lat, c.lng]}
          icon={centreIcon}
          eventHandlers={{
            click: () => onSelect?.(c.id),
          }}
        >
          <Popup>
            <strong>{c.name}</strong>
            <br />
            {c.address}
            <br />
            {c.distanceKm.toFixed(1)} km away
          </Popup>
        </Marker>
      ))}

      <FlyToSelected centres={safeCentres} selectedId={selectedId} />
    </MapContainer>
  );
}
// // lib/api.ts

// export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";

// export type VisitStatus = "upcoming" | "completed" | "cancelled";
// export type VisitType = "consultation" | "diagnostic";

// export interface HistoryItem {
//   id: string;
//   type: VisitType;
//   title: string;
//   subtitle: string;
//   centreName: string;
//   dateTime: string; // ISO 8601
//   status: VisitStatus;
//   reportUrl?: string;
// }

// export interface DiagnosticCentre {
//   id: string;
//   name: string;
//   address?: string;
//   distanceKm: number;
//   rating?: number;
// }

// export class ApiError extends Error {
//   constructor(message: string, public status?: number) {
//     super(message);
//     this.name = "ApiError";
//   }
// }

// async function request<T>(path: string, init?: RequestInit): Promise<T> {
//   const res = await fetch(`${API_BASE}${path}`, {
//     headers: { "Content-Type": "application/json", ...init?.headers },
//     credentials: "include",
//     ...init,
//   });

//   if (!res.ok) {
//     throw new ApiError(`Request to ${path} failed`, res.status);
//   }
//   return res.json() as Promise<T>;
// }

// export function getHistory() {
//   return request<HistoryItem[]>("/user/history");
// }

// export function getNearbyDiagnostics() {
//   return request<DiagnosticCentre[]>("/diagnostic/nearby");
// }

// export function getSlots(doctorId: string, date: string) {
//   return request<string[]>("/user/slot/list", {
//     method: "POST",
//     body: JSON.stringify({ doctorId, date }),
//   });
// }


// lib/api.ts

// lib/api.ts


export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";
 
export type VisitStatus = "Confirmed" | "Pending" | "Cancelled";
 
export interface HistoryItem {
  _id: string;
  doctorId: {
    _id: string;
    name: string;
    departmentId?: string;
    fees?: string;
  };
  userId: string;
  name: string;
  date: string; // ISO 8601, midnight — actual time is in `time`
  time: string; // e.g. "12:09 pm"
  status: VisitStatus;
  createdAt: string;
}
 
export interface DiagnosticCentre {
  id: string;
  name: string;
  address?: string;
  distanceKm: number;
  rating?: number;
  lat: number;
  lng: number;
}
 
export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}
 
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    credentials: "include",
    ...init,
  });
 
  if (!res.ok) {
    throw new ApiError(`Request to ${path} failed`, res.status);
  }
  return res.json() as Promise<T>;
}
 
export function getHistory(userId: string, doctorId?: string) {
  const params = new URLSearchParams({ userId, doctorId: doctorId ?? "" });
  return request<{ data: HistoryItem[] }>(`/user/history?${params}`).then(
    (res) => res.data
  );
}
 
// Backend requires `distance` (meters) — omitting it appears to default to a
// very small/zero radius, so calls without it can come back empty even when
// centres exist a few km away. Default matches the value confirmed to work.
const DEFAULT_NEARBY_DISTANCE_METERS = 100_000_000;
 
export function getNearbyDiagnostics(coords?: {
  lat: number;
  lng: number;
  distance?: number;
}) {
  const query = coords
    ? `?lat=${coords.lat}&lng=${coords.lng}&distance=${
        coords.distance ?? DEFAULT_NEARBY_DISTANCE_METERS
      }`
    : "";
  return request<unknown>(`/diagnostic/nearby${query}`).then(normalizeCentres);
}
 
// Your backend might return a plain array, or wrap it as { data: [...] },
// { centres: [...] }, { results: [...] }, etc. — and field names can vary
// (lat/latitude, lng/longitude, distance/distanceKm). This normalizes
// whatever shape comes back into a consistent DiagnosticCentre[] so the map
// never gets handed something that isn't an array.
function normalizeCentres(raw: unknown): DiagnosticCentre[] {
  const list: any[] | null = Array.isArray(raw)
    ? raw
    : Array.isArray((raw as any)?.data)
    ? (raw as any).data
    : Array.isArray((raw as any)?.centres)
    ? (raw as any).centres
    : Array.isArray((raw as any)?.results)
    ? (raw as any).results
    : null;
 
  if (!list) {
    console.error(
      "getNearbyDiagnostics: expected an array (optionally wrapped in data/centres/results), got:",
      raw
    );
    throw new ApiError(
      "Unexpected response shape from /diagnostic/nearby — check the console for the raw payload."
    );
  }
 
  return list
    .map((item): DiagnosticCentre => ({
      id: String(item.id ?? item._id ?? item.centreId ?? item.name),
      name: item.name ?? item.centreName ?? "Unnamed centre",
      address: item.address ?? item.location?.address,
      distanceKm: Number(
        item.distanceKm ??
          item.distance_km ??
          // Mongo $geoNear returns `distance` in meters, not km.
          (item.distance != null ? item.distance / 1000 : 0)
      ),
      rating: item.rating != null ? Number(item.rating) : undefined,
      lat: Number(
        item.lat ??
          item.latitude ??
          item.location?.lat ??
          item.location?.coordinates?.[1] ??
          item.coordinates?.[1]
      ),
      lng: Number(
        item.lng ??
          item.longitude ??
          item.location?.lng ??
          item.location?.coordinates?.[0] ??
          item.coordinates?.[0]
      ),
    }))
    // Drop any centre we couldn't get valid coordinates for — Leaflet throws
    // if you hand it a marker position of NaN/NaN, and a few records in this
    // dataset have swapped/garbage lat-lng (e.g. lat: 88.42, which isn't a
    // valid latitude at all) that would otherwise render way off the map.
    .filter(
      (c) =>
        Number.isFinite(c.lat) &&
        Number.isFinite(c.lng) &&
        c.lat >= -90 &&
        c.lat <= 90 &&
        c.lng >= -180 &&
        c.lng <= 180
    );
}
 
export function getSlots(doctorId: string, date: string) {
  return request<string[]>("/user/slot/list", {
    method: "POST",
    body: JSON.stringify({ doctorId, date }),
  });
}
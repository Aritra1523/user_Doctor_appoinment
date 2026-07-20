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

export type VisitStatus = "upcoming" | "completed" | "cancelled";
export type VisitType = "consultation" | "diagnostic";

export interface HistoryItem {
  id: string;
  type: VisitType;
  title: string;
  subtitle: string;
  centreName: string;
  dateTime: string; // ISO 8601
  status: VisitStatus;
  reportUrl?: string;
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

export function getHistory() {
  return request<HistoryItem[]>("/user/history");
}

export function getNearbyDiagnostics(coords?: { lat: number; lng: number }) {
  const query = coords ? `?lat=${coords.lat}&lng=${coords.lng}` : "";
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
        item.distanceKm ?? item.distance_km ?? item.distance ?? 0
      ),
      rating: item.rating != null ? Number(item.rating) : undefined,
      lat: Number(
        item.lat ?? item.latitude ?? item.location?.lat ?? item.coordinates?.[1]
      ),
      lng: Number(
        item.lng ?? item.longitude ?? item.location?.lng ?? item.coordinates?.[0]
      ),
    }))
    // Drop any centre we couldn't get valid coordinates for — Leaflet throws
    // if you hand it a marker position of NaN/NaN.
    .filter((c) => Number.isFinite(c.lat) && Number.isFinite(c.lng));
}

export function getSlots(doctorId: string, date: string) {
  return request<string[]>("/user/slot/list", {
    method: "POST",
    body: JSON.stringify({ doctorId, date }),
  });
}
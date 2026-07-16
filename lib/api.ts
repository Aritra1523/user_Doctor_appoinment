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

export function getNearbyDiagnostics() {
  return request<DiagnosticCentre[]>("/diagnostic/nearby");
}

export function getSlots(doctorId: string, date: string) {
  return request<string[]>("/user/slot/list", {
    method: "POST",
    body: JSON.stringify({ doctorId, date }),
  });
}
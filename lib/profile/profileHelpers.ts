import type { HistoryItem } from "@/lib/api";
import type { ProfileFieldRow } from "@/typescript/profile/profile";

export function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// Pinned locale avoids server/client hydration mismatch
export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// Real API splits date ("2026-07-26T00:00:00.000Z") and time ("12:09 pm")
// into separate fields — combine them into one timestamp for sorting/compares.
export function getAppointmentTimestamp(item: HistoryItem) {
  const datePart = item.date.slice(0, 10); // YYYY-MM-DD
  const parsed = new Date(`${datePart} ${item.time}`);
  return Number.isNaN(parsed.getTime())
    ? new Date(item.date).getTime()
    : parsed.getTime();
}

export function isUpcoming(item: HistoryItem) {
  return (
    (item.status === "Confirmed" || item.status === "Pending") &&
    getAppointmentTimestamp(item) >= Date.now()
  );
}

// Builds a display name from /user/dashboard's first_name/last_name (with a
// couple of fallback shapes for safety), defaulting to a generic label.
export function getDisplayName(raw: any): string {
  const source = raw?.user ?? raw ?? {};
  const first = source.first_name ?? source.firstName ?? "";
  const last = source.last_name ?? source.lastName ?? "";
  const combined = `${first} ${last}`.trim();
  return combined || source.name || source.fullName || "Patient";
}

// Two-letter initials from a display name, e.g. "acac asdas" -> "AA".
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "PT";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function pickProfileFields(raw: any): ProfileFieldRow[] {
  const source = raw?.user ?? raw ?? {};
  const rows: ProfileFieldRow[] = [];

  const add = (label: string, value: unknown) => {
    if (value === null || value === undefined || value === "") return;
    rows.push({ label, value: String(value) });
  };

  const first = source.first_name ?? source.firstName;
  const last = source.last_name ?? source.lastName;
  const combinedName = [first, last].filter(Boolean).join(" ");

  add("Name", combinedName || source.name || source.fullName);
  add("Email", source.email);
  add("Phone", source.phone ?? source.phoneNumber ?? source.mobile);
  add("Address", source.address);
  add("Role", source.role);
  add("Member since", source.createdAt ?? source.joinedAt);

  return rows;
}

export function getPatientId(raw: any, fallbackInitials: string) {
  const source = raw?.user ?? raw ?? {};
  const id = source._id ?? source.id ?? source.patientId;
  if (id) return `MS-${String(id).slice(-5).toUpperCase()}`;
  return `MS-${fallbackInitials}00`;
}
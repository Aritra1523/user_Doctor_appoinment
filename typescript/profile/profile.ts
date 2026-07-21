// Shared types for the profile / dashboard page and its hooks & components.

export type AsyncState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: T };

export interface CurrentUser {
  name: string;
  initials: string;
}

// Shape of the object returned inside `data` by GET /user/dashboard.
// Marked loosely (most fields optional) since the API may add/omit fields;
// helpers should stay defensive rather than assume every field is present.
export interface DashboardUser {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  role?: string;
  is_verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
}

export interface ProfileFieldRow {
  label: string;
  value: string;
}

export interface HistoryStats {
  total: number;
  confirmed: number;
  pending: number;
}
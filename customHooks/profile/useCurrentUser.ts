"use client";

import { useMemo } from "react";
import { getDisplayName, getInitials } from "@/lib/profile/profileHelpers";
import type { CurrentUser } from "@/typescript/profile/profile";

const FALLBACK_USER: CurrentUser = { name: "Patient", initials: "PT" };

// Derives the header/greeting identity from the /user/dashboard API response
// (fetched by useProfileMenu). Falls back to a generic placeholder until the
// profile has loaded.
export default function useCurrentUser(profileData: unknown): CurrentUser {
  return useMemo(() => {
    if (!profileData) return FALLBACK_USER;
    const name = getDisplayName(profileData);
    return { name, initials: getInitials(name) };
  }, [profileData]);
}
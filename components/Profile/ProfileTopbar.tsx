"use client";

import Link from "next/link";
import ProfileMenu from "@/components/Profile/ProfileMenu";
import type { CurrentUser, ProfileFieldRow } from "@/typescript/profile/profile";

interface ProfileTopbarProps {
  user: CurrentUser;
  patientId: string;
  showProfile: boolean;
  profileLoading: boolean;
  profileError: string | null;
  profileData: unknown;
  profileFields: ProfileFieldRow[];
  loggingOut: boolean;
  onToggleProfile: () => void;
  onRetryProfile: () => void;
  onLogout: () => void;
}

export default function ProfileTopbar({
  user,
  patientId,
  showProfile,
  profileLoading,
  profileError,
  profileData,
  profileFields,
  loggingOut,
  onToggleProfile,
  onRetryProfile,
  onLogout,
}: ProfileTopbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#F4F6F5]/90 backdrop-blur-md border-b border-[#DEE3E0]">
      <div className="max-w-[1100px] mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-fraunces)] italic font-semibold text-xl text-[#101A17] flex items-center gap-2"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <path
              d="M12 21s-7.5-4.6-10-9.2C.4 8.1 2.3 4 6.2 4c2.1 0 3.7 1.2 5.8 3.7C14.1 5.2 15.7 4 17.8 4c3.9 0 5.8 4.1 4.2 7.8C19.5 16.4 12 21 12 21z"
              stroke="#0C8577"
              strokeWidth="1.6"
            />
          </svg>
          MediSlot
        </Link>

        <nav className="hidden md:flex gap-7 text-sm font-medium text-[#5B6864]">
          <Link href="/profile" className="text-[#101A17] font-semibold">
            Overview
          </Link>
          <Link href="/doctorlist" className="hover:text-[#101A17] transition-colors">
            Find Doctor
          </Link>
          <Link href="/history" className="hover:text-[#101A17] transition-colors">
            History
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            aria-label="Notifications"
            className="w-9 h-9 rounded-full border border-[#DEE3E0] flex items-center justify-center hover:bg-white transition-colors"
          >
            🔔
          </button>
          <div className="relative">
            <button
              onClick={onToggleProfile}
              aria-label="Profile"
              className="w-9 h-9 rounded-full bg-[#0C8577] flex items-center justify-center font-[family-name:var(--font-geist-mono)] text-xs font-bold text-white hover:ring-2 hover:ring-[#0C8577]/30 transition-shadow"
            >
              {user.initials}
            </button>

            {showProfile && (
              <ProfileMenu
                user={user}
                patientId={patientId}
                profileLoading={profileLoading}
                profileError={profileError}
                profileData={profileData}
                profileFields={profileFields}
                loggingOut={loggingOut}
                onRetry={onRetryProfile}
                onLogout={onLogout}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
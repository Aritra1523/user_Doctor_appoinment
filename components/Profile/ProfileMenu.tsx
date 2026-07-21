"use client";

import type { CurrentUser, ProfileFieldRow } from "@/typescript/profile/profile";

interface ProfileMenuProps {
  user: CurrentUser;
  patientId: string;
  profileLoading: boolean;
  profileError: string | null;
  profileData: unknown;
  profileFields: ProfileFieldRow[];
  loggingOut: boolean;
  onRetry: () => void;
  onLogout: () => void;
}

export default function ProfileMenu({
  user,
  patientId,
  profileLoading,
  profileError,
  profileData,
  profileFields,
  loggingOut,
  onRetry,
  onLogout,
}: ProfileMenuProps) {
  return (
    <div className="absolute right-0 mt-2 w-72 bg-white border border-[#DEE3E0] rounded-2xl shadow-lg shadow-[#101A17]/5 p-4 z-50">
      <div className="flex items-center gap-3 pb-3 mb-3 border-b border-dashed border-[#DEE3E0]">
        <div className="w-10 h-10 rounded-full bg-[#0C8577] flex items-center justify-center font-[family-name:var(--font-geist-mono)] text-xs font-bold text-white flex-shrink-0">
          {user.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#101A17] truncate">
            {user.name}
          </p>
          <p className="text-[11px] font-[family-name:var(--font-geist-mono)] text-[#5B6864] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0C8577] inline-block" />
            {patientId}
          </p>
        </div>
      </div>

      {profileLoading && <p className="text-sm text-[#5B6864]">Loading…</p>}

      {!profileLoading && profileError && (
        <div className="text-sm text-[#B23A44] mb-3">
          <p className="mb-2">{profileError}</p>
          <button
            onClick={onRetry}
            className="text-xs font-semibold px-3 py-1 rounded-full border border-[#D64550] text-[#D64550] hover:bg-[#D64550] hover:text-white transition-colors"
          >
            Try again
          </button>
        </div>
      )}

      {!profileLoading && !profileError && profileFields.length > 0 && (
        <dl className="mb-3 flex flex-col gap-1.5">
          {profileFields.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-3 text-sm"
            >
              <dt className="text-xs text-[#5B6864]">{row.label}</dt>
              <dd className="text-[#101A17] font-medium truncate text-right">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {!profileLoading &&
        !profileError &&
        Boolean(profileData) &&
        profileFields.length === 0 && (
          <p className="text-sm text-[#5B6864] mb-3">Profile loaded.</p>
        )}

      {!profileLoading && !profileError && !profileData && (
        <p className="text-sm text-[#5B6864] mb-3">
          Open this panel to load your details.
        </p>
      )}

      <button
        onClick={onLogout}
        disabled={loggingOut}
        className="w-full text-sm font-semibold px-3 py-2 rounded-lg border border-[#DEE3E0] text-[#D64550] hover:bg-[#D64550] hover:text-white hover:border-[#D64550] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loggingOut ? "Logging out…" : "Log out"}
      </button>
    </div>
  );
}
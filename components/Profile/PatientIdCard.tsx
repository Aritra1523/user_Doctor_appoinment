"use client";

import Link from "next/link";
import { greeting } from "@/lib/profile/profileHelpers";
import type { CurrentUser } from "@/typescript/profile/profile";

interface PatientIdCardProps {
  user: CurrentUser;
  patientId: string;
  nearbyCount: number | null;
  pendingCount: number | null;
}

export default function PatientIdCard({
  user,
  patientId,
  nearbyCount,
  pendingCount,
}: PatientIdCardProps) {
  return (
    <section className="mb-8 bg-white border border-[#DEE3E0] rounded-3xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Identity stub */}
        <div className="flex-1 p-6 md:p-7 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#0C8577] flex items-center justify-center font-[family-name:var(--font-geist-mono)] text-base font-bold text-white flex-shrink-0 ring-4 ring-[#E4F1EE]">
            {user.initials}
          </div>
          <div className="min-w-0">
            <h1 className="font-[family-name:var(--font-fraunces)] italic text-[26px] leading-tight text-[#101A17]">
              {greeting()}, {user.name}
            </h1>
            <p className="text-sm text-[#5B6864] mt-0.5">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-[11px] font-[family-name:var(--font-geist-mono)] text-[#5B6864] mt-2 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0C8577] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0C8577]" />
              </span>
              PATIENT ID · {patientId}
            </p>
          </div>
        </div>

        {/* Perforated divider */}
        <div className="hidden md:block w-px border-l border-dashed border-[#DEE3E0] my-4" />
        <div className="md:hidden h-px border-t border-dashed border-[#DEE3E0] mx-6" />

        {/* Quick actions stub */}
        <div className="flex-1 p-6 md:p-7">
          <p className="text-[11px] font-[family-name:var(--font-geist-mono)] uppercase tracking-wider text-[#5B6864] mb-3">
            Quick actions
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            <Link
              href="/diagnostics/nearby"
              className="group bg-[#F4F6F5] hover:bg-[#E4F1EE] border border-[#DEE3E0] rounded-xl p-3 transition-colors"
            >
              <div className="text-lg mb-1">📍</div>
              <p className="text-xs font-medium text-[#101A17] leading-tight">
                Diagnostics
              </p>
              <p className="text-[10px] text-[#5B6864] mt-0.5">
                {nearbyCount !== null ? `${nearbyCount} nearby` : "Nearby"}
              </p>
            </Link>

            <Link
              href="/doctorlist"
              className="group bg-[#F4F6F5] hover:bg-[#E4F1EE] border border-[#DEE3E0] rounded-xl p-3 transition-colors"
            >
              <div className="text-lg mb-1">🗓️</div>
              <p className="text-xs font-medium text-[#101A17] leading-tight">
                Book visit
              </p>
              <p className="text-[10px] text-[#5B6864] mt-0.5">Pick a slot</p>
            </Link>

            <Link
              href="/history"
              className="group bg-[#F4F6F5] hover:bg-[#E4F1EE] border border-[#DEE3E0] rounded-xl p-3 transition-colors"
            >
              <div className="text-lg mb-1">📄</div>
              <p className="text-xs font-medium text-[#101A17] leading-tight">
                History
              </p>
              <p className="text-[10px] text-[#5B6864] mt-0.5">
                {pendingCount !== null ? `${pendingCount} pending` : "See visits"}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
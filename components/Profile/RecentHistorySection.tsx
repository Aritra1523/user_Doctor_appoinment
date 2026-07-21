"use client";

import Link from "next/link";
import type { HistoryItem } from "@/lib/api";
import {
  StatusBadge,
  SectionSkeleton,
  EmptyState,
  ErrorState,
} from "@/components/dashboard/DashboardParts";
import { formatDateTime } from "@/lib/profile/profileHelpers";
import type { AsyncState } from "@/typescript/profile/profile";

interface RecentHistorySectionProps {
  history: AsyncState<HistoryItem[]>;
  recentHistory: HistoryItem[];
  onRetry: () => void;
}

export default function RecentHistorySection({
  history,
  recentHistory,
  onRetry,
}: RecentHistorySectionProps) {
  return (
    <section aria-labelledby="recent-history-heading">
      <div className="flex items-center justify-between mb-3">
        <h2
          id="recent-history-heading"
          className="text-[11px] font-[family-name:var(--font-geist-mono)] uppercase tracking-wider text-[#5B6864]"
        >
          Recent history
        </h2>
        <Link
          href="/history"
          className="text-xs font-semibold text-[#0C8577] hover:text-[#095F55]"
        >
          View all
        </Link>
      </div>

      {history.status === "loading" && <SectionSkeleton rows={3} />}
      {history.status === "error" && (
        <ErrorState message={history.message} onRetry={onRetry} />
      )}

      {history.status === "ready" && recentHistory.length === 0 && (
        <EmptyState
          icon="🗂️"
          title="No past visits yet"
          description="Completed and cancelled visits will show up here."
        />
      )}

      {history.status === "ready" && recentHistory.length > 0 && (
        <div className="flex flex-col gap-2">
          {recentHistory.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-[#DEE3E0] rounded-2xl p-3.5 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#E4F1EE] flex items-center justify-center flex-shrink-0 text-sm">
                🩺
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#101A17] truncate">
                  {item.doctorId?.name ?? "Doctor"}
                </p>
                <p className="text-xs font-[family-name:var(--font-geist-mono)] text-[#5B6864]">
                  {formatDateTime(item.date)} · {item.time}
                </p>
              </div>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
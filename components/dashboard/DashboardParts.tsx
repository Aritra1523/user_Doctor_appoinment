// components/dashboard/DashboardParts.tsx
"use client";

import { VisitStatus } from "@/lib/api";

const STATUS_STYLES: Record<VisitStatus, { bg: string; text: string; label: string }> = {
  upcoming:  { bg: "#E6EBDE", text: "#1F4D3F", label: "Upcoming"  },
  completed: { bg: "#E6EBDE", text: "#1F4D3F", label: "Completed" },
  cancelled: { bg: "#f3d9d9", text: "#a13d3d", label: "Cancelled" },
};

export function StatusBadge({ status }: { status: VisitStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className="text-xs font-mono px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{ background: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
}

export function SectionSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-2" role="status" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-16 rounded-xl bg-[#E9E6DA] animate-pulse" />
      ))}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-10 px-6 bg-[#FAF9F4] border border-dashed border-[#DCD5C4] rounded-xl">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="font-serif text-base text-[#123329] mb-1">{title}</p>
      <p className="text-sm text-[#3d554d] mb-4 max-w-[320px] mx-auto">{description}</p>
      {action}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="text-center py-8 px-6 bg-[#fdf2f2] border border-[#f0d3d3] rounded-xl">
      <p className="text-sm text-[#a13d3d] mb-3">{message}</p>
      <button
        onClick={onRetry}
        className="text-sm font-semibold px-4 py-1.5 rounded-full border border-[#a13d3d] text-[#a13d3d] hover:bg-[#a13d3d] hover:text-white transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white border border-[#DCD5C4] rounded-2xl p-5">
      <p className="text-xs font-mono uppercase tracking-wide text-[#3d554d] mb-1">{label}</p>
      <p className="font-serif text-3xl text-[#123329]">{value}</p>
    </div>
  );
}
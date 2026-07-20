
"use client";

import { VisitStatus } from "@/lib/api";

const STATUS_STYLES: Record<VisitStatus, { bg: string; text: string; label: string }> = {
  upcoming: { bg: "#E4F1EE", text: "#0C8577", label: "Upcoming" },
  completed: { bg: "#E4F1EE", text: "#0C8577", label: "Completed" },
  cancelled: { bg: "#FBE8E9", text: "#D64550", label: "Cancelled" },
};

export function StatusBadge({ status }: { status: VisitStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className="text-[11px] font-[family-name:var(--font-geist-mono)] font-medium tracking-wide px-2.5 py-1 rounded-full whitespace-nowrap"
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
        <div
          key={i}
          className="h-16 rounded-2xl bg-[#EAEEEC] animate-pulse"
          style={{ animationDelay: `${i * 80}ms` }}
        />
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
    <div className="text-center py-10 px-6 bg-white border border-dashed border-[#C7D0CC] rounded-2xl">
      <div className="text-2xl mb-2 opacity-80">{icon}</div>
      <p className="font-[family-name:var(--font-fraunces)] italic text-base text-[#101A17] mb-1">
        {title}
      </p>
      <p className="text-sm text-[#5B6864] mb-4 max-w-[320px] mx-auto">{description}</p>
      {action}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="text-center py-8 px-6 bg-[#FCF1F1] border border-[#F2D3D5] rounded-2xl">
      <p className="text-sm text-[#B23A44] mb-3">{message}</p>
      <button
        onClick={onRetry}
        className="text-xs font-[family-name:var(--font-geist-mono)] font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full border border-[#D64550] text-[#D64550] hover:bg-[#D64550] hover:text-white transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="relative bg-white border border-[#DEE3E0] rounded-2xl p-5 overflow-hidden">
      <p className="text-[11px] font-[family-name:var(--font-geist-mono)] uppercase tracking-wider text-[#5B6864] mb-2">
        {label}
      </p>
      <p className="font-[family-name:var(--font-geist-mono)] text-[32px] leading-none text-[#101A17] tabular-nums">
        {value}
      </p>
      <span className="absolute left-0 bottom-0 h-[3px] w-10 bg-[#0C8577] rounded-full" />
    </div>
  );
}
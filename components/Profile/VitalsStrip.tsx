"use client";

import { StatCard } from "@/components/dashboard/DashboardParts";
import type { HistoryStats } from "@/typescript/profile/profile";

interface VitalsStripProps {
  stats: HistoryStats;
}

export default function VitalsStrip({ stats }: VitalsStripProps) {
  return (
    <section className="mb-10 grid grid-cols-3 gap-3">
      <StatCard label="Total visits" value={stats.total} />
      <StatCard label="Confirmed" value={stats.confirmed} />
      <StatCard label="Pending" value={stats.pending} />
    </section>
  );
}
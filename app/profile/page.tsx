


"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import {
  getHistory,
  getNearbyDiagnostics,
  ApiError,
  type HistoryItem,
  type DiagnosticCentre,
} from "@/lib/api";
import {
  StatusBadge,
  SectionSkeleton,
  EmptyState,
  ErrorState,
  StatCard,
} from "@/components/dashboard/DashboardParts";
import DoctorList from "@/components/Doctorlist/DoctorList";
import Footer from "@/components/Footer/Footer";
import useDashboard from "@/customHooks/profile/useDashboard";

// ── Auth hook — replace with your real session hook ───────────────────────────
function useCurrentUser() {
  return { name: "Priya", initials: "PS" };
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// Pinned locale avoids server/client hydration mismatch
function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// ── Async state type ──────────────────────────────────────────────────────────
type AsyncState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: T };


function pickProfileFields(raw: any) {
  const source = raw?.user ?? raw ?? {};
  const rows: { label: string; value: string }[] = [];

  const add = (label: string, value: unknown) => {
    if (value === null || value === undefined || value === "") return;
    rows.push({ label, value: String(value) });
  };

  add("Name", source.name ?? source.fullName);
  add("Email", source.email);
  add("Phone", source.phone ?? source.phoneNumber ?? source.mobile);
  add("Role", source.role);
  add("Member since", source.createdAt ?? source.joinedAt);

  return rows;
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const user = useCurrentUser();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Profile click -> fetch + show /user/dashboard API data
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    fetchDashboard,
  } = useDashboard();
  const [showProfile, setShowProfile] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleProfileClick = () => {
    setShowProfile((prev) => !prev);
    // fetch every time it's opened and data isn't already loaded
    if (!showProfile) {
      fetchDashboard();
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await dispatch(logoutUser());
    } finally {
      setShowProfile(false);
      setLoggingOut(false);
      router.push("/auth/login");
    }
  };

  const profileFields = useMemo(
    () => (profileData ? pickProfileFields(profileData) : []),
    [profileData]
  );

  const [history, setHistory] = useState<AsyncState<HistoryItem[]>>({
    status: "loading",
  });
  const [nearby, setNearby] = useState<AsyncState<DiagnosticCentre[]>>({
    status: "loading",
  });

  const loadHistory = useCallback(async () => {
    setHistory({ status: "loading" });
    try {
      const res = await getHistory();
      // unwrap if API returns { data: [...] } or { appointments: [...] }
      const data = Array.isArray(res)
        ? res
        : ((res as any).data ?? (res as any).appointments ?? []);
      setHistory({ status: "ready", data });
    } catch (err) {
      setHistory({
        status: "error",
        message:
          err instanceof ApiError
            ? `Couldn't load your history (${err.status ?? "network error"}).`
            : "Couldn't load your history.",
      });
    }
  }, []);

  const loadNearby = useCallback(async () => {
    setNearby({ status: "loading" });
    try {
      const res = await getNearbyDiagnostics();
      const data = Array.isArray(res)
        ? res
        : ((res as any).data ?? (res as any).centres ?? []);
      setNearby({ status: "ready", data });
    } catch (err) {
      setNearby({
        status: "error",
        message:
          err instanceof ApiError
            ? `Couldn't load nearby centres (${err.status ?? "network error"}).`
            : "Couldn't load nearby centres.",
      });
    }
  }, []);

  useEffect(() => {
    loadHistory();
    loadNearby();
  }, [loadHistory, loadNearby]);

  // ── Derived data ────────────────────────────────────────────────────────────
  const nextAppointment = useMemo(() => {
    if (history.status !== "ready") return null;
    return (
      history.data
        .filter((h) => h.status === "upcoming")
        .sort(
          (a, b) =>
            new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
        )[0] ?? null
    );
  }, [history]);

  const recentHistory = useMemo(() => {
    if (history.status !== "ready") return [];
    return history.data
      .filter((h) => h.status !== "upcoming")
      .sort(
        (a, b) =>
          new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
      )
      .slice(0, 3);
  }, [history]);

  const stats = useMemo(() => {
    if (history.status !== "ready") return null;
    return {
      total: history.data.length,
      upcoming: history.data.filter((h) => h.status === "upcoming").length,
      reportsReady: history.data.filter(
        (h) => h.status === "completed" && h.reportUrl,
      ).length,
    };
  }, [history]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F5F3EC] text-[#132621] font-sans">
      {/* Topbar */}
      <header className="sticky top-0 z-40 bg-[#F5F3EC]/90 backdrop-blur-md border-b border-[#DCD5C4]">
        <div className="max-w-[1100px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif font-semibold text-xl text-[#123329] flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path
                d="M12 21s-7.5-4.6-10-9.2C.4 8.1 2.3 4 6.2 4c2.1 0 3.7 1.2 5.8 3.7C14.1 5.2 15.7 4 17.8 4c3.9 0 5.8 4.1 4.2 7.8C19.5 16.4 12 21 12 21z"
                stroke="#1F4D3F"
                strokeWidth="1.6"
              />
            </svg>
            MediSlot
          </Link>

          <nav className="hidden md:flex gap-7 text-sm font-medium text-[#3d554d]">
            <Link href="/dashbord" className="text-[#123329] font-semibold">
              Dashboard
            </Link>
            <Link href="/doctorlist" className="hover:text-[#123329]">
              Find Doctor
            </Link>
            <Link href="/history" className="hover:text-[#123329]">
              History
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              aria-label="Notifications"
              className="w-9 h-9 rounded-full border border-[#DCD5C4] flex items-center justify-center hover:bg-white transition-colors"
            >
              🔔
            </button>
            <div className="relative">
              <button
                onClick={handleProfileClick}
                aria-label="Profile"
                className="w-9 h-9 rounded-full bg-[#E6EBDE] flex items-center justify-center font-mono text-xs font-bold text-[#1F4D3F] hover:ring-2 hover:ring-[#1F4D3F]/30 transition-shadow"
              >
                {user.initials}
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-[#DCD5C4] rounded-xl shadow-lg p-4 z-50">
                  <div className="flex items-center gap-3 pb-3 mb-3 border-b border-[#DCD5C4]">
                    <div className="w-10 h-10 rounded-full bg-[#E6EBDE] flex items-center justify-center font-mono text-xs font-bold text-[#1F4D3F] flex-shrink-0">
                      {user.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#123329] truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-[#3d554d]">My profile</p>
                    </div>
                  </div>

                  {profileLoading && (
                    <p className="text-sm text-[#3d554d]">Loading…</p>
                  )}

                  {!profileLoading && profileError && (
                    <div className="text-sm text-[#a13d3d] mb-3">
                      <p className="mb-2">{profileError}</p>
                      <button
                        onClick={fetchDashboard}
                        className="text-xs font-semibold px-3 py-1 rounded-full border border-[#a13d3d] text-[#a13d3d] hover:bg-[#a13d3d] hover:text-white transition-colors"
                      >
                        Try again
                      </button>
                    </div>
                  )}

                  {!profileLoading &&
                    !profileError &&
                    profileFields.length > 0 && (
                      <dl className="mb-3 flex flex-col gap-1.5">
                        {profileFields.map((row) => (
                          <div
                            key={row.label}
                            className="flex items-baseline justify-between gap-3 text-sm"
                          >
                            <dt className="text-xs text-[#3d554d]">
                              {row.label}
                            </dt>
                            <dd className="text-[#123329] font-medium truncate text-right">
                              {row.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}

                  {!profileLoading &&
                    !profileError &&
                    profileData &&
                    profileFields.length === 0 && (
                      <p className="text-sm text-[#3d554d] mb-3">
                        Profile loaded.
                      </p>
                    )}

                  {!profileLoading && !profileError && !profileData && (
                    <p className="text-sm text-[#3d554d] mb-3">
                      No data yet.
                    </p>
                  )}

                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="w-full text-sm font-semibold px-3 py-2 rounded-lg border border-[#DCD5C4] text-[#a13d3d] hover:bg-[#a13d3d] hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loggingOut ? "Logging out…" : "Log out"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-6 py-8">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="font-serif text-[28px] text-[#123329]">
            {greeting()}, {user.name}
          </h1>
          <p className="text-sm text-[#3d554d]">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Next appointment */}

        {/* Quick actions */}
        <section className="mb-8">
          <p className="text-xs font-mono uppercase tracking-wide text-[#3d554d] mb-3">
            Quick actions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/diagnostics/nearby"
              className="bg-white border border-[#DCD5C4] rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="text-xl mb-2">📍</div>
              <p className="font-medium text-sm text-[#123329]">
                Find diagnostics nearby
              </p>
              <p className="text-xs text-[#3d554d] mt-0.5">
                {nearby.status === "ready"
                  ? `${nearby.data.length} centres near you`
                  : "Browse nearby centres"}
              </p>
            </Link>

            <Link
              href="/doctorlist"
              className="bg-white border border-[#DCD5C4] rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="text-xl mb-2">🗓️</div>
              <p className="font-medium text-sm text-[#123329]">
                Book appointment
              </p>
              <p className="text-xs text-[#3d554d] mt-0.5">
                Pick a doctor and slot
              </p>
            </Link>

            <Link
              href="/history"
              className="bg-white border border-[#DCD5C4] rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="text-xl mb-2">📄</div>
              <p className="font-medium text-sm text-[#123329]">View reports</p>
              <p className="text-xs text-[#3d554d] mt-0.5">
                {stats
                  ? `${stats.reportsReady} ready to view`
                  : "See past results"}
              </p>
            </Link>
          </div>
        </section>

        {/* Stats */}
        {stats && (
          <section className="mb-8 grid grid-cols-3 gap-3">
            <StatCard label="Total visits" value={stats.total} />
            <StatCard label="Upcoming" value={stats.upcoming} />
            <StatCard label="Reports ready" value={stats.reportsReady} />
          </section>
        )}
        <DoctorList />
        {/* History + Nearby */}
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-6">
          {/* Recent history */}
          <section aria-labelledby="recent-history-heading">
            <div className="flex items-center justify-between mb-3">
              <h2
                id="recent-history-heading"
                className="text-xs font-mono uppercase tracking-wide text-[#3d554d]"
              >
                Recent history
              </h2>
              <Link
                href="/history"
                className="text-xs font-semibold text-[#1F4D3F] hover:text-[#123329]"
              >
                View all
              </Link>
            </div>

            {history.status === "loading" && <SectionSkeleton rows={3} />}
            {history.status === "error" && (
              <ErrorState message={history.message} onRetry={loadHistory} />
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
                    key={item.id}
                    className="bg-white border border-[#DCD5C4] rounded-xl p-3.5 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#E6EBDE] flex items-center justify-center flex-shrink-0 text-sm">
                      {item.type === "consultation" ? "🩺" : "🧪"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#123329] truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#3d554d]">
                        {formatDateTime(item.dateTime)}
                      </p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Nearby diagnostics */}
          <section aria-labelledby="nearby-heading">
            <h2
              id="nearby-heading"
              className="text-xs font-mono uppercase tracking-wide text-[#3d554d] mb-3"
            >
              Diagnostics nearby
            </h2>

            {nearby.status === "loading" && <SectionSkeleton rows={3} />}
            {nearby.status === "error" && (
              <ErrorState message={nearby.message} onRetry={loadNearby} />
            )}

            {nearby.status === "ready" && nearby.data.length === 0 && (
              <EmptyState
                icon="🧭"
                title="No centres found"
                description="Try enabling location access or search by city instead."
              />
            )}

            {nearby.status === "ready" && nearby.data.length > 0 && (
              <div className="flex flex-col gap-2">
                {nearby.data.slice(0, 3).map((centre) => (
                  <Link
                    key={centre.id}
                    href={`/diagnostics/${centre.id}`}
                    className="bg-white border border-[#DCD5C4] rounded-xl p-3.5 flex items-center justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#123329]">
                        {centre.name}
                      </p>
                      <p className="text-xs text-[#3d554d]">
                        📍 {centre.distanceKm.toFixed(1)} km away
                      </p>
                    </div>
                    {centre.rating && (
                      <span className="text-xs text-[#C68A24] flex-shrink-0">
                        ★ {centre.rating.toFixed(1)}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}
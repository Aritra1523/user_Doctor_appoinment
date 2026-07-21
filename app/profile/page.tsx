"use client";
 
import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
//import { logoutUser } from "@/redux/slice/auth/authSlice";
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
import useGeolocation from "@/customHooks/Geolocation/useGeolocation";
 
// Leaflet touches `window` on import, so the map must never render on the
// server — load it lazily, client-side only (same pattern as
// app/diagnostics/nearby/page.tsx).
const NearbyDiagnosticsMap = dynamic(
  () => import("@/components/Map/NearbyDiagnosticsMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-[#EAEEEC] animate-pulse rounded-2xl" />
    ),
  }
);
 
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
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
 
// Real API splits date ("2026-07-26T00:00:00.000Z") and time ("12:09 pm")
// into separate fields — combine them into one timestamp for sorting/compares.
function getAppointmentTimestamp(item: HistoryItem) {
  const datePart = item.date.slice(0, 10); // YYYY-MM-DD
  const parsed = new Date(`${datePart} ${item.time}`);
  return Number.isNaN(parsed.getTime())
    ? new Date(item.date).getTime()
    : parsed.getTime();
}
 
function isUpcoming(item: HistoryItem) {
  return (
    (item.status === "Confirmed" || item.status === "Pending") &&
    getAppointmentTimestamp(item) >= Date.now()
  );
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
 
function getPatientId(raw: any, fallbackInitials: string) {
  const source = raw?.user ?? raw ?? {};
  const id = source._id ?? source.id ?? source.patientId;
  if (id) return `MS-${String(id).slice(-5).toUpperCase()}`;
  return `MS-${fallbackInitials}00`;
}
 
// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const user = useCurrentUser();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
 
  const authUser = useSelector((state: RootState) => state.auth.user);
  const userId = authUser?._id || authUser?.id;
 
  // Profile click -> fetch + show /user/dashboard API data
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    fetchDashboard,
  } = useDashboard();
  const [showProfile, setShowProfile] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [selectedCentreId, setSelectedCentreId] = useState<string | null>(null);
 
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
    if (!userId) return;
    setHistory({ status: "loading" });
    try {
      const data = await getHistory(userId);
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
  }, [userId]);
 
  const geo = useGeolocation();
 
  const loadNearby = useCallback(async () => {
    if (geo.status !== "ready") return;
    setNearby({ status: "loading" });
    try {
      const data = await getNearbyDiagnostics({ lat: geo.lat, lng: geo.lng });
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
  }, [geo.status, geo.status === "ready" ? geo.lat : null, geo.status === "ready" ? geo.lng : null]);
 
  useEffect(() => {
    loadHistory();
    loadNearby();
  }, [loadHistory, loadNearby]);
 
  // ── Derived data ────────────────────────────────────────────────────────────
  const nextAppointment = useMemo(() => {
    if (history.status !== "ready") return null;
    return (
      history.data
        .filter(isUpcoming)
        .sort((a, b) => getAppointmentTimestamp(a) - getAppointmentTimestamp(b))[0] ?? null
    );
  }, [history]);
 
  const recentHistory = useMemo(() => {
    if (history.status !== "ready") return [];
    return history.data
      .filter((h) => !isUpcoming(h))
      .sort((a, b) => getAppointmentTimestamp(b) - getAppointmentTimestamp(a))
      .slice(0, 3);
  }, [history]);
 
  const stats = useMemo(() => {
    if (history.status !== "ready") return null;
    return {
      total: history.data.length,
      confirmed: history.data.filter((h) => h.status === "Confirmed").length,
      pending: history.data.filter((h) => h.status === "Pending").length,
    };
  }, [history]);
 
  const patientId = getPatientId(profileData, user.initials);
 
  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F4F6F5] text-[#101A17] font-sans">
      {/* Topbar */}
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
                onClick={handleProfileClick}
                aria-label="Profile"
                className="w-9 h-9 rounded-full bg-[#0C8577] flex items-center justify-center font-[family-name:var(--font-geist-mono)] text-xs font-bold text-white hover:ring-2 hover:ring-[#0C8577]/30 transition-shadow"
              >
                {user.initials}
              </button>
 
              {showProfile && (
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
 
                  {profileLoading && (
                    <p className="text-sm text-[#5B6864]">Loading…</p>
                  )}
 
                  {!profileLoading && profileError && (
                    <div className="text-sm text-[#B23A44] mb-3">
                      <p className="mb-2">{profileError}</p>
                      <button
                        onClick={fetchDashboard}
                        className="text-xs font-semibold px-3 py-1 rounded-full border border-[#D64550] text-[#D64550] hover:bg-[#D64550] hover:text-white transition-colors"
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
                            <dt className="text-xs text-[#5B6864]">
                              {row.label}
                            </dt>
                            <dd className="text-[#101A17] font-medium truncate text-right">
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
                      <p className="text-sm text-[#5B6864] mb-3">
                        Profile loaded.
                      </p>
                    )}
 
                  {!profileLoading && !profileError && !profileData && (
                    <p className="text-sm text-[#5B6864] mb-3">
                      Open this panel to load your details.
                    </p>
                  )}
 
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="w-full text-sm font-semibold px-3 py-2 rounded-lg border border-[#DEE3E0] text-[#D64550] hover:bg-[#D64550] hover:text-white hover:border-[#D64550] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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
        {/* Patient ID card — signature element: identity stub + action stub, split like a ticket */}
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
                    {nearby.status === "ready"
                      ? `${nearby.data.length} nearby`
                      : "Nearby"}
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
                  <p className="text-[10px] text-[#5B6864] mt-0.5">
                    Pick a slot
                  </p>
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
                    {stats ? `${stats.pending} pending` : "See visits"}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>
 
        {/* Vitals strip */}
        {stats && (
          <section className="mb-10 grid grid-cols-3 gap-3">
            <StatCard label="Total visits" value={stats.total} />
            <StatCard label="Confirmed" value={stats.confirmed} />
            <StatCard label="Pending" value={stats.pending} />
          </section>
        )}
 
        {/* Find a doctor — contained module */}
        <section className="mb-10">
          <p className="text-[11px] font-[family-name:var(--font-geist-mono)] uppercase tracking-wider text-[#5B6864] mb-3">
            Find a doctor
          </p>
          <div className="bg-white border border-[#DEE3E0] rounded-3xl p-5 md:p-6">
            <DoctorList />
          </div>
        </section>
 
        {/* History + Nearby */}
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-6">
          {/* Recent history */}
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
 
          {/* Nearby diagnostics */}
          <section aria-labelledby="nearby-heading">
            <h2
              id="nearby-heading"
              className="text-[11px] font-[family-name:var(--font-geist-mono)] uppercase tracking-wider text-[#5B6864] mb-3"
            >
              Diagnostics nearby
            </h2>
 
            {geo.status === "ready" && nearby.status === "ready" && (
              <div className="h-[260px] rounded-2xl overflow-hidden border border-[#DEE3E0] mb-3">
                <NearbyDiagnosticsMap
                  center={{ lat: geo.lat, lng: geo.lng }}
                  centres={nearby.data}
                  selectedId={selectedCentreId}
                  onSelect={setSelectedCentreId}
                />
              </div>
            )}
 
            {(geo.status === "loading" || nearby.status === "loading") && (
              <div className="h-[260px] rounded-2xl bg-[#EAEEEC] animate-pulse mb-3" />
            )}
 
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
                  <button
                    key={centre.id}
                    onClick={() => setSelectedCentreId(centre.id)}
                    className={`text-left w-full bg-white border rounded-2xl p-3.5 flex items-center justify-between transition-colors ${
                      selectedCentreId === centre.id
                        ? "border-[#0C8577] ring-1 ring-[#0C8577]"
                        : "border-[#DEE3E0] hover:border-[#0C8577]/40"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-[#101A17]">
                        {centre.name}
                      </p>
                      <p className="text-xs text-[#5B6864]">
                        📍 {centre.distanceKm.toFixed(1)} km away
                      </p>
                    </div>
                    {centre.rating && (
                      <span className="text-xs font-[family-name:var(--font-geist-mono)] text-[#B8862E] flex-shrink-0">
                        ★ {centre.rating.toFixed(1)}
                      </span>
                    )}
                  </button>
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
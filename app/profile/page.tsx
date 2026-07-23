"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import DoctorList from "@/components/Doctorlist/DoctorList";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PatientIdCard from "@/components/Profile/PatientIdCard";
import VitalsStrip from "@/components/Profile/VitalsStrip";
import RecentHistorySection from "@/components/Profile/RecentHistorySection";
import NearbyDiagnosticsSection from "@/components/Profile/NearbyDiagnosticsSection";
import useCurrentUser from "@/customHooks/profile/useCurrentUser";
import useProfileMenu from "@/customHooks/profile/useProfileMenu";
import useAppointmentHistory from "@/customHooks/profile/useAppointmentHistory";
import useNearbyDiagnostics from "@/customHooks/profile/useNearbyDiagnostics";

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const userId = authUser?._id || authUser?.id;

  const profileMenu = useProfileMenu();
  const user = useCurrentUser(profileMenu.profileData);
  const { history, recentHistory, stats, loadHistory } =
    useAppointmentHistory(userId);
  const { geo, nearby, selectedCentreId, setSelectedCentreId, loadNearby } =
    useNearbyDiagnostics();

  useEffect(() => {
    profileMenu.fetchDashboard();
    loadHistory();
    loadNearby();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileMenu.fetchDashboard, loadHistory, loadNearby]);

  return (
    <div className="min-h-screen bg-[#F4F6F5] text-[#101A17] font-sans">
      <Header
        user={user}
        patientId={profileMenu.patientId}
        showProfile={profileMenu.showProfile}
        profileLoading={profileMenu.profileLoading}
        profileError={profileMenu.profileError}
        profileData={profileMenu.profileData}
        profileFields={profileMenu.profileFields}
        loggingOut={profileMenu.loggingOut}
        onToggleProfile={profileMenu.handleProfileClick}
        onRetryProfile={profileMenu.fetchDashboard}
        onLogout={profileMenu.handleLogout}
      />

      <main className="max-w-[1100px] mx-auto px-6 py-8">
        <PatientIdCard
          user={user}
          patientId={profileMenu.patientId}
          nearbyCount={nearby.status === "ready" ? nearby.data.length : null}
          pendingCount={stats ? stats.pending : null}
        />

        {stats && <VitalsStrip stats={stats} />}

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
          <RecentHistorySection
            history={history}
            recentHistory={recentHistory}
            onRetry={loadHistory}
          />

          <NearbyDiagnosticsSection
            geo={geo}
            nearby={nearby}
            selectedCentreId={selectedCentreId}
            onSelectCentre={setSelectedCentreId}
            onRetry={loadNearby}
          />
        </div>

        <Footer />
      </main>
    </div>
  );
}
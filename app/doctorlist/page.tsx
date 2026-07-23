"use client";

import DoctorList from '@/components/Doctorlist/DoctorList'
import Header from '@/components/layout/Header'
import useCurrentUser from '@/customHooks/profile/useCurrentUser'
import useProfileMenu from '@/customHooks/profile/useProfileMenu'
import { useEffect } from 'react'

const doctorList = () => {
  const profileMenu = useProfileMenu();
  const user = useCurrentUser(profileMenu.profileData);

  useEffect(() => {
    profileMenu.fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileMenu.fetchDashboard]);

  return (
   <div className="min-h-screen bg-[#F4F6F5]">   {/* light-grey page background */}
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
    <div className="bg-white border border-[#DEE3E0] rounded-3xl p-5 md:p-6">
      <DoctorList />
    </div>
  </main>
</div>
  )
}

export default doctorList
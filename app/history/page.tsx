"use client";

import History from '@/components/history/History'
import Header from '@/components/layout/Header'
import useCurrentUser from '@/customHooks/profile/useCurrentUser'
import useProfileMenu from '@/customHooks/profile/useProfileMenu'
import { useEffect } from 'react'

const page = () => {
  const profileMenu = useProfileMenu();
  const user = useCurrentUser(profileMenu.profileData);

  useEffect(() => {
    profileMenu.fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileMenu.fetchDashboard]);

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
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
      <History/>
    </div>
  )
}

export default page
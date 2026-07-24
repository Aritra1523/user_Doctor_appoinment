"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { logout } from "@/redux/slice/auth/authSlice";
import useDashboard from "@/customHooks/profile/useDashboard";
import {
  getPatientId,
  pickProfileFields,
} from "@/lib/profile/profileHelpers";

export default function useProfileMenu(fallbackInitials: string = "PT") {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

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

  const handleLogout = () => {
    setLoggingOut(true);
    try {
      dispatch(logout());
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

  const patientId = getPatientId(profileData, fallbackInitials);

  return {
    showProfile,
    profileLoading,
    profileError,
    profileData,
    profileFields,
    patientId,
    loggingOut,
    handleProfileClick,
    handleLogout,
    fetchDashboard,
  };
}
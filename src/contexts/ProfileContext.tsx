"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserProfile } from "../types/profile";
import {
  mockRetailProfile,
  mockWholesaleProfile,
} from "../data/mockProfileData";

interface ProfileContextType {
  profile: UserProfile;
  accountType: "retail" | "wholesale";
  setAccountType: (type: "retail" | "wholesale") => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateNotificationPreferences: (preferences: any) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [accountType, setAccountType] = useState<"retail" | "wholesale">(
    "wholesale",
  );
  const [profile, setProfile] = useState<UserProfile>(mockRetailProfile);
  const [activeSection, setActiveSection] = useState("overview");

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }) as UserProfile);
  };

  const updateNotificationPreferences = (preferences: any) => {
    setProfile(
      (prev) =>
        ({
          ...prev,
          notifications: { ...prev.notifications, ...preferences },
        }) as UserProfile,
    );
  };

  React.useEffect(() => {
    setProfile(
      accountType === "retail" ? mockRetailProfile : mockWholesaleProfile,
    );
    setActiveSection("overview");
  }, [accountType]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        accountType,
        setAccountType,
        updateProfile,
        updateNotificationPreferences,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}

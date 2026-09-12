import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { fallbackProfile } from "../data/profile.js";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  // Show fallback data immediately
  const [profile, setProfile] = useState(fallbackProfile);

  // Don't block the page while the API loads
  const [loading, setLoading] = useState(false);

  async function refresh() {
    try {
      const data = await api("/api/profile");

      if (data) {
        // Replace fallback data with MongoDB data
        setProfile(data);
      }
    } catch (err) {
      console.error("Profile fetch failed:", err);

      // Keep fallbackProfile if backend is sleeping/unavailable
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        refresh,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);

  if (!ctx) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return ctx;
}
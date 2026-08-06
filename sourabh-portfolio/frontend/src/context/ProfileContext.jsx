import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { fallbackProfile } from "../data/profile.js";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
const [profile, setProfile] = useState(null);
const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const data = await api("/api/profile");
      setProfile(data);
    } catch {
      setProfile(fallbackProfile);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, refresh }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
}

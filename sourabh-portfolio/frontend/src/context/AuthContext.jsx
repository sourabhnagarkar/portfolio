import { createContext, useContext, useEffect, useState } from "react";
import { api, getToken, setToken, clearToken } from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setChecking(false);
      return;
    }
    api("/api/auth/me", { auth: true })
      .then((data) => setUsername(data.username))
      .catch(() => clearToken())
      .finally(() => setChecking(false));
  }, []);

  async function login(usernameInput, password) {
    const data = await api("/api/auth/login", {
      method: "POST",
      body: { username: usernameInput, password },
    });
    setToken(data.token);
    setUsername(data.username);
  }

  function logout() {
    clearToken();
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ username, isAuthenticated: !!username, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

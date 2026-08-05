import { useState } from "react";
import { motion } from "framer-motion";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminLogin() {
  const { login, isAuthenticated, checking } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!checking && isAuthenticated) {
    const redirectTo = location.state?.from || "/admin/dashboard";
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(username, password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-noir-ink blueprint-grid flex items-center justify-center px-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-crimson/20 rounded-sm bg-noir-panel/70 p-8"
      >
        <p className="mono-label mb-2">Restricted access</p>
        <h1 className="font-display text-2xl text-paper mb-8">Admin sign in</h1>

        <div className="space-y-5">
          <div>
            <label className="mono-label block mb-2" htmlFor="username">Username</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              className="w-full bg-noir-ink border border-crimson/20 rounded-sm px-4 py-3 text-paper text-sm focus:outline-none focus:border-crimson transition-colors"
            />
          </div>
          <div>
            <label className="mono-label block mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-noir-ink border border-crimson/20 rounded-sm px-4 py-3 text-paper text-sm focus:outline-none focus:border-crimson transition-colors"
            />
          </div>
        </div>

        {error && <p className="font-mono text-xs text-red-400 mt-4">{error}</p>}

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={busy}
          className="w-full mt-7 py-3 bg-scarlet text-paper font-mono text-xs uppercase tracking-[0.2em] rounded-sm hover:brightness-110 transition disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </motion.button>
      </motion.form>
    </div>
  );
}

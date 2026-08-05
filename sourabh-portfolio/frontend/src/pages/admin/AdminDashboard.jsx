import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { api } from "../../lib/api.js";
import ProfileTab from "./tabs/ProfileTab.jsx";
import SkillsTab from "./tabs/SkillsTab.jsx";
import ProjectsTab from "./tabs/ProjectsTab.jsx";
import CertificatesTab from "./tabs/CertificatesTab.jsx";
import GalleryTab from "./tabs/GalleryTab.jsx";
import MessagesTab from "./tabs/MessagesTab.jsx";
import { fallbackProfile } from "../../data/profile.js";

const tabs = [
  { id: "profile", label: "Profile & Hero" },
  { id: "skills", label: "Skills & Education" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "gallery", label: "Featured Photos" },
  { id: "messages", label: "Messages" },
];

export default function AdminDashboard() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("profile");
  const [profile, setProfile] = useState(fallbackProfile);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    api("/api/profile")
      .then(setProfile)
      .finally(() => setLoadingProfile(false));
    api("/api/contact", { auth: true })
      .then((messages) => setUnreadCount(messages.filter((m) => !m.read).length))
      .catch(() => {});
  }, []);

  function handleLogout() {
    logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-noir-ink flex flex-col md:flex-row">
      <aside className="md:w-64 border-b md:border-b-0 md:border-r border-crimson/10 p-6 flex flex-col">
        <p className="mono-label mb-1">Admin</p>
        <h1 className="font-display text-xl text-paper mb-8">Site editor</h1>

        <nav className="space-y-1 flex-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActive(t.id);
                if (t.id === "messages") setUnreadCount(0);
              }}
              className={`w-full flex items-center justify-between text-left font-mono text-xs uppercase tracking-widest px-3 py-2.5 rounded-sm transition-colors ${
                active === t.id
                  ? "bg-scarlet text-paper"
                  : "text-paper/60 hover:text-paper hover:bg-noir-panel"
              }`}
            >
              {t.label}
              {t.id === "messages" && unreadCount > 0 && (
                <span className="bg-crimson text-noir-ink rounded-full px-1.5 py-0.5 text-[10px] leading-none">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-crimson/10 mt-6">
          <p className="font-mono text-xs text-paper/40 mb-3">Signed in as {username}</p>
          <a
            href="/"
            className="block font-mono text-xs uppercase tracking-widest text-crimson hover:text-garnet transition-colors mb-3"
          >
            View live site →
          </a>
          <button
            onClick={handleLogout}
            className="font-mono text-xs uppercase tracking-widest text-paper/50 hover:text-red-400 transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {loadingProfile ? (
          <p className="font-mono text-sm text-paper/50">Loading…</p>
        ) : (
          <>
            {active === "profile" && <ProfileTab profile={profile} onSaved={setProfile} />}
            {active === "skills" && <SkillsTab profile={profile} onSaved={setProfile} />}
            {active === "projects" && <ProjectsTab />}
            {active === "certificates" && <CertificatesTab />}
            {active === "gallery" && <GalleryTab />}
            {active === "messages" && <MessagesTab />}
          </>
        )}
      </main>
    </div>
  );
}

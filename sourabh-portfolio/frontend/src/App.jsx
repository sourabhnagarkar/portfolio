import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProfileProvider } from "./context/ProfileContext.jsx";
import PublicSite from "./pages/PublicSite.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProtectedRoute from "./pages/admin/ProtectedRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin routes: reachable only by typing the URL directly.
              Nothing on the public site links here. */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Public site — wrapped in ProfileProvider so every section
              can read admin-edited content. */}
          <Route
            path="/*"
            element={
              <ProfileProvider>
                <PublicSite />
              </ProfileProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

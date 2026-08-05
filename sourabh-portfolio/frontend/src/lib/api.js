export const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const TOKEN_KEY = "portfolio_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Thin fetch wrapper: adds the API base URL, JSON headers, the admin auth
// token when present, and throws with the server's error message on failure.
export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no JSON body (e.g. some errors) — leave data as null
  }

  if (!res.ok) {
    throw new Error(data?.error || "Something went wrong. Please try again.");
  }
  return data;
}

// Uploads a single image file (logo, project cover, certificate badge).
// Returns { url } pointing at /uploads/<filename> on the backend.
export async function uploadImage(file) {
  const token = getToken();
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Upload failed.");
  return data;
}

// Resolves an /uploads/... path returned by the backend into a full URL.
export function resolveAsset(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
}

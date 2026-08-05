// Runs automatically before `npm run build` (see package.json "prebuild").
// Pulls your latest Profile data from the API and rewrites the SEO/Open
// Graph/Twitter meta tags in index.html, so the share-preview title,
// description, and card always reflect whatever you last edited in the
// admin panel — without needing a full server-rendering setup.
//
// If the API isn't reachable at build time (e.g. building offline), the
// existing tags in index.html are left untouched, so this never breaks a
// build — it just skips the refresh.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, "..", "index.html");
const API_BASE = process.env.VITE_API_BASE_URL || "http://localhost:5000";
const SITE_URL = process.env.SITE_URL || "https://example.com";

async function run() {
  let profile;
  try {
    const res = await fetch(`${API_BASE}/api/profile`);
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    profile = await res.json();
  } catch (err) {
    console.warn(`[injectMeta] Skipping: could not reach ${API_BASE} (${err.message})`);
    return;
  }

  const title = `${profile.name} — ${(profile.roles && profile.roles[0]) || "Full-Stack Developer"}`;
  const description = [profile.tagline, profile.heroBlurb].filter(Boolean).join(" ").slice(0, 200);
  const image = `${SITE_URL}/og-image.png`;

  const block = `    <!-- OG_META_START — auto-updated by scripts/injectMeta.js on build from your admin-edited Profile.
         Safe to edit by hand too; just keep the markers so future builds don't clobber intentional edits. -->
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${SITE_URL}/" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${image}" />
    <!-- OG_META_END -->`;

  const html = fs.readFileSync(indexPath, "utf-8");
  const updated = html.replace(
    /<!-- OG_META_START[\s\S]*?<!-- OG_META_END -->/,
    block
  );

  if (updated === html) {
    console.warn("[injectMeta] Markers not found in index.html — nothing updated.");
    return;
  }

  fs.writeFileSync(indexPath, updated);
  console.log(`[injectMeta] Updated meta tags from ${API_BASE}/api/profile`);
}

function escapeHtml(str = "") {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

run();

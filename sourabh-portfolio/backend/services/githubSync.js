import Project from "../models/Project.js";

// Pulls the GitHub user's public, non-fork repos and adds any that aren't
// already tracked as a Project (matched by githubUrl). Existing projects,
// including ones you've hand-edited from the admin panel, are never
// touched or overwritten - this only ever *adds* new ones.
export async function syncGithubProjects() {
  const username = process.env.GITHUB_USERNAME;
  if (!username) {
    return { added: 0, skipped: 0, message: "GITHUB_USERNAME is not set in .env" };
  }

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=created`,
    { headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-sync" } }
  );

  if (!res.ok) {
    throw new Error(`GitHub API request failed (${res.status})`);
  }

  const repos = await res.json();
  const existing = await Project.find({}, "githubUrl sheet");
  const existingUrls = new Set(existing.map((p) => p.githubUrl));

  let nextSheet =
    existing.reduce((max, p) => Math.max(max, parseInt(p.sheet, 10) || 0), 0) + 1;

  let added = 0;
  let skipped = 0;

  for (const repo of repos) {
    if (repo.fork) continue; // skip forks - not original work
    if (existingUrls.has(repo.html_url)) {
      skipped++;
      continue;
    }

    await Project.create({
      sheet: String(nextSheet).padStart(2, "0"),
      title: repo.name,
      tagline: repo.description ? truncate(repo.description, 60) : "GitHub project",
      description: repo.description || `A project from GitHub: ${repo.name}.`,
      stack: repo.language ? [repo.language] : [],
      role: "Developer",
      year: String(new Date(repo.created_at).getFullYear()),
      githubUrl: repo.html_url,
      highlights: [],
      featured: false,
    });

    nextSheet++;
    added++;
  }

  return { added, skipped, message: `Synced: ${added} added, ${skipped} already tracked.` };
}

function truncate(str, max) {
  return str.length > max ? `${str.slice(0, max - 1)}…` : str;
}

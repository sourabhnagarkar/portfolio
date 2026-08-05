import { useEffect, useState } from "react";
import { api, uploadImage, resolveAsset } from "../../../lib/api.js";
import { Field, TextArea, ListEditor, SaveBar, ImageUploadField } from "../AdminControls.jsx";

const emptyProject = {
  sheet: "",
  title: "",
  tagline: "",
  description: "",
  stack: [],
  role: "",
  year: "",
  githubUrl: "",
  liveUrl: "",
  imageUrl: "",
  highlights: [],
};

export default function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null = not editing, "new" = creating
  const [form, setForm] = useState(emptyProject);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [syncStatus, setSyncStatus] = useState("idle");
  const [syncMessage, setSyncMessage] = useState("");

  function loadProjects() {
    setLoading(true);
    api("/api/projects")
      .then(setProjects)
      .finally(() => setLoading(false));
  }
  useEffect(loadProjects, []);

  async function handleSync() {
    setSyncStatus("syncing");
    setSyncMessage("");
    try {
      const result = await api("/api/projects/sync-github", { method: "POST", auth: true });
      setSyncMessage(result.message);
      setSyncStatus("done");
      loadProjects();
    } catch (err) {
      setSyncMessage(err.message);
      setSyncStatus("error");
    }
  }

  function startEdit(project) {
    setForm({
      ...emptyProject,
      ...project,
      stack: project.stack || [],
      highlights: project.highlights || [],
    });
    setEditingId(project._id);
    setStatus("idle");
  }
  function startNew() {
    setForm(emptyProject);
    setEditingId("new");
    setStatus("idle");
  }
  function cancelEdit() {
    setEditingId(null);
    setForm(emptyProject);
  }

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function setStackText(text) {
    set("stack", text.split(",").map((s) => s.trim()).filter(Boolean));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    try {
      if (editingId === "new") {
        await api("/api/projects", { method: "POST", auth: true, body: form });
      } else {
        await api(`/api/projects/${editingId}`, { method: "PUT", auth: true, body: form });
      }
      setStatus("saved");
      loadProjects();
      setTimeout(() => {
        setEditingId(null);
        setStatus("idle");
      }, 800);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project? This can't be undone.")) return;
    await api(`/api/projects/${id}`, { method: "DELETE", auth: true });
    loadProjects();
    if (editingId === id) cancelEdit();
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg text-paper">Projects</h2>
        {editingId === null && (
          <div className="flex items-center gap-5">
            <button
              onClick={handleSync}
              disabled={syncStatus === "syncing"}
              className="font-mono text-xs uppercase tracking-widest text-paper/60 hover:text-paper transition-colors disabled:opacity-50"
            >
              {syncStatus === "syncing" ? "Syncing…" : "Sync from GitHub"}
            </button>
            <button
              onClick={startNew}
              className="font-mono text-xs uppercase tracking-widest text-crimson hover:text-garnet transition-colors"
            >
              + Add project
            </button>
          </div>
        )}
      </div>
      {syncMessage && (
        <p className={`font-mono text-xs -mt-4 ${syncStatus === "error" ? "text-red-400" : "text-garnet"}`}>
          {syncMessage}
        </p>
      )}

      {editingId === null && (
        <div className="space-y-3">
          {loading && <p className="font-mono text-sm text-paper/50">Loading…</p>}
          {!loading && projects.length === 0 && (
            <p className="font-mono text-sm text-paper/50">No projects yet.</p>
          )}
          {projects.map((p) => (
            <div
              key={p._id}
              className="flex items-center justify-between border border-crimson/15 rounded-sm px-4 py-3"
            >
              <div>
                <p className="text-paper text-sm">
                  <span className="font-mono text-crimson/60 mr-2">{p.sheet}</span>
                  {p.title}
                </p>
                <p className="text-paper/50 text-xs">{p.tagline}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(p)}
                  className="font-mono text-xs uppercase tracking-widest text-crimson hover:text-garnet transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="font-mono text-xs uppercase tracking-widest text-paper/50 hover:text-red-400 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingId !== null && (
        <form onSubmit={handleSubmit} className="space-y-4 border border-crimson/15 rounded-sm p-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Sheet number (e.g. 01)" value={form.sheet} onChange={(e) => set("sheet", e.target.value)} required />
            <Field label="Year" value={form.year} onChange={(e) => set("year", e.target.value)} />
          </div>
          <Field label="Title" value={form.title} onChange={(e) => set("title", e.target.value)} required />
          <Field label="Tagline" value={form.tagline} onChange={(e) => set("tagline", e.target.value)} required />
          <TextArea label="Description" rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} required />
          <Field label="Your role" value={form.role} onChange={(e) => set("role", e.target.value)} />
          <Field
            label="Tech stack (comma-separated)"
            value={form.stack.join(", ")}
            onChange={(e) => setStackText(e.target.value)}
            placeholder="React, Express, MongoDB"
          />
          <ListEditor
            label="Highlights"
            items={form.highlights}
            onChange={(v) => set("highlights", v)}
            placeholder="e.g. Real-time search"
          />
          <Field label="GitHub URL" value={form.githubUrl} onChange={(e) => set("githubUrl", e.target.value)} />
          <Field label="Live demo URL (optional)" value={form.liveUrl} onChange={(e) => set("liveUrl", e.target.value)} />
          <ImageUploadField
            label="Cover image (optional)"
            value={form.imageUrl}
            onChange={(url) => set("imageUrl", url)}
            onUpload={uploadImage}
            resolveAsset={resolveAsset}
          />

          <div className="flex items-center gap-4 pt-2">
            <SaveBar status={status} error={error} label={editingId === "new" ? "Create project" : "Save changes"} />
            <button
              type="button"
              onClick={cancelEdit}
              className="font-mono text-xs uppercase tracking-widest text-paper/50 hover:text-paper transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { api, uploadImage, resolveAsset } from "../../../lib/api.js";
import { Field, TextArea, SaveBar, ImageUploadField } from "../AdminControls.jsx";

const emptyCert = {
  title: "",
  issuer: "",
  date: "",
  description: "",
  logoUrl: "",
  credentialUrl: "",
  order: 0,
};

export default function CertificatesTab() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyCert);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function loadCertificates() {
    setLoading(true);
    api("/api/certificates")
      .then(setCertificates)
      .finally(() => setLoading(false));
  }
  useEffect(loadCertificates, []);

  function startEdit(cert) {
    setForm({ ...emptyCert, ...cert });
    setEditingId(cert._id);
    setStatus("idle");
  }
  function startNew() {
    setForm({ ...emptyCert, order: certificates.length });
    setEditingId("new");
    setStatus("idle");
  }
  function cancelEdit() {
    setEditingId(null);
    setForm(emptyCert);
  }
  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    try {
      if (editingId === "new") {
        await api("/api/certificates", { method: "POST", auth: true, body: form });
      } else {
        await api(`/api/certificates/${editingId}`, { method: "PUT", auth: true, body: form });
      }
      setStatus("saved");
      loadCertificates();
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
    if (!confirm("Delete this certificate? This can't be undone.")) return;
    await api(`/api/certificates/${id}`, { method: "DELETE", auth: true });
    loadCertificates();
    if (editingId === id) cancelEdit();
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg text-paper">Certificates &amp; achievements</h2>
        {editingId === null && (
          <button
            onClick={startNew}
            className="font-mono text-xs uppercase tracking-widest text-crimson hover:text-garnet transition-colors"
          >
            + Add certificate
          </button>
        )}
      </div>

      {editingId === null && (
        <div className="space-y-3">
          {loading && <p className="font-mono text-sm text-paper/50">Loading…</p>}
          {!loading && certificates.length === 0 && (
            <p className="font-mono text-sm text-paper/50">No certificates yet.</p>
          )}
          {certificates.map((c) => (
            <div
              key={c._id}
              className="flex items-center justify-between border border-crimson/15 rounded-sm px-4 py-3"
            >
              <div>
                <p className="text-paper text-sm">{c.title}</p>
                <p className="text-paper/50 text-xs">{c.issuer} {c.date && `· ${c.date}`}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(c)}
                  className="font-mono text-xs uppercase tracking-widest text-crimson hover:text-garnet transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
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
          <Field label="Title (e.g. AWS Cloud Practitioner)" value={form.title} onChange={(e) => set("title", e.target.value)} required />
          <Field label="Issuer (e.g. Amazon Web Services)" value={form.issuer} onChange={(e) => set("issuer", e.target.value)} required />
          <Field label="Date (e.g. June 2026)" value={form.date} onChange={(e) => set("date", e.target.value)} />
          <TextArea label="Description (optional)" rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} />
          <Field label="Credential URL (optional)" value={form.credentialUrl} onChange={(e) => set("credentialUrl", e.target.value)} />
          <ImageUploadField
            label="Badge / logo image (optional)"
            value={form.logoUrl}
            onChange={(url) => set("logoUrl", url)}
            onUpload={uploadImage}
            resolveAsset={resolveAsset}
          />

          <div className="flex items-center gap-4 pt-2">
            <SaveBar status={status} error={error} label={editingId === "new" ? "Add certificate" : "Save changes"} />
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

import { useEffect, useState } from "react";
import { api, uploadImage, resolveAsset } from "../../../lib/api.js";
import { Field, SaveBar, ImageUploadField } from "../AdminControls.jsx";

const emptyItem = { imageUrl: "", caption: "", link: "", order: 0 };

export default function GalleryTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyItem);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function loadItems() {
    setLoading(true);
    api("/api/gallery")
      .then(setItems)
      .finally(() => setLoading(false));
  }
  useEffect(loadItems, []);

  function startEdit(item) {
    setForm({ ...emptyItem, ...item });
    setEditingId(item._id);
    setStatus("idle");
  }
  function startNew() {
    setForm({ ...emptyItem, order: items.length });
    setEditingId("new");
    setStatus("idle");
  }
  function cancelEdit() {
    setEditingId(null);
    setForm(emptyItem);
  }
  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.imageUrl) {
      setError("Please upload a photo first.");
      setStatus("error");
      return;
    }
    setStatus("saving");
    try {
      if (editingId === "new") {
        await api("/api/gallery", { method: "POST", auth: true, body: form });
      } else {
        await api(`/api/gallery/${editingId}`, { method: "PUT", auth: true, body: form });
      }
      setStatus("saved");
      loadItems();
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
    if (!confirm("Delete this photo? This can't be undone.")) return;
    await api(`/api/gallery/${id}`, { method: "DELETE", auth: true });
    loadItems();
    if (editingId === id) cancelEdit();
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="font-display text-lg text-paper mb-1">Featured photos</h2>
        <p className="text-paper/50 text-sm">
          A LinkedIn-style strip of work or industry photos with a short caption each —
          shown right under the hero on your homepage.
        </p>
      </div>

      {editingId === null && (
        <>
          <button
            onClick={startNew}
            className="font-mono text-xs uppercase tracking-widest text-crimson hover:text-garnet transition-colors"
          >
            + Add photo
          </button>
          <div className="space-y-3">
            {loading && <p className="font-mono text-sm text-paper/50">Loading…</p>}
            {!loading && items.length === 0 && (
              <p className="font-mono text-sm text-paper/50">No photos yet.</p>
            )}
            {items.map((item) => (
              <div key={item._id} className="flex items-center gap-4 border border-crimson/15 rounded-sm px-4 py-3">
                <img
                  src={resolveAsset(item.imageUrl)}
                  alt=""
                  className="w-14 h-14 object-cover rounded-sm border border-crimson/15 shrink-0"
                />
                <p className="text-paper/80 text-sm flex-1">{item.caption}</p>
                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={() => startEdit(item)}
                    className="font-mono text-xs uppercase tracking-widest text-crimson hover:text-garnet transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="font-mono text-xs uppercase tracking-widest text-paper/50 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {editingId !== null && (
        <form onSubmit={handleSubmit} className="space-y-4 border border-crimson/15 rounded-sm p-5">
          <ImageUploadField
            label="Photo"
            value={form.imageUrl}
            onChange={(url) => set("imageUrl", url)}
            onUpload={uploadImage}
            resolveAsset={resolveAsset}
          />
          <Field label="Caption" value={form.caption} onChange={(e) => set("caption", e.target.value)} required />
          <Field label="Link (optional)" value={form.link} onChange={(e) => set("link", e.target.value)} />

          <div className="flex items-center gap-4 pt-2">
            <SaveBar status={status} error={error} label={editingId === "new" ? "Add photo" : "Save changes"} />
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

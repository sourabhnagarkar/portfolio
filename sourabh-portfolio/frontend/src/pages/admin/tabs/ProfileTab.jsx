import { useEffect, useState } from "react";
import { api, uploadImage, resolveAsset } from "../../../lib/api.js";
import { Field, TextArea, ListEditor, SaveBar, ImageUploadField } from "../AdminControls.jsx";

export default function ProfileTab({ profile, onSaved }) {
  const [form, setForm] = useState(profile);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => setForm(profile), [profile]);

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function setContact(key, value) {
    setForm((f) => ({ ...f, contact: { ...f.contact, [key]: value } }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    try {
      const updated = await api("/api/profile", { method: "PUT", auth: true, body: form });
      onSaved(updated);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl">
      <section className="space-y-4">
        <h2 className="font-display text-lg text-paper">Identity</h2>
        <Field label="Full name" value={form.name} onChange={(e) => set("name", e.target.value)} required />
        <Field
          label="Tagline (short, bold line shown under your name)"
          value={form.tagline}
          onChange={(e) => set("tagline", e.target.value)}
          placeholder="e.g. Building the web, one commit at a time."
        />
        <Field
          label="Logo text (fallback if no logo image)"
          value={form.logoText}
          onChange={(e) => set("logoText", e.target.value)}
          placeholder="SSN.DEV"
        />
        <ImageUploadField
          label="Logo image (optional — overrides logo text)"
          value={form.logoUrl}
          onChange={(url) => set("logoUrl", url)}
          onUpload={uploadImage}
          resolveAsset={resolveAsset}
        />
        <Field
          label="Resume URL (e.g. /Sourabh_Nagarkar_Resume.pdf, or upload and paste the link)"
          value={form.resumeUrl}
          onChange={(e) => set("resumeUrl", e.target.value)}
        />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg text-paper">Hero section</h2>
        <ListEditor
          label="Typed roles (cycles automatically on the homepage)"
          items={form.roles}
          onChange={(v) => set("roles", v)}
          placeholder="e.g. FULL-STACK DEVELOPER"
        />
        <TextArea
          label="Hero intro paragraph"
          rows={4}
          value={form.heroBlurb}
          onChange={(e) => set("heroBlurb", e.target.value)}
        />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg text-paper">About section</h2>
        <TextArea
          label="About paragraph"
          rows={4}
          value={form.aboutText}
          onChange={(e) => set("aboutText", e.target.value)}
        />
        <ListEditor
          label="Strengths"
          items={form.strengths}
          onChange={(v) => set("strengths", v)}
          placeholder="e.g. Quick learner & adaptable"
        />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg text-paper">Contact details</h2>
        <Field label="Email" value={form.contact?.email} onChange={(e) => setContact("email", e.target.value)} />
        <Field label="Phone" value={form.contact?.phone} onChange={(e) => setContact("phone", e.target.value)} />
        <Field label="GitHub URL" value={form.contact?.github} onChange={(e) => setContact("github", e.target.value)} />
        <Field label="LinkedIn URL" value={form.contact?.linkedin} onChange={(e) => setContact("linkedin", e.target.value)} />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg text-paper">Other social links</h2>
        <p className="text-paper/50 text-sm -mt-2">
          Platform names like twitter, instagram, youtube, discord, dribbble, behance,
          stackoverflow, medium, telegram, or leetcode get their real logo automatically.
          Anything else shows a generic link icon.
        </p>
        {(form.socials || []).map((s, i) => (
          <div key={i} className="flex gap-2 items-end">
            <div className="w-40">
              <Field
                label={i === 0 ? "Platform" : ""}
                value={s.platform}
                onChange={(e) => {
                  const next = [...(form.socials || [])];
                  next[i] = { ...next[i], platform: e.target.value };
                  set("socials", next);
                }}
                placeholder="instagram"
              />
            </div>
            <div className="flex-1">
              <Field
                label={i === 0 ? "URL" : ""}
                value={s.url}
                onChange={(e) => {
                  const next = [...(form.socials || [])];
                  next[i] = { ...next[i], url: e.target.value };
                  set("socials", next);
                }}
                placeholder="https://instagram.com/yourhandle"
              />
            </div>
            <button
              type="button"
              onClick={() => set("socials", (form.socials || []).filter((_, idx) => idx !== i))}
              className="px-3 py-2.5 font-mono text-xs text-paper/50 hover:text-red-400 border border-crimson/15 rounded-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => set("socials", [...(form.socials || []), { platform: "", url: "" }])}
          className="font-mono text-xs uppercase tracking-widest text-crimson hover:text-garnet transition-colors"
        >
          + Add social link
        </button>
      </section>

      <SaveBar status={status} error={error} />
    </form>
  );
}

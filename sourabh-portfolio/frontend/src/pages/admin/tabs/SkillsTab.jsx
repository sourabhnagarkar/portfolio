import { useEffect, useState } from "react";
import { api } from "../../../lib/api.js";
import { Field, ListEditor, SaveBar } from "../AdminControls.jsx";

export default function SkillsTab({ profile, onSaved }) {
  const [skillGroups, setSkillGroups] = useState(profile.skillGroups || []);
  const [education, setEducation] = useState(profile.education || []);
  const [skillLevels, setSkillLevels] = useState(profile.skillLevels || []);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    setSkillGroups(profile.skillGroups || []);
    setEducation(profile.education || []);
    setSkillLevels(profile.skillLevels || []);
  }, [profile]);

  function updateGroup(i, key, value) {
    const next = [...skillGroups];
    next[i] = { ...next[i], [key]: value };
    setSkillGroups(next);
  }
  function removeGroup(i) {
    setSkillGroups(skillGroups.filter((_, idx) => idx !== i));
  }
  function addGroup() {
    setSkillGroups([...skillGroups, { label: "New group", items: [] }]);
  }

  function updateEdu(i, key, value) {
    const next = [...education];
    next[i] = { ...next[i], [key]: value };
    setEducation(next);
  }
  function removeEdu(i) {
    setEducation(education.filter((_, idx) => idx !== i));
  }
  function addEdu() {
    setEducation([...education, { period: "", title: "", org: "", detail: "" }]);
  }

  function updateLevel(i, key, value) {
    const next = [...skillLevels];
    next[i] = { ...next[i], [key]: value };
    setSkillLevels(next);
  }
  function removeLevel(i) {
    setSkillLevels(skillLevels.filter((_, idx) => idx !== i));
  }
  function addLevel() {
    setSkillLevels([...skillLevels, { name: "", level: 70 }]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    try {
      const updated = await api("/api/profile", {
        method: "PUT",
        auth: true,
        body: { skillGroups, education, skillLevels },
      });
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
      <section className="space-y-5">
        <h2 className="font-display text-lg text-paper">Skill groups</h2>
        {skillGroups.map((group, i) => (
          <div key={i} className="border border-crimson/15 rounded-sm p-4 space-y-3">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Field
                  label="Group name"
                  value={group.label}
                  onChange={(e) => updateGroup(i, "label", e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={() => removeGroup(i)}
                className="px-3 py-2.5 font-mono text-xs text-paper/50 hover:text-red-400 border border-crimson/15 rounded-sm"
              >
                Remove group
              </button>
            </div>
            <ListEditor
              label="Items"
              items={group.items}
              onChange={(v) => updateGroup(i, "items", v)}
              placeholder="e.g. Python"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addGroup}
          className="font-mono text-xs uppercase tracking-widest text-crimson hover:text-garnet transition-colors"
        >
          + Add skill group
        </button>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="font-display text-lg text-paper">Proficiency chart</h2>
          <p className="text-paper/50 text-sm mt-1">
            Optional — shown as an animated bar chart under your skills. Leave empty to
            hide it.
          </p>
        </div>
        {skillLevels.map((s, i) => (
          <div key={i} className="flex gap-3 items-center">
            <div className="flex-1">
              <Field
                label={i === 0 ? "Skill name" : ""}
                value={s.name}
                onChange={(e) => updateLevel(i, "name", e.target.value)}
                placeholder="e.g. Python"
              />
            </div>
            <div className="w-40">
              <label className="block">
                {i === 0 && <span className="mono-label block mb-2">Level: {s.level}%</span>}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={s.level}
                  onChange={(e) => updateLevel(i, "level", Number(e.target.value))}
                  className="w-full accent-scarlet"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={() => removeLevel(i)}
              className="px-3 py-2.5 font-mono text-xs text-paper/50 hover:text-red-400 border border-crimson/15 rounded-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addLevel}
          className="font-mono text-xs uppercase tracking-widest text-crimson hover:text-garnet transition-colors"
        >
          + Add skill to chart
        </button>
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-lg text-paper">Education</h2>
        {education.map((edu, i) => (
          <div key={i} className="border border-crimson/15 rounded-sm p-4 space-y-3">
            <Field label="Period (e.g. 2025 — Present)" value={edu.period} onChange={(e) => updateEdu(i, "period", e.target.value)} />
            <Field label="Degree / title" value={edu.title} onChange={(e) => updateEdu(i, "title", e.target.value)} />
            <Field label="Institution" value={edu.org} onChange={(e) => updateEdu(i, "org", e.target.value)} />
            <Field label="Detail (e.g. CGPA)" value={edu.detail} onChange={(e) => updateEdu(i, "detail", e.target.value)} />
            <button
              type="button"
              onClick={() => removeEdu(i)}
              className="font-mono text-xs text-paper/50 hover:text-red-400"
            >
              Remove entry
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addEdu}
          className="font-mono text-xs uppercase tracking-widest text-crimson hover:text-garnet transition-colors"
        >
          + Add education entry
        </button>
      </section>

      <SaveBar status={status} error={error} />
    </form>
  );
}

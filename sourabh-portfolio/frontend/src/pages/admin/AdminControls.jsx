// Small shared building blocks used across every admin tab, so adding or
// editing content stays a matter of filling in fields — no code required.
export function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mono-label block mb-2">{label}</span>
      <input
        {...props}
        className="w-full bg-noir-ink border border-crimson/20 rounded-sm px-3 py-2.5 text-paper text-sm focus:outline-none focus:border-crimson transition-colors"
      />
    </label>
  );
}

export function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="mono-label block mb-2">{label}</span>
      <textarea
        {...props}
        className="w-full bg-noir-ink border border-crimson/20 rounded-sm px-3 py-2.5 text-paper text-sm focus:outline-none focus:border-crimson transition-colors resize-y"
      />
    </label>
  );
}

// Editable list of plain strings (roles, strengths, skill items, etc.)
export function ListEditor({ label, items, onChange, placeholder }) {
  const list = items || [];

  function updateItem(i, value) {
    const next = [...list];
    next[i] = value;
    onChange(next);
  }
  function removeItem(i) {
    onChange(list.filter((_, idx) => idx !== i));
  }
  function addItem() {
    onChange([...list, ""]);
  }

  return (
    <div>
      <span className="mono-label block mb-2">{label}</span>
      <div className="space-y-2">
        {list.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              placeholder={placeholder}
              onChange={(e) => updateItem(i, e.target.value)}
              className="flex-1 bg-noir-ink border border-crimson/20 rounded-sm px-3 py-2 text-paper text-sm focus:outline-none focus:border-crimson transition-colors"
            />
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="px-3 font-mono text-xs text-paper/50 hover:text-red-400 border border-crimson/15 rounded-sm transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-2 font-mono text-xs uppercase tracking-widest text-crimson hover:text-garnet transition-colors"
      >
        + Add
      </button>
    </div>
  );
}

export function SaveBar({ status, error, label = "Save changes" }) {
  return (
    <div className="flex items-center gap-4 pt-2">
      <button
        type="submit"
        disabled={status === "saving"}
        className="px-6 py-2.5 bg-scarlet text-paper font-mono text-xs uppercase tracking-[0.2em] rounded-sm hover:brightness-110 transition disabled:opacity-60"
      >
        {status === "saving" ? "Saving…" : label}
      </button>
      {status === "saved" && <span className="font-mono text-xs text-garnet">Saved ✓</span>}
      {status === "error" && <span className="font-mono text-xs text-red-400">{error}</span>}
    </div>
  );
}

export function ImageUploadField({ label, value, onChange, onUpload, resolveAsset }) {
  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await onUpload(file);
      onChange(url);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <span className="mono-label block mb-2">{label}</span>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-sm border border-crimson/20 bg-noir-ink flex items-center justify-center overflow-hidden shrink-0">
          {value ? (
            <img src={resolveAsset(value)} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="font-mono text-[10px] text-paper/30">none</span>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="text-xs font-mono text-paper/70 file:mr-3 file:px-3 file:py-1.5 file:rounded-sm file:border file:border-crimson/30 file:bg-noir-ink file:text-crimson file:font-mono file:text-xs file:uppercase file:tracking-widest"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="font-mono text-xs text-paper/50 hover:text-red-400"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

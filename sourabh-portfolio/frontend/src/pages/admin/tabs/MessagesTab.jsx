import { useEffect, useState } from "react";
import { api } from "../../../lib/api.js";

export default function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  function load() {
    setLoading(true);
    api("/api/contact", { auth: true })
      .then(setMessages)
      .finally(() => setLoading(false));
  }
  useEffect(load, []);

  async function toggleOpen(msg) {
    const nowOpen = openId === msg._id ? null : msg._id;
    setOpenId(nowOpen);
    if (nowOpen && !msg.read) {
      const updated = await api(`/api/contact/${msg._id}/read`, {
        method: "PATCH",
        auth: true,
        body: { read: true },
      });
      setMessages((list) => list.map((m) => (m._id === updated._id ? updated : m)));
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this message? This can't be undone.")) return;
    await api(`/api/contact/${id}`, { method: "DELETE", auth: true });
    setMessages((list) => list.filter((m) => m._id !== id));
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-display text-lg text-paper mb-1">
          Inbox {unreadCount > 0 && <span className="text-scarlet">({unreadCount} unread)</span>}
        </h2>
        <p className="text-paper/50 text-sm">
          Messages sent through your contact form. They're also emailed to you directly
          if SMTP is configured — this is the backup copy, always here even if an email
          gets lost.
        </p>
      </div>

      {loading && <p className="font-mono text-sm text-paper/50">Loading…</p>}
      {!loading && messages.length === 0 && (
        <p className="font-mono text-sm text-paper/50">No messages yet.</p>
      )}

      <div className="space-y-3">
        {messages.map((msg) => (
          <div key={msg._id} className="border border-crimson/15 rounded-sm overflow-hidden">
            <button
              onClick={() => toggleOpen(msg)}
              className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-noir-panel/60 transition-colors"
            >
              <div className="min-w-0 flex items-center gap-3">
                {!msg.read && <span className="w-2 h-2 rounded-full bg-scarlet shrink-0" />}
                <div className="min-w-0">
                  <p className="text-paper text-sm truncate">{msg.name} <span className="text-paper/40">— {msg.email}</span></p>
                  <p className="text-paper/50 text-xs truncate">{msg.message}</p>
                </div>
              </div>
              <span className="font-mono text-[10px] text-paper/40 shrink-0">
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
            </button>

            {openId === msg._id && (
              <div className="px-4 pb-4 border-t border-crimson/10 pt-3">
                <p className="text-paper/80 text-sm whitespace-pre-wrap leading-relaxed mb-3">{msg.message}</p>
                <div className="flex items-center gap-4">
                  <a
                    href={`mailto:${msg.email}`}
                    className="font-mono text-xs uppercase tracking-widest text-crimson hover:text-garnet transition-colors"
                  >
                    Reply by email
                  </a>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="font-mono text-xs uppercase tracking-widest text-paper/50 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { api } from "../lib/api.js";
import { useProfile } from "../context/ProfileContext.jsx";

export default function Contact() {
  const { profile } = useProfile();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await api("/api/contact", { method: "POST", body: form });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mono-label mb-3"
          >
            Sheet 06 — Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display text-4xl sm:text-5xl text-paper mb-6"
          >
            Let's build something
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-paper/70 leading-relaxed max-w-md mb-8 text-lg"
          >
            Open to internships, collaborations, and full-stack projects.
            Send a message and it lands straight in the database behind
            this page — or reach out directly below.
          </motion.p>

          <div className="space-y-3 font-mono text-base text-paper/70">
            <a href={`mailto:${profile.contact?.email}`} className="flex items-center gap-3 hover:text-crimson transition-colors">
              <FiMail /> {profile.contact?.email}
            </a>
            <a href={`tel:${profile.contact?.phone}`} className="flex items-center gap-3 hover:text-crimson transition-colors">
              <FiPhone /> {profile.contact?.phone}
            </a>
            <a href={profile.contact?.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-crimson transition-colors">
              <FiGithub /> {profile.contact?.github?.replace("https://", "")}
            </a>
            <a href={profile.contact?.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-crimson transition-colors">
              <FiLinkedin /> {profile.contact?.linkedin?.replace("https://", "")}
            </a>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="border border-crimson/15 rounded-sm p-6 bg-noir-panel/50 space-y-5"
        >
          <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <div>
            <label className="mono-label block mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              className="w-full bg-noir-ink border border-crimson/20 rounded-sm px-4 py-3 text-paper text-sm focus:outline-none focus:border-crimson transition-colors resize-none"
              placeholder="Tell me a bit about what you're building…"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3 bg-scarlet text-paper font-mono text-xs uppercase tracking-[0.2em] rounded-sm hover:brightness-110 transition disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </motion.button>

          {status === "sent" && (
            <p className="font-mono text-xs text-garnet">Message sent — thank you. I'll reply soon.</p>
          )}
          {status === "error" && (
            <p className="font-mono text-xs text-red-400">{errorMsg || "Could not send. Please try again."}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", value, onChange, required }) {
  return (
    <div>
      <label className="mono-label block mb-2" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-noir-ink border border-crimson/20 rounded-sm px-4 py-3 text-paper text-sm focus:outline-none focus:border-crimson transition-colors"
      />
    </div>
  );
}

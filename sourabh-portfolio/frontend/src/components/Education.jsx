import { motion } from "framer-motion";
import { useProfile } from "../context/ProfileContext.jsx";

export default function Education() {
  const { profile } = useProfile();
  const timeline = profile.education || [];

  return (
    <section id="education" className="relative py-28 border-b border-crimson/10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mono-label mb-3"
        >
          Sheet 05 — Elevation
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl text-paper mb-14"
        >
          Education
        </motion.h2>

        <div className="relative pl-8 border-l border-crimson/20 space-y-12 max-w-2xl">
          {timeline.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span className="absolute -left-[38px] top-1 w-3 h-3 rounded-full bg-scarlet ring-4 ring-noir-ink" />
              <p className="font-mono text-xs uppercase tracking-widest text-garnet mb-1">
                {item.period}
              </p>
              <h3 className="font-display text-2xl text-paper">{item.title}</h3>
              <p className="text-paper/70 text-base mt-1">{item.org}</p>
              <p className="text-paper/50 text-sm">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useProfile } from "../context/ProfileContext.jsx";

export default function About() {
  const { profile } = useProfile();

  return (
    <section id="about" className="relative py-28 border-b border-crimson/10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[0.7fr_1.3fr] gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mono-label mb-3">Sheet 02 — Profile</p>
          <h2 className="font-display text-4xl sm:text-5xl text-paper">About</h2>
        </motion.div>

        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-paper/75 leading-relaxed text-xl"
          >
            {profile.aboutText}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {profile.strengths?.map((s, i) => (
              <div
                key={s}
                className="flex items-start gap-3 border border-crimson/15 rounded-sm px-4 py-3"
              >
                <span className="font-mono text-scarlet text-xs mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-paper/80 text-base">{s}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

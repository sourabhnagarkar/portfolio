import { motion } from "framer-motion";
import { useProfile } from "../context/ProfileContext.jsx";
import TechIcon from "./TechIcon.jsx";
import TechMarquee from "./TechMarquee.jsx";
import SkillsChart from "./SkillsChart.jsx";

export default function Skills() {
  const { profile } = useProfile();
  const skillGroups = profile.skillGroups || [];

  return (
    <section id="skills" className="relative py-28 border-b border-crimson/10 blueprint-grid bg-noir-panel/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mono-label mb-3"
        >
          Sheet 03 — Legend
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl text-paper mb-10"
        >
          Technical stack
        </motion.h2>
      </div>

      <div className="mb-14">
        <TechMarquee />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
              className="corner-brackets border border-crimson/10 rounded-sm p-5 bg-noir-ink/40"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-garnet mb-4">
                {group.label}
              </p>
              <ul className="space-y-2">
                {group.items?.map((item) => (
                  <li key={item} className="text-paper/80 text-base flex items-center gap-2.5">
                    <TechIcon label={item} groupLabel={group.label} size={17} className="text-crimson shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <SkillsChart />
      </div>
    </section>
  );
}

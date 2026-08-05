import { motion } from "framer-motion";
import { useProfile } from "../context/ProfileContext.jsx";
import TechIcon from "./TechIcon.jsx";

export default function SkillsChart() {
  const { profile } = useProfile();
  const levels = profile.skillLevels || [];
  if (levels.length === 0) return null;

  return (
    <div className="mt-14 max-w-2xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-garnet mb-6">
        Proficiency gauge
      </p>
      <div className="space-y-5">
        {levels.map((s, i) => (
          <div key={s.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-2 text-paper text-sm">
                <TechIcon label={s.name} size={16} className="text-crimson" />
                {s.name}
              </span>
              <span className="font-mono text-xs text-paper/50">{s.level}%</span>
            </div>
            <div className="h-2 bg-crimson/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-scarlet to-crimson rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

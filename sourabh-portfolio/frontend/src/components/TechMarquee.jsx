import { motion } from "framer-motion";
import TechIcon from "./TechIcon.jsx";
import { useProfile } from "../context/ProfileContext.jsx";

export default function TechMarquee() {
  const { profile } = useProfile();
  const allItems = (profile.skillGroups || []).flatMap((g) => g.items || []);
  // De-duplicate while preserving order
  const unique = [...new Set(allItems)];
  if (unique.length === 0) return null;

  // Duplicate the list so the CSS animation can loop seamlessly
  const track = [...unique, ...unique];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden border-y border-crimson/10 bg-noir-panel/40 py-5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-noir-ink to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-noir-ink to-transparent z-10" />

      <div className="marquee-track flex items-center gap-10 w-max">
        {track.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-2 shrink-0 font-mono text-xs uppercase tracking-widest text-paper/50"
          >
            <TechIcon label={item} size={20} className="text-crimson" />
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

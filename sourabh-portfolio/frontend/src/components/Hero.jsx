import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useProfile } from "../context/ProfileContext.jsx";
import SocialLinks from "./SocialLinks.jsx";

function TypedRole({ roles }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!roles || roles.length === 0) return;
    const current = roles[index] || "";
    const speed = deleting ? 30 : 55;
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setDeleting(false);
          setIndex((i) => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="font-mono text-base md:text-lg text-garnet">
      {text}
      <span className="animate-pulse">_</span>
    </span>
  );
}

export default function Hero() {
  const { profile } = useProfile();
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden border-b border-crimson/10"
    >
      <div className="absolute inset-0 blueprint-grid opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-noir-ink/40 via-transparent to-noir-ink" />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        {/* Title block, styled like the corner block of a technical drawing sheet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14 border border-crimson/20 rounded-sm p-4 max-w-xl font-mono text-[11px] text-crimson/70 uppercase tracking-widest"
        >
          <div>
            <p className="text-crimson/40">Sheet</p>
            <p className="text-paper">01 / 06</p>
          </div>
          <div>
            <p className="text-crimson/40">Drawn by</p>
            <p className="text-paper">S. Nagarkar</p>
          </div>
          <div>
            <p className="text-crimson/40">Scale</p>
            <p className="text-paper">1 : 1</p>
          </div>
          <div>
            <p className="text-crimson/40">Status</p>
            <p className="text-scarlet">In progress</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mono-label mb-4"
            >
              Portfolio — Rev. 2026
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display font-semibold text-5xl sm:text-7xl lg:text-8xl leading-[1.03] text-paper"
            >
              {firstName}
              {lastName && (
                <>
                  <br /> {lastName}
                </>
              )}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 h-6"
            >
              <TypedRole roles={profile.roles} />
            </motion.div>

            {profile.tagline && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-4 font-display text-xl sm:text-2xl text-scarlet"
              >
                {profile.tagline}
              </motion.p>
            )}

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 max-w-md text-paper/70 text-lg sm:text-xl leading-relaxed"
            >
              {profile.heroBlurb}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="#projects"
                className="px-7 py-3.5 bg-scarlet text-paper font-mono text-sm uppercase tracking-[0.2em] rounded-sm hover:brightness-110 transition shadow-[0_0_24px_rgba(229,56,59,0.35)]"
              >
                View projects
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="px-7 py-3.5 border border-crimson/40 text-crimson font-mono text-sm uppercase tracking-[0.2em] rounded-sm hover:bg-crimson/10 transition"
              >
                Get in touch
              </motion.a>
              <SocialLinks size={22} className="ml-1 text-paper/60" />
            </motion.div>
          </div>

          <BlueprintDrawing />
        </div>
      </div>
    </section>
  );
}

function BlueprintDrawing() {
  // A schematic outline of a laptop/terminal, "drawn" with animated stroke.
  return (
    <motion.svg
      initial="hidden"
      animate="visible"
      viewBox="0 0 320 260"
      className="w-full max-w-sm mx-auto"
    >
      <motion.g
        stroke="#FF3347"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.rect
          x="30" y="30" width="260" height="150" rx="6"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <motion.rect
          x="46" y="46" width="228" height="118" rx="2"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.path
          d="M60 60 L120 60 M60 76 L160 76 M60 92 L100 92"
          stroke="#FF8FA3"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.9 }}
        />
        <motion.path
          d="M15 190 L305 190 L285 210 L35 210 Z"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.1 }}
        />
      </motion.g>

      {/* Dimension lines + annotation, like a real drawing callout */}
      <motion.g
        stroke="#E5383B"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <line x1="30" y1="222" x2="290" y2="222" />
        <line x1="30" y1="216" x2="30" y2="228" />
        <line x1="290" y1="216" x2="290" y2="228" />
        <text x="130" y="240" fill="#E5383B" fontSize="9" fontFamily="monospace" letterSpacing="1">
          MERN · 360mm
        </text>
      </motion.g>
    </motion.svg>
  );
}

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
          setDeleting(true);
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
  }, [text, deleting, index, roles]);

  return (
    <span className="font-mono text-base md:text-lg text-garnet">
      {text}
      <span className="animate-pulse">_</span>
    </span>
  );
}

export default function Hero() {
  const { profile } = useProfile();

  if (!profile) {
    return null;
  }

  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="top"
      className="
        relative
        min-h-screen
        flex
        items-center
        overflow-hidden
        border-b
        border-crimson/10
      "
    >
      {/* Blueprint background */}
      <div className="absolute inset-0 blueprint-grid opacity-70" />

      <div className="absolute inset-0 bg-gradient-to-b from-noir-ink/40 via-transparent to-noir-ink" />

      {/* Main container */}
      <div
        className="
          relative
          max-w-6xl
          mx-auto
          px-4
          sm:px-6
          pt-24
          sm:pt-28
          md:pt-32
          pb-16
          sm:pb-20
          w-full
          min-w-0
        "
      >
        {/* Technical drawing information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            grid
            grid-cols-2
            sm:grid-cols-4
            gap-3
            sm:gap-4
            mb-10
            sm:mb-14
            border
            border-crimson/20
            rounded-sm
            p-3
            sm:p-4
            w-full
            max-w-xl
            font-mono
            text-[10px]
            sm:text-[11px]
            text-crimson/70
            uppercase
            tracking-widest
          "
        >
          <div className="min-w-0">
            <p className="text-crimson/40">Sheet</p>
            <p className="text-paper">01 / 06</p>
          </div>

          <div className="min-w-0">
            <p className="text-crimson/40">Drawn by</p>
            <p className="text-paper break-words">S. Nagarkar</p>
          </div>

          <div className="min-w-0">
            <p className="text-crimson/40">Scale</p>
            <p className="text-paper">1 : 1</p>
          </div>

          <div className="min-w-0">
            <p className="text-crimson/40">Status</p>
            <p className="text-scarlet break-words">In progress</p>
          </div>
        </motion.div>

        {/* Hero content + blueprint */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[1.3fr_1fr]
            gap-10
            md:gap-12
            items-center
            min-w-0
          "
        >
          {/* Left content */}
          <div className="min-w-0">
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mono-label mb-4"
            >
              Portfolio — Rev. 2026
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="
                font-display
                font-semibold
                text-5xl
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
                leading-[1.03]
                text-paper
                break-words
              "
            >
              {firstName}

              {lastName && (
                <>
                  <br />
                  {lastName}
                </>
              )}
            </motion.h1>

            {/* Typed role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 h-6"
            >
              <TypedRole roles={profile.roles} />
            </motion.div>

            {/* Tagline */}
            {profile.tagline && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="
                  mt-4
                  font-display
                  text-lg
                  sm:text-xl
                  md:text-2xl
                  text-scarlet
                  break-words
                "
              >
                {profile.tagline}
              </motion.p>
            )}

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="
                mt-6
                max-w-md
                text-base
                sm:text-lg
                md:text-xl
                leading-relaxed
                text-paper/70
                break-words
              "
            >
              {profile.heroBlurb}
            </motion.p>

            {/* Buttons + Social */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="
                mt-8
                sm:mt-9
                flex
                flex-col
                sm:flex-row
                sm:flex-wrap
                items-stretch
                sm:items-center
                gap-3
                sm:gap-4
              "
            >
              {/* View Projects */}
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="#projects"
                className="
                  w-full
                  sm:w-auto
                  text-center
                  px-6
                  sm:px-7
                  py-3.5
                  bg-scarlet
                  text-paper
                  font-mono
                  text-sm
                  uppercase
                  tracking-[0.15em]
                  sm:tracking-[0.2em]
                  rounded-sm
                  hover:brightness-110
                  transition
                  shadow-[0_0_24px_rgba(229,56,59,0.35)]
                "
              >
                View projects
              </motion.a>

              {/* Get In Touch */}
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="
                  w-full
                  sm:w-auto
                  text-center
                  px-6
                  sm:px-7
                  py-3.5
                  border
                  border-crimson/40
                  text-crimson
                  font-mono
                  text-sm
                  uppercase
                  tracking-[0.15em]
                  sm:tracking-[0.2em]
                  rounded-sm
                  hover:bg-crimson/10
                  transition
                "
              >
                Get in touch
              </motion.a>

              {/* Social links */}
              <div className="flex justify-center sm:justify-start">
                <SocialLinks
                  size={22}
                  className="text-paper/60"
                />
              </div>
            </motion.div>
          </div>

          {/* Right blueprint */}
          <BlueprintDrawing />
        </div>
      </div>
    </section>
  );
}

function BlueprintDrawing() {
  return (
    <motion.svg
      initial="hidden"
      animate="visible"
      viewBox="0 0 320 260"
      className="
        w-full
        max-w-[320px]
        sm:max-w-sm
        md:max-w-md
        mx-auto
        h-auto
      "
    >
      <motion.g
        stroke="#FF3347"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.rect
          x="30"
          y="30"
          width="260"
          height="150"
          rx="6"
          variants={{
            hidden: {
              pathLength: 0,
              opacity: 0,
            },
            visible: {
              pathLength: 1,
              opacity: 1,
            },
          }}
          transition={{
            duration: 1.4,
            ease: "easeInOut",
          }}
        />

        <motion.rect
          x="46"
          y="46"
          width="228"
          height="118"
          rx="2"
          variants={{
            hidden: {
              pathLength: 0,
              opacity: 0,
            },
            visible: {
              pathLength: 1,
              opacity: 1,
            },
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />

        <motion.path
          d="M60 60 L120 60 M60 76 L160 76 M60 92 L100 92"
          stroke="#FF8FA3"
          variants={{
            hidden: {
              pathLength: 0,
              opacity: 0,
            },
            visible: {
              pathLength: 1,
              opacity: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            delay: 0.9,
          }}
        />

        <motion.path
          d="M15 190 L305 190 L285 210 L35 210 Z"
          variants={{
            hidden: {
              pathLength: 0,
              opacity: 0,
            },
            visible: {
              pathLength: 1,
              opacity: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            delay: 1.1,
          }}
        />
      </motion.g>

      {/* Dimension lines */}
      <motion.g
        stroke="#E5383B"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.6,
          duration: 0.6,
        }}
      >
        <line
          x1="30"
          y1="222"
          x2="290"
          y2="222"
        />

        <line
          x1="30"
          y1="216"
          x2="30"
          y2="228"
        />

        <line
          x1="290"
          y1="216"
          x2="290"
          y2="228"
        />

        <text
          x="130"
          y="240"
          fill="#E5383B"
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="1"
        >
          MERN · 360mm
        </text>
      </motion.g>
    </motion.svg>
  );
}
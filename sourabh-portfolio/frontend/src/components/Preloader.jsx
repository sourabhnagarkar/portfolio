import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "INITIALIZING PORTFOLIO...",
  "LOADING PROJECT SHEETS...",
  "CALIBRATING BLUEPRINT GRID...",
  "READY.",
];

export default function Preloader({
  loading,
  minDuration = 1800,
}) {
  const [visible, setVisible] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);

useEffect(() => {
  const lineTimer = setInterval(() => {
    setLineIndex((i) => Math.min(i + 1, bootLines.length - 1));
  }, minDuration / bootLines.length);

  let hideTimer;

  if (!loading) {
    hideTimer = setTimeout(() => {
      setVisible(false);
    }, 300);
  }

  return () => {
    clearInterval(lineTimer);
    if (hideTimer) clearTimeout(hideTimer);
  };
}, [loading, minDuration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-noir-ink blueprint-grid flex flex-col items-center justify-center px-6"
        >
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            viewBox="0 0 100 100"
            className="w-16 h-16 mb-6"
          >
            <motion.rect
              x="10" y="10" width="80" height="80" rx="4"
              fill="none" stroke="#FF3347" strokeWidth="3"
            />
            <motion.path
              d="M30 60 L45 75 L72 35"
              fill="none" stroke="#E5383B" strokeWidth="6"
              strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeInOut" }}
            />
          </motion.svg>

          <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-crimson mb-4 h-5">
            {bootLines[lineIndex]}
          </p>

          <div className="w-56 sm:w-72 h-1 bg-crimson/10 rounded-full overflow-hidden">
            <div className="boot-bar-fill h-full bg-scarlet" style={{ animationDuration: `${minDuration}ms` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

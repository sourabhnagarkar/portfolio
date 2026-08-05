import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { useProfile } from "../context/ProfileContext.jsx";
import { resolveAsset } from "../lib/api.js";

const links = [
  { href: "#featured", label: "Featured" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Achievements" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { profile } = useProfile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-noir-ink/90 backdrop-blur border-b border-crimson/10" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm tracking-widest text-crimson">
          {profile.logoUrl ? (
            <img
              src={resolveAsset(profile.logoUrl)}
              alt={profile.name}
              className="h-7 w-7 object-contain"
            />
          ) : (
            <span>
              {(profile.logoText || "SSN.DEV").split(".")[0]}
              <span className="text-scarlet">.</span>
              {(profile.logoText || "SSN.DEV").split(".")[1] || "DEV"}
            </span>
          )}
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href} className="relative group">
              <a
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.2em] text-paper/80 hover:text-paper transition-colors"
              >
                {link.label}
              </a>
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-scarlet transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
          <a
            href={profile.resumeUrl || "/Sourabh_Nagarkar_Resume.pdf"}
            className="font-mono text-xs uppercase tracking-[0.2em] px-4 py-2 border border-crimson/40 rounded-sm text-crimson hover:bg-crimson/10 transition-colors"
          >
            Resume
          </a>
        </ul>

        <button
          className="md:hidden text-paper text-xl"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-noir-ink border-b border-crimson/10 px-6"
          >
            {links.map((link) => (
              <li key={link.href} className="py-3 border-t border-crimson/10">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-paper/80"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

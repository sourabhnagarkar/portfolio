import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../lib/api.js";
import CertificateCard from "./CertificateCard.jsx";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    api("/api/certificates")
      .then((data) => {
        if (!ignore) setCertificates(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  if (!loading && certificates.length === 0) return null;

  return (
    <section id="certificates" className="relative py-28 border-b border-crimson/10 blueprint-grid bg-noir-panel/20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mono-label mb-3"
        >
          Sheet 04.5 — Certifications
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl text-paper mb-14"
        >
          Certificates &amp; achievements
        </motion.h2>

        {loading ? (
          <p className="font-mono text-sm text-paper/50">Loading…</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {certificates.map((cert, i) => (
              <CertificateCard key={cert._id} certificate={cert} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { FiAward, FiExternalLink } from "react-icons/fi";
import { resolveAsset } from "../lib/api.js";

export default function CertificateCard({ certificate, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -4 }}
      className="corner-brackets flex gap-4 border border-crimson/15 rounded-sm bg-noir-panel/50 p-5"
    >
      <div className="shrink-0 w-12 h-12 rounded-sm border border-crimson/20 bg-noir-ink flex items-center justify-center overflow-hidden">
        {certificate.logoUrl ? (
          <img
            src={resolveAsset(certificate.logoUrl)}
            alt={certificate.issuer}
            className="w-full h-full object-cover"
          />
        ) : (
          <FiAward className="text-crimson" size={20} />
        )}
      </div>

      <div className="min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-lg text-paper truncate">{certificate.title}</h3>
          {certificate.date && (
            <span className="font-mono text-[10px] text-paper/40 shrink-0">{certificate.date}</span>
          )}
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-garnet mt-1">
          {certificate.issuer}
        </p>
        {certificate.description && (
          <p className="text-paper/70 text-base mt-2 leading-relaxed">{certificate.description}</p>
        )}
        {certificate.credentialUrl && (
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 font-mono text-[11px] uppercase tracking-widest text-crimson hover:text-garnet transition-colors"
          >
            <FiExternalLink size={12} /> View credential
          </a>
        )}
      </div>
    </motion.article>
  );
}

import { motion } from "framer-motion";
import { FiAward, FiExternalLink } from "react-icons/fi";
import { resolveAsset } from "../lib/api.js";

export default function CertificateCard({ certificate, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.08,
      }}
      whileHover={{ y: -4 }}
      className="
        corner-brackets
        w-full
        min-w-0
        border
        border-crimson/15
        rounded-sm
        bg-noir-panel/50
        p-4
        sm:p-5
      "
    >
      <div className="flex gap-3 sm:gap-4 w-full min-w-0">

        {/* Logo */}
        <div
          className="
            shrink-0
            w-12
            h-12
            sm:w-14
            sm:h-14
            rounded-sm
            border
            border-crimson/20
            bg-noir-ink
            flex
            items-center
            justify-center
            overflow-hidden
          "
        >
          {certificate.logoUrl ? (
            <img
              src={resolveAsset(certificate.logoUrl)}
              alt={certificate.issuer}
              className="w-full h-full object-cover"
            />
          ) : (
            <FiAward
              className="text-crimson"
              size={20}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* Title + Date */}
          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-start
              sm:justify-between
              gap-1
              sm:gap-3
              min-w-0
            "
          >
            <h3
              className="
                font-display
                text-base
                sm:text-lg
                md:text-xl
                text-paper
                leading-snug
                break-words
                min-w-0
              "
            >
              {certificate.title}
            </h3>

            {certificate.date && (
              <span
                className="
                  font-mono
                  text-[10px]
                  sm:text-xs
                  text-paper/40
                  shrink-0
                  whitespace-nowrap
                "
              >
                {certificate.date}
              </span>
            )}
          </div>

          {/* Issuer */}
          <p
            className="
              font-mono
              text-[10px]
              sm:text-[11px]
              uppercase
              tracking-[0.12em]
              sm:tracking-widest
              text-garnet
              mt-2
              break-words
            "
          >
            {certificate.issuer}
          </p>

          {/* Description */}
          {certificate.description && (
            <p
              className="
                text-paper/70
                text-sm
                sm:text-base
                mt-3
                leading-relaxed
                break-words
              "
            >
              {certificate.description}
            </p>
          )}

          {/* Credential */}
          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                gap-1.5
                mt-3
                font-mono
                text-[10px]
                sm:text-[11px]
                uppercase
                tracking-widest
                text-crimson
                hover:text-garnet
                transition-colors
              "
            >
              <FiExternalLink size={12} />
              View credential
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
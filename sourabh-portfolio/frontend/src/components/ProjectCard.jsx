import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { resolveAsset } from "../lib/api.js";

export default function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
      className="group scanline corner-brackets relative overflow-hidden border border-crimson/15 rounded-sm bg-noir-panel/60 p-6 flex flex-col h-full"
    >
      {project.imageUrl && (
        <img
          src={resolveAsset(project.imageUrl)}
          alt={project.title}
          className="w-full h-36 object-cover rounded-sm mb-4 border border-crimson/10"
        />
      )}
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-xs text-crimson/50">SHEET {project.sheet}</span>
        <span className="font-mono text-xs text-paper/40">{project.year}</span>
      </div>

      <h3 className="font-display text-2xl text-paper mb-1.5 group-hover:text-crimson transition-colors">
        {project.title}
      </h3>
      <p className="font-mono text-sm uppercase tracking-widest text-scarlet mb-4">
        {project.tagline}
      </p>

      <p className="text-paper/70 text-base leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      <ul className="space-y-1.5 mb-5">
        {project.highlights?.map((h) => (
          <li key={h} className="text-paper/60 text-sm flex gap-2">
            <span className="text-garnet">—</span>
            {h}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack?.map((s) => (
          <span
            key={s}
            className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-crimson/20 text-crimson/80 rounded-sm"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-4 pt-4 border-t border-crimson/10">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper/70 hover:text-crimson transition-colors"
          >
            <FiGithub /> Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper/70 hover:text-crimson transition-colors"
          >
            <FiExternalLink /> Live
          </a>
        )}
      </div>
    </motion.article>
  );
}

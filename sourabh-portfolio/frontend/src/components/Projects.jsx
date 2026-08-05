import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard.jsx";

export default function Projects({ projects, loading }) {
  return (
    <section id="projects" className="relative py-28 border-b border-crimson/10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mono-label mb-3"
        >
          Sheet 04 — Drawings
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl text-paper mb-14"
        >
          Selected projects
        </motion.h2>

        {loading ? (
          <p className="font-mono text-sm text-paper/50">Loading projects…</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project._id || project.title} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../lib/api.js";
import GalleryCard from "./GalleryCard.jsx";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    api("/api/gallery")
      .then((data) => {
        if (!ignore) setItems(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  if (!loading && items.length === 0) return null;

  return (
    <section id="featured" className="relative py-28 border-b border-crimson/10">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mono-label mb-3"
        >
          Sheet 01.5 — Featured
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl text-paper"
        >
          Moments &amp; milestones
        </motion.h2>
      </div>

      {loading ? (
        <p className="max-w-6xl mx-auto px-6 font-mono text-sm text-paper/50">Loading…</p>
      ) : (
        <div className="flex gap-5 overflow-x-auto px-6 pb-4 max-w-6xl mx-auto snap-x snap-mandatory scrollbar-thin">
          {items.map((item, i) => (
            <div key={item._id} className="snap-start">
              <GalleryCard item={item} index={i} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

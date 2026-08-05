import { motion } from "framer-motion";
import { resolveAsset } from "../lib/api.js";

export default function GalleryCard({ item, index }) {
  const content = (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -6 }}
      className="corner-brackets shrink-0 w-64 sm:w-72 border border-crimson/15 rounded-sm bg-noir-panel/50 overflow-hidden"
    >
      <div className="w-full h-44 overflow-hidden bg-noir-ink">
        <img
          src={resolveAsset(item.imageUrl)}
          alt={item.caption}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <figcaption className="p-4 text-paper/75 text-sm leading-snug">{item.caption}</figcaption>
    </motion.figure>
  );

  return item.link ? (
    <a href={item.link} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}

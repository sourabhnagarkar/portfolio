import { motion } from "framer-motion";
import { resolveAsset } from "../lib/api.js";

export default function GalleryCard({ item, index }) {
  const content = (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.08,
      }}
      whileHover={{ y: -6 }}
      className="
        corner-brackets
        shrink-0
        w-[calc(100vw-48px)]
        sm:w-72
        md:w-80
        lg:w-96
        max-w-[420px]
        border
        border-crimson/15
        rounded-sm
        bg-noir-panel/50
        overflow-hidden
      "
    >
      <div className="w-full aspect-[16/10] overflow-hidden bg-noir-ink">
        <img
          src={resolveAsset(item.imageUrl)}
          alt={item.caption}
          className="
            block
            w-full
            h-full
            object-cover
            hover:scale-105
            transition-transform
            duration-500
          "
        />
      </div>

      <figcaption
        className="
          p-4
          sm:p-5
          text-paper/75
          text-sm
          sm:text-base
          leading-relaxed
          break-words
        "
      >
        {item.caption}
      </figcaption>
    </motion.figure>
  );

  return item.link ? (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      className="block min-w-0"
    >
      {content}
    </a>
  ) : (
    content
  );
}
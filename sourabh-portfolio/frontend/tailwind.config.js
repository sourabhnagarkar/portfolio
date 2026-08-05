/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        noir: {
          ink: "#0A0A0B",     // near-black background
          panel: "#160F11",   // card / panel background, warm-dark
        },
        crimson: "#FF3347",   // primary accent — borders, headings, links
        garnet: "#FF8FA3",    // secondary accent — highlights, sub-labels
        scarlet: "#E5383B",   // CTA button fill
        paper: "#F3E9EA",     // off-white body text, warm tint
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

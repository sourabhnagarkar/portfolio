// Fallback data shown instantly on load and if the API is unreachable.
// The live version is fetched from GET /api/projects (see App.jsx).
export const fallbackProjects = [
  {
    _id: "outfiton",
    sheet: "01",
    title: "OutfitOn",
    tagline: "Online cloth rental system",
    description:
      "A full-stack platform where users browse, book, and return clothing rentals online, built for client Rental Gowns, Sirsi.",
    stack: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    role: "Full-Stack Developer",
    year: "2025",
    githubUrl: "https://github.com/sourabhnagarkar/OutfitOn",
    highlights: [
      "Secure auth and vendor dashboard",
      "Date-range booking with availability tracking",
      "End-to-end order & payment flow",
    ],
  },
  {
    _id: "atm-finder",
    sheet: "02",
    title: "Smart ATM Finder",
    tagline: "Location-based ATM discovery",
    description:
      "Helps users locate and navigate to nearby ATMs quickly with live, location-based search and filtering.",
    stack: ["JavaScript", "Leaflet.js", "Bootstrap", "MySQL"],
    role: "Frontend & Backend",
    year: "2025",
    githubUrl: "https://github.com/sourabhnagarkar/smart-atm-finder",
    highlights: ["Real-time map search", "MySQL-backed ATM records"],
  },
  {
    _id: "scansecure",
    sheet: "03",
    title: "ScanSecure",
    tagline: "QR & URL security scanner",
    description:
      "A Python/Flask tool that flags phishing and malicious redirects in QR codes and URLs before you open them.",
    stack: ["Python", "Flask"],
    role: "Developer",
    year: "2025",
    githubUrl: "https://github.com/sourabhnagarkar/ScanSecure",
    highlights: ["URL/QR risk analysis pipeline", "Lightweight Flask API"],
  },
  {
    _id: "streamflix",
    sheet: "04",
    title: "Streamflix",
    tagline: "Movie streaming platform",
    description:
      "Explores catalog browsing and playback flows, built with a Spring Boot backend and a dedicated frontend.",
    stack: ["Spring Boot", "Java", "JavaScript"],
    role: "Developer",
    year: "2026",
    githubUrl: "https://github.com/sourabhnagarkar/streamflix",
    highlights: ["Catalog & playback data model", "Separate frontend/backend structure"],
  },
  {
    _id: "flybird",
    sheet: "05",
    title: "Fly-Bird-Pro",
    tagline: "Arcade game, built from scratch",
    description:
      "A side-scrolling arcade game built in C using SDL2, covering collision detection, the game loop, and rendering.",
    stack: ["C", "SDL2"],
    role: "Developer",
    year: "2024",
    githubUrl: "https://github.com/sourabhnagarkar/Fly-Bird-Pro",
    highlights: ["Custom game loop & physics", "SDL2 rendering & input handling"],
  },
];


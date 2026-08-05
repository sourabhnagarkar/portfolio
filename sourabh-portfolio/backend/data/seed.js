import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Project from "../models/Project.js";
import Certificate from "../models/Certificate.js";
import Profile from "../models/Profile.js";
import Admin from "../models/Admin.js";

dotenv.config();

const projects = [
  {
    sheet: "01",
    title: "OutfitOn",
    tagline: "Online cloth rental system",
    description:
      "A full-stack platform where users browse, book, and return clothing rentals online, built as a final-year project for client Rental Gowns, Sirsi.",
    stack: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    role: "Full-Stack Developer",
    year: "2025",
    githubUrl: "https://github.com/sourabhnagarkar/OutfitOn",
    highlights: [
      "Secure user authentication and vendor dashboard",
      "Date-range booking engine with availability tracking",
      "End-to-end order and payment handling modules",
    ],
    featured: true,
  },
  {
    sheet: "02",
    title: "Smart ATM Finder",
    tagline: "Location-based ATM discovery web app",
    description:
      "Helps users locate and navigate to nearby ATMs quickly using live, location-based search and filtering.",
    stack: ["JavaScript", "Leaflet.js", "HTML", "CSS", "Bootstrap", "MySQL"],
    role: "Frontend & Backend",
    year: "2025",
    githubUrl: "https://github.com/sourabhnagarkar/smart-atm-finder",
    highlights: [
      "Real-time location search with map integration",
      "MySQL-backed ATM location records",
      "Responsive, cross-device UI",
    ],
    featured: true,
  },
  {
    sheet: "03",
    title: "ScanSecure",
    tagline: "QR & URL security scanner",
    description:
      "A Python/Flask tool that inspects QR codes and URLs for common signs of phishing and malicious redirects before a user opens them.",
    stack: ["Python", "Flask"],
    role: "Developer",
    year: "2025",
    githubUrl: "https://github.com/sourabhnagarkar/ScanSecure",
    highlights: ["URL/QR risk analysis pipeline", "Lightweight Flask API for scan requests"],
    featured: true,
  },
  {
    sheet: "04",
    title: "Streamflix",
    tagline: "Movie streaming platform",
    description:
      "A movie streaming platform exploring catalog browsing and playback flows, built with a Spring Boot backend and a dedicated frontend.",
    stack: ["Spring Boot", "Java", "JavaScript"],
    role: "Developer",
    year: "2026",
    githubUrl: "https://github.com/sourabhnagarkar/streamflix",
    highlights: ["Catalog and playback data model", "Separate frontend/backend structure"],
    featured: false,
  },
  {
    sheet: "05",
    title: "Fly-Bird-Pro",
    tagline: "Flappy-Bird-style arcade game",
    description:
      "A side-scrolling arcade game built from scratch in C using SDL2, covering collision detection, game loops, and rendering.",
    stack: ["C", "SDL2"],
    role: "Developer",
    year: "2024",
    githubUrl: "https://github.com/sourabhnagarkar/Fly-Bird-Pro",
    highlights: ["Custom game loop and physics", "SDL2 rendering and input handling"],
    featured: false,
  },
];

const certificates = [
  {
    title: "Add your certificates from the admin panel",
    issuer: "Sample entry — safe to edit or delete",
    date: "2026",
    description:
      "This is a placeholder so you can see how the Certificates section looks. Log in to /admin/login to replace it with your real certificates and achievements.",
    order: 0,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sourabh-portfolio");

  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log(`Seeded ${projects.length} projects.`);

  const existingCerts = await Certificate.countDocuments();
  if (existingCerts === 0) {
    await Certificate.insertMany(certificates);
    console.log(`Seeded ${certificates.length} placeholder certificate(s).`);
  }

  const existingProfile = await Profile.findOne();
  if (!existingProfile) {
    await Profile.create({});
    console.log("Created default profile document.");
  }

  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "change-this-password";
  const existingAdmin = await Admin.findOne({ username });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(password, 10);
    await Admin.create({ username, passwordHash });
    console.log(`Created admin user "${username}". Log in at /admin/login with the password from your .env file.`);
  } else {
    console.log(`Admin user "${username}" already exists — left untouched.`);
  }

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

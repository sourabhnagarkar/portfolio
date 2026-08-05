import mongoose from "mongoose";

// A single document holding everything editable from the admin panel:
// hero/about copy, skills, and contact details. There is only ever one
// Profile document - the routes always upsert/read the first one found.
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Sourabh S Nagarkar" },
    tagline: { type: String, default: "Building the web, one commit at a time." },
    logoText: { type: String, default: "SSN.DEV" },
    logoUrl: { type: String, default: "" },
    roles: {
      type: [String],
      default: [
        "MCA STUDENT",
        "FULL-STACK DEVELOPER",
        "PYTHON · PHP · JAVASCRIPT",
        "BUILDS FROM SPEC TO SHIP",
      ],
    },
    heroBlurb: {
      type: String,
      default:
        "I design and ship full-stack web applications end to end — from database schema to the last pixel of the interface. Currently an MCA student at Ramaiah Institute of Technology, Bengaluru.",
    },
    aboutText: {
      type: String,
      default:
        "I'm an MCA student with a strong foundation in software development, web application development, and database management — proficient in Python, SQL, PHP, and JavaScript, with hands-on experience building full-stack applications.",
    },
    strengths: {
      type: [String],
      default: [
        "Problem-solving & analytical thinking",
        "Independent work with minimal supervision",
        "Team collaboration & communication",
        "Quick learner & adaptable",
      ],
    },
    skillGroups: {
      type: [
        {
          label: String,
          items: [String],
        },
      ],
      default: [
        { label: "Languages", items: ["Python", "PHP", "JavaScript", "C", "SQL"] },
        { label: "Web", items: ["HTML", "CSS", "React", "Bootstrap", "Express.js"] },
        { label: "Data", items: ["MySQL", "MongoDB"] },
        { label: "Tooling", items: ["Git", "VS Code", "XAMPP"] },
        { label: "Foundations", items: ["OOP", "Data Structures", "DBMS", "SDLC", "Debugging"] },
      ],
    },
    skillLevels: {
      // Optional proficiency chart shown under the skill groups. 0-100.
      type: [
        {
          name: String,
          level: { type: Number, min: 0, max: 100 },
        },
      ],
      default: [
        { name: "Python", level: 80 },
        { name: "JavaScript", level: 75 },
        { name: "PHP", level: 70 },
        { name: "SQL", level: 75 },
        { name: "React", level: 65 },
      ],
    },
    education: {
      type: [
        {
          period: String,
          title: String,
          org: String,
          detail: String,
        },
      ],
      default: [
        {
          period: "2025 — Present",
          title: "Master of Computer Applications (MCA)",
          org: "Ramaiah Institute of Technology, Bengaluru",
          detail: "CGPA 8.22 (1st Semester)",
        },
        {
          period: "2022 — 2025",
          title: "Bachelor of Computer Applications (BCA)",
          org: "Kamadhenu BCA College, Karwar",
          detail: "CGPA 8.81",
        },
      ],
    },
    contact: {
      email: { type: String, default: "sourabhnagarkar26@gmail.com" },
      phone: { type: String, default: "+91 89710 73230" },
      github: { type: String, default: "https://github.com/sourabhnagarkar" },
      linkedin: { type: String, default: "https://www.linkedin.com/in/sourabhnagarkar/" },
    },
    socials: {
      // Extra platforms beyond GitHub/LinkedIn/email above - shown as icon
      // links wherever social links appear. platform is matched
      // case-insensitively against a known icon set (twitter/x, instagram,
      // youtube, discord, dribbble, behance, stackoverflow, medium,
      // telegram, leetcode) and falls back to a generic link icon.
      type: [
        {
          platform: String,
          url: String,
        },
      ],
      default: [],
    },
    resumeUrl: { type: String, default: "/Sourabh_Nagarkar_Resume.pdf" },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);

// Shown instantly on load and used if the API is unreachable — mirrors the
// default Profile document created by the backend on first run.
export const fallbackProfile = {
  name: "Sourabh S Nagarkar",
  tagline: "Building the web, one commit at a time.",
  logoText: "SSN.DEV",
  logoUrl: "",
  roles: [
    "MCA STUDENT",
    "FULL-STACK DEVELOPER",
    "PYTHON · PHP · JAVASCRIPT",
    "BUILDS FROM SPEC TO SHIP",
  ],
  heroBlurb:
    "I design and ship full-stack web applications end to end — from database schema to the last pixel of the interface. Currently an MCA student at Ramaiah Institute of Technology, Bengaluru.",
  aboutText:
    "I'm an MCA student with a strong foundation in software development, web application development, and database management — proficient in Python, SQL, PHP, and JavaScript, with hands-on experience building full-stack applications.",
  strengths: [
    "Problem-solving & analytical thinking",
    "Independent work with minimal supervision",
    "Team collaboration & communication",
    "Quick learner & adaptable",
  ],
  skillGroups: [
    { label: "Languages", items: ["Python", "PHP", "JavaScript", "C", "SQL"] },
    { label: "Web", items: ["HTML", "CSS", "React", "Bootstrap", "Express.js"] },
    { label: "Data", items: ["MySQL", "MongoDB"] },
    { label: "Tooling", items: ["Git", "VS Code", "XAMPP"] },
    { label: "Foundations", items: ["OOP", "Data Structures", "DBMS", "SDLC", "Debugging"] },
  ],
  skillLevels: [
    { name: "Python", level: 80 },
    { name: "JavaScript", level: 75 },
    { name: "PHP", level: 70 },
    { name: "SQL", level: 75 },
    { name: "React", level: 65 },
  ],
  education: [
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
  contact: {
    email: "sourabhnagarkar26@gmail.com",
    phone: "+91 89710 73230",
    github: "https://github.com/sourabhnagarkar",
    linkedin: "https://www.linkedin.com/in/sourabhnagarkar/",
  },
  socials: [],
  resumeUrl: "/Sourabh_Nagarkar_Resume.pdf",
};

export const fallbackCertificates = [];

import {
  SiPython, SiPhp, SiJavascript, SiC, SiMysql, SiMongodb, SiHtml5, SiCss,
  SiReact, SiBootstrap, SiExpress, SiGit, SiGithub,
  SiXampp, SiFlask, SiSpringboot, SiTailwindcss, SiNodedotjs,
  SiTypescript, SiDocker, SiFigma, SiPostman, SiVercel, SiNetlify,
  SiLinux, SiJquery, SiNumpy, SiOpencv, SiDjango, SiKotlin,
} from "react-icons/si";
import { FaJava, FaGamepad } from "react-icons/fa6";
import { FiCode, FiDatabase, FiTool, FiLayers, FiTerminal } from "react-icons/fi";

// Maps a skill/stack label (as typed in the admin panel) to a themed logo.
// Matching is case-insensitive and tolerant of punctuation, so "Express.js"
// and "express" both resolve to the same icon. Anything unrecognized still
// gets a sensible generic icon instead of breaking the layout.
const ICONS = {
  python: SiPython,
  php: SiPhp,
  javascript: SiJavascript,
  js: SiJavascript,
  typescript: SiTypescript,
  c: SiC,
  java: FaJava,
  kotlin: SiKotlin,
  sql: SiMysql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss,
  css3: SiCss,
  react: SiReact,
  "react.js": SiReact,
  bootstrap: SiBootstrap,
  express: SiExpress,
  "express.js": SiExpress,
  "node.js": SiNodedotjs,
  nodejs: SiNodedotjs,
  git: SiGit,
  github: SiGithub,
  "vs code": FiTerminal,
  vscode: FiTerminal,
  xampp: SiXampp,
  flask: SiFlask,
  django: SiDjango,
  "spring boot": SiSpringboot,
  springboot: SiSpringboot,
  sdl2: FaGamepad,
  sdl: FaGamepad,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  docker: SiDocker,
  figma: SiFigma,
  postman: SiPostman,
  vercel: SiVercel,
  netlify: SiNetlify,
  linux: SiLinux,
  jquery: SiJquery,
  numpy: SiNumpy,
  opencv: SiOpencv,
  leaflet: FiLayers,
  "leaflet.js": FiLayers,
};

const FALLBACKS_BY_GROUP = {
  languages: FiCode,
  data: FiDatabase,
  tooling: FiTool,
};

function normalize(label = "") {
  return label.trim().toLowerCase();
}

export default function TechIcon({ label, groupLabel, size = 18, className = "" }) {
  const key = normalize(label);
  const Icon = ICONS[key] || FALLBACKS_BY_GROUP[normalize(groupLabel)] || FiCode;
  return <Icon size={size} className={className} aria-hidden="true" />;
}

export function getKnownTechLabels() {
  return Object.keys(ICONS);
}

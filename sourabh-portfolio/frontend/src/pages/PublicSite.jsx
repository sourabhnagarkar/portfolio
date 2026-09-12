import { useEffect, useState } from "react";
import Preloader from "../components/Preloader.jsx";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Gallery from "../components/Gallery.jsx";
import About from "../components/About.jsx";
import Skills from "../components/Skills.jsx";
import Projects from "../components/Projects.jsx";
import Certificates from "../components/Certificates.jsx";
import Education from "../components/Education.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import { api } from "../lib/api.js";
import { fallbackProjects } from "../data/projects.js";

export default function PublicSite() {
  // Show projects immediately while the backend loads
  const [projects, setProjects] = useState(fallbackProjects);
  const [projectsLoading, setProjectsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    setProjectsLoading(true);

    api("/api/projects")
      .then((data) => {
        if (!ignore && Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((err) => {
        console.error("Projects fetch failed:", err);
        // Keep fallback projects
      })
      .finally(() => {
        if (!ignore) {
          setProjectsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Don't wait for Render/MongoDB to show the website */}
      <Preloader loading={false} />

      <Navbar />

      <main>
        <Hero />
        <Gallery />
        <About />
        <Skills />

        <Projects
          projects={projects}
          loading={projectsLoading}
        />

        <Certificates />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
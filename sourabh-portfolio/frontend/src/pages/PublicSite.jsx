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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    api("/api/projects")
      .then((data) => {
        if (!ignore && Array.isArray(data) && data.length > 0) setProjects(data);
      })
      .catch(() => {
       setProjects(fallbackProjects);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Skills />
        <Projects projects={projects} loading={loading} />
        <Certificates />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

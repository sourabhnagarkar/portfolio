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
import { useProfile } from "../context/ProfileContext.jsx";

export default function PublicSite() {

  const { loading: profileLoading } = useProfile();

  const [projects, setProjects] = useState([]);
 const [projectsLoading, setProjectsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    setProjectsLoading(true);
    api("/api/projects")
      .then((data) => {
        if (!ignore && Array.isArray(data) && data.length > 0) setProjects(data);
      })
      .catch(() => {
       setProjects(fallbackProjects);
      })
      .finally(() => {
        if (!ignore) setProjectsLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Preloader loading={profileLoading || projectsLoading} />
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Skills />
        <Projects projects={projects} loading={projectsLoading} />
        <Certificates />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

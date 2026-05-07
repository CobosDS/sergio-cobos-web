import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import ResearchPipeline from "@/components/ResearchPipeline";
import AgenticWorkflows from "@/components/AgenticWorkflows";
import Publications from "@/components/Publications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <ResearchPipeline />
      <AgenticWorkflows />
      <Publications />
      <Contact />
      <Footer />
    </main>
  );
}

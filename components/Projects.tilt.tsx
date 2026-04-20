"use client";

import { useEffect, useRef, useState } from "react";

type Highlight = { stat: string; label: string; sub: string };

type Project = {
  name: string;
  tagline: string;
  description: string;
  highlights: Highlight[];
  tech: string[];
  publication: string;
  pubUrl?: string;
};

const projects: Project[] = [
  {
    name: "BigBOSS",
    tagline: "Automated code of conduct management for open-source communities",
    description: "A bot system that monitors and enforces ethical guidelines in open-source projects on GitHub. Reads issue comments in real time, detects violations, and notifies maintainers via GitHub Actions.",
    highlights: [
      { stat: "19.32%", label: "have a code of conduct", sub: "Out of 12,000 top GitHub repos" },
      { stat: "10", label: "ethical categories", sub: "From empathy to harassment and doxxing" },
      { stat: "0", label: "infrastructure needed", sub: "Runs natively as GitHub Actions" },
      { stat: "12", label: "languages covered", sub: "Python, JS, Java, Go, Rust and more" },
    ],
    tech: ["Python", "GitHub Actions", "GraphQL API", "NLP"],
    publication: "ICSE SEIS 2025",
    pubUrl: "https://arxiv.org/abs/2503.05479",
  },
  {
    name: "EthOSS",
    tagline: "Ethical health dashboard for any GitHub project",
    description: "Give it a repo and a time range. It extracts contributions, filters bots, classifies with GPT-4o Mini and generates an interactive HTML report with temporal trend charts.",
    highlights: [
      { stat: "4", label: "stage pipeline", sub: "Extract, preprocess, classify, visualize" },
      { stat: "10", label: "ethical flags", sub: "Grounded in the Contributor Covenant" },
      { stat: "GPT-4o", label: "Mini powered", sub: "Via prompt engineering" },
      { stat: "HTML", label: "interactive reports", sub: "Monthly trend charts included" },
    ],
    tech: ["Python", "GPT-4o Mini", "GitHub API", "Prompt Engineering"],
    publication: "JISBD 2025",
  },
  {
    name: "Ethical Classifier",
    tagline: "AI that reads how people communicate in open-source",
    description: "Classifies GitHub comments across 10 ethical dimensions. Validated on 132,000 real contributions from 225 top repositories. No fine-tuning required.",
    highlights: [
      { stat: "132K", label: "comments analyzed", sub: "225 top GitHub repositories" },
      { stat: ">0.80", label: "precision", sub: "Zero fine-tuning required" },
      { stat: "~40%", label: "constructive", sub: "Dominant interaction type in OSS" },
      { stat: "5", label: "languages", sub: "Python, JS, TS, Java, C#" },
    ],
    tech: ["Python", "LLMs", "Few-Shot Learning", "Statistics"],
    publication: "AIES 2025",
    pubUrl: "https://ojs.aaai.org/index.php/AIES/article/view/36578",
  },
  {
    name: "GenAI Recommender",
    tagline: "Picks the right AI model for your product",
    description: "Surveys your requirements and recommends the best GenAI model ranked by performance, cost and capabilities. Built on insights from 20 senior AI practitioners.",
    highlights: [
      { stat: "20", label: "practitioners surveyed", sub: "95% senior or leadership roles" },
      { stat: "3", label: "ranking dimensions", sub: "Requirements, benchmarks, pricing" },
      { stat: "∞", label: "model families", sub: "OpenAI, Anthropic, Meta, Mistral..." },
      { stat: "65%", label: "formal AI training", sub: "High-expertise sample" },
    ],
    tech: ["Python", "Product Lines", "LLMs", "Hugging Face"],
    publication: "CAIN 2026",
  },
  {
    name: "LLM Substitutability",
    tagline: "Know if you can safely swap one AI model for another",
    description: "Two-step statistical test to validate whether replacing an LLM in production will change system behaviour, even when accuracy metrics look identical.",
    highlights: [
      { stat: "2", label: "stage validation", sub: "Agreement then asymmetry test" },
      { stat: "κ", label: "Cohen's kappa", sub: "Behavioural agreement metric" },
      { stat: "≠", label: "accuracy ≠ safety", sub: "Similar scores, different decisions" },
      { stat: "3", label: "monitoring tasks", sub: "Safety, facts, bias" },
    ],
    tech: ["Python", "Statistical Testing", "LLMs", "MLOps"],
    publication: "ESEM 2026",
  },
  {
    name: "Software Diversity Card",
    tagline: "Standard for reporting who built your software and for whom",
    description: "A DSL, language plugin and Hugging Face web editor to document team diversity in any software project. Aligned with EU AI Act Annex IV.",
    highlights: [
      { stat: "3", label: "core dimensions", sub: "Participants, Context, Governance" },
      { stat: "DSL", label: "custom language", sub: "With IDE plugin for authoring" },
      { stat: "EU", label: "AI Act aligned", sub: "Annex IV requirements" },
      { stat: "HF", label: "Spaces editor", sub: "Form-based web editor" },
    ],
    tech: ["DSL", "Xtext", "Hugging Face Spaces"],
    publication: "IST 2025",
    pubUrl: "https://www.sciencedirect.com/science/article/abs/pii/S0950584925002897",
  },
  {
    name: "Decidim Study",
    tagline: "How citizens and developers collaborate differently online",
    description: "Compares participation across GitHub, MetaDecidim and Decidim Barcelona using Social Network Analysis, Gini coefficients and semi-structured interviews.",
    highlights: [
      { stat: "88%", label: "by top 10 users", sub: "GitHub — Gini coefficient 0.81" },
      { stat: "1,967", label: "discussion threads", sub: "Decidim Barcelona" },
      { stat: "0.25", label: "comments per thread", sub: "Broad but shallow engagement" },
      { stat: "3", label: "platforms compared", sub: "GitHub, MetaDecidim, Decidim BCN" },
    ],
    tech: ["Python", "SNA", "Statistics", "GitHub API"],
    publication: "JSS (under review)",
    pubUrl: "https://zenodo.org/records/15704471",
  },
];

const spotlightStyle = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.3s ease forwards; }
`;

function MiniCarousel({ items, active }: { items: Highlight[]; active: boolean }) {
  const [current, setCurrent] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length);
      setKey((k) => k + 1);
    }, 7000);
    return () => clearInterval(t);
  }, [active, items.length]);

  const item = items[current];

  return (
    <div className="mt-auto pt-4 border-t border-white/5">
      <div key={key} className="fade-up">
        <p className="text-3xl font-bold text-white leading-none">{item.stat}</p>
        <p className="text-sm text-blue-400 mt-0.5">{item.label}</p>
        <p className="text-xs text-slate-600 mt-0.5">{item.sub}</p>
      </div>
      <div className="flex gap-1.5 mt-3">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); setKey((k) => k + 1); }}
            className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-5 bg-blue-400" : "w-1.5 bg-white/15"}`}
          />
        ))}
      </div>
    </div>
  );
}

function TiltCard({ p }: { p: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (cy - 0.5) * -14, y: (cx - 0.5) * 14 });
    setSpot({ x: cx * 100, y: cy * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? "transform 0.08s ease" : "transform 0.5s ease",
      }}
      className="relative rounded-2xl border border-white/10 bg-[#0d1117] overflow-hidden flex flex-col cursor-default"
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${spot.x}% ${spot.y}%, rgba(59,130,246,0.12), transparent 70%)`,
        }}
      />

      {/* Shine border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${spot.x}% ${spot.y}%, rgba(96,165,250,0.25), transparent 70%)`,
          WebkitMask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      <div className="relative p-6 flex flex-col h-full gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-white font-bold text-base leading-tight">{p.name}</h3>
          {p.pubUrl ? (
            <a
              href={p.pubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-mono px-2 py-0.5 rounded border border-blue-500/30 text-blue-400 bg-blue-500/10 whitespace-nowrap shrink-0 hover:bg-blue-500/20 transition-colors"
            >
              {p.publication} ↗
            </a>
          ) : (
            <span className="text-xs font-mono px-2 py-0.5 rounded border border-blue-500/20 text-blue-400/60 whitespace-nowrap shrink-0">
              {p.publication}
            </span>
          )}
        </div>

        <p className="text-blue-400 text-sm">{p.tagline}</p>
        <p className="text-slate-500 text-sm leading-relaxed">{p.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 bg-white/5 text-slate-500 rounded border border-white/10">
              {t}
            </span>
          ))}
        </div>

        <MiniCarousel items={p.highlights} active={hovered} />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6">
      <style>{spotlightStyle}</style>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">
          Featured <span className="text-blue-400">Projects</span>
        </h2>
        <div className="w-12 h-1 bg-blue-500 mb-12 rounded" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <TiltCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

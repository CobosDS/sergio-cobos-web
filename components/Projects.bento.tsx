"use client";

import { useState, useEffect } from "react";

type Highlight = { stat: string; label: string; sub: string };
type Size = "featured" | "tall" | "regular";

type Project = {
  name: string;
  tagline: string;
  description: string;
  highlights: Highlight[];
  tech: string[];
  publication: string;
  pubUrl?: string;
  size: Size;
  accent: string;
};

const projects: Project[] = [
  {
    name: "BigBOSS",
    tagline: "Automated code of conduct management for open-source communities",
    description: "A bot system that monitors and enforces ethical guidelines in open-source projects on GitHub. It reads issue comments in real time, detects rule violations, and notifies maintainers automatically via GitHub Actions.",
    highlights: [
      { stat: "19.32%", label: "have a code of conduct", sub: "Out of 12,000 top GitHub repos" },
      { stat: "10", label: "ethical categories", sub: "From empathy to harassment and doxxing" },
      { stat: "0", label: "infrastructure needed", sub: "Runs natively as GitHub Actions" },
      { stat: "12", label: "languages covered", sub: "Python, JS, Java, Go, Rust and more" },
    ],
    tech: ["Python", "GitHub Actions", "GraphQL API", "NLP"],
    publication: "ICSE SEIS 2025",
    pubUrl: "https://arxiv.org/abs/2503.05479",
    size: "featured",
    accent: "from-blue-950/60 to-slate-900/80",
  },
  {
    name: "EthOSS",
    tagline: "Ethical health dashboard for any GitHub project",
    description: "Give it a repo and a time range. It extracts contributions, filters bots, classifies with GPT-4o Mini, and generates an interactive HTML report.",
    highlights: [
      { stat: "4", label: "stage pipeline", sub: "Extract, preprocess, classify, visualize" },
      { stat: "10", label: "ethical flags", sub: "Grounded in the Contributor Covenant" },
      { stat: "GPT-4o", label: "Mini powered", sub: "Via prompt engineering" },
      { stat: "HTML", label: "interactive reports", sub: "Monthly trend charts included" },
    ],
    tech: ["Python", "GPT-4o Mini", "GitHub API"],
    publication: "JISBD 2025",
    size: "tall",
    accent: "from-violet-950/50 to-slate-900/80",
  },
  {
    name: "Ethical Classifier",
    tagline: "AI that reads how people communicate in open-source",
    description: "Classifies GitHub comments across 10 ethical dimensions. Validated on 132,000 real contributions from 225 top repositories.",
    highlights: [
      { stat: "132K", label: "comments analyzed", sub: "225 top GitHub repositories" },
      { stat: ">0.80", label: "precision", sub: "Zero fine-tuning required" },
      { stat: "~40%", label: "constructive", sub: "Dominant interaction type" },
      { stat: "5", label: "languages", sub: "Python, JS, TS, Java, C#" },
    ],
    tech: ["Python", "LLMs", "Few-Shot Learning"],
    publication: "AIES 2025",
    pubUrl: "https://ojs.aaai.org/index.php/AIES/article/view/36578",
    size: "featured",
    accent: "from-cyan-950/50 to-slate-900/80",
  },
  {
    name: "GenAI Recommender",
    tagline: "Picks the right AI model for your product",
    description: "Surveys your requirements and recommends the best GenAI model ranked by performance, cost and capabilities.",
    highlights: [
      { stat: "20", label: "practitioners surveyed", sub: "95% senior or leadership roles" },
      { stat: "3", label: "ranking dimensions", sub: "Requirements, benchmarks, pricing" },
      { stat: "∞", label: "model families", sub: "OpenAI, Anthropic, Meta, Mistral..." },
      { stat: "65%", label: "formal AI training", sub: "High-expertise sample" },
    ],
    tech: ["Python", "Product Lines", "LLMs"],
    publication: "CAIN 2026",
    size: "regular",
    accent: "from-indigo-950/50 to-slate-900/80",
  },
  {
    name: "LLM Substitutability",
    tagline: "Know if you can safely swap one AI model for another",
    description: "Two-step statistical test to validate whether replacing an LLM in production will change system behaviour.",
    highlights: [
      { stat: "2", label: "stage validation", sub: "Agreement then asymmetry test" },
      { stat: "κ", label: "Cohen's kappa", sub: "Behavioural agreement metric" },
      { stat: "≠", label: "accuracy ≠ safety", sub: "Similar scores, different decisions" },
      { stat: "3", label: "monitoring tasks", sub: "Safety, facts, bias" },
    ],
    tech: ["Python", "Statistics", "MLOps"],
    publication: "ESEM 2026",
    size: "regular",
    accent: "from-sky-950/50 to-slate-900/80",
  },
  {
    name: "Software Diversity Card",
    tagline: "Standard for reporting who built your software and for whom",
    description: "A DSL, language plugin and Hugging Face web editor for documenting team diversity in any software project. Aligned with the EU AI Act.",
    highlights: [
      { stat: "3", label: "core dimensions", sub: "Participants, Context, Governance" },
      { stat: "DSL", label: "custom language", sub: "With IDE plugin for authoring" },
      { stat: "EU", label: "AI Act aligned", sub: "Annex IV requirements" },
      { stat: "HF", label: "Spaces editor", sub: "Form-based web editor" },
    ],
    tech: ["DSL", "Xtext", "Hugging Face"],
    publication: "IST 2025",
    pubUrl: "https://www.sciencedirect.com/science/article/abs/pii/S0950584925002897",
    size: "regular",
    accent: "from-teal-950/50 to-slate-900/80",
  },
  {
    name: "Decidim Study",
    tagline: "How citizens and developers collaborate differently online",
    description: "Compares participation across GitHub, MetaDecidim and Decidim Barcelona using Social Network Analysis and interviews.",
    highlights: [
      { stat: "88%", label: "by top 10 users", sub: "GitHub — Gini coefficient 0.81" },
      { stat: "1,967", label: "discussion threads", sub: "Decidim Barcelona" },
      { stat: "0.25", label: "comments per thread", sub: "Broad but shallow engagement" },
      { stat: "3", label: "platforms compared", sub: "GitHub, MetaDecidim, Decidim BCN" },
    ],
    tech: ["Python", "SNA", "Statistics"],
    publication: "JSS (under review)",
    pubUrl: "https://zenodo.org/records/15704471",
    size: "regular",
    accent: "from-emerald-950/50 to-slate-900/80",
  },
];

const bentoStyle = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.35s ease forwards; }
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

function BentoCard({ p }: { p: Project }) {
  const [hovered, setHovered] = useState(false);

  const isFeatured = p.size === "featured";
  const isTall = p.size === "tall";

  return (
    <div
      className={`relative rounded-2xl border bg-gradient-to-br ${p.accent} overflow-hidden
        transition-all duration-300 flex flex-col
        ${isFeatured ? "md:col-span-2" : ""}
        ${isTall ? "row-span-2" : ""}
        ${hovered ? "border-blue-500/50 shadow-xl shadow-blue-950/40" : "border-white/10"}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow on hover */}
      <div className={`absolute inset-0 bg-blue-500/5 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`} />

      <div className="relative p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className={`text-white font-bold leading-tight ${isFeatured ? "text-xl" : "text-base"}`}>
            {p.name}
          </h3>
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
            <span className="text-xs font-mono px-2 py-0.5 rounded border border-blue-500/20 text-blue-400/70 whitespace-nowrap shrink-0">
              {p.publication}
            </span>
          )}
        </div>

        <p className="text-blue-400 text-sm mb-3">{p.tagline}</p>

        {(isFeatured || isTall) && (
          <p className="text-slate-400 text-sm leading-relaxed mb-3">{p.description}</p>
        )}

        <div className="flex flex-wrap gap-1.5 mb-4">
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
      <style>{bentoStyle}</style>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">
          Featured <span className="text-blue-400">Projects</span>
        </h2>
        <div className="w-12 h-1 bg-blue-500 mb-12 rounded" />

        <div className="grid md:grid-cols-3 gap-4 auto-rows-[minmax(220px,auto)]">
          {projects.map((p) => (
            <BentoCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";

type Highlight = {
  stat: string;
  label: string;
  sub: string;
};

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
    description:
      "A bot system that monitors and enforces ethical guidelines in open-source projects on GitHub. It reads issue comments in real time, detects rule violations, and notifies maintainers automatically. The bots run as GitHub Actions with zero setup required.",
    highlights: [
      { stat: "19.32%", label: "have a code of conduct", sub: "Out of 12,000 top GitHub repos studied" },
      { stat: "10", label: "ethical categories", sub: "From empathy and feedback to harassment and doxxing" },
      { stat: "0", label: "infrastructure needed", sub: "Bots run natively as GitHub Actions" },
      { stat: "12", label: "languages covered", sub: "Python, JS, Java, Go, Rust and more" },
    ],
    tech: ["Python", "GitHub Actions", "GitHub GraphQL API", "NLP", "Bot Architecture"],
    publication: "ICSE SEIS 2025",
    pubUrl: "https://arxiv.org/abs/2503.05479",
  },
  {
    name: "EthOSS",
    tagline: "Ethical health dashboard for any GitHub project",
    description:
      "A Python tool that analyzes the ethical quality of a GitHub community. Give it a repository and a time range and it produces a full interactive report showing how contributors interact and how behavior evolves over time.",
    highlights: [
      { stat: "4", label: "stage pipeline", sub: "Extract, preprocess, classify, visualize" },
      { stat: "10", label: "ethical flags", sub: "Grounded in the Contributor Covenant" },
      { stat: "GPT-4o", label: "Mini powered", sub: "Classification via prompt engineering" },
      { stat: "HTML", label: "interactive reports", sub: "Monthly trend charts, no extra tools needed" },
    ],
    tech: ["Python", "GPT-4o Mini", "GitHub GraphQL API", "Prompt Engineering", "HTML/CSS"],
    publication: "JISBD 2025",
  },
  {
    name: "Ethical Classifier",
    tagline: "AI that reads how people communicate in open-source projects",
    description:
      "A classifier built with prompt engineering that labels GitHub issue comments across 10 ethical dimensions. Validated on 132,000 real comments from 225 top repositories. No model training required.",
    highlights: [
      { stat: "132K", label: "comments analyzed", sub: "From 225 top-starred GitHub repositories" },
      { stat: ">0.80", label: "precision", sub: "No fine-tuning, pure prompt engineering" },
      { stat: "~40%", label: "constructive feedback", sub: "The dominant interaction type in OSS" },
      { stat: "5", label: "languages", sub: "Python, JS, TypeScript, Java and C#" },
    ],
    tech: ["Python", "LLMs", "Prompt Engineering", "Few-Shot Learning", "GitHub API", "Statistics"],
    publication: "AIES 2025",
    pubUrl: "https://ojs.aaai.org/index.php/AIES/article/view/36578",
  },
  {
    name: "GenAI Recommender",
    tagline: "Helps developers pick the right AI model for their product",
    description:
      "Choosing the right AI model is overwhelming. This tool simplifies the decision by asking developers about their requirements and recommending the best model, ranked by performance, cost and capabilities.",
    highlights: [
      { stat: "20", label: "practitioners surveyed", sub: "95% in senior or leadership roles" },
      { stat: "65%", label: "formal AI training", sub: "High-expertise sample, real-world criteria" },
      { stat: "3", label: "ranking dimensions", sub: "Requirements, benchmark scores and pricing" },
      { stat: "∞", label: "model families", sub: "OpenAI, Anthropic, Meta, Mistral, Google..." },
    ],
    tech: ["Python", "Software Product Lines", "LLMs", "Hugging Face", "Recommender Systems"],
    publication: "CAIN 2026",
  },
  {
    name: "LLM Substitutability",
    tagline: "Know if you can safely swap one AI model for another in production",
    description:
      "When a company replaces an AI model in a live system, can they trust the system will behave the same? This framework uses a two-step statistical test to validate safe substitution before deployment.",
    highlights: [
      { stat: "2", label: "stage validation", sub: "Agreement filtering then asymmetry testing" },
      { stat: "κ", label: "Cohen's kappa", sub: "Measures behavioural agreement between models" },
      { stat: "3", label: "monitoring tasks", sub: "Safety, fact-checking and bias detection" },
      { stat: "≠", label: "accuracy ≠ safety", sub: "Similar scores can still behave differently" },
    ],
    tech: ["Python", "LLMs", "Statistical Testing", "Cohen's κ", "McNemar Test", "MLOps"],
    publication: "ESEM 2026",
  },
  {
    name: "Software Diversity Card",
    tagline: "Standard for reporting who built a product and for whom",
    description:
      "No standard exists for a software project to say who built it, who tested it, and who it is for. This project creates that standard with a DSL, a language plugin and a Hugging Face web editor.",
    highlights: [
      { stat: "3", label: "core dimensions", sub: "Participants, Usage Context and Governance" },
      { stat: "DSL", label: "custom language", sub: "With IDE plugin for structured authoring" },
      { stat: "EU", label: "AI Act aligned", sub: "Addresses Annex IV documentation requirements" },
      { stat: "HF", label: "Spaces editor", sub: "Form-based web editor on Hugging Face" },
    ],
    tech: ["DSL", "Xtext", "Hugging Face Spaces", "Software Engineering", "EU AI Act"],
    publication: "IST 2025",
    pubUrl: "https://www.sciencedirect.com/science/article/abs/pii/S0950584925002897",
  },
  {
    name: "Decidim Study",
    tagline: "How citizens and developers collaborate differently online",
    description:
      "Decidim runs as a GitHub OSS project, a governance community and a civic platform for Barcelona. This study compares participation across all three using Social Network Analysis and interviews.",
    highlights: [
      { stat: "88%", label: "by top 10 users", sub: "Extreme concentration on GitHub (Gini 0.81)" },
      { stat: "1,967", label: "discussion threads", sub: "Decidim Barcelona has the widest reach" },
      { stat: "0.25", label: "comments per thread", sub: "Broad but shallow civic engagement" },
      { stat: "3", label: "platforms compared", sub: "GitHub, MetaDecidim and Decidim Barcelona" },
    ],
    tech: ["Python", "Social Network Analysis", "Statistics", "GitHub API", "Decidim API"],
    publication: "JSS (under review)",
    pubUrl: "https://zenodo.org/records/15704471",
  },
];

const carouselStyle = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.35s ease forwards; }
`;

function HighlightCarousel({ items, active }: { items: Highlight[]; active: boolean }) {
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

  const goTo = (i: number) => { setCurrent(i); setKey((k) => k + 1); };

  const item = items[current];

  return (
    <div className="mt-1 rounded-xl border border-white/10 bg-gradient-to-br from-blue-950/40 to-slate-900/60 overflow-hidden">
      <div className="px-5 pt-5 pb-4 min-h-[100px] flex flex-col justify-center">
        <div key={key} className="fade-up">
          <p className="text-4xl font-bold text-blue-400 leading-none mb-1 tracking-tight">
            {item.stat}
          </p>
          <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
          <p className="text-slate-500 text-xs">{item.sub}</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 pb-4">
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-blue-400"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-slate-600 font-mono tabular-nums">
          {current + 1} / {items.length}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ p, active }: { p: Project; active: boolean }) {
  return (
    <div className={`border rounded-xl bg-white/[0.02] transition-all duration-300 ${active ? "border-blue-500/40" : "border-white/10 hover:border-white/20"}`}>
      <div className="p-6 grid md:grid-cols-[1fr_280px] gap-6">
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-white font-bold text-lg leading-tight">{p.name}</h3>
            {p.pubUrl ? (
              <a
                href={p.pubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono px-2 py-0.5 rounded border border-blue-500/30 text-blue-400 bg-blue-500/10 whitespace-nowrap shrink-0 hover:bg-blue-500/20 transition-colors"
              >
                {p.publication} ↗
              </a>
            ) : (
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-blue-500/30 text-blue-400 bg-blue-500/10 whitespace-nowrap shrink-0">
                {p.publication}
              </span>
            )}
          </div>

          <p className="text-blue-400 text-sm mb-3">{p.tagline}</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {p.tech.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 bg-white/5 text-slate-400 rounded border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>

        <HighlightCarousel items={p.highlights} active={active} />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 px-6">
      <style>{carouselStyle}</style>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">
          Featured <span className="text-blue-400">Projects</span>
        </h2>
        <div className="w-12 h-1 bg-blue-500 mb-12 rounded" />

        <div className="flex flex-col gap-6">
          {projects.map((p) => (
            <div
              key={p.name}
              onMouseEnter={() => setHovered(p.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <ProjectCard p={p} active={hovered === p.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

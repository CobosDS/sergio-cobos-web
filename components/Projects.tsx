"use client";

import { useRef, useState } from "react";

type Project = {
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  tech: string[];
  publication: string;
  pubUrl?: string;
};

const projects: Project[] = [
  {
    name: "LLM Substitutability",
    tagline: "Know if you can safely swap one AI model for another in production",
    description: "A methodology and toolset to validate whether replacing an LLM component in a live system will change its behaviour, even in cases where aggregate accuracy metrics look identical.",
    bullets: [
      "Identified that two models with similar accuracy can still disagree systematically on specific inputs, making substitution unsafe",
      "Designed a two-stage statistical procedure combining Cohen's kappa for agreement and McNemar's test for asymmetric error detection",
      "Applied across safety detection, fact-checking and bias monitoring tasks using models from multiple providers",
      "Directly addresses a real production risk that teams face when updating or replacing AI components to reduce costs",
    ],
    tech: ["Python", "NLP", "ML", "LLMs", "Statistics", "Data Analysis", "Statistical Testing", "Cohen's κ", "MLOps"],
    publication: "ESEM 2026",
  },
  {
    name: "GenAI Recommender",
    tagline: "Helps developers pick the right AI model for their product",
    description: "A recommender system that simplifies the overwhelming task of choosing among dozens of GenAI models. Built on a survey of 20 senior AI practitioners and a formal model of the GenAI landscape.",
    bullets: [
      "Surveyed 20 senior AI professionals (95% in senior or leadership roles) to identify what actually drives model selection in practice",
      "Formalized the GenAI model landscape as a configurable software product line, enabling systematic comparison across providers",
      "Ranks models by developer requirements, public benchmark scores and pricing in a single workflow",
      "Targets software developers without deep AI expertise who need to integrate models into production products",
    ],
    tech: ["Python", "NLP", "ML", "LLMs", "Statistics", "Data Analysis", "Software Product Lines", "Hugging Face"],
    publication: "CAIN 2026",
  },
  {
    name: "Decidim Study",
    tagline: "How citizens and developers collaborate differently online",
    description: "An empirical study comparing how participation works across three very different communities that share the same codebase: GitHub developers, platform governance contributors, and Barcelona citizens.",
    bullets: [
      "Discovered that on GitHub just 10 users generate 88% of all comments, revealing extreme concentration of activity",
      "Found that Decidim Barcelona has the widest reach with 1,967 threads but the shallowest discussions per thread",
      "Combined quantitative Social Network Analysis with qualitative interviews to explain the numbers behind the patterns",
      "Published in the Journal of Systems and Software, a top-tier journal in empirical software engineering",
    ],
    tech: ["Python", "NLP", "ML", "LLMs", "Statistics", "Data Analysis", "Social Network Analysis", "GitHub API"],
    publication: "JSS 2026",
    pubUrl: "https://zenodo.org/records/15704471",
  },
  {
    name: "Software Diversity Card",
    tagline: "A standard for reporting who built your software and for whom",
    description: "A framework, domain-specific language and Hugging Face web editor that lets any software team document and share the diversity of their contributors, testers, users and governance structure.",
    bullets: [
      "Created a structured template covering three dimensions: who participated, who the software is for, and who governs the project",
      "Developed a custom DSL with an IDE language plugin so teams can write diversity cards as structured documents",
      "Built a form-based web editor deployed on Hugging Face Spaces for teams who prefer a no-code approach",
      "Aligned with EU AI Act Annex IV and US AI Bill of Rights requirements on diversity and transparency",
    ],
    tech: ["Python", "NLP", "ML", "LLMs", "Statistics", "Data Analysis", "DSL", "Xtext", "Hugging Face Spaces"],
    publication: "IST 2025",
    pubUrl: "https://www.sciencedirect.com/science/article/abs/pii/S0950584925002897",
  },
  {
    name: "Ethical Classifier",
    tagline: "AI model that reads how people communicate in open-source",
    description: "A prompt-engineered classifier that labels GitHub contributions across 10 ethical dimensions. Validated on over 132,000 real comments from 225 of the most popular repositories on GitHub.",
    bullets: [
      "Achieved precision above 0.80 using only prompt engineering and few-shot examples, with no model training required",
      "Analyzed 132,504 comments across projects in Python, JavaScript, TypeScript, Java and C#",
      "Found that constructive feedback accounts for roughly 40% of all OSS interactions",
      "Designed to be usable by non-technical community moderators, not just AI engineers",
    ],
    tech: ["Python", "NLP", "ML", "LLMs", "Statistics", "Data Analysis", "Prompt Engineering", "Few-Shot Learning"],
    publication: "AIES 2025",
    pubUrl: "https://ojs.aaai.org/index.php/AIES/article/view/36578",
  },
  {
    name: "EthOSS",
    tagline: "Ethical health dashboard for any GitHub project",
    description: "A Python tool that takes any GitHub repository and time window and delivers a full interactive report on the ethical quality of its community, powered by GPT-4o Mini.",
    bullets: [
      "Designed a four-stage pipeline covering data extraction, preprocessing, AI classification and interactive HTML reporting",
      "Integrated automatic bot filtering to ensure the analysis reflects genuine human interactions only",
      "Built configurable YAML-based settings so any team can analyze any project without touching the code",
      "Generated visual dashboards showing how ethical behavior evolves month by month across a community",
    ],
    tech: ["Python", "NLP", "ML", "LLMs", "Statistics", "Data Analysis", "GPT-4o Mini", "Prompt Engineering", "GitHub GraphQL API"],
    publication: "JISBD 2025",
  },
  {
    name: "BigBOSS",
    tagline: "Automated code of conduct management for open-source communities",
    description: "A bot system that monitors and enforces ethical guidelines in open-source projects on GitHub. Reads issue comments in real time, detects violations, and notifies maintainers automatically via GitHub Actions.",
    bullets: [
      "Built and deployed automated bots as GitHub Actions, requiring zero infrastructure setup from open-source teams",
      "Designed a taxonomy of 10 ethical behaviors grounded in the Contributor Covenant, covering everything from constructive feedback to harassment",
      "Ran an empirical study on 12,000 top GitHub repositories, finding that only 19% have any code of conduct in place",
      "Published at ICSE SEIS 2025, one of the top venues in software engineering",
    ],
    tech: ["Python", "NLP", "ML", "LLMs", "Statistics", "Data Analysis", "GitHub Actions", "GraphQL API", "Bot Architecture"],
    publication: "ICSE SEIS 2025",
    pubUrl: "https://arxiv.org/abs/2503.05479",
  },
];

const panelStyle = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .slide-in { animation: slideIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }
`;

function DetailPanel({ p, panelKey }: { p: Project; panelKey: number }) {
  return (
    <div key={panelKey} className="slide-in flex flex-col gap-5">
      <div>
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="text-white font-bold text-lg md:text-xl leading-tight">{p.name}</h3>
          {p.pubUrl ? (
            <a
              href={p.pubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono px-3 py-1 rounded border border-blue-500/30 text-blue-400 bg-blue-500/10 whitespace-nowrap hover:bg-blue-500/20 transition-colors shrink-0"
            >
              {p.publication} ↗
            </a>
          ) : (
            <span className="text-xs font-mono px-3 py-1 rounded border border-blue-500/20 text-blue-400/60 whitespace-nowrap shrink-0">
              {p.publication}
            </span>
          )}
        </div>
        <p className="text-blue-400 text-sm">{p.tagline}</p>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed">{p.description}</p>

      <ul className="space-y-2">
        {p.bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
            <span className="text-blue-500 shrink-0 mt-0.5">·</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div>
        <p className="text-xs text-slate-600 font-mono uppercase tracking-widest mb-2">Tech</p>
        <div className="flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="text-xs px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState(0);
  const [panelKey, setPanelKey] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSelect = (i: number) => {
    setSelected(i);
    setPanelKey((k) => k + 1);
    setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <section id="projects" className="py-24 px-6">
      <style>{panelStyle}</style>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">
          Featured <span className="text-blue-400">Projects</span>
        </h2>
        <div className="w-12 h-1 bg-blue-500 mb-12 rounded" />

        <div className="rounded-2xl border border-white/10 overflow-hidden">

          {/* Mobile: horizontal scrollable tabs */}
          <div className="md:hidden flex overflow-x-auto border-b border-white/10 bg-white/[0.01]">
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`shrink-0 px-4 py-3 text-sm border-b-2 transition-all whitespace-nowrap ${
                  selected === i
                    ? "border-blue-400 text-white bg-blue-500/10"
                    : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-[220px_1fr]">

            {/* Desktop: vertical list */}
            <div className="hidden md:block border-r border-white/10 bg-white/[0.01]">
              {projects.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left px-5 py-4 border-b border-white/5 transition-all duration-200 last:border-0 group ${
                    selected === i
                      ? "bg-blue-500/10 border-l-2 border-l-blue-400"
                      : "hover:bg-white/[0.03] border-l-2 border-l-transparent"
                  }`}
                >
                  <p className={`font-medium text-sm transition-colors ${selected === i ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                    {p.name}
                  </p>
                  <p className={`text-xs mt-0.5 transition-colors ${selected === i ? "text-blue-400" : "text-slate-600"}`}>
                    {p.publication}
                  </p>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div ref={panelRef} className="p-6 md:p-8 bg-[#0d1117]">
              <DetailPanel p={projects[selected]} panelKey={panelKey} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

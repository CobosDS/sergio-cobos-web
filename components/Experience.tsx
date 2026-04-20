"use client";

import { useEffect, useRef, useState } from "react";

type Experience = {
  cmd: string;
  role: string;
  company: string;
  period: string;
  location: string;
  lines: { label: string; value: string }[];
  tasks: string[];
  tags: string[];
};

const experiences: Experience[] = [
  {
    cmd: "cat ai-engineer.log",
    role: "AI Engineer",
    company: "Universitat Oberta de Catalunya",
    period: "May 2024 → Present",
    location: "Barcelona · Hybrid",
    lines: [
      { label: "role", value: "AI Engineer" },
      { label: "company", value: "Universitat Oberta de Catalunya" },
      { label: "group", value: "SOM Research Lab · UOC-TECH" },
      { label: "period", value: "May 2024 → Present" },
      { label: "location", value: "Barcelona · Hybrid" },
    ],
    tasks: [
      "Built OSS moderation bots using Mixtral and LLaMA via Ollama and LangChain",
      "Designed ethical classifiers for GitHub with GPT-4o Mini and prompt engineering",
      "Created EthOSS, ethical quality tool for open-source projects (JISBD 2025)",
      "Built a GenAI model recommender for developers (CAIN 2026)",
      "Analyzed participation networks: GitHub, MetaDecidim, Decidim Barcelona (JSS)",
      "Large-scale Hugging Face metadata analysis on documentation quality patterns",
    ],
    tags: ["Python", "LLMs", "LangChain", "Prompt Engineering", "NLP", "Git"],
  },
  {
    cmd: "cat data-scientist.log",
    role: "Data Scientist",
    company: "UVE · Route to Market Data Intelligence",
    period: "Feb 2022 → Jan 2024",
    location: "Manresa · Hybrid",
    lines: [
      { label: "role", value: "Data Scientist" },
      { label: "company", value: "UVE · Route to Market Data Intelligence" },
      { label: "period", value: "Feb 2022 → Jan 2024" },
      { label: "location", value: "Manresa · Hybrid" },
    ],
    tasks: [
      "Designed classification and segmentation models for retail point-of-sale networks",
      "Built and maintained ETL pipelines using Azure Data Factory and Databricks",
      "Optimized data scrapers in Python and JavaScript for automated extraction",
      "Managed repositories with Bitbucket and Git in an agile Scrum environment with JIRA",
    ],
    tags: ["Python", "Azure Data Factory", "Databricks", "SQL", "ETL", "Pandas", "Scrum"],
  },
  {
    cmd: "cat stem-educator.log",
    role: "STEM Educator",
    company: "Agora Sant Cugat · JOVIAT · Ampans",
    period: "2006 → 2024",
    location: "Cataluña · Presencial",
    lines: [
      { label: "role", value: "STEM Educator and Academy Director" },
      { label: "period", value: "2006 → 2024" },
      { label: "subjects", value: "Mathematics · Physics · Chemistry · Technology" },
    ],
    tasks: [
      "IB Bachillerato teacher at Agora Sant Cugat International School",
      "Science and Technology teacher at JOVIAT secondary school",
      "Educational technician at Ampans supporting at-risk youth",
    ],
    tags: ["Mathematics", "Physics", "Curriculum Design", "Team Leadership", "STEM"],
  },
];

const CHAR_DELAY = 38;
const LINE_DELAY = 120;
const PROMPT = "sergio@portfolio:~$";

function useTypewriter(
  selected: number,
  onDone: () => void
): [string, boolean] {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTyped("");
    setDone(false);
    const target = experiences[selected].cmd;
    let i = 0;

    const type = () => {
      i++;
      setTyped(target.slice(0, i));
      if (i < target.length) {
        timerRef.current = setTimeout(type, CHAR_DELAY);
      } else {
        timerRef.current = setTimeout(() => {
          setDone(true);
          onDone();
        }, 300);
      }
    };

    timerRef.current = setTimeout(type, 200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [selected]);

  return [typed, done];
}

function TerminalOutput({ exp, visible }: { exp: Experience; visible: boolean }) {
  const [revealed, setRevealed] = useState(0);

  const allLines = [
    "",
    ...exp.lines.map((l) => `  ${l.label.padEnd(10)} ${l.value}`),
    "",
    "  tasks:",
    ...exp.tasks.map((t, i) => `  [${String(i + 1).padStart(2, "0")}]  ${t}`),
    "",
    `  tags: ${exp.tags.join(" · ")}`,
    "",
  ];

  useEffect(() => {
    if (!visible) { setRevealed(0); return; }
    setRevealed(0);
    let i = 0;
    const next = () => {
      i++;
      setRevealed(i);
      if (i < allLines.length) setTimeout(next, LINE_DELAY);
    };
    const t = setTimeout(next, 80);
    return () => clearTimeout(t);
  }, [visible, exp.cmd]);

  if (!visible) return null;

  return (
    <div className="mt-1">
      {allLines.slice(0, revealed).map((line, i) => {
        const isTask = line.match(/^\s+\[\d+\]/);
        const isLabel = line.match(/^\s+\w+\s{2,}/);
        const isTag = line.includes("tags:");
        const isSection = line.trim() === "tasks:";

        return (
          <div
            key={i}
            className={`font-mono text-sm leading-6 whitespace-pre ${
              isTask
                ? "text-slate-300"
                : isTag
                ? "text-blue-400"
                : isSection
                ? "text-slate-400"
                : isLabel
                ? "text-slate-300"
                : "text-slate-600"
            }`}
          >
            {line || "\u00A0"}
          </div>
        );
      })}
    </div>
  );
}

export default function Experience() {
  const [selected, setSelected] = useState(0);
  const [outputVisible, setOutputVisible] = useState(false);
  const [typed, cmdDone] = useTypewriter(selected, () => setOutputVisible(true));

  const handleSelect = (i: number) => {
    if (i === selected) return;
    setOutputVisible(false);
    setSelected(i);
  };

  return (
    <section id="experience" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">
          <span className="text-blue-400">Experience</span>
        </h2>
        <div className="w-12 h-1 bg-blue-500 mb-12 rounded" />

        <div className="grid md:grid-cols-[200px_1fr] gap-6 items-start">

          {/* Role selector */}
          <div className="flex flex-col gap-2">
            {experiences.map((exp, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`text-left px-4 py-3 rounded-lg border text-sm font-mono transition-all duration-200 ${
                  selected === i
                    ? "border-blue-500/60 bg-blue-500/10 text-blue-400"
                    : "border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20"
                }`}
              >
                <span className="block text-xs mb-0.5 opacity-60">{exp.period.split("→")[0].trim()}</span>
                {exp.role}
              </button>
            ))}
          </div>

          {/* Terminal */}
          <div className="rounded-xl border border-white/10 bg-[#0d1117] overflow-hidden shadow-2xl shadow-blue-950/20">
            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-slate-600 font-mono">experience.sh</span>
            </div>

            {/* Terminal body */}
            <div className="px-5 py-5 min-h-[420px] font-mono text-sm">

              {/* Previous commands history */}
              {experiences.slice(0, selected).map((exp, i) => (
                <div key={i} className="mb-2 opacity-30">
                  <span className="text-green-400">{PROMPT}</span>
                  <span className="text-white ml-2">{exp.cmd}</span>
                </div>
              ))}

              {/* Current command */}
              <div className="flex items-center">
                <span className="text-green-400">{PROMPT}</span>
                <span className="text-white ml-2">{typed}</span>
                {!cmdDone && (
                  <span className="ml-0.5 w-2 h-4 bg-blue-400 inline-block animate-pulse" />
                )}
              </div>

              {/* Output */}
              <TerminalOutput
                exp={experiences[selected]}
                visible={outputVisible}
              />

              {/* Final cursor */}
              {outputVisible && (
                <div className="flex items-center mt-1">
                  <span className="text-green-400">{PROMPT}</span>
                  <span className="ml-2 w-2 h-4 bg-blue-400 inline-block animate-pulse" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

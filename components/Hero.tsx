"use client";

import { useEffect, useState } from "react";

const roles = ["Research Engineer", "AI Engineer", "LLM Systems", "Empirical SE", "Open Source"];

const stats = [
  { value: "AI", label: "engineering focus" },
  { value: "LLMs", label: "systems & evaluation" },
  { value: "OSS", label: "community research" },
  { value: "SE", label: "empirical methods" },
];

const heroStyle = `
  @keyframes gridMove {
    0%   { transform: translateY(0); }
    100% { transform: translateY(40px); }
  }
  @keyframes statIn {
    from { opacity: 0; transform: translateX(16px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .grid-bg {
    background-image:
      linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: gridMove 6s linear infinite;
  }
  .stat-in { animation: statIn 0.5s ease forwards; }
`;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStatsVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 45);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section id="hero" className="min-h-screen flex items-center px-6 relative overflow-hidden">
      <style>{heroStyle}</style>

      {/* Animated dot grid */}
      <div className="absolute inset-0 -z-20 grid-bg opacity-60" />

      {/* Radial mask so grid fades at edges */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#0a0f1e_100%)]" />

      {/* Blue glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 rounded-full bg-blue-600/15 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-56 md:h-56 rounded-full bg-blue-500/10 blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center py-24">

        {/* Left: text */}
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Sergio<br />Cobos
          </h1>
          <div className="h-8 flex items-center mb-6">
            <span className="text-lg md:text-xl text-blue-400 font-mono">
              {displayed}
              <span className="cursor-blink">|</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
            Research Engineer building LLM-powered systems and empirical software engineering studies around automation, responsible AI, and open-source communities.
          </p>

          <div className="flex gap-3 flex-wrap mb-8">
            <a
              href="#projects"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all glow-blue"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 border border-blue-500/50 hover:border-blue-400 text-blue-400 rounded-lg text-sm font-medium transition-all"
            >
              Contact
            </a>
          </div>

        </div>

        {/* Right: static terminal card */}
        <div className="hidden md:block">
          <div className="rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-blue-950/40 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-slate-600 font-mono">sergio.profile</span>
            </div>

            <div className="p-5 font-mono text-sm space-y-3">
              <div>
                <span className="text-green-400">sergio@ai</span>
                <span className="text-slate-600">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white ml-2">whoami</span>
              </div>
              <div className="text-slate-400 space-y-1 pl-2 border-l border-white/5">
                <p><span className="text-blue-400">name</span>     Sergio Cobos</p>
                <p><span className="text-blue-400">role</span>     Research Engineer</p>
                <p><span className="text-blue-400">focus</span>    LLMs · SE · OSS · Automation</p>
                <p><span className="text-blue-400">location</span> Barcelona, Spain</p>
              </div>

              <div className="pt-1">
                <span className="text-green-400">sergio@ai</span>
                <span className="text-slate-600">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white ml-2">stats --research</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pl-2">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className={`rounded-md border border-white/5 bg-white/[0.03] px-2 py-1.5 ${statsVisible ? "stat-in" : "opacity-0"}`}
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <p className="text-blue-400 font-bold text-sm leading-none">{s.value}</p>
                    <p className="text-slate-600 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center pt-1">
                <span className="text-green-400">sergio@ai</span>
                <span className="text-slate-600">:</span>
                <span className="text-blue-400">~</span>
                <span className="ml-2 w-2 h-4 bg-blue-400 inline-block animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

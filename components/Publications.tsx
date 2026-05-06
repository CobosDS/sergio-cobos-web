"use client";

import { useEffect, useRef, useState } from "react";

const publications = [
  { title: "A Comparison Between Social Coding and Citizen Participation Platforms: The Decidim Case", venue: "JSS 2026", type: "Journal", url: "https://zenodo.org/records/15704471" },
  { title: "Classifying Ethical Quality in OSS Contributions Using LLMs", venue: "AIES 2025", type: "Conference", url: "https://ojs.aaai.org/index.php/AIES/article/view/36578" },
  { title: "EthOSS: A Tool for Ethical Monitoring of OSS Communities", venue: "JISBD 2025", type: "Demo", url: null },
  { title: "The Software Diversity Card: A Framework for Reporting Diversity in Software Projects", venue: "IST 2025", type: "Journal", url: "https://www.sciencedirect.com/science/article/abs/pii/S0950584925002897" },
  { title: "A Bot-based Approach to Manage Codes of Conduct in Open-Source Projects", venue: "ICSE SEIS 2025", type: "Conference", url: "https://arxiv.org/abs/2503.05479" },
];

const typeStyle: Record<string, { badge: string; dot: string }> = {
  Conference: { badge: "text-blue-400 border-blue-500/30 bg-blue-500/10", dot: "bg-blue-500" },
  Journal:    { badge: "text-violet-400 border-violet-500/30 bg-violet-500/10", dot: "bg-violet-500" },
  Demo:       { badge: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10", dot: "bg-emerald-500" },
};

const pubStyle = `
  @keyframes pubSlideIn {
    from { opacity: 0; transform: translateX(-16px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .pub-in { animation: pubSlideIn 0.4s ease forwards; }
`;

function PubRow({ pub, index }: { pub: typeof publications[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const style = typeStyle[pub.type];

  return (
    <div
      ref={ref}
      className={`group flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.02] transition-all duration-200 ${visible ? "pub-in" : "opacity-0"}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Left: dot + line */}
      <div className="flex flex-col items-center gap-1 pt-1.5 shrink-0">
        <div className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
        {index < publications.length - 1 && (
          <div className="w-px flex-1 min-h-[20px] bg-white/5" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-slate-300 text-sm leading-snug group-hover:text-white transition-colors">
          {pub.url ? (
            <a
              href={pub.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              {pub.title}
              <span className="ml-1 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
          ) : (
            pub.title
          )}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-mono px-2 py-0.5 border rounded ${style.badge}`}>
            {pub.type}
          </span>
          <span className="text-slate-500 font-mono text-xs whitespace-nowrap group-hover:text-blue-400 transition-colors">
            {pub.venue}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Publications() {
  return (
    <section id="publications" className="py-20 px-6 bg-white/[0.02]">
      <style>{pubStyle}</style>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              <span className="text-blue-400">Publications</span>
            </h2>
            <div className="w-10 h-0.5 bg-blue-500 rounded" />
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-slate-600 font-mono">
            {Object.entries(typeStyle).map(([type, s]) => (
              <span key={type} className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          {publications.map((pub, i) => (
            <PubRow key={pub.title} pub={pub} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Agentic Workflows", href: "#agentic-workflows" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "backdrop-blur-md bg-[#0a0f1e]/80 border-b border-white/10 shadow-lg shadow-black/20"
        : "bg-transparent"
    }`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-blue-500/20 border border-blue-500/40 flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
            <span className="text-blue-400 font-bold text-xs">SC</span>
          </div>
          <span className="text-white font-semibold text-sm hidden sm:block">Sergio Cobos</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const id = l.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-md bg-white/5 border border-white/10" />
                )}
                <span className="relative">{l.label}</span>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all font-medium"
          >
            Collaborate
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0d1117]/98 border-t border-white/10 px-6 py-5 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-md transition-all text-sm"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium text-center transition-all"
          >
            Collaborate
          </a>
        </div>
      )}
    </nav>
  );
}

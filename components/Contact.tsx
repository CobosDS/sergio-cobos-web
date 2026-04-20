"use client";

import { useState } from "react";

const FORMSPREE_ID = "mvzdbpww";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">
          Get In <span className="text-blue-400">Touch</span>
        </h2>
        <div className="w-12 h-1 bg-blue-500 mb-12 rounded" />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* Left: text */}
          <div className="space-y-4">
            <p className="text-slate-400 text-sm leading-relaxed">
              Open to research collaborations, consulting on AI and data science projects, or just a conversation about LLMs and software engineering.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Fill in the form and I will get back to you as soon as possible.
            </p>

            <div className="pt-4 space-y-3">
              <a
                href="mailto:scobos.append@gmail.com"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-blue-400 transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:border-blue-500/40 transition-colors text-base">
                  ✉
                </span>
                scobos.append@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/sergio-cobos-ds"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-blue-400 transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:border-blue-500/40 transition-colors text-base">
                  in
                </span>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-6">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-2xl">
                  ✓
                </div>
                <p className="text-white font-semibold">Message sent.</p>
                <p className="text-slate-500 text-sm">I will get back to you shortly.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 font-mono uppercase tracking-widest mb-1.5">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-500 font-mono uppercase tracking-widest mb-1.5">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-500 font-mono uppercase tracking-widest mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me what you have in mind..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs">Something went wrong. Try emailing me directly.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-all"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

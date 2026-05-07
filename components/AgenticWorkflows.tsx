const workflowTypes = [
  {
    title: "Research workflows",
    description: "Literature discovery, related-work mapping, novelty checks, and paper opportunity evaluation.",
  },
  {
    title: "Documentation workflows",
    description: "Knowledge bases, decision logs, reusable playbooks, technical notes, and progress tracking.",
  },
  {
    title: "Service workflows",
    description: "Support triage, FAQ drafting, escalation support, and customer-facing knowledge maintenance.",
  },
  {
    title: "Developer workflows",
    description: "Repository review, implementation planning, build checks, code handoffs, and release preparation.",
  },
];

const graphSteps = [
  "Request",
  "Classify",
  "Retrieve context",
  "Draft answer",
  "Review gate",
  "Update docs",
];

const runLog = [
  { state: "done", text: "incoming request classified as product-support" },
  { state: "done", text: "relevant docs, tickets, and decision logs retrieved" },
  { state: "done", text: "missing information and escalation risk identified" },
  { state: "done", text: "draft response prepared with source-backed context" },
  { state: "hold", text: "awaiting human review before sending" },
  { state: "next", text: "capture feedback and update the knowledge base" },
];

const exampleUseCases = [
  "Support triage",
  "Knowledge base maintenance",
  "FAQ drafting",
  "Escalation playbooks",
  "Research documentation",
  "Internal handoffs",
];

export default function AgenticWorkflows() {
  return (
    <section id="agentic-workflows" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 mb-3">
            Independent systems work
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">
            Agentic <span className="text-blue-400">Workflows</span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            I design human-supervised agentic workflows for knowledge-heavy work: research,
            documentation, support, and software engineering. The goal is not to replace judgment,
            but to make complex work more structured, traceable, and repeatable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {workflowTypes.map((workflow, index) => (
            <article
              key={workflow.title}
              className="rounded-2xl border border-white/10 bg-[#0d1117] p-5 hover:border-blue-500/30 hover:bg-blue-500/[0.03] transition-all"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-mono text-slate-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-400/80" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{workflow.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{workflow.description}</p>
            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.015] p-4 md:p-5">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5 px-1">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-600 mb-2">
                Example workflow
              </p>
              <h3 className="text-xl font-bold text-white">
                Documentation & service workflow
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md md:text-right leading-relaxed">
              A practical pattern for turning incoming questions into reviewed answers and maintained documentation.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-5 items-stretch">
            <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-5 md:p-6 overflow-hidden">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-white font-semibold mb-1">Workflow graph</h4>
                  <p className="text-xs text-slate-500 font-mono">
                    request → answer → maintained knowledge
                  </p>
                </div>
                <span className="hidden sm:inline-flex text-xs font-mono px-3 py-1 rounded-full border border-blue-500/30 text-blue-400 bg-blue-500/10">
                  human-supervised
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {graphSteps.map((step, index) => (
                  <div key={step} className="relative rounded-xl border border-white/10 bg-white/[0.025] p-4 min-h-28">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-xs font-mono text-slate-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_16px_rgba(96,165,250,0.8)]" />
                    </div>
                    <p className="text-sm text-white font-medium leading-snug">{step}</p>
                    {index < graphSteps.length - 1 && (
                      <span className="hidden lg:block absolute top-1/2 -right-2 text-slate-700 font-mono text-sm">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {exampleUseCases.map((useCase) => (
                  <span
                    key={useCase}
                    className="text-xs px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#070b13] overflow-hidden shadow-2xl shadow-blue-950/20">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs text-slate-600 font-mono">service-workflow.log</span>
              </div>

              <div className="p-5 font-mono text-xs space-y-3">
                <div className="text-slate-500">
                  <span className="text-green-400">workflow.run</span>
                  <span className="text-slate-600">(</span>
                  <span className="text-blue-400">&quot;support-docs&quot;</span>
                  <span className="text-slate-600">)</span>
                </div>

                <div className="space-y-2 pt-2">
                  {runLog.map((entry) => (
                    <div key={entry.text} className="flex gap-2 leading-relaxed">
                      <span
                        className={
                          entry.state === "done"
                            ? "text-emerald-400"
                            : entry.state === "hold"
                              ? "text-amber-400"
                              : "text-slate-500"
                        }
                      >
                        {entry.state === "done" ? "✓" : entry.state === "hold" ? "⏸" : "→"}
                      </span>
                      <span className="text-slate-400">{entry.text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 text-slate-600 leading-relaxed">
                  <span className="text-amber-400">policy:</span> external actions require explicit approval
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

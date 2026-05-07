const workflows = [
  {
    title: "Research workflows",
    description:
      "Literature discovery, related-work mapping, novelty checks, and paper opportunity evaluation.",
  },
  {
    title: "Documentation systems",
    description:
      "Knowledge bases, decision logs, reusable playbooks, and progress tracking for complex work.",
  },
  {
    title: "Developer automation",
    description:
      "Repository review, implementation planning, build checks, technical handoffs, and code-focused task decomposition.",
  },
  {
    title: "Human-in-the-loop operations",
    description:
      "Automation patterns with review gates, risk boundaries, and explicit approval before external or irreversible actions.",
  },
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
            I build and experiment with agentic workflows for practical research and engineering tasks.
            These are not just prompts, but structured systems for task decomposition, evidence collection,
            documentation, review loops, and human approval checkpoints.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {workflows.map((workflow, index) => (
            <article
              key={workflow.title}
              className="group rounded-2xl border border-white/10 bg-[#0d1117] p-5 md:p-6 hover:border-blue-500/30 hover:bg-blue-500/[0.03] transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-sm flex items-center justify-center">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-100 transition-colors">
                    {workflow.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {workflow.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const pipelines = [
  {
    project: "Ethical Classification of OSS Contributions",
    question: "How can OSS communities monitor ethical quality in non-coding contributions at scale?",
    status: "Accepted",
    venue: "AIES 2025",
    sourceLabel: "arXiv",
    sourceUrl: "https://arxiv.org/abs/2507.21583",
    accent: "blue",
    steps: [
      {
        label: "Problem",
        value: "OSS collaboration depends on issues and comments, but monitoring codes of conduct manually is hard to scale.",
      },
      {
        label: "Method",
        value: "Define ethical metrics grounded in the Contributor Covenant and classify non-coding contributions with LLM prompt engineering.",
      },
      {
        label: "Dataset",
        value: "GitHub non-coding contributions such as issues, change proposals, and comments.",
      },
      {
        label: "Tool",
        value: "LLM-based classifier for assessing ethical behaviour in OSS interactions.",
      },
      {
        label: "Publication",
        value: "Accepted at the AAAI/ACM Conference on AI, Ethics, and Society 2025.",
      },
    ],
    outputs: ["Accepted paper", "arXiv preprint", "LLM classification approach"],
  },
  {
    project: "BigBOSS",
    question: "Can bots help define, monitor, and enforce codes of conduct in open-source projects?",
    status: "Accepted",
    venue: "ICSE-SEIS 2025",
    sourceLabel: "arXiv",
    sourceUrl: "https://arxiv.org/abs/2503.05479",
    accent: "emerald",
    steps: [
      {
        label: "Problem",
        value: "Codes of conduct are increasingly adopted in OSS, but definition, deployment, and enforcement remain difficult.",
      },
      {
        label: "Method",
        value: "Model code-of-conduct management around the Contributor Covenant and automate the workflow with bots.",
      },
      {
        label: "Dataset",
        value: "Open-source project activity hosted on social-coding platforms such as GitHub.",
      },
      {
        label: "Tool",
        value: "Bot-based solution supporting code-of-conduct definition, monitoring, and ethical-rule enforcement.",
      },
      {
        label: "Publication",
        value: "Accepted at ICSE Software Engineering in Society 2025.",
      },
    ],
    outputs: ["Accepted paper", "Bot-based approach", "OSS governance workflow"],
  },
  {
    project: "Decidim Comparative Study",
    question: "How does participation differ between social coding and citizen participation platforms?",
    status: "Submitted work",
    venue: "JSS 2026",
    sourceLabel: "SSRN/Zenodo",
    sourceUrl: "https://doi.org/10.2139/ssrn.5357665",
    accent: "amber",
    steps: [
      {
        label: "Problem",
        value: "Platforms sharing open-source roots can still produce very different collaboration and participation patterns.",
      },
      {
        label: "Method",
        value: "Compare social-coding and citizen-participation activity through empirical software engineering and social-network analysis.",
      },
      {
        label: "Dataset",
        value: "Decidim-related activity across GitHub, MetaDecidim, and Decidim Barcelona communities.",
      },
      {
        label: "Tool",
        value: "Analysis workflow for concentration, reach, and discussion-depth patterns across communities.",
      },
      {
        label: "Publication",
        value: "Preprint available; submitted to Journal of Systems and Software.",
      },
    ],
    outputs: ["Submitted paper", "Preprint DOI", "Zenodo record"],
  },
];

const accentStyles: Record<string, { border: string; text: string; bg: string; dot: string }> = {
  blue: {
    border: "border-blue-500/30",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    dot: "bg-blue-400",
  },
  emerald: {
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    dot: "bg-emerald-400",
  },
  amber: {
    border: "border-amber-500/30",
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    dot: "bg-amber-400",
  },
};

export default function ResearchPipeline() {
  return (
    <section id="research-pipeline" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 mb-3">
            Research pipeline
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">
            From <span className="text-blue-400">research questions</span> to reproducible tools
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Selected work showing the full path from a concrete research problem to a method,
            dataset, software artifact, and publication output.
          </p>
        </div>

        <div className="space-y-5">
          {pipelines.map((pipeline) => {
            const accent = accentStyles[pipeline.accent];

            return (
              <article
                key={pipeline.project}
                className="rounded-2xl border border-white/10 bg-[#0d1117] overflow-hidden"
              >
                <div className="p-5 md:p-6 border-b border-white/10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-white font-bold text-lg">{pipeline.project}</h3>
                      <span className={`text-xs font-mono px-2.5 py-1 rounded border ${accent.border} ${accent.bg} ${accent.text}`}>
                        {pipeline.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                      {pipeline.question}
                    </p>
                  </div>
                  <div className="flex md:flex-col items-start md:items-end gap-2 shrink-0">
                    <span className={`text-xs font-mono px-3 py-1 rounded-full border ${accent.border} ${accent.text}`}>
                      {pipeline.venue}
                    </span>
                    <a
                      href={pipeline.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-slate-500 hover:text-blue-400 transition-colors"
                    >
                      {pipeline.sourceLabel} ↗
                    </a>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <div className="grid md:grid-cols-5 gap-4">
                    {pipeline.steps.map((step, index) => (
                      <div key={step.label} className="relative">
                        {index < pipeline.steps.length - 1 && (
                          <div className="hidden md:block absolute top-3 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-px bg-white/10" />
                        )}
                        <div className="relative rounded-xl border border-white/10 bg-white/[0.025] p-4 h-full">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
                            <p className={`text-xs font-mono uppercase tracking-wider ${accent.text}`}>
                              {step.label}
                            </p>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{step.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {pipeline.outputs.map((output) => (
                      <span
                        key={output}
                        className="text-xs px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-slate-400"
                      >
                        {output}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

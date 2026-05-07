const skills = [
  "Python", "NLP", "ML", "LLMs", "Data Analysis",
  "Agentic Workflows", "LLM Agents", "Automation",
  "Prompt Engineering", "LangChain", "Hugging Face",
  "RAG", "Statistics", "scikit-learn", "PyTorch",
  "SQL", "Docker", "Git", "LaTeX",
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">
          About <span className="text-blue-400">Me</span>
        </h2>
        <div className="w-12 h-1 bg-blue-500 mb-12 rounded" />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="space-y-4 text-slate-400 leading-relaxed text-sm">
            <p>
              I am a <span className="text-white font-medium">Research Engineer</span> working on AI, large language models and empirical software engineering.
            </p>
            <p>
              My work is split between building real tools and running studies that produce published results. On the engineering side I build LLM-powered classifiers, automated pipelines and recommender systems. On the research side I design empirical studies, collect large-scale datasets and apply statistical methods to draw conclusions that hold up to peer review.
            </p>
            <p>
              Before research I spent two years as a <span className="text-white font-medium">Data Scientist in industry</span>, working on segmentation models, ETL pipelines and data infrastructure. Before that I ran my own academy for several years, teaching Mathematics and Physics and managing a small team.
            </p>
            <p>
              I also build agentic workflows for practical research and engineering tasks, combining LLMs, automation, documentation systems, and human-in-the-loop review.
            </p>
            <p>
              I care about building AI systems that are not just accurate but <span className="text-blue-400">interpretable, measurable and responsible</span>.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm border border-blue-500/30 text-blue-400 rounded-full bg-blue-500/5 hover:bg-blue-500/15 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contributors() {
  const contributors = [
    {
      name: 'Chiranthan S',
      role: 'Full Stack Developer',
      description: '3rd Year Information Science Engineering student at JNNCE Shivamogga. Focused on building scalable web applications and crafting premium user experiences.',
    },
    {
      name: 'Chetan Kumar NK',
      role: 'Backend Developer',
      description: '3rd Year Information Science Engineering student at JNNCE Shivamogga. Specialized in backend logic, API development, and system design.',
    },
  ];

  return (
    <section id="contributors" className="border-b border-resumex-border bg-[#0A0A0A] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 space-y-3 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Meet the Creators
          </h2>
          <p className="text-lg text-slate-400">Built with passion and precision</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {contributors.map((contributor, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 transition hover:-translate-y-1 hover:shadow-soft-xl animate-fadeIn"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">{contributor.name}</h3>
                <p className="text-sm font-semibold text-resumex-accent uppercase tracking-wide">
                  {contributor.role}
                </p>
                <p className="text-base text-slate-300 leading-relaxed">
                  {contributor.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-resumex-border pt-8 text-center">
          <p className="text-sm text-slate-500">
            Developed by ISE students, JNNCE Shivamogga
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contributors;

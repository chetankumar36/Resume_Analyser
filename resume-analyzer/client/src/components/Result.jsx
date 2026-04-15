import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

function ProgressBar({ value }) {
  const safe = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;

  return (
    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-700">
      <div
        className="h-full bg-resumex-accent rounded-full transition-all duration-700"
        style={{ width: `${safe}%` }}
      />
    </div>
  );
}

function KeywordTags({ title, keywords, type }) {
  return (
    <div className="glass-panel p-5 animate-fadeIn">
      <h3 className="text-xs font-semibold text-white mb-3 uppercase tracking-wide">{title}</h3>
      {keywords && keywords.length ? (
        <div className="flex flex-wrap gap-2">
          {keywords.map((k) => (
            <span
              key={k}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                type === 'matched'
                  ? 'border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700'
                  : 'border-slate-600 bg-slate-800/30 text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              {k}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-500">—</p>
      )}
    </div>
  );
}

function CategoryBar({ label, data }) {
  const score = data?.matchPercentage ?? 0;

  return (
    <div className="glass-panel p-5 animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-white uppercase tracking-wide">{label}</p>
        <span className="text-sm font-semibold text-resumex-accent">{Math.round(score)}%</span>
      </div>
      <ProgressBar value={score} />
    </div>
  );
}

function Result({ result }) {
  if (!result) return null;

  const {
    score,
    atsScore,
    matchedKeywords,
    missingKeywords,
    categorizedSkills,
    suggestions,
    resumeQuality,
  } = result;

  const atsBand =
    atsScore < 50 ? 'Low' : atsScore < 75 ? 'Medium' : 'High';

  return (
    <section className="mt-12 space-y-8 animate-fadeIn" id="results-section">
      {/* Main Score Card */}
      <div className="glass-panel p-8 lg:p-10">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Job Match Score
            </p>
            <div className="text-6xl font-bold text-white tracking-tight">
              {Math.round(score)}<span className="text-2xl ml-1 align-super">%</span>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Your resume aligns with this job description
            </p>
          </div>

          {/* ATS Score */}
          <div className="w-full max-w-md mt-4 pt-4 border-t border-resumex-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                ATS Compatibility
              </span>
              <span className="text-sm font-semibold text-resumex-accent">
                {Math.round(atsScore)}% ({atsBand})
              </span>
            </div>
            <ProgressBar value={atsScore} />
            <p className="mt-2 text-xs text-slate-500">
              How well your resume will parse through Applicant Tracking Systems
            </p>
          </div>
        </div>
      </div>

      {/* Keywords Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <KeywordTags title="Matched Keywords" keywords={matchedKeywords} type="matched" />
        <KeywordTags title="Missing Keywords" keywords={missingKeywords} type="missing" />
      </div>

      {/* Skill Categories */}
      <div id="skill-categories">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
          Skill Category Match
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <CategoryBar label="Technical Skills" data={categorizedSkills?.technical} />
          <CategoryBar label="Soft Skills" data={categorizedSkills?.soft} />
          <CategoryBar label="Tools & Platforms" data={categorizedSkills?.tools} />
        </div>
      </div>

      {/* Suggestions & Quality */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel p-6 animate-fadeIn" id="suggestions">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wide mb-4">
            Smart Suggestions
          </h3>
          {suggestions && suggestions.length ? (
            <ul className="space-y-3">
              {suggestions.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 h-4 w-4 flex-shrink-0 text-resumex-accent">
                    <CheckIcon />
                  </span>
                  <span className="text-sm text-slate-300">{s}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No changes needed — excellent alignment.</p>
          )}
        </div>

        <div className="glass-panel p-6 animate-fadeIn" id="quality">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wide mb-4">
            Resume Quality
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Length</span>
                <span className="text-xs font-semibold text-slate-200">
                  {resumeQuality?.length?.wordCount} words
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {resumeQuality?.length?.assessment}
              </p>
            </div>
            <div className="border-t border-resumex-border pt-3">
              <div className="flex items-center gap-2 mb-2">
                {resumeQuality?.actionVerbs?.present ? (
                  <CheckIcon className="h-4 w-4 text-resumex-accent" />
                ) : (
                  <XMarkIcon className="h-4 w-4 text-slate-600" />
                )}
                <span className="text-xs font-medium text-slate-300">Action Verbs</span>
              </div>
              <div className="flex items-center gap-2">
                {resumeQuality?.metrics?.hasMetrics ? (
                  <CheckIcon className="h-4 w-4 text-resumex-accent" />
                ) : (
                  <XMarkIcon className="h-4 w-4 text-slate-600" />
                )}
                <span className="text-xs font-medium text-slate-300">Numbers & Metrics</span>
              </div>
            </div>
            {resumeQuality?.overallTips?.length ? (
              <div className="border-t border-resumex-border pt-3">
                <ul className="space-y-2">
                  {resumeQuality.overallTips.map((tip, i) => (
                    <li key={i} className="text-xs text-slate-400 flex gap-2">
                      <span className="text-resumex-accent">→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Result;

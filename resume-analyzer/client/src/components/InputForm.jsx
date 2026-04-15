import { DocumentTextIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

function InputForm({ resumeText, jobText, onChangeResume, onChangeJob, onAnalyze, loading }) {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="glass-panel p-6">
        <div className="mb-4 flex items-start gap-3">
          <span className="mt-1 h-5 w-5 text-slate-400">
            <DocumentTextIcon />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-white">Resume</h2>
            <p className="text-xs text-slate-400 mt-0.5">Paste your latest resume</p>
          </div>
        </div>
        <textarea
          value={resumeText}
          onChange={(e) => onChangeResume(e.target.value)}
          placeholder="Paste your resume here..."
          className="h-52 w-full resize-none rounded-lg border border-resumex-border bg-resumex-card px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-resumex-accent focus:ring-1 focus:ring-resumex-accent/50"
        />
      </div>

      <div className="glass-panel p-6">
        <div className="mb-4 flex items-start gap-3">
          <span className="mt-1 h-5 w-5 text-slate-400">
            <BriefcaseIcon />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-white">Job Description</h2>
            <p className="text-xs text-slate-400 mt-0.5">Paste the exact role you're targeting</p>
          </div>
        </div>
        <textarea
          value={jobText}
          onChange={(e) => onChangeJob(e.target.value)}
          placeholder="Paste the job description here..."
          className="h-52 w-full resize-none rounded-lg border border-resumex-border bg-resumex-card px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-resumex-accent focus:ring-1 focus:ring-resumex-accent/50"
        />
      </div>

      <div className="lg:col-span-2 flex justify-center pt-4">
        <button
          type="button"
          disabled={loading || !resumeText || !jobText}
          onClick={onAnalyze}
          className="inline-flex items-center gap-2 rounded-lg bg-resumex-accent px-8 py-3 text-sm font-semibold text-black transition hover:bg-resumex-accent/90 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? (
            <>
              <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
              <span>Analyzing</span>
            </>
          ) : (
            <>
              <span>Analyze Resume</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}

export default InputForm;

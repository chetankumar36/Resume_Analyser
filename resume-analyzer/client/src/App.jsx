import { useRef, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import LoginModal from './components/LoginModal.jsx';
import InputForm from './components/InputForm.jsx';
import Result from './components/Result.jsx';
import Contributors from './components/Contributors.jsx';

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || 'https://resume-analyser-38nt.onrender.com/analyze';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [jobText, setJobText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const resultsRef = useRef(null);

  const handleAnalyze = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription: jobText }),
      });

      if (!response.ok) {
        throw new Error('Unable to analyze resume. Please try again.');
      }

      const data = await response.json();
      setResult(data);

      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        onAccountClick={() => setIsLoginModalOpen(true)}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onAccountClick={() => setIsLoginModalOpen(true)}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="relative border-b border-resumex-border bg-[#0A0A0A] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center rounded-full border border-resumex-border bg-[#111111]/50 px-3 py-1 text-[11px] font-medium text-resumex-accent animate-fadeIn">
                Powered by Advanced AI
              </div>

              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                Make your resume speak{' '}
                <span className="text-resumex-accent">ATS language</span>.
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-slate-400 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                Optimize your resume with intelligent keyword matching. Get actionable insights to improve your ATS compatibility and increase your chances of getting noticed by recruiters.
              </p>
            </div>
          </div>
        </section>

        {/* Analyzer Section */}
        <section id="analyzer" className="border-b border-resumex-border bg-[#0A0A0A] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">Analyze Your Resume</h2>
              <p className="mt-2 text-slate-400">Get instant ATS compatibility insights</p>
            </div>

            <InputForm
              resumeText={resumeText}
              jobText={jobText}
              onChangeResume={setResumeText}
              onChangeJob={setJobText}
              onAnalyze={handleAnalyze}
              loading={loading}
            />

            {error && (
              <div className="glass-panel border-resumex-border bg-red-950/20 px-6 py-4 text-sm text-red-200 animate-fadeIn">
                <p className="font-medium">Error</p>
                <p className="mt-1 text-sm">{error}</p>
              </div>
            )}

            <div ref={resultsRef}>
              <Result result={result} />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="border-b border-resumex-border bg-[#0A0A0A] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 space-y-3 text-center">
              <h2 className="text-4xl font-bold tracking-tight text-white">Features</h2>
              <p className="text-lg text-slate-400">Everything you need to optimize your resume</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'ATS Score Analysis',
                  description: 'Get an in-depth compatibility score based on how your resume aligns with ATS systems.',
                },
                {
                  title: 'Keyword Matching',
                  description: 'Identify matched and missing keywords to boost your chances of getting past initial filters.',
                },
                {
                  title: 'Skill Categorization',
                  description: 'See how your technical, soft skills, and tools stack up against the job requirements.',
                },
                {
                  title: 'Smart Suggestions',
                  description: 'Get AI-powered recommendations to strengthen your resume and increase your score.',
                },
                {
                  title: 'Resume Quality Check',
                  description: 'Analyze length, action verbs, and metrics to ensure your resume is polished and complete.',
                },
                {
                  title: 'Instant Results',
                  description: 'Get comprehensive analysis and actionable insights in seconds.',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-6 animate-fadeIn"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contributors Section */}
        <Contributors />

        {/* Footer */}
        <footer className="bg-[#0A0A0A] px-4 py-8 sm:px-6 lg:px-8 border-t border-resumex-border">
          <div className="mx-auto max-w-5xl text-center text-xs text-slate-600">
            <p>ResumeX — Speak the language recruiters understand.</p>
            <p className="mt-2">Designed for job seekers who want to stand out. Tailor each application for best results.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;

import { useRef, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Login from './components/Login.jsx';
import InputForm from './components/InputForm.jsx';
import Result from './components/Result.jsx';

const API_URL = 'http://localhost:5000/analyze';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [jobText, setJobText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const resultsRef = useRef(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setResumeText('');
    setJobText('');
    setResult(null);
    setIsSidebarOpen(false);
  };

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

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onLogout={handleLogout} />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative border-b border-resumex-border bg-[#0A0A0A] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center rounded-full border border-resumex-border bg-[#111111]/50 px-3 py-1 text-[11px] font-medium text-resumex-accent">
                Powered by Advanced AI
              </div>

              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Make your resume speak{' '}
                <span className="text-resumex-accent">ATS language</span>.
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                Optimize your resume with intelligent keyword matching. Get actionable insights to improve your ATS compatibility and increase your chances of getting noticed by recruiters.
              </p>
            </div>
          </div>
        </section>

        {/* Analyzer Section */}
        <section id="analyzer" className="border-b border-resumex-border bg-[#0A0A0A] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-8">
            {/* Input Form */}
            <InputForm
              resumeText={resumeText}
              jobText={jobText}
              onChangeResume={setResumeText}
              onChangeJob={setJobText}
              onAnalyze={handleAnalyze}
              loading={loading}
            />

            {/* Error Message */}
            {error && (
              <div className="glass-panel border-resumex-border bg-red-950/20 px-6 py-4 text-sm text-red-200">
                <p className="font-medium">Error</p>
                <p className="mt-1 text-sm">{error}</p>
              </div>
            )}

            {/* Results */}
            <div ref={resultsRef}>
              <Result result={result} />
            </div>
          </div>
        </section>

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

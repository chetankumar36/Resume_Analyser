import { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">ResumeX</h1>
          <p className="mt-2 text-sm text-slate-400">Speak the language recruiters understand.</p>
        </div>

        <div className="space-y-1 mb-8 text-center">
          <h2 className="text-xl font-semibold text-white">Welcome back</h2>
          <p className="text-sm text-slate-400">Sign in to access your resume analysis</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-lg border border-resumex-border bg-resumex-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-resumex-accent focus:ring-1 focus:ring-resumex-accent/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-resumex-border bg-resumex-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-resumex-accent focus:ring-1 focus:ring-resumex-accent/50"
            />
          </div>

          <button
            type="submit"
            disabled={!email || !password}
            className="w-full mt-6 rounded-lg bg-resumex-accent px-4 py-3 text-sm font-semibold text-black transition hover:bg-resumex-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Enter ResumeX
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500">
          Demo credentials: any email and password work.
        </div>
      </div>
    </div>
  );
}

export default Login;

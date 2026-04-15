import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="glass-panel w-full max-w-md p-8 animate-fadeIn">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Login to ResumeX</h2>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:text-white hover:bg-resumex-card"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-resumex-border bg-resumex-card px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-resumex-accent focus:ring-1 focus:ring-resumex-accent/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-resumex-border bg-resumex-card px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-resumex-accent focus:ring-1 focus:ring-resumex-accent/50"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 rounded-lg bg-resumex-accent px-4 py-3 text-sm font-semibold text-black transition hover:bg-resumex-accent/90 hover:scale-105"
            >
              Login to ResumeX
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Demo mode: any email and password work.
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginModal;

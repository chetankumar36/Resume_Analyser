import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Navbar({ onMenuClick, isSidebarOpen }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-resumex-border bg-[#0A0A0A]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">ResumeX</span>
            <span className="text-xs text-resumex-muted">By ATS</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm text-slate-300 transition hover:text-white">
              Home
            </a>
            <a href="#analyzer" className="text-sm text-slate-300 transition hover:text-white">
              Analyzer
            </a>
            <a href="#features" className="text-sm text-slate-300 transition hover:text-white">
              Features
            </a>
            <button className="rounded-lg border border-resumex-accent px-4 py-1.5 text-sm font-medium text-resumex-accent transition hover:bg-resumex-accent/10">
              My Account
            </button>
          </div>

          <button
            onClick={onMenuClick}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-resumex-border text-slate-300 transition hover:bg-resumex-card"
          >
            {isSidebarOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

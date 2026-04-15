import { XMarkIcon } from '@heroicons/react/24/outline';

function Sidebar({ isOpen, onClose, onLogout }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed left-0 top-0 z-40 h-full w-64 transform border-r border-resumex-border bg-[#0A0A0A] transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-resumex-border px-4">
          <span className="text-lg font-bold text-white">ResumeX</span>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-1 p-4">
          <a
            href="#dashboard"
            onClick={onClose}
            className="block rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-resumex-card"
          >
            Dashboard
          </a>
          <a
            href="#ats-score"
            onClick={onClose}
            className="block rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-resumex-card"
          >
            ATS Score
          </a>
          <a
            href="#suggestions"
            onClick={onClose}
            className="block rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-resumex-card"
          >
            Suggestions
          </a>
          <a
            href="#quality"
            onClick={onClose}
            className="block rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-resumex-card"
          >
            Resume Quality
          </a>
          <a
            href="#about"
            onClick={onClose}
            className="block rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-resumex-card"
          >
            About
          </a>
        </div>

        <div className="border-t border-resumex-border p-4">
          <button
            onClick={onLogout}
            className="w-full rounded-lg border border-resumex-border px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-resumex-card"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

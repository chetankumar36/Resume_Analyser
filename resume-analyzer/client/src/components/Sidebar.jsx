import { XMarkIcon } from '@heroicons/react/24/outline';

function Sidebar({ isOpen, onClose, onLogout, onAccountClick }) {
  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

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
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-resumex-card hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('analyzer')}
            className="block w-full text-left rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-resumex-card hover:text-white"
          >
            Analyzer
          </button>
          <button
            onClick={() => handleNavClick('features')}
            className="block w-full text-left rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-resumex-card hover:text-white"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('contributors')}
            className="block w-full text-left rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-resumex-card hover:text-white"
          >
            Contributors
          </button>
        </div>

        <div className="border-t border-resumex-border p-4 space-y-2">
          <button
            onClick={() => {
              onAccountClick();
              onClose();
            }}
            className="w-full rounded-lg border border-resumex-accent px-4 py-2 text-sm font-medium text-resumex-accent transition hover:bg-resumex-accent/10"
          >
            My Account
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

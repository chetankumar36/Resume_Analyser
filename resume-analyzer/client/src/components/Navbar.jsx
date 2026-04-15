import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

function Navbar({ onMenuClick, isSidebarOpen, onAccountClick }) {
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'analyzer', 'features', 'contributors'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveLink(sectionId);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'analyzer', label: 'Analyzer' },
    { id: 'features', label: 'Features' },
    { id: 'contributors', label: 'Contributors' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-resumex-border bg-[#0A0A0A]/75 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 transition hover:opacity-80"
          >
            <span className="text-xl font-bold tracking-tight text-white">ResumeX</span>
            <span className="text-xs text-resumex-muted">By ATS</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition relative ${
                  activeLink === item.id
                    ? 'text-resumex-accent'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeLink === item.id && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-resumex-accent rounded-full" />
                )}
              </button>
            ))}
            <button
              onClick={onAccountClick}
              className="rounded-lg border border-resumex-accent px-4 py-2 text-sm font-semibold text-resumex-accent transition hover:bg-resumex-accent/10 hover:scale-105"
            >
              My Account
            </button>
          </div>

          {/* Mobile Menu Button */}
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

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Ghost, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import type { Language } from '@/lib/translations';
import LoginModal from '@/components/login-modal';

const LANG_OPTIONS: { value: Language; label: string; native: string }[] = [
  { value: 'en', label: 'EN', native: 'English' },
  { value: 'cn', label: '中文', native: '简体中文' },
];

export default function Nav() {
  const { t, lang, setLang } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isDashboard = pathname === '/dashboard';
  const currentLang = LANG_OPTIONS.find((l) => l.value === lang)!;

  return (
    <>
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    <nav
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300 ${
        scrolled || isDashboard
          ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center group-hover:bg-[#00ff88]/15 transition-colors">
          <Ghost className="w-4 h-4 text-[#00ff88]" />
        </div>
        <span className="text-white font-semibold text-[15px] tracking-tight">GhostTrade</span>
        <span className="text-[10px] font-medium text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/20 px-1.5 py-0.5 rounded-full">
          BETA
        </span>
      </Link>

      {/* Center links */}
      <div className="hidden md:flex items-center gap-1">
        {[
          { href: '/', label: t.nav.home },
          { href: '/#features', label: t.nav.features },
          { href: '/pricing', label: t.nav.pricing },
        ].map((link) => {
          const active =
            link.href === '/pricing' ? pathname === '/pricing' : pathname === '/';
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                active
                  ? 'text-white bg-white/5'
                  : 'text-white/45 hover:text-white hover:bg-white/4'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Right: Language toggle + Login */}
      <div className="flex items-center gap-3">
        {/* Language dropdown */}
        <div className="relative">
          <button
            onClick={() => setLangOpen((o) => !o)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/4 border border-white/8 hover:bg-white/7 hover:border-white/12 transition-all text-sm text-white/70 hover:text-white"
          >
            <span className="font-medium text-[13px]">{currentLang.label}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-white/35 transition-transform duration-200 ${
                langOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {langOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setLangOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 z-20 w-40 glass-dark rounded-xl border border-white/10 overflow-hidden shadow-2xl animate-slide-up">
                {LANG_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setLang(option.value);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-all hover:bg-white/6 ${
                      lang === option.value
                        ? 'text-[#00ff88] bg-[#00ff88]/6'
                        : 'text-white/60'
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs text-white/30">{option.native}</span>
                    {lang === option.value && (
                      <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Login button */}
        <button
          onClick={() => setShowLogin(true)}
          className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white px-4 py-2 rounded-lg border border-white/8 hover:border-white/15 bg-white/3 hover:bg-white/6 transition-all duration-200"
        >
          {t.nav.login}
        </button>

        <a
          href="https://link.depay.com/6KsEIwZjv48aUyZeOTOs6s"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-bold text-[#080808] bg-[#00ff88] px-4 py-2 rounded-lg hover:bg-[#00e87c] transition-all neon-glow"
        >
          {t.nav.getAccess}
        </a>
      </div>
    </nav>
    </>
  );
}

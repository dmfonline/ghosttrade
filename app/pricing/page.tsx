'use client';

import { useState } from 'react';
import { ArrowRight, Zap, ChevronDown } from 'lucide-react';
import Nav from '@/components/nav';
import { useLanguage } from '@/contexts/language-context';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={className}>{children}</div>;
}

const COMPARISON = [
  { label: '', ghosttrade: 'GhostTrade', altA: 'Algo bot', altB: 'Copy trader', header: true },
  { label: 'Price', ghosttrade: '$99 one-time', altA: '$99/mo', altB: '$149/mo', header: false },
  { label: 'Plain-English setup', ghosttrade: true, altA: false, altB: false, header: false },
  { label: 'Whale cloning', ghosttrade: true, altA: false, altB: true, header: false },
  { label: 'Non-custodial', ghosttrade: true, altA: false, altB: false, header: false },
  { label: 'No API keys needed', ghosttrade: true, altA: false, altB: false, header: false },
  { label: 'On-chain execution', ghosttrade: true, altA: false, altB: false, header: false },
  { label: 'Lifetime access', ghosttrade: true, altA: false, altB: false, header: false },
];

function Check() {
  return (
    <span className="w-5 h-5 rounded-full bg-[#00ff88]/15 border border-[#00ff88]/30 inline-flex items-center justify-center">
      <svg className="w-3 h-3 text-[#00ff88]" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Cross() {
  return (
    <span className="w-5 h-5 rounded-full bg-red-500/8 border border-red-500/15 inline-flex items-center justify-center">
      <svg className="w-3 h-3 text-red-400/60" viewBox="0 0 12 12" fill="none">
        <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function PricingPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#080808] bg-grid overflow-x-hidden">
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative z-10 overflow-hidden pt-20">
        <div className="pointer-events-none absolute inset-0 bg-radial-hero" />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-900/20 blur-[120px] rounded-full" />

        <div className="relative flex flex-col items-center text-center px-6 pt-20 pb-20">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#00ff88] bg-[#00ff88]/8 border border-[#00ff88]/20 px-4 py-2 rounded-full mb-8 animate-slide-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            {t.pricing.badge}
          </div>
          <h1
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[0.93] max-w-4xl mb-6 animate-slide-up"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            {t.pricingPage.heroHeading}{' '}
            <span className="text-[#00ff88] neon-glow-text">{t.pricingPage.heroHeadingAccent}</span>
          </h1>
          <p
            className="text-lg text-white/45 max-w-xl leading-relaxed animate-slide-up"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            {t.pricingPage.heroSub}
          </p>
        </div>
      </section>

      {/* ── MAIN PRICING CARD ────────────────────────────────── */}
      <RevealSection>
        <section className="relative z-10 py-8 px-6 overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-900/15 blur-[120px] rounded-full" />
          <div className="relative max-w-lg mx-auto">
            <div className="reveal glass rounded-2xl border border-[#00ff88]/15 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/40 to-transparent" />

              {/* Card header */}
              <div className="bg-[#00ff88]/4 border-b border-[#00ff88]/10 px-8 py-6 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00ff88]/70">Beta Access</span>
                <div className="flex items-end justify-center gap-2 mt-3">
                  <span className="text-7xl font-bold text-white leading-none">$99</span>
                  <div className="mb-2 text-left">
                    <p className="text-sm text-white/60">{t.pricing.pricePer}</p>
                    <p className="text-xs text-[#00ff88]/60">No renewals. Ever.</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="px-8 py-7">
                <ul className="space-y-3.5 mb-8">
                  {t.pricing.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/65">
                      <span className="w-4 h-4 rounded-full bg-[#00ff88]/12 border border-[#00ff88]/25 flex items-center justify-center flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://link.depay.com/6KsEIwZjv48aUyZeOTOs6s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-3 bg-[#00ff88] text-[#080808] font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#00e87c] transition-all duration-200 animate-glow-pulse"
                >
                  <Zap className="w-5 h-5" />
                  {t.pricing.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="mt-4 text-center space-y-1.5">
                  <p className="text-xs text-red-400/70 font-semibold">⚠ {t.pricing.urgency}</p>
                  <p className="text-xs text-white/20">{t.pricing.paymentNote}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── COMPARISON TABLE ──────────────────────────────────── */}
      <RevealSection>
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 reveal">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t.pricingPage.comparisonHeading}</h2>
              <p className="text-white/40">{t.pricingPage.comparisonSub}</p>
            </div>

            <div className="reveal glass rounded-2xl border border-white/6 overflow-hidden">
              {COMPARISON.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-4 ${
                    row.header
                      ? 'bg-white/[0.03] border-b border-white/8'
                      : i % 2 === 0
                      ? 'bg-transparent'
                      : 'bg-white/[0.015]'
                  } ${i < COMPARISON.length - 1 && !row.header ? 'border-b border-white/4' : ''}`}
                >
                  <div className={`px-5 py-3.5 text-sm ${row.header ? 'font-semibold text-white/40 text-xs uppercase tracking-widest' : 'text-white/55'}`}>
                    {row.label}
                  </div>
                  {[row.ghosttrade, row.altA, row.altB].map((val, j) => (
                    <div
                      key={j}
                      className={`px-5 py-3.5 flex items-center justify-center text-sm font-medium ${
                        row.header
                          ? j === 0
                            ? 'text-[#00ff88] font-bold text-xs uppercase tracking-widest'
                            : 'text-white/30 text-xs uppercase tracking-widest'
                          : ''
                      } ${j === 0 && !row.header ? 'bg-[#00ff88]/4' : ''}`}
                    >
                      {row.header ? (
                        <span>{val as string}</span>
                      ) : typeof val === 'boolean' ? (
                        val ? <Check /> : <Cross />
                      ) : (
                        <span className={j === 0 ? 'text-[#00ff88] font-semibold text-sm' : 'text-white/40 text-sm'}>
                          {val as string}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <RevealSection>
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="reveal text-3xl md:text-4xl font-bold text-white text-center mb-12">
              {t.pricingPage.faq}
            </h2>
            <div className="space-y-3">
              {t.pricingPage.faqItems.map((item, i) => (
                <div
                  key={i}
                  className={`reveal reveal-delay-${i + 1} glass rounded-xl border overflow-hidden transition-all duration-300 ${
                    openFaq === i ? 'border-[#00ff88]/20' : 'border-white/6 hover:border-white/10'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-white/85 pr-4">{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/30 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === i ? 'rotate-180 text-[#00ff88]/60' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 border-t border-white/5">
                      <p className="text-sm text-white/45 leading-relaxed pt-4">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.05] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/40 text-sm">GhostTrade © 2026</span>
          <p className="text-xs text-white/20 max-w-sm text-center">{t.footer.disclaimer}</p>
          <div className="flex gap-6 text-xs text-white/25">
            <a href="#" className="hover:text-white/50 transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white/50 transition-colors">{t.footer.terms}</a>
            <a href="#" className="hover:text-white/50 transition-colors">{t.footer.docs}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

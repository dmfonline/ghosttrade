'use client';

import { ArrowRight, Zap, ChevronRight } from 'lucide-react';
import Nav from '@/components/nav';
import HeroTerminal from '@/components/hero-terminal';
import Testimonials from '@/components/testimonials';
import { useLanguage } from '@/contexts/language-context';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useRouter } from 'next/navigation';

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={className}>{children}</div>;
}

export default function HomePage() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#080808] bg-grid overflow-x-hidden">
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative z-10 overflow-hidden pt-20">
        <div className="pointer-events-none absolute inset-0 bg-radial-hero" />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-emerald-900/20 blur-[120px] rounded-full" />
        <div className="pointer-events-none absolute top-20 right-0 w-[400px] h-[400px] bg-emerald-900/10 blur-[100px] rounded-full" />
        <div className="pointer-events-none absolute top-40 left-0 w-[300px] h-[300px] bg-emerald-900/10 blur-[90px] rounded-full" />

        <div className="relative flex flex-col items-center text-center px-6 pt-16 pb-16">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#00ff88] bg-[#00ff88]/8 border border-[#00ff88]/20 px-4 py-2 rounded-full mb-10 animate-slide-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            {t.hero.badge}
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-[82px] font-bold tracking-tighter text-white leading-[0.93] max-w-5xl mb-7 animate-slide-up"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            {t.hero.headline1}{' '}
            <span className="text-[#00ff88] neon-glow-text">{t.hero.headline2}</span>
            <br />
            {t.hero.headline3}
          </h1>

          <p
            className="text-lg md:text-xl text-white/45 max-w-2xl leading-relaxed mb-10 animate-slide-up"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            {t.hero.sub}
          </p>

          <div
            className="flex flex-col items-center gap-3 animate-slide-up"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            <a
              href="https://link.depay.com/6KsEIwZjv48aUyZeOTOs6s"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-[#00ff88] text-[#080808] font-bold text-lg px-9 py-4 rounded-xl hover:bg-[#00e87c] transition-all duration-200 animate-glow-pulse"
            >
              <Zap className="w-5 h-5" />
              {t.hero.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-xs text-red-400/75 font-semibold tracking-wide">⚠ {t.hero.urgency}</p>
          </div>

          <button
            onClick={() => router.push('/dashboard')}
            className="mt-3 text-xs text-white/10 hover:text-white/25 transition-colors"
            aria-label="Developer login bypass"
          >
            {t.hero.devBypass}
          </button>

          <div
            className="relative mt-16 w-full max-w-4xl mx-auto animate-slide-up"
            style={{ animationDelay: '0.45s', opacity: 0 }}
          >
            <div className="absolute -inset-8 bg-emerald-900/20 blur-[60px] rounded-3xl pointer-events-none" />
            <div className="absolute -inset-2 bg-[#00ff88]/4 blur-[30px] rounded-2xl pointer-events-none" />
            <HeroTerminal />
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <RevealSection>
        <section className="relative z-10 py-16 px-6 border-y border-white/[0.05]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '$4.2M', label: t.stats.profit },
              { value: '3,841', label: t.stats.agents },
              { value: '78.2%', label: t.stats.winRate },
              { value: '< 200ms', label: t.stats.speed },
            ].map((stat, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} text-center`}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/35">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* ── PROBLEM ───────────────────────────────────────────── */}
      <RevealSection>
        <section id="problem" className="relative z-10 py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="reveal text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">
              {t.problem.heading}{' '}
              <span className="text-red-400">{t.problem.headingAccent}</span>
            </h2>
            <p className="reveal reveal-delay-1 text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
              {t.problem.body}{' '}
              <span className="text-white/80 font-semibold">{t.problem.bodyAccent}</span>
            </p>
            <div className="mt-12 grid md:grid-cols-3 gap-4 text-left">
              <div className="reveal reveal-delay-2 glass rounded-xl p-5 border border-red-500/10 hover:border-red-500/20 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,80,80,0.08)] transition-all duration-300">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-red-400/60">{t.problem.humanLabel}</p>
                <ul className="space-y-2.5">
                  {t.problem.humanPoints.map((p, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-red-400/50" />
                      <span className="text-white/35">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="reveal reveal-delay-3 flex items-center justify-center">
                <span className="text-4xl font-bold text-white/12">vs.</span>
              </div>
              <div className="reveal reveal-delay-4 glass rounded-xl p-5 border border-[#00ff88]/15 hover:border-[#00ff88]/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,255,128,0.1)] transition-all duration-300">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-[#00ff88]/70">{t.problem.aiLabel}</p>
                <ul className="space-y-2.5">
                  {t.problem.aiPoints.map((p, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#00ff88]/70" />
                      <span className="text-white/70">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── FEATURES ──────────────────────────────────────────── */}
      <RevealSection>
        <section id="features" className="relative z-10 py-24 px-6 bg-white/[0.008]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 reveal">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                {t.features.heading1}{' '}
                <span className="text-[#00ff88] neon-glow-text">{t.features.heading2}</span>
              </h2>
              <p className="text-white/40 text-lg max-w-2xl mx-auto">{t.features.sub}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {t.features.items.map((f, i) => (
                <div
                  key={i}
                  className={`reveal-scale reveal-delay-${i + 1} group glass rounded-2xl p-7 border border-white/6 hover:border-[#00ff88]/25 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,255,128,0.12)] transition-all duration-300 cursor-default`}
                >
                  <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">{f.emoji}</div>
                  <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <RevealSection>
        <section className="relative z-10 py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="reveal text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              {t.howItWorks.heading1}<br />
              <span className="text-[#00ff88]">{t.howItWorks.heading2}</span>
            </h2>
            <p className="reveal reveal-delay-1 text-white/40 mb-16">{t.howItWorks.sub}</p>
            <div className="space-y-4">
              {t.howItWorks.steps.map((item, i) => (
                <div
                  key={i}
                  className={`reveal reveal-delay-${i + 2} flex items-start gap-6 glass rounded-xl p-6 text-left group border border-white/6 hover:border-[#00ff88]/20 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,255,128,0.08)] transition-all duration-300`}
                >
                  <span className="text-4xl font-bold text-[#00ff88]/20 group-hover:text-[#00ff88]/50 transition-colors terminal-font flex-shrink-0">{item.step}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                    {i === 0 && (
                      <div className="flex items-center gap-2 mt-4 flex-wrap">
                        {[
                          { name: 'Binance', color: '#F0B90B', abbr: 'BNB' },
                          { name: 'Bybit', color: '#F7A600', abbr: 'BB' },
                          { name: 'OKX', color: '#94A3B8', abbr: 'OKX' },
                        ].map((ex) => (
                          <span
                            key={ex.name}
                            className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                            style={{
                              borderColor: `${ex.color}30`,
                              background: `${ex.color}10`,
                              color: ex.color,
                            }}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black"
                              style={{ background: `${ex.color}25` }}
                            >
                              {ex.abbr[0]}
                            </span>
                            {ex.name}
                          </span>
                        ))}
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#00ff88]/20 bg-[#00ff88]/8 text-[#00ff88]">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#00ff88]/20 flex items-center justify-center text-[8px] font-black">W</span>
                          Web3 DEX
                        </span>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/10 group-hover:text-[#00ff88]/50 ml-auto flex-shrink-0 self-center transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <Testimonials />

      {/* ── CTA PRICING TEASER ────────────────────────────────── */}
      <RevealSection>
        <section id="pricing" className="relative z-10 py-24 px-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-radial-pricing" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-900/20 blur-[120px] rounded-full" />
          <div className="relative max-w-xl mx-auto text-center">
            <div className="reveal glass rounded-2xl p-10 border border-[#00ff88]/12 hover:border-[#00ff88]/20 transition-all duration-500">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent rounded-t-2xl" />
              <div className="inline-flex items-center gap-2 text-xs font-medium text-[#00ff88] bg-[#00ff88]/8 border border-[#00ff88]/20 px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                {t.pricing.badge}
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">
                {t.pricing.heading}<br />{t.pricing.heading2}
              </h2>
              <p className="text-white/40 text-sm mb-8">{t.pricing.sub}</p>
              <div className="flex items-end justify-center gap-2 mb-8">
                <span className="text-6xl font-bold text-white">{t.pricing.price}</span>
                <span className="text-white/40 mb-2">{t.pricing.pricePer}</span>
              </div>
              <ul className="space-y-3 mb-10 text-left">
                {t.pricing.features.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/60">
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
              <p className="mt-3 text-xs text-red-400/70 font-semibold">⚠ {t.pricing.urgency}</p>
              <p className="mt-2 text-xs text-white/20">{t.pricing.paymentNote}</p>
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

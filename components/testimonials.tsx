'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const TESTIMONIALS = [
  {
    handle: '@degen_ape99',
    name: 'Degen Ape',
    avatar: { from: '#1a3a2a', to: '#0d2018', text: 'DA', ring: '#00ff88' },
    badge: 'Beta Tester',
    time: '2h ago',
    text: 'GhostTrade beta just front-ran a massive Raydium launch for me. I am up $4k while I was at the gym. Insane.',
    likes: '847',
    retweets: '312',
    verified: false,
  },
  {
    handle: '@solana_whale',
    name: 'Solana Whale',
    avatar: { from: '#0a2535', to: '#051520', text: 'SW', ring: '#00d4ff' },
    badge: 'Power User',
    time: '5h ago',
    text: 'Stripped away all the garbage. The plain-English strategy builder is the best UX in crypto right now. Take my money.',
    likes: '1.2K',
    retweets: '589',
    verified: true,
  },
  {
    handle: '@0xBuilder',
    name: '0xBuilder',
    avatar: { from: '#2a1a35', to: '#180d20', text: '0x', ring: '#a78bfa' },
    badge: 'Developer',
    time: '8h ago',
    text: 'Woke up to +$850 because the AI sniped a breakout at 3 AM. The emotionless risk management is saving my portfolio.',
    likes: '2.1K',
    retweets: '741',
    verified: false,
  },
];

function AvatarIcon({ from, to, text, ring }: { from: string; to: string; text: string; ring: string }) {
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 border-2"
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        borderColor: `${ring}40`,
        boxShadow: `0 0 12px ${ring}25`,
      }}
    >
      {text}
    </div>
  );
}

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Testimonials() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            What Beta Testers<br />
            <span className="text-[#00ff88] neon-glow-text">Are Saying</span>
          </h2>
          <p className="text-white/40 text-lg">
            Real results from the first 100 users who got access.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} group relative glass rounded-2xl p-6 border border-white/7 hover:border-[#00ff88]/20 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,255,128,0.12)] transition-all duration-300 cursor-default overflow-hidden`}
            >
              {/* Subtle top glow */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <AvatarIcon {...t.avatar} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-white">{t.name}</span>
                      {t.verified && (
                        <svg className="w-3.5 h-3.5 text-[#00d4ff]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs text-white/35">{t.handle}</span>
                      <span className="text-[9px] text-[#00ff88]/60 bg-[#00ff88]/8 border border-[#00ff88]/15 px-1.5 py-0.5 rounded-full">{t.badge}</span>
                    </div>
                  </div>
                </div>
                <div className="text-white/20 mt-1">
                  <XIcon size={15} />
                </div>
              </div>

              {/* Tweet text */}
              <p className="text-sm text-white/65 leading-relaxed mb-5">
                {t.text}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-[10px] text-white/20">{t.time}</span>
                <div className="flex items-center gap-4 text-[11px] text-white/25">
                  <span className="flex items-center gap-1 hover:text-red-400/60 transition-colors cursor-pointer">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    {t.likes}
                  </span>
                  <span className="flex items-center gap-1 hover:text-[#00ff88]/60 transition-colors cursor-pointer">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                    </svg>
                    {t.retweets}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

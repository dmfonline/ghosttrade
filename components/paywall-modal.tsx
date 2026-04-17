'use client';

import { Lock, ArrowRight, Zap, X } from 'lucide-react';

interface PaywallModalProps {
  onClose: () => void;
}

export default function PaywallModal({ onClose }: PaywallModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-md">
        <div
          className="relative rounded-2xl border border-[#00ff88]/20 overflow-hidden"
          style={{
            background: 'rgba(8, 8, 8, 0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 0 60px rgba(0, 255, 136, 0.08), 0 0 0 1px rgba(0, 255, 136, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-white/25 hover:text-white/60 hover:bg-white/8 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="px-8 pt-10 pb-8 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-[#00ff88]/20 blur-xl scale-150" />
              <div className="relative w-16 h-16 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/25 flex items-center justify-center">
                <Lock className="w-7 h-7 text-[#00ff88]" strokeWidth={2} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white tracking-tight mb-3">
              Beta Access Required
            </h2>

            <p className="text-sm text-white/45 leading-relaxed max-w-sm mb-8">
              You are currently viewing GhostTrade in{' '}
              <span className="text-white/70 font-medium">Demo Mode</span>. To unlock live AI
              trading, connect your exchange, and deploy strategies, you must secure a lifetime
              Beta Pass.
            </p>

            <a
              href="https://link.depay.com/6KsEIwZjv48aUyZeOTOs6s"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full inline-flex items-center justify-center gap-3 bg-[#00ff88] text-[#080808] font-bold text-base px-8 py-4 rounded-xl hover:bg-[#00e87c] transition-all duration-200 animate-glow-pulse"
            >
              <Zap className="w-5 h-5" />
              Unlock Full Access ($99 USDC)
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onClose}
              className="mt-3 text-xs text-white/20 hover:text-white/40 transition-colors"
            >
              Continue in Demo Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

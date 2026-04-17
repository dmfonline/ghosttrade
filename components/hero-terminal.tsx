'use client';

import { useEffect, useState } from 'react';

const CODE_LINES = [
  { text: 'const agent = new GhostAgent({', color: 'text-[#00ff88]/80' },
  { text: '  strategy: "whale_clone",', color: 'text-blue-400/70' },
  { text: '  wallets: topWhales.slice(0, 10),', color: 'text-blue-400/70' },
  { text: '  tradeSize: { usdc: 50 },', color: 'text-blue-400/70' },
  { text: '  stopLoss: -0.15,', color: 'text-red-400/70' },
  { text: '  takeProfit: 0.25,', color: 'text-[#00ff88]/70' },
  { text: '});', color: 'text-[#00ff88]/80' },
  { text: '', color: '' },
  { text: 'await agent.deploy(); // ✓ Agent live', color: 'text-white/30' },
];

const METRICS = [
  { label: 'Wallets Scanned', value: '14,382', live: true },
  { label: 'Whale Signal Strength', value: '94%', live: false },
  { label: 'Execution Latency', value: '187ms', live: false },
];

const BARS = [
  { label: 'SOL/USDC Signal', pct: 87, color: '#00ff88' },
  { label: 'ETH/USDC Signal', pct: 63, color: '#00d4ff' },
  { label: 'JTO/SOL Signal', pct: 91, color: '#00ff88' },
  { label: 'BONK/USDC Signal', pct: 44, color: '#fbbf24' },
];

export default function HeroTerminal() {
  const [tick, setTick] = useState(0);
  const [walletCount, setWalletCount] = useState(14382);

  useEffect(() => {
    const t = setInterval(() => {
      setTick((n) => n + 1);
      setWalletCount((n) => n + Math.floor(Math.random() * 7 + 1));
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="animate-breathe relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden glass-terminal">
      {/* Scan line effect */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent animate-scan z-10" />

      {/* Top chrome bar */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#00ff88]/10 bg-black/30">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-3 text-xs text-[#00ff88]/40 terminal-font tracking-widest uppercase">
          ghosttrade · agent runtime v2.1
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse-green" />
          <span className="text-xs text-[#00ff88]/50 terminal-font">LIVE</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#00ff88]/8">
        {/* Left: Code editor pane */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] text-white/20 terminal-font uppercase tracking-widest">strategy.ts</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]/60" />
          </div>
          <div className="space-y-1 terminal-font text-xs leading-relaxed animate-data-flicker">
            {CODE_LINES.map((line, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-white/15 select-none w-4 text-right flex-shrink-0">{line.text ? i + 1 : ''}</span>
                <span className={line.color || 'text-transparent'}>{line.text || '\u00A0'}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-[#00ff88]/8">
            <div className="flex items-center gap-2 text-xs terminal-font text-[#00ff88]/50">
              <span className="text-[#00ff88]/30">$</span>
              <span className="text-[#00ff88]/60">Running inference loop...</span>
              <span className="w-1.5 h-3 bg-[#00ff88]/70 animate-terminal-cursor inline-block ml-1" />
            </div>
          </div>
        </div>

        {/* Right: Live metrics pane */}
        <div className="p-5 flex flex-col gap-5">
          {/* Metric chips */}
          <div className="grid grid-cols-3 gap-2">
            {METRICS.map((m, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-2.5 text-center">
                <div className={`text-sm font-bold terminal-font ${i === 0 ? 'text-[#00ff88]' : 'text-white'}`}>
                  {i === 0 ? walletCount.toLocaleString() : m.value}
                </div>
                <div className="text-[9px] text-white/25 mt-0.5 leading-tight">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Signal bars */}
          <div className="space-y-3">
            <span className="text-[10px] text-white/25 terminal-font uppercase tracking-widest">Signal Strength</span>
            {BARS.map((bar, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-white/40 terminal-font">{bar.label}</span>
                  <span className="text-[10px] font-bold terminal-font" style={{ color: bar.color }}>{bar.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${bar.pct + (tick % 3 === i ? Math.random() * 4 - 2 : 0)}%`,
                      background: `linear-gradient(90deg, ${bar.color}99, ${bar.color})`,
                      boxShadow: `0 0 8px ${bar.color}66`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Live feed mini */}
          <div className="bg-black/30 rounded-xl p-3 border border-white/[0.04] space-y-1.5">
            <div className="text-[10px] text-[#00ff88]/40 terminal-font uppercase tracking-widest mb-2">Live Trades</div>
            {[
              { time: '10:51 AM', msg: 'Sold $JTO → ', profit: '+$84.50', green: true },
              { time: '10:49 AM', msg: 'Bought $BONK → ', profit: 'pending', green: false },
              { time: '10:46 AM', msg: 'Sold $WIF → ', profit: '+$36.20', green: true },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between terminal-font text-[10px]">
                <span className="text-white/20">{t.time}</span>
                <span className="text-white/35">{t.msg}</span>
                <span className={t.green ? 'text-[#00ff88]' : 'text-yellow-400/70'}>{t.profit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="flex items-center justify-between px-5 py-2.5 border-t border-[#00ff88]/8 bg-black/20">
        <div className="flex items-center gap-4 terminal-font text-[10px] text-white/25">
          <span className="text-[#00ff88]/50">● 3 agents active</span>
          <span>78.2% win rate</span>
          <span>+$4,120 total</span>
        </div>
        <span className="text-[10px] terminal-font text-[#00ff88]/30 animate-data-flicker">
          {new Date().toLocaleTimeString()} · Solana mainnet
        </span>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Position {
  token: string;
  entry: string;
  pnl: number;
  side: 'LONG' | 'SHORT';
}

const INITIAL_POSITIONS: Position[] = [
  { token: '$SOL', entry: '$148.20', pnl: 4.20, side: 'LONG' },
  { token: '$WIF', entry: '$2.84', pnl: -1.10, side: 'SHORT' },
];

export default function OpenPositions() {
  const [positions, setPositions] = useState(INITIAL_POSITIONS);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prev =>
        prev.map(p => ({
          ...p,
          pnl: parseFloat((p.pnl + (Math.random() - 0.48) * 0.04).toFixed(2)),
        }))
      );
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-shrink-0 mx-4 mb-4">
      <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.03)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_5px_rgba(0,255,136,0.8)]" />
            <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">Open Positions</span>
          </div>
          <span className="text-[10px] text-white/20 terminal-font">{positions.length} active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/4">
                <th className="text-left px-4 py-2.5 text-[10px] font-medium text-white/25 uppercase tracking-widest">Token</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-medium text-white/25 uppercase tracking-widest">Entry</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-medium text-white/25 uppercase tracking-widest">PnL %</th>
                <th className="text-right px-4 py-2.5 text-[10px] font-medium text-white/25 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((pos, i) => {
                const isPos = pos.pnl >= 0;
                return (
                  <tr key={i} className="border-b border-white/3 last:border-0 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{pos.token}</span>
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                          pos.side === 'LONG'
                            ? 'bg-[#00ff88]/10 text-[#00ff88]'
                            : 'bg-red-500/10 text-red-400'
                        }`}>
                          {pos.side}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-white/50 terminal-font">{pos.entry}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {isPos
                          ? <TrendingUp className="w-3 h-3 text-[#00ff88]" />
                          : <TrendingDown className="w-3 h-3 text-red-400" />
                        }
                        <span
                          className={`text-sm font-bold tabular-nums terminal-font transition-colors duration-300 ${
                            isPos ? 'text-[#00ff88]' : 'text-red-400'
                          }`}
                          style={{ textShadow: isPos ? '0 0 8px rgba(0,255,136,0.4)' : '0 0 8px rgba(255,77,109,0.4)' }}
                        >
                          {isPos ? '+' : ''}{pos.pnl.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-[10px] font-semibold text-white/25 hover:text-red-400 border border-white/8 hover:border-red-500/30 px-2.5 py-1 rounded-lg transition-all">
                        Close
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

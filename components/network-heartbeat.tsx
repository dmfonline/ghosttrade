'use client';

import { useState, useEffect } from 'react';
import { Fuel, Signal } from 'lucide-react';

export default function NetworkHeartbeat() {
  const [tps, setTps] = useState(2481);
  const [flickerTps, setFlickerTps] = useState(false);
  const [latencyFlicker, setLatencyFlicker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlickerTps(true);
      setTimeout(() => {
        setTps(2400 + Math.floor(Math.random() * 200));
        setFlickerTps(false);
      }, 80);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyFlicker(true);
      setTimeout(() => setLatencyFlicker(false), 120);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:flex items-center gap-3">
      <div className="flex items-center gap-1.5 bg-white/3 border border-white/6 rounded-lg px-2.5 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] shadow-[0_0_5px_rgba(0,255,136,0.8)] animate-pulse" />
        <span className="text-[10px] text-white/30 terminal-font uppercase tracking-wider">TPS</span>
        <span
          className="text-[11px] font-bold text-[#00ff88] terminal-font tabular-nums transition-opacity duration-75"
          style={{ opacity: flickerTps ? 0.2 : 1 }}
        >
          {tps.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center gap-1.5 bg-white/3 border border-white/6 rounded-lg px-2.5 py-1.5">
        <Fuel className="w-3 h-3 text-[#00ff88]/70" />
        <span className="text-[10px] text-white/30 terminal-font uppercase tracking-wider">GAS</span>
        <span className="text-[11px] font-bold text-[#00ff88] terminal-font">32 Gwei</span>
      </div>

      <div className="flex items-center gap-1.5 bg-white/3 border border-white/6 rounded-lg px-2.5 py-1.5">
        <Signal
          className="w-3 h-3 text-[#00ff88]"
          style={{ opacity: latencyFlicker ? 0.2 : 1, transition: 'opacity 0.08s' }}
        />
        <span className="text-[10px] text-white/30 terminal-font uppercase tracking-wider">LATENCY</span>
        <span className="text-[11px] font-bold text-[#00ff88] terminal-font">42ms</span>
      </div>
    </div>
  );
}

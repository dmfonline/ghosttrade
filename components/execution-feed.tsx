'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal, Wifi } from 'lucide-react';

interface LogEntry {
  id: number;
  time: string;
  type: 'info' | 'whale' | 'action' | 'profit' | 'scan' | 'error';
  message: string;
  profit?: string;
}

const INITIAL_LOGS: LogEntry[] = [
  { id: 1, time: '10:41 AM', type: 'info', message: 'AI Agent initialized. Strategy loaded: Copy top Solana whales.' },
  { id: 2, time: '10:42 AM', type: 'scan', message: 'Scanning 14,000 on-chain wallets for activity signals.' },
  { id: 3, time: '10:43 AM', type: 'info', message: 'Wallet index updated. 247 high-value targets identified.' },
  { id: 4, time: '10:44 AM', type: 'whale', message: 'Whale Wallet 9xB...3Ry added $180,000 USDC to liquidity pool on Orca.' },
  { id: 5, time: '10:45 AM', type: 'scan', message: 'Scanned 14,000 on-chain wallets. 3 new whale signals detected.' },
  { id: 6, time: '10:46 AM', type: 'whale', message: 'Whale Wallet 0x7a...F9b initiated massive $SOL → $BONK swap on Raydium.' },
  { id: 7, time: '10:46 AM', type: 'action', message: 'Front-running transaction. Buying $200 of $BONK token at $0.000023.' },
  { id: 8, time: '10:47 AM', type: 'info', message: 'Position opened. Monitoring for exit signal. Target: +15%.' },
  { id: 9, time: '10:51 AM', type: 'profit', message: 'Selling $BONK token. Exit triggered at +18.2%.', profit: '+$36.40' },
  { id: 10, time: '10:52 AM', type: 'whale', message: 'Whale Wallet E3d...9Kp initiated $PYTH accumulation pattern.' },
  { id: 11, time: '10:52 AM', type: 'action', message: 'Entering $PYTH position with $50. Stop-loss set at -10%.' },
  { id: 12, time: '10:54 AM', type: 'scan', message: 'Background scan complete. 0 rug indicators detected in watchlist.' },
  { id: 13, time: '10:55 AM', type: 'whale', message: 'Whale Wallet 7fT...2Xm exiting $JTO position. Volume spike detected.' },
  { id: 14, time: '10:55 AM', type: 'action', message: 'Front-running sell. Entered short position on $JTO at $2.84.' },
  { id: 15, time: '10:57 AM', type: 'profit', message: 'Closed $JTO short at $2.71. Trade duration: 2m 14s.', profit: '+$84.50' },
  { id: 16, time: '10:58 AM', type: 'info', message: 'Daily P&L updated. Running total: +$1,764.20 today.' },
  { id: 17, time: '10:59 AM', type: 'scan', message: 'Mempool scan: 3 sandwich opportunities identified. Analyzing...' },
  { id: 18, time: '11:01 AM', type: 'action', message: 'Sandwich attack opportunity declined. Gas fees exceed profit threshold.' },
];

const LIVE_LOG_POOL: Omit<LogEntry, 'id' | 'time'>[] = [
  { type: 'scan', message: 'Continuous scan in progress. 14,213 wallets monitored.' },
  { type: 'whale', message: 'Whale Wallet 3mN...8Qs increased $WIF position by 420%.' },
  { type: 'action', message: 'Copying $WIF trade. Buying $50 at market price.' },
  { type: 'profit', message: '$WIF position closed. Whale exited. Profit captured.', profit: '+$22.10' },
  { type: 'scan', message: 'New whale cluster detected. Analyzing correlation patterns.' },
  { type: 'whale', message: 'Top whale Gx7...1Pv moved $240K into $RENDER. Bullish signal.' },
  { type: 'action', message: 'Allocating $50 to $RENDER based on whale momentum signal.' },
  { type: 'info', message: 'Hourly rebalance complete. Portfolio risk score: LOW.' },
  { type: 'profit', message: '$RENDER trade closed at profit target (+12%).', profit: '+$6.00' },
  { type: 'whale', message: 'Flash loan activity detected on Kamino. Monitoring impact.' },
  { type: 'action', message: 'Defensive mode activated. Pausing new entries for 45 seconds.' },
  { type: 'info', message: 'Market volatility normalized. Resuming active trading.' },
];

function getTypeStyles(type: LogEntry['type']) {
  switch (type) {
    case 'profit':
      return { label: 'Profit', labelClass: 'text-[#00ff88]', msgClass: 'text-white/70' };
    case 'whale':
      return { label: 'Whale Alert', labelClass: 'text-yellow-400', msgClass: 'text-white/55' };
    case 'action':
      return { label: 'Action', labelClass: 'text-blue-400', msgClass: 'text-white/55' };
    case 'scan':
      return { label: 'AI Scan', labelClass: 'text-[#00ff88]/60', msgClass: 'text-white/35' };
    case 'error':
      return { label: 'Error', labelClass: 'text-red-400', msgClass: 'text-white/55' };
    default:
      return { label: 'System', labelClass: 'text-white/40', msgClass: 'text-white/35' };
  }
}

function getCurrentTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function ExecutionFeed() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [nextId, setNextId] = useState(INITIAL_LOGS.length + 1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let poolIndex = 0;
    const interval = setInterval(() => {
      const entry = LIVE_LOG_POOL[poolIndex % LIVE_LOG_POOL.length];
      poolIndex++;
      setLogs((prev) => {
        const newLog: LogEntry = {
          id: nextId + poolIndex,
          time: getCurrentTime(),
          ...entry,
        };
        return [...prev.slice(-40), newLog];
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bottomRef.current && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-[#00ff88]" />
          <span className="text-sm font-medium text-white/70">Live Execution Feed</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="w-3.5 h-3.5 text-[#00ff88]" />
          <span className="text-xs text-[#00ff88] terminal-font">LIVE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse-green" />
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-2"
      >
        {logs.map((log) => {
          const styles = getTypeStyles(log.type);
          return (
            <div key={log.id} className="flex items-start gap-2 terminal-font text-xs leading-relaxed group">
              <span className="text-white/20 flex-shrink-0 w-[68px]">[{log.time}]</span>
              <span className={`flex-shrink-0 ${styles.labelClass} font-medium`}>{styles.label}:</span>
              <span className={`flex-1 ${styles.msgClass}`}>
                {log.message}
                {log.profit && (
                  <span className="ml-1.5 font-bold text-[#00ff88]">{log.profit}</span>
                )}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

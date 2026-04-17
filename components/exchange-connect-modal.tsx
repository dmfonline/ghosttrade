'use client';

import { useState } from 'react';
import { X, Lock, Wifi } from 'lucide-react';

interface ExchangeConnectModalProps {
  onClose: () => void;
  onConnected: (label: string) => void;
}

type Tab = 'cex' | 'dex';
type CexExchange = 'binance' | 'okx' | 'bybit' | null;

const CEX_OPTIONS: { id: CexExchange; name: string; color: string; bg: string }[] = [
  { id: 'binance', name: 'Binance', color: '#F0B90B', bg: 'rgba(240,185,11,0.08)' },
  { id: 'okx', name: 'OKX', color: '#ffffff', bg: 'rgba(255,255,255,0.06)' },
  { id: 'bybit', name: 'Bybit', color: '#F7A600', bg: 'rgba(247,166,0,0.08)' },
];

const DEX_WALLETS = [
  { name: 'MetaMask', color: '#E2761B', letter: 'M' },
  { name: 'Phantom', color: '#AB9FF2', letter: 'P' },
  { name: 'WalletConnect', color: '#3B99FC', letter: 'W' },
];

function LockedState() {
  return (
    <div className="mt-6 flex flex-col items-center text-center gap-5 py-6">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{
          background: 'rgba(0,255,136,0.06)',
          border: '1px solid rgba(0,255,136,0.18)',
          boxShadow: '0 0 30px rgba(0,255,136,0.08)',
        }}
      >
        <Lock className="w-7 h-7 text-[#00ff88]" style={{ filter: 'drop-shadow(0 0 8px rgba(0,255,136,0.6))' }} />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base font-bold text-white tracking-tight">Beta Access Required</h3>
        <p className="text-xs text-white/40 leading-relaxed max-w-[280px]">
          API routing and live on-chain execution are locked in Demo Mode. Purchase a lifetime pass to connect your exchange.
        </p>
      </div>

      <a
        href="https://link.depay.com/6KsEIwZjv48aUyZeOTOs6s"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-[#080808] transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, #00ff88 0%, #00e87c 100%)',
          boxShadow: '0 0 24px rgba(0,255,136,0.35), 0 4px 16px rgba(0,255,136,0.2)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(0,255,136,0.5), 0 6px 20px rgba(0,255,136,0.3)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 24px rgba(0,255,136,0.35), 0 4px 16px rgba(0,255,136,0.2)';
        }}
      >
        <Lock className="w-4 h-4" />
        Unlock Full Access ($99 USDC)
      </a>
    </div>
  );
}

export default function ExchangeConnectModal({ onClose, onConnected }: ExchangeConnectModalProps) {
  const [tab, setTab] = useState<Tab>('cex');
  const [locked, setLocked] = useState(false);

  const handleSelectCex = () => setLocked(true);
  const handleConnectWallet = () => setLocked(true);

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setLocked(false);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />

      <div className="relative w-full max-w-md">
        <div
          className="relative rounded-2xl border border-white/10 overflow-hidden"
          style={{
            background: 'rgba(9,9,9,0.97)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            boxShadow: '0 0 100px rgba(0,255,136,0.06), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-white/25 hover:text-white/60 hover:bg-white/8 transition-all z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="px-6 pt-7 pb-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white tracking-tight">Connect Exchange</h2>
              <p className="text-xs text-white/35 mt-0.5">Link your trading account to start executing strategies</p>
            </div>

            <div className="flex bg-white/4 border border-white/8 rounded-xl p-1 mb-6">
              {([['cex', 'Centralized (CEX)'], ['dex', 'On-Chain Wallet (DEX)']] as [Tab, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => handleTabChange(key as Tab)}
                  className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all duration-200 ${
                    tab === key
                      ? 'bg-[#00ff88] text-[#080808]'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === 'cex' && (
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Select Exchange</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {CEX_OPTIONS.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={handleSelectCex}
                      className="relative flex flex-col items-center justify-center gap-2 py-4 rounded-xl border border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5 transition-all duration-200"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
                        style={{ background: ex.bg, color: ex.color }}
                      >
                        {ex.name.slice(0, 1)}
                      </div>
                      <span className="text-xs font-semibold text-white/70">{ex.name}</span>
                    </button>
                  ))}
                </div>
                {locked && <LockedState />}
              </div>
            )}

            {tab === 'dex' && (
              <div className="space-y-5">
                <button
                  onClick={handleConnectWallet}
                  className="group w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-[#00ff88]/25 bg-[#00ff88]/5 text-[#00ff88] font-semibold text-sm hover:bg-[#00ff88]/10 hover:border-[#00ff88]/40 transition-all duration-200"
                  style={{ boxShadow: '0 0 20px rgba(0,255,136,0.06)' }}
                >
                  <Wifi className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Connect Web3 Wallet
                </button>

                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-widest mb-3 text-center">Supported Wallets</p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {DEX_WALLETS.map((wallet) => (
                      <button
                        key={wallet.name}
                        onClick={handleConnectWallet}
                        className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl border border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5 transition-all duration-200"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
                          style={{ background: `${wallet.color}18`, color: wallet.color }}
                        >
                          {wallet.letter}
                        </div>
                        <span className="text-[11px] font-medium text-white/55">{wallet.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {locked && <LockedState />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

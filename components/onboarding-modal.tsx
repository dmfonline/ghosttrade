'use client';

import { useState } from 'react';
import { Copy, Check, X, QrCode } from 'lucide-react';

interface OnboardingModalProps {
  onClose: () => void;
}

const FAKE_SOL_ADDRESS = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';
const FAKE_ETH_ADDRESS = '0x4aB9f4a82Ac0b1cC0c7dbE9f3B2E8D5F1A6c7d8';

export default function OnboardingModal({ onClose }: OnboardingModalProps) {
  const [copied, setCopied] = useState<'sol' | 'eth' | null>(null);
  const [network, setNetwork] = useState<'sol' | 'eth'>('sol');

  const address = network === 'sol' ? FAKE_SOL_ADDRESS : FAKE_ETH_ADDRESS;

  const handleCopy = (type: 'sol' | 'eth') => {
    const addr = type === 'sol' ? FAKE_SOL_ADDRESS : FAKE_ETH_ADDRESS;
    navigator.clipboard.writeText(addr).catch(() => {});
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md glass-dark rounded-2xl border border-white/10 shadow-2xl animate-slide-up overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent" />

        <div className="p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse-green" />
            <span className="text-xs text-[#00ff88] terminal-font tracking-widest uppercase">Secure Deposit</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
            Fund Your AI Trading Wallet.
          </h2>
          <p className="text-sm text-white/40 mb-8 leading-relaxed">
            Send USDC to your unique AI wallet address. Funds are immediately available for trading. Non-custodial — only you control withdrawals.
          </p>

          {/* Network selector */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setNetwork('sol')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                network === 'sol'
                  ? 'bg-[#00ff88] text-[#080808]'
                  : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/8'
              }`}
            >
              Solana
            </button>
            <button
              onClick={() => setNetwork('eth')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                network === 'eth'
                  ? 'bg-[#00ff88] text-[#080808]'
                  : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/8'
              }`}
            >
              Ethereum
            </button>
          </div>

          {/* QR Code */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-40 h-40 rounded-xl bg-white p-3 flex items-center justify-center">
              <div className="grid grid-cols-7 grid-rows-7 gap-0.5 w-full h-full">
                {Array.from({ length: 49 }).map((_, i) => {
                  const pattern = [
                    0,1,1,1,0,0,1,
                    1,0,0,0,1,1,0,
                    1,0,1,0,1,0,1,
                    0,1,0,1,0,1,0,
                    1,1,0,0,1,0,1,
                    0,0,1,0,0,1,0,
                    1,0,1,1,0,1,1,
                  ];
                  return (
                    <div
                      key={i}
                      className={`rounded-[1px] ${pattern[i % 49] ? 'bg-black' : 'bg-transparent'}`}
                    />
                  );
                })}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-black" />
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white/4 border border-white/8 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/30 terminal-font uppercase tracking-wider">
                {network === 'sol' ? 'Solana' : 'Ethereum'} Address
              </span>
              <button
                onClick={() => handleCopy(network)}
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-[#00ff88] transition-colors"
              >
                {copied === network ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00ff88]" />
                    <span className="text-[#00ff88]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-white/70 terminal-font break-all leading-relaxed">
              {address}
            </p>
          </div>

          {/* Waiting indicator */}
          <div className="flex items-center gap-3 bg-[#00ff88]/5 border border-[#00ff88]/15 rounded-xl px-4 py-3.5 mb-6">
            <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-[#00ff88]/40 border-t-[#00ff88] animate-spin" />
            <div>
              <p className="text-sm font-medium text-[#00ff88]">Waiting for deposit...</p>
              <p className="text-xs text-white/30 mt-0.5">Scanning blockchain every 3 seconds</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-xs text-white/20">or</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 border border-white/5 transition-all"
          >
            Skip for Demo
          </button>
        </div>
      </div>
    </div>
  );
}

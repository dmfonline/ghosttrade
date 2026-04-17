'use client';

import { Plug, CircleCheck as CheckCircle2 } from 'lucide-react';

interface ConnectionStatusProps {
  status: string | null;
  onConnectClick: () => void;
}

export default function ConnectionStatus({ status, onConnectClick }: ConnectionStatusProps) {
  if (status) {
    return (
      <div className="flex items-center gap-2 bg-[#00ff88]/6 border border-[#00ff88]/15 rounded-xl px-3 py-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88] flex-shrink-0" />
        <span className="text-xs font-semibold text-[#00ff88] whitespace-nowrap">{status}</span>
      </div>
    );
  }

  return (
    <button
      onClick={onConnectClick}
      className="group flex items-center gap-2 bg-white/4 border border-white/8 rounded-xl px-3 py-2 hover:border-red-400/30 hover:bg-red-400/5 transition-all duration-200"
    >
      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.8)] flex-shrink-0" />
      <span className="text-xs font-medium text-white/40 group-hover:text-white/60 transition-colors whitespace-nowrap hidden sm:block">
        No Wallet / Exchange Linked
      </span>
      <span className="text-[10px] font-semibold text-[#00ff88]/70 group-hover:text-[#00ff88] border-l border-white/10 pl-2 ml-0.5 transition-colors whitespace-nowrap flex items-center gap-1">
        <Plug className="w-3 h-3" />
        Connect Wallet / API
      </span>
    </button>
  );
}

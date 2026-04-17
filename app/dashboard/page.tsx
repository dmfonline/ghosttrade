'use client';

import { useState, useRef } from 'react';
import {
  Ghost, Send, TrendingUp, Bot, Target, DollarSign, Settings,
  Bell, ChevronDown, Sparkles, Plus, MoveHorizontal as MoreHorizontal, Activity, Zap,
} from 'lucide-react';
import OnboardingModal from '@/components/onboarding-modal';
import PaywallModal from '@/components/paywall-modal';
import ExecutionFeed from '@/components/execution-feed';
import EquityChart from '@/components/equity-chart';
import ExchangeConnectModal from '@/components/exchange-connect-modal';
import ConnectionStatus from '@/components/connection-status';
import NetworkHeartbeat from '@/components/network-heartbeat';
import OpenPositions from '@/components/open-positions';
import { useLanguage } from '@/contexts/language-context';
import Link from 'next/link';

const DEPLOYED_STRATEGIES = [
  { name: 'Solana Whale Copier', status: 'active', pnl: '+$2,840', trades: 64 },
  { name: 'ETH Mempool Scanner', status: 'active', pnl: '+$940', trades: 31 },
  { name: 'Raydium Front-Runner', status: 'paused', pnl: '+$340', trades: 18 },
];

export default function DashboardPage() {
  const { t, lang, setLang } = useLanguage();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showExchangeConnect, setShowExchangeConnect] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedMessage, setDeployedMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const EXAMPLE_PROMPTS = [
    t.dashboard.placeholder,
    'Monitor whale wallets on Ethereum. Buy any token they buy with 0.5 ETH, sell when they sell.',
  ];

  const triggerPaywall = () => setShowPaywall(true);

  const handleDeploy = () => {
    triggerPaywall();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) triggerPaywall();
  };

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  return (
    <div className="h-screen bg-[#080808] flex flex-col overflow-hidden dashboard-bg">
      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
      {showExchangeConnect && (
        <ExchangeConnectModal
          onClose={() => setShowExchangeConnect(false)}
          onConnected={(label) => setConnectionStatus(label)}
        />
      )}

      {/* Demo mode banner */}
      <div
        className="flex-shrink-0 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-2 md:py-1.5 px-4 text-center border-b border-amber-500/20"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.06) 30%, rgba(245,158,11,0.06) 70%, transparent)',
          boxShadow: '0 1px 0 rgba(245,158,11,0.08), inset 0 1px 0 rgba(245,158,11,0.05)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)] animate-pulse flex-shrink-0" />
          <span className="text-amber-400/90 text-xs font-semibold tracking-widest uppercase">
            Demo Mode: AI Execution is disabled.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/20 text-xs hidden md:block">|</span>
          <a
            href="https://link.depay.com/6KsEIwZjv48aUyZeOTOs6s"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#00ff88]/80 hover:text-[#00ff88] transition-colors duration-150 tracking-wide"
          >
            Purchase Beta Pass to Unlock
          </a>
        </div>
      </div>

      {/* Dashboard-specific compact top bar */}
      <header className="flex-shrink-0 flex items-center justify-between px-3 md:px-5 py-3 border-b border-white/5 bg-[#0a0a0a] z-40">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center group-hover:bg-[#00ff88]/15 transition-colors">
              <Ghost className="w-3.5 h-3.5 text-[#00ff88]" />
            </div>
            <span className="text-white font-semibold text-sm tracking-tight hidden sm:block">GhostTrade</span>
            <span className="text-[10px] text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/20 px-1.5 py-0.5 rounded-full hidden sm:block">BETA</span>
          </Link>
          <div className="hidden md:flex items-center gap-1 ml-2">
            <Link href="/" className="text-xs text-white/35 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all">{t.nav.home}</Link>
            <Link href="/pricing" className="text-xs text-white/35 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all">{t.nav.pricing}</Link>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <NetworkHeartbeat />

          <div className="hidden sm:flex items-center gap-1 bg-white/4 border border-white/8 rounded-lg p-0.5">
            {(['en', 'cn'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                  lang === l ? 'bg-[#00ff88] text-[#080808]' : 'text-white/40 hover:text-white'
                }`}
              >
                {l === 'en' ? 'EN' : '中文'}
              </button>
            ))}
          </div>

          <button
            onClick={triggerPaywall}
            className="flex items-center gap-1.5 md:gap-2.5 bg-white/4 border border-white/8 rounded-xl px-2.5 md:px-3 py-2 hover:border-white/15 transition-all cursor-pointer"
          >
            <DollarSign className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
            <span className="text-sm md:text-base font-bold text-white tracking-tight">$14,250.45</span>
            <span className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              +12.4%
            </span>
          </button>

          <ConnectionStatus
            status={connectionStatus}
            onConnectClick={() => setShowExchangeConnect(true)}
          />

          <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00ff88]/30 to-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center">
              <span className="text-xs font-bold text-[#00ff88]">GT</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-colors" />
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left sidebar */}
        <aside className="hidden lg:flex flex-col w-60 border-r border-white/5 bg-[#090909] flex-shrink-0">
          <div className="p-4 border-b border-white/5">
            <button
              onClick={triggerPaywall}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#00ff88]/8 border border-[#00ff88]/15 text-[#00ff88] text-sm font-medium hover:bg-[#00ff88]/12 transition-all"
            >
              <Plus className="w-4 h-4" />
              {t.dashboard.newStrategy}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-1">
            <p className="text-[10px] text-white/25 uppercase tracking-widest px-2 py-2">{t.dashboard.activeAgents}</p>
            {DEPLOYED_STRATEGIES.map((s, i) => (
              <div
                key={i}
                className={`group flex items-start justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  i === 0 ? 'bg-white/5 border border-white/8' : 'hover:bg-white/3 border border-transparent'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.status === 'active' ? 'bg-[#00ff88] animate-pulse' : 'bg-white/20'}`} />
                    <span className="text-xs font-medium text-white/80 truncate">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <span className="text-xs text-[#00ff88] font-medium">{s.pnl}</span>
                    <span className="text-[10px] text-white/25">{s.trades} trades</span>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-3.5 h-3.5 text-white/30" />
                </button>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/5">
            <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/35 hover:text-white hover:bg-white/4 transition-all">
              <Settings className="w-4 h-4" />
              {t.dashboard.settings}
            </button>
          </div>
        </aside>

        {/* Center */}
        <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-thin">
          {deployedMessage && (
            <div className="mx-4 mt-4 flex items-center gap-3 bg-[#00ff88]/8 border border-[#00ff88]/20 rounded-xl px-4 py-3 animate-slide-up">
              <Zap className="w-4 h-4 text-[#00ff88] flex-shrink-0" />
              <p className="text-sm text-[#00ff88]">{deployedMessage}</p>
            </div>
          )}

          {/* AI Terminal */}
          <div className="flex-shrink-0 px-3 md:px-4 pt-3 md:pt-4 pb-3">
            <div
              className="relative bg-[#111111] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer bento-card-glow hover:border-[#00ff88]/25"
              onClick={triggerPaywall}
            >
              <div className="flex items-center gap-2 px-3 md:px-4 pt-3 md:pt-4 pb-1">
                <Sparkles className="w-4 h-4 text-[#00ff88] flex-shrink-0" />
                <span className="text-xs font-medium text-[#00ff88]">{t.dashboard.aiTerminal}</span>
                <span className="ml-auto text-[10px] text-white/20 terminal-font">{t.dashboard.deployShortcut}</span>
              </div>
              <textarea
                ref={textareaRef}
                value={prompt}
                readOnly
                onFocus={triggerPaywall}
                onClick={(e) => { e.stopPropagation(); triggerPaywall(); }}
                placeholder={t.dashboard.placeholder}
                className="w-full bg-transparent px-3 md:px-4 py-3 text-sm text-white placeholder-white/20 resize-none outline-none leading-relaxed min-h-[60px] cursor-pointer"
                rows={2}
              />

              {/* Scanning bar */}
              <div className="mx-3 md:mx-4 mb-3 flex items-center gap-3 bg-black/30 border border-white/5 rounded-xl px-3 py-2.5 overflow-hidden relative">
                <div className="flex-shrink-0 relative w-3 h-3">
                  <span className="absolute inset-0 rounded-full border border-[#00ff88]/60 border-t-[#00ff88] animate-spin" />
                </div>
                <div className="flex items-center gap-2 flex-1 overflow-hidden">
                  <span className="text-[10px] text-[#00ff88] terminal-font font-semibold tracking-wider flex-shrink-0">[SCANNING]</span>
                  <span className="text-[10px] text-white/40 terminal-font animate-wallet-count tabular-nums">
                    14,213 Wallets Monitored...
                  </span>
                </div>
                <div className="absolute inset-y-0 left-0 w-16 pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, rgba(0,255,136,0.06) 0%, transparent 100%)' }}
                />
                <div className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-[#00ff88]/8 to-transparent animate-radar-scan" />
              </div>

              <div className="flex items-center gap-2 px-3 md:px-4 pb-3">
                <div className="flex gap-1.5 flex-wrap">
                  {EXAMPLE_PROMPTS.slice(0, 2).map((ex, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); triggerPaywall(); }}
                      className="text-[10px] text-white/25 hover:text-white/50 bg-white/4 hover:bg-white/6 border border-white/6 px-2.5 py-1 rounded-full transition-all truncate max-w-[180px]"
                    >
                      {ex.slice(0, 32)}...
                    </button>
                  ))}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); triggerPaywall(); }}
                  className="ml-auto flex items-center gap-2 bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#00ff88]/15 transition-all duration-200 flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                  {t.dashboard.deploy}
                </button>
              </div>
            </div>
          </div>

          {/* Live Execution Feed */}
          <div className="flex-shrink-0 mx-3 md:mx-4 mb-3 bg-[#0d0d0d] rounded-2xl overflow-hidden bento-card" style={{ minHeight: 280 }}>
            <ExecutionFeed />
          </div>

          {/* Open Positions */}
          <OpenPositions />
        </main>

        {/* Right sidebar */}
        <aside className="hidden xl:flex flex-col w-72 border-l border-white/5 bg-[#090909] flex-shrink-0 overflow-y-auto scrollbar-thin">

          {/* Portfolio Overview */}
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white/80">{t.dashboard.portfolioOverview}</h3>
              <span className="text-xs text-white/25 terminal-font">7d</span>
            </div>
            <EquityChart />
            <div className="flex justify-between mt-3">
              <div>
                <p className="text-xs text-white/30">Start</p>
                <p className="text-sm font-semibold text-white">$10,000</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/30">Current</p>
                <p className="text-sm font-semibold text-[#00ff88]">$14,250.45</p>
              </div>
            </div>
          </div>

          <div className="p-5 border-b border-white/5">
            <h3 className="text-xs font-medium text-white/30 uppercase tracking-widest mb-3">Wallet &amp; Exchange</h3>
            {connectionStatus ? (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#00ff88]/5 border border-[#00ff88]/15">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_6px_rgba(0,255,136,0.8)]" />
                <span className="text-xs font-semibold text-[#00ff88]">{connectionStatus}</span>
              </div>
            ) : (
              <button
                onClick={() => setShowExchangeConnect(true)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/8 hover:border-white/15 hover:bg-white/5 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                  <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">No Wallet / Exchange Linked</span>
                </div>
                <span className="text-[10px] font-semibold text-[#00ff88]/60 group-hover:text-[#00ff88] transition-colors">Connect Now</span>
              </button>
            )}
          </div>

          <div className="p-5 space-y-3">
            <h3 className="text-xs font-medium text-white/30 uppercase tracking-widest mb-4">{t.dashboard.liveMetrics}</h3>
            {[
              { icon: <Bot className="w-4 h-4" />, label: t.dashboard.activeAiAgents, value: '3', valueClass: 'text-white' },
              { icon: <Target className="w-4 h-4" />, label: t.dashboard.winRate, value: '78.2%', valueClass: 'text-[#00ff88]' },
              { icon: <DollarSign className="w-4 h-4" />, label: t.dashboard.totalProfit, value: '+$4,120', valueClass: 'text-[#00ff88]' },
              { icon: <Activity className="w-4 h-4" />, label: t.dashboard.todayPnl, value: '+$1,764', valueClass: 'text-[#00ff88]' },
            ].map((metric, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/3 bento-card">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{metric.icon}</div>
                  <span className="text-xs text-white/50">{metric.label}</span>
                </div>
                <span className={`text-sm font-bold ${metric.valueClass}`}>{metric.value}</span>
              </div>
            ))}
          </div>

          <div className="px-5 pb-5 space-y-3">
            <h3 className="text-xs font-medium text-white/30 uppercase tracking-widest mb-4">{t.dashboard.tradeHistory}</h3>
            {[
              { pair: '$JTO Short', time: '10:57 AM', result: '+$84.50', positive: true },
              { pair: '$BONK Long', time: '10:51 AM', result: '+$36.40', positive: true },
              { pair: '$PYTH Long', time: '10:52 AM', result: '+$6.00', positive: true },
              { pair: '$WIF Long', time: '10:38 AM', result: '+$22.10', positive: true },
              { pair: '$ORCA Short', time: '10:21 AM', result: '-$12.50', positive: false },
              { pair: '$RAY Long', time: '10:14 AM', result: '+$44.80', positive: true },
            ].map((trade, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/4 last:border-0">
                <div>
                  <p className="text-xs font-medium text-white/70">{trade.pair}</p>
                  <p className="text-[10px] text-white/25 terminal-font mt-0.5">{trade.time}</p>
                </div>
                <span className={`text-xs font-bold ${trade.positive ? 'text-[#00ff88]' : 'text-red-400'}`}>{trade.result}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto p-5 border-t border-white/5">
            <div className="bg-[#00ff88]/5 border border-[#00ff88]/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#00ff88]" />
                <span className="text-xs font-semibold text-[#00ff88]">{t.dashboard.aiInsight}</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">{t.dashboard.aiInsightText}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

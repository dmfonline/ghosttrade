'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Mail, Lock, ArrowRight, Ghost } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { lang } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const isCn = lang === 'cn';

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(true);
  };

  const handleRequestDemo = () => {
    onClose();
    router.push('/dashboard');
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

      <div className="relative w-full max-w-sm">
        <div
          className="relative rounded-2xl border border-white/10 overflow-hidden"
          style={{
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            boxShadow: '0 0 80px rgba(0, 255, 136, 0.05), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/25 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-white/25 hover:text-white/60 hover:bg-white/8 transition-all z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="px-8 pt-10 pb-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center">
                <Ghost className="w-5 h-5 text-[#00ff88]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight leading-none">
                  {isCn ? '欢迎来到 GhostTrade' : 'Welcome to GhostTrade'}
                </h2>
                <p className="text-xs text-white/35 mt-0.5">
                  {isCn ? '登录您的账户以继续' : 'Sign in to your account to continue'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSignIn} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setShowError(false); }}
                  placeholder={isCn ? '邮箱地址' : 'Email Address'}
                  className="w-full bg-white/4 border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-[#00ff88]/30 focus:bg-white/5 transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setShowError(false); }}
                  placeholder={isCn ? '密码' : 'Password'}
                  className="w-full bg-white/4 border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-[#00ff88]/30 focus:bg-white/5 transition-all"
                />
              </div>

              {showError && (
                <p className="text-xs text-red-400/90 pl-1">
                  {isCn ? '无权限或账户不存在。' : 'Invalid credentials or account not found.'}
                </p>
              )}

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2.5 bg-white/6 border border-white/10 text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-white/10 hover:border-white/18 transition-all duration-200 mt-1"
              >
                {isCn ? '登录' : 'Login'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>

            <button
              onClick={handleRequestDemo}
              className="mt-3 w-full flex items-center justify-center gap-2.5 border border-emerald-500/50 text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-emerald-500/8 hover:border-emerald-500/70 transition-all duration-200"
            >
              {isCn ? '申请演示访问' : 'View Demo'}
            </button>

            <p className="mt-4 text-center text-[11px] text-white/20 leading-relaxed">
              {isCn ? '无需账户即可体验演示版本' : 'No account required to try the demo'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

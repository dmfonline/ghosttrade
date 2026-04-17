'use client';

import { LanguageProvider } from '@/contexts/language-context';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

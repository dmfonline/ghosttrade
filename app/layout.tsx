import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientLayout from '@/components/client-layout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'GhostTrade — Stop Trading With Human Emotion.',
  description: 'The first on-chain AI trading terminal. Zero charts, zero API keys. Type your strategy, let AI execute 24/7.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#080808] text-white`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

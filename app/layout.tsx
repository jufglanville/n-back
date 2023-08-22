import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import GameProvider from '@/context/GameContext';

import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'N-Back Game',
  description: 'Play the N-Back game in your browser.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GameProvider>
        <body className={inter.className}>
          <Navbar />
          <main className="flex justify-center mx-auto py-10 px-5">
            <div className="max-w-xl w-full bg-slate-200 p-5 sm:p-10 rounded-md">
              {children}
            </div>
          </main>
        </body>
      </GameProvider>
    </html>
  );
}

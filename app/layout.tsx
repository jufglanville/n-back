import Navbar from '@/components/Navbar/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
      <body className={inter.className}>
        <Navbar />

        <main className="flex justify-center mx-auto my-10 max-w-xl bg-slate-200 p-10 rounded-md">
          {children}
        </main>
      </body>
    </html>
  );
}

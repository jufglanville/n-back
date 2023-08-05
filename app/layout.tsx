import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import UserProvider from '@/context/UserContext';

import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/Card';

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
      <UserProvider>
        <body className={inter.className}>
          <Navbar />
          <main className="flex justify-center mx-auto py-10 px-5">
            <Card>{children}</Card>
          </main>
        </body>
      </UserProvider>
    </html>
  );
}

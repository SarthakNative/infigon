import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import DarkModeToggle from '@/components/DarkModeToggle';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Product Explorer',
  description: 'Product dashboard with filtering and favorites',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" aria-label="Go to home page">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer">
                  Product Explorer
                </h1>
              </Link>
              <DarkModeToggle />
            </div>
          </header>
          <main className="min-h-screen bg-white dark:bg-gray-900">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
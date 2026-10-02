import type { Metadata } from 'next';
import { Alex_Brush } from 'next/font/google';
import { Toaster } from 'sonner';
import Preloader from '@/components/ui/Preloader';
import './globals.css';

const scriptFont = Alex_Brush({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-script' 
});

export const metadata: Metadata = {
  title: 'Milagris Cathedral Sawantwadi',
  description: 'Welcome to the official website of Milagris Cathedral, Sawantwadi.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={scriptFont.variable}>
      <body>
        <Preloader />
        <main>{children}</main>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}

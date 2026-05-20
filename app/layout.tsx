import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Analytics } from '@vercel/analytics/react';
import './globals.css'; // We will create this global stylesheet next

export const metadata = {
  title: 'DR-SCREAL | Cybersecurity Community',
  description: 'Secure premium cybersecurity learning hub and forum.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-slate-900 dark:text-white min-h-screen transition-colors duration-200">
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

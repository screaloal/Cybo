import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CyberNet',
  description: 'Where Secure Minds Meet',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#000', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}

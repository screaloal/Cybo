import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Cyboeta — Where Secure Minds Meet',
  description: 'A community built for people who take security seriously.',
  icons: { icon: '/logo.webp' },
  openGraph: {
    title: 'Cyboeta — Where Secure Minds Meet',
    description: 'A community built for people who take security seriously.',
    url: 'https://cybo-eta.vercel.app',
    siteName: 'Cyboeta',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com"/>
      </head>
      <body style={{ background: '#000', margin: 0, padding: 0 }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

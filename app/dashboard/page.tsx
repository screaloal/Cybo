'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.background = '#000';
    document.documentElement.style.background = '#000';
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  if (loading) return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'rgba(240,246,255,0.3)', fontSize: 13, letterSpacing: '0.1em' }}>Loading...</div>
    </div>
  );

  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      color: '#f0f6ff',
      fontFamily: "'DM Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        html, body { background: #000 !important; margin: 0 !important; }
      `}</style>

      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(96,165,250,0.12)',
        borderRadius: 20,
        padding: '48px 40px',
        maxWidth: 400,
        width: '100%',
        textAlign: 'center',
      }}>
        <div style={{
          width: 48, height: 48,
          background: 'rgba(96,165,250,0.08)',
          border: '1px solid rgba(96,165,250,0.2)',
          borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: 20,
        }}>🛡️</div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 24, fontWeight: 800,
          marginBottom: 8, letterSpacing: '-0.02em',
        }}>Welcome to Cyboeta</h1>

        <p style={{
          fontSize: 13, color: 'rgba(240,246,255,0.35)',
          marginBottom: 40, lineHeight: 1.7, fontWeight: 300,
        }}>
          Your dashboard is being built. More features coming in V2.
        </p>

        <div style={{
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <Link href="/" style={{
            padding: '13px 24px',
            background: 'transparent',
            border: '1px solid rgba(96,165,250,0.3)',
            borderRadius: 10,
            color: '#f0f6ff',
            textDecoration: 'none',
            fontSize: 14,
            letterSpacing: '0.02em',
            transition: 'all 0.2s',
          }}>← Back to Home</Link>

          <button onClick={handleLogout} style={{
            padding: '13px 24px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 10,
            color: 'rgba(240,246,255,0.35)',
            fontSize: 14,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            fontFamily: "'DM Sans', sans-serif",
          }}>Logout</button>
        </div>
      </div>

      <div style={{
        position: 'fixed', bottom: 20,
        fontSize: 11, color: 'rgba(240,246,255,0.12)',
        letterSpacing: '0.03em',
      }}>© 2026 Cyboeta</div>
    </div>
  );
}

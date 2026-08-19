'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.body.style.background = '#000';
    document.documentElement.style.background = '#000';

    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }

    fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setStatus('error');
          setMessage(data.error);
        } else {
          setStatus('success');
          setMessage('Your account has been verified.');
          setTimeout(() => router.push('/dashboard'), 2500);
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      });
  }, [searchParams, router]);

  return (
    <div style={{
      background: '#000', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif", color: '#f0f6ff',
      padding: 24,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        html,body{background:#000!important;margin:0!important}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .spinner{width:20px;height:20px;border:1px solid rgba(96,165,250,0.2);border-top-color:rgba(96,165,250,0.6);border-radius:50%;animation:spin 1s linear infinite}
        .card{animation:fadeIn 0.6s ease both}
      `}</style>

      <div className="card" style={{
        width: '100%', maxWidth: 360,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(96,165,250,0.1)',
        borderRadius: 20, padding: '44px 36px',
        textAlign: 'center',
      }}>
        <div style={{ width: 60, height: 60, position: 'relative', margin: '0 auto 28px' }}>
          <Image src="/logo.webp" alt="Cyboeta" fill style={{ objectFit: 'contain' }} />
        </div>

        {status === 'verifying' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <div className="spinner" />
            </div>
            <div style={{ fontSize: 13, color: 'rgba(240,246,255,0.35)', letterSpacing: '0.04em' }}>
              Verifying your account...
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{ fontSize: 22, marginBottom: 12, color: 'rgba(96,165,250,0.8)' }}>✓</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Verified</div>
            <div style={{ fontSize: 13, color: 'rgba(240,246,255,0.35)', lineHeight: 1.7 }}>
              {message} Redirecting to dashboard...
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ fontSize: 22, marginBottom: 12, color: 'rgba(248,113,113,0.7)' }}>✕</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Verification Failed</div>
            <div style={{ fontSize: 13, color: 'rgba(240,246,255,0.35)', lineHeight: 1.7, marginBottom: 24 }}>
              {message}
            </div>
            <button
              onClick={() => router.push('/')}
              style={{ padding: '12px 24px', background: 'transparent', border: '1px solid rgba(96,165,250,0.3)', borderRadius: 10, color: '#f0f6ff', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}
            >
              Back to Home
            </button>
          </>
        )}
      </div>

      <div style={{ marginTop: 24, fontSize: 11, color: 'rgba(240,246,255,0.12)', letterSpacing: '0.03em' }}>
        © 2026 Cyboeta
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'rgba(240,246,255,0.2)', fontSize: 12, letterSpacing: '0.1em' }}>Loading...</div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.background = '#000';
    document.documentElement.style.background = '#000';
  }, []);

  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      color: '#f0f6ff',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        html, body { background: #000 !important; margin: 0 !important; padding: 0 !important; }
        @keyframes floatPill { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-6px)} }
        @keyframes breathe { 0%,100%{filter:drop-shadow(0 0 8px rgba(37,99,235,0.3))} 50%{filter:drop-shadow(0 0 22px rgba(37,99,235,0.5))} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 16px rgba(96,165,250,0.12)} 50%{box-shadow:0 0 28px rgba(96,165,250,0.22)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes drift { 0%{transform:translateY(100vh);opacity:0} 10%{opacity:0.4} 90%{opacity:0.1} 100%{transform:translateY(-10vh);opacity:0} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .learn-pill {
          position: fixed; top: 28px; left: 50%; transform: translateX(-50%);
          padding: 10px 22px; background: transparent;
          border: 1px solid rgba(96,165,250,0.3); border-radius: 100px;
          color: rgba(240,246,255,0.6); font-size: 13px; font-weight: 500;
          cursor: pointer; letter-spacing: 0.04em; white-space: nowrap;
          animation: floatPill 4s ease-in-out infinite;
          box-shadow: 0 0 14px rgba(96,165,250,0.08);
          transition: all 0.3s; z-index: 10;
          font-family: 'DM Sans', sans-serif;
        }
        .learn-pill:hover { border-color: rgba(96,165,250,0.6); color: #f0f6ff; box-shadow: 0 0 24px rgba(96,165,250,0.18); }
        .logo-wrap { animation: breathe 4s ease-in-out infinite; }
        .login-link {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 15px 56px; background: transparent;
          border: 1px solid rgba(96,165,250,0.35); border-radius: 12px;
          color: #f0f6ff; font-size: 15px; font-weight: 500;
          text-decoration: none; letter-spacing: 0.04em;
          animation: glowPulse 3s ease-in-out infinite;
          transition: all 0.3s;
          font-family: 'DM Sans', sans-serif;
        }
        .login-link:hover { border-color: rgba(96,165,250,0.65); transform: translateY(-1px); }
        .content-wrap { animation: fadeIn 1s ease 0.3s both; display: flex; flex-direction: column; align-items: center; }
        .particle { position: fixed; width: 1px; height: 1px; background: rgba(96,165,250,0.5); border-radius: 50%; animation: drift linear infinite; pointer-events: none; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn 0.3s ease; }
        .modal-box { background: #080d1a; border: 1px solid rgba(96,165,250,0.12); border-radius: 20px; padding: 40px 36px; max-width: 400px; width: 100%; animation: slideUp 0.4s cubic-bezier(0.16,1,0.3,1); }
        .close-btn { width: 100%; padding: 13px; background: transparent; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; color: rgba(240,246,255,0.35); font-size: 13px; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em; }
        .close-btn:hover { border-color: rgba(255,255,255,0.14); color: rgba(240,246,255,0.6); }
      `}</style>

      {/* Particles */}
      {mounted && [...Array(16)].map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${5 + Math.random() * 90}%`,
          animationDuration: `${14 + Math.random() * 18}s`,
          animationDelay: `${Math.random() * 14}s`,
        }} />
      ))}

      {/* About pill */}
      <button className="learn-pill" onClick={() => setShowModal(true)}>
        About Cyboeta
      </button>

      {/* Main */}
      <div className="content-wrap">

        {/* Logo */}
        <div className="logo-wrap" style={{ width: 160, height: 160, position: 'relative', marginBottom: 32 }}>
          <Image src="/logo.svg" alt="Cyboeta Shield" fill style={{ objectFit: 'contain' }} priority />
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(34px,7vw,54px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#f0f6ff',
          marginBottom: 10,
          textAlign: 'center',
        }}>
          Cybo<span style={{ color: 'rgba(96,165,250,0.85)' }}>eta</span>
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: 12,
          color: 'rgba(240,246,255,0.28)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: 52,
          fontWeight: 300,
        }}>
          Where Secure Minds Meet
        </p>

        {/* Login only */}
        <Link href="/auth" className="login-link">Login</Link>

      </div>

      {/* Footer */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: '18px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 1,
      }}>
        <span style={{ fontSize: 11, color: 'rgba(240,246,255,0.15)', letterSpacing: '0.03em' }}>© 2026 Cyboeta</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms', 'About'].map(l => (
            <a key={l} href="#" style={{ fontSize: 11, color: 'rgba(240,246,255,0.15)', textDecoration: 'none', letterSpacing: '0.03em' }}>{l}</a>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6, color: '#f0f6ff' }}>What is Cyboeta?</div>
            <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>Version 1.0</div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 22 }} />
            <p style={{ fontSize: 14, color: 'rgba(240,246,255,0.45)', lineHeight: 1.8, marginBottom: 24, fontWeight: 300 }}>
              Cyboeta is a community built for people who take security seriously. A space where cybersecurity minds come together — to learn, share, and grow without noise or distraction.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {[
                'A home for cybersecurity learners and professionals',
                'Discussions, knowledge sharing and collaboration',
                'Ethical hacking, CTF challenges and research',
                'Services connecting experts with those who need them',
                'VIP access for those who go deeper',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'rgba(240,246,255,0.45)' }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(96,165,250,0.45)', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
            <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

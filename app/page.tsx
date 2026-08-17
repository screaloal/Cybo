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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        html, body { background: #000 !important; margin: 0 !important; padding: 0 !important; }
        @keyframes breathe { 0%,100%{filter:drop-shadow(0 0 8px rgba(96,165,250,0.15))} 50%{filter:drop-shadow(0 0 22px rgba(96,165,250,0.3))} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 16px rgba(96,165,250,0.1)} 50%{box-shadow:0 0 28px rgba(96,165,250,0.2)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes drift { 0%{transform:translateY(100vh);opacity:0} 10%{opacity:0.3} 90%{opacity:0.1} 100%{transform:translateY(-10vh);opacity:0} }
        @keyframes floatPill { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .logo-wrap { animation: breathe 4s ease-in-out infinite; }
        .login-link {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 15px 56px; background: transparent;
          border: 1px solid rgba(96,165,250,0.35); border-radius: 12px;
          color: #f0f6ff; font-size: 15px; font-weight: 500;
          text-decoration: none; letter-spacing: 0.04em;
          animation: glowPulse 3s ease-in-out infinite;
          transition: all 0.3s; width: 100%; max-width: 320px;
          font-family: 'DM Sans', sans-serif; text-align: center;
        }
        .login-link:hover { border-color: rgba(96,165,250,0.65); transform: translateY(-1px); }
        .content-wrap { animation: fadeIn 1s ease 0.3s both; display: flex; flex-direction: column; align-items: center; width: 100%; padding: 0 24px; }
        .particle { position: fixed; width: 1px; height: 1px; background: rgba(96,165,250,0.4); border-radius: 50%; animation: drift linear infinite; pointer-events: none; }
        .about-btn {
          background: transparent;
          border: 1px solid rgba(96,165,250,0.25);
          border-radius: 100px;
          color: rgba(240,246,255,0.4);
          font-size: 12px; font-weight: 500;
          cursor: pointer; letter-spacing: 0.04em;
          padding: 9px 20px;
          transition: all 0.3s;
          font-family: 'DM Sans', sans-serif;
          animation: floatPill 4s ease-in-out infinite;
          margin-top: 20px;
        }
        .about-btn:hover { border-color: rgba(96,165,250,0.5); color: rgba(240,246,255,0.7); }
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

      {/* Main Content */}
      <div className="content-wrap">

        {/* Logo — large, center stage */}
        <div className="logo-wrap" style={{
          width: 320, height: 320,
          position: 'relative',
          marginBottom: 48,
        }}>
          <Image
            src="/logo.webp"
            alt="Cyboeta"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        {/* Login */}
        <Link href="/auth" className="login-link">
          Login
        </Link>

        {/* Register */}
        <Link href="/auth" style={{
          fontSize: 13,
          color: 'rgba(240,246,255,0.25)',
          textDecoration: 'none',
          letterSpacing: '0.02em',
          marginTop: 16,
          transition: 'color 0.3s',
        }}>
          Create new account →
        </Link>

        {/* About pill — below login */}
        <button className="about-btn" onClick={() => setShowModal(true)}>
          About Cyboeta
        </button>

      </div>

      {/* Footer */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: '18px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 1,
      }}>
        <span style={{ fontSize: 11, color: 'rgba(240,246,255,0.12)', letterSpacing: '0.03em' }}>© 2026 Cyboeta</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms', 'About'].map(l => (
            <a key={l} href="#" style={{ fontSize: 11, color: 'rgba(240,246,255,0.12)', textDecoration: 'none', letterSpacing: '0.03em' }}>{l}</a>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6, color: '#f0f6ff' }}>What is Cyboeta?</div>
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

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .root {
          font-family: 'DM Sans', sans-serif;
          background: #000;
          color: #f0f6ff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* Subtle background */
        .bg-glow {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 60% 40% at 50% 60%, rgba(30,60,160,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 50% 30%, rgba(20,40,120,0.06) 0%, transparent 60%);
        }

        /* Particles */
        .particles {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .particle {
          position: absolute;
          width: 1px;
          height: 1px;
          background: rgba(96,165,250,0.4);
          border-radius: 50%;
          animation: drift linear infinite;
        }

        @keyframes drift {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-10vh) translateX(20px); opacity: 0; }
        }

        /* Content */
        .content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          padding: 40px 24px;
          opacity: 0;
          animation: fadeIn 1.2s ease forwards;
          animation-delay: 0.2s;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        /* Learn button */
        .learn-btn {
          position: fixed;
          top: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          padding: 10px 22px;
          background: transparent;
          border: 1px solid rgba(96,165,250,0.35);
          border-radius: 100px;
          color: rgba(240,246,255,0.7);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: all 0.3s ease;
          animation: floatPill 4s ease-in-out infinite;
          box-shadow: 0 0 12px rgba(96,165,250,0.1), inset 0 0 12px rgba(96,165,250,0.03);
          white-space: nowrap;
        }
        .learn-btn:hover {
          border-color: rgba(96,165,250,0.6);
          color: #f0f6ff;
          box-shadow: 0 0 20px rgba(96,165,250,0.2), inset 0 0 20px rgba(96,165,250,0.05);
        }

        @keyframes floatPill {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-5px); }
        }

        /* Logo */
        .logo-wrap {
          width: 180px;
          height: 180px;
          position: relative;
          margin-bottom: 36px;
          animation: breathe 4s ease-in-out infinite;
        }

        @keyframes breathe {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(37,99,235,0.25)); }
          50% { filter: drop-shadow(0 0 20px rgba(37,99,235,0.45)); }
        }

        /* Title */
        .title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 6vw, 52px);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #f0f6ff;
          margin-bottom: 12px;
          text-align: center;
        }

        .title span {
          color: rgba(96,165,250,0.9);
        }

        /* Tagline */
        .tagline {
          font-size: clamp(13px, 2vw, 15px);
          color: rgba(240,246,255,0.35);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 56px;
          text-align: center;
          font-weight: 300;
        }

        /* Login button */
        .login-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 15px 56px;
          background: transparent;
          border: 1px solid rgba(96,165,250,0.4);
          border-radius: 12px;
          color: #f0f6ff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: all 0.3s ease;
          margin-bottom: 20px;
          box-shadow: 0 0 16px rgba(96,165,250,0.1), inset 0 0 16px rgba(96,165,250,0.03);
          animation: glowPulse 3s ease-in-out infinite;
        }
        .login-btn:hover {
          border-color: rgba(96,165,250,0.7);
          box-shadow: 0 0 28px rgba(96,165,250,0.2), inset 0 0 28px rgba(96,165,250,0.06);
          transform: translateY(-1px);
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 16px rgba(96,165,250,0.1), inset 0 0 16px rgba(96,165,250,0.03); }
          50% { box-shadow: 0 0 24px rgba(96,165,250,0.18), inset 0 0 24px rgba(96,165,250,0.06); }
        }

        /* Register link */
        .register-link {
          font-size: 13px;
          color: rgba(240,246,255,0.3);
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.3s;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }
        .register-link:hover {
          color: rgba(240,246,255,0.6);
        }

        /* Footer */
        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 1;
        }
        .footer-copy {
          font-size: 11px;
          color: rgba(240,246,255,0.18);
          letter-spacing: 0.03em;
        }
        .footer-links {
          display: flex;
          gap: 20px;
        }
        .footer-links a {
          font-size: 11px;
          color: rgba(240,246,255,0.18);
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: rgba(240,246,255,0.4);
        }

        /* Modal overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.3s ease;
        }

        /* Modal card */
        .modal {
          background: rgba(10,15,30,0.95);
          border: 1px solid rgba(96,165,250,0.15);
          border-radius: 20px;
          padding: 40px 36px;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 0 60px rgba(37,99,235,0.1);
          animation: slideUp 0.4s cubic-bezier(0.16,1,0.3,1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modal-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #f0f6ff;
          letter-spacing: -0.01em;
        }

        .modal-sub {
          font-size: 12px;
          color: rgba(240,246,255,0.3);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .modal-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 24px;
        }

        .modal-text {
          font-size: 14px;
          color: rgba(240,246,255,0.55);
          line-height: 1.8;
          margin-bottom: 28px;
          font-weight: 300;
        }

        .modal-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }

        .modal-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: rgba(240,246,255,0.5);
        }

        .modal-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(96,165,250,0.5);
          flex-shrink: 0;
        }

        .modal-close {
          width: 100%;
          padding: 13px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: rgba(240,246,255,0.4);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.04em;
        }
        .modal-close:hover {
          border-color: rgba(255,255,255,0.15);
          color: rgba(240,246,255,0.7);
        }

        @media (max-width: 480px) {
          .footer { flex-direction: column; gap: 8px; align-items: center; }
          .logo-wrap { width: 140px; height: 140px; }
          .learn-btn { font-size: 12px; padding: 9px 18px; }
        }
      `}</style>

      {/* Background */}
      <div className="bg-glow" />

      {/* Particles */}
      <div className="particles">
        {mounted && [...Array(18)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() > 0.7 ? 2 : 1}px`,
            height: `${Math.random() > 0.7 ? 2 : 1}px`,
            animationDuration: `${12 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * 15}s`,
            opacity: Math.random() * 0.4 + 0.1,
          }} />
        ))}
      </div>

      {/* Learn About CyberNet */}
      <button className="learn-btn" onClick={() => setShowModal(true)}>
        About CyberNet
      </button>

      {/* Main Content */}
      <div className="content">

        {/* Logo */}
        <div className="logo-wrap">
          <Image
            src="/logo.png"
            alt="CyberNet"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        {/* Title */}
        <h1 className="title">
          Cyber<span>Net</span>
        </h1>

        {/* Tagline */}
        <p className="tagline">Where Secure Minds Meet</p>

        {/* Login */}
        <Link href="/auth" className="login-btn">
          Login
        </Link>

        {/* Register */}
        <Link href="/auth" className="register-link">
          Create new account →
        </Link>

      </div>

      {/* Footer */}
      <footer className="footer">
        <span className="footer-copy">© 2026 CyberNet</span>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">About</a>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">What is CyberNet?</div>
            <div className="modal-sub">Version 1.0</div>
            <div className="modal-divider" />
            <p className="modal-text">
              CyberNet is a community built for people who take security seriously.
              A space where cybersecurity minds come together — to learn, share,
              and grow without noise or distraction.
            </p>
            <div className="modal-items">
              {[
                'A home for cybersecurity learners and professionals',
                'Discussions, knowledge sharing and collaboration',
                'Ethical hacking, CTF challenges and research',
                'Services connecting experts with those who need them',
                'VIP access for those who go deeper',
              ].map((item, i) => (
                <div key={i} className="modal-item">
                  <div className="modal-dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

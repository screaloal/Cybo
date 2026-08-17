'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.background = '#000';
    document.documentElement.style.background = '#000';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin
        ? { email, password }
        : { email, password, username };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        router.push('/dashboard');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      color: '#f0f6ff',
      padding: 24,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        html, body { background: #000 !important; margin: 0 !important; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .auth-card { animation: fadeIn 0.8s ease both; }
        .input-field {
          width: 100%; padding: 13px 16px 13px 42px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; color: #f0f6ff;
          font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .input-field::placeholder { color: rgba(240,246,255,0.2); }
        .input-field:focus {
          border-color: rgba(96,165,250,0.4);
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .submit-btn {
          width: 100%; padding: 14px;
          background: transparent;
          border: 1px solid rgba(96,165,250,0.35);
          border-radius: 10px; color: #f0f6ff;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          font-weight: 500; cursor: pointer; letter-spacing: 0.04em;
          transition: all 0.3s;
          box-shadow: 0 0 16px rgba(96,165,250,0.08);
        }
        .submit-btn:hover {
          border-color: rgba(96,165,250,0.6);
          box-shadow: 0 0 24px rgba(96,165,250,0.18);
        }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      <div className="auth-card" style={{
        width: '100%', maxWidth: 380,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(96,165,250,0.1)',
        borderRadius: 20, padding: '44px 36px',
        boxShadow: '0 0 60px rgba(0,0,0,0.5)',
      }}>

        {/* Logo text */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 22, fontWeight: 800,
            marginBottom: 6, letterSpacing: '-0.01em',
          }}>
            Cyber<span style={{ color: 'rgba(96,165,250,0.85)' }}>Net</span>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {isLogin ? 'Sign in to continue' : 'Create your account'}
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Username - register only */}
          {!isLogin && (
            <div style={{ marginBottom: 16, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,246,255,0.25)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="input-field"
                required
              />
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: 16, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,246,255,0.25)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/>
              </svg>
            </span>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,246,255,0.25)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input-field"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(240,246,255,0.25)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {showPassword
                  ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></>
                  : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                }
              </svg>
            </button>
          </div>

          {/* Error */}
          {error && (
            <div style={{ marginBottom: 16, padding: '10px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, fontSize: 13, color: 'rgba(248,113,113,0.9)' }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
          </button>

        </form>

        {/* Toggle */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{ background: 'none', border: 'none', color: 'rgba(240,246,255,0.25)', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.02em' }}
          >
            {isLogin ? 'Create new account →' : '← Back to login'}
          </button>
        </div>

      </div>

      <div style={{ marginTop: 24, fontSize: 11, color: 'rgba(240,246,255,0.12)', letterSpacing: '0.03em' }}>
        © 2026 Cyboeta
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type State = 'welcome' | 'login' | 'register';

export default function Home() {
  const router = useRouter();
  const [screen, setScreen] = useState<State>('welcome');
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.background = '#000';
    document.documentElement.style.background = '#000';
  }, []);

  const goTo = (s: State) => {
    setError('');
    setScreen(s);
  };

  const handleAuth = async () => {
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (screen === 'register' && password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (screen === 'register' && !username) { setError('Username is required.'); return; }
    setLoading(true);
    try {
      const endpoint = screen === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = screen === 'login' ? { email, password } : { email, password, username };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong.'); }
      else {
        if (data.user) localStorage.setItem('cyboeta_user', JSON.stringify(data.user));
        router.push('/dashboard');
      }
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  const isWelcome = screen === 'welcome';

  return (
    <div style={{
      background: '#000', minHeight: '100vh', width: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif", color: '#f0f6ff',
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        html,body{background:#000!important;margin:0!important;padding:0!important}

        @keyframes revealLogo{from{opacity:0;filter:drop-shadow(0 0 0px rgba(96,165,250,0))}to{opacity:1;filter:drop-shadow(0 0 12px rgba(96,165,250,0.2))}}
        @keyframes breathe{0%,100%{filter:drop-shadow(0 0 8px rgba(96,165,250,0.15))}50%{filter:drop-shadow(0 0 24px rgba(96,165,250,0.32))}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes drift{0%{transform:translateY(100vh);opacity:0}10%{opacity:0.3}90%{opacity:0.1}100%{transform:translateY(-10vh);opacity:0}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

        .logo-large{
          width:300px;height:300px;position:relative;
          animation:revealLogo 1.2s cubic-bezier(0.16,1,0.3,1) both, breathe 4s 1.2s ease-in-out infinite;
          transition:width 0.6s cubic-bezier(0.16,1,0.3,1),
                     height 0.6s cubic-bezier(0.16,1,0.3,1),
                     margin-bottom 0.6s cubic-bezier(0.16,1,0.3,1);
          margin-bottom:48px;
        }
        .logo-small{
          width:80px;height:80px;position:relative;
          animation:breathe 4s ease-in-out infinite;
          transition:width 0.6s cubic-bezier(0.16,1,0.3,1),
                     height 0.6s cubic-bezier(0.16,1,0.3,1),
                     margin-bottom 0.6s cubic-bezier(0.16,1,0.3,1);
          margin-bottom:28px;
        }

        .welcome-actions{
          display:flex;flex-direction:column;align-items:center;gap:16px;
          animation:fadeUp 0.8s 0.8s cubic-bezier(0.16,1,0.3,1) both;
          width:100%;max-width:320px;
        }
        .form-wrap{
          display:flex;flex-direction:column;align-items:center;gap:14px;
          width:100%;max-width:320px;
          animation:fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }

        .login-btn{
          width:100%;padding:15px;background:transparent;
          border:1px solid rgba(96,165,250,0.3);border-radius:12px;
          color:#f0f6ff;font-size:15px;font-weight:500;
          cursor:pointer;letter-spacing:0.04em;
          font-family:'DM Sans',sans-serif;
          transition:border-color 0.3s,box-shadow 0.3s,transform 0.2s;
          box-shadow:0 0 0px rgba(96,165,250,0);
        }
        .login-btn:hover,.login-btn:active{
          border-color:rgba(96,165,250,0.65);
          box-shadow:0 0 22px rgba(96,165,250,0.18),inset 0 0 12px rgba(96,165,250,0.05);
          transform:translateY(-1px);
        }

        .submit-btn{
          width:100%;padding:15px;background:transparent;
          border:1px solid rgba(96,165,250,0.35);border-radius:12px;
          color:#f0f6ff;font-size:14px;font-weight:500;
          cursor:pointer;letter-spacing:0.04em;
          font-family:'DM Sans',sans-serif;
          transition:all 0.3s;
          box-shadow:0 0 16px rgba(96,165,250,0.08);
        }
        .submit-btn:hover{
          border-color:rgba(96,165,250,0.65);
          box-shadow:0 0 24px rgba(96,165,250,0.2);
          transform:translateY(-1px);
        }
        .submit-btn:disabled{opacity:0.4;cursor:not-allowed;transform:none}

        .input-field{
          width:100%;padding:13px 16px 13px 40px;
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:10px;color:#f0f6ff;
          font-family:'DM Sans',sans-serif;font-size:14px;outline:none;
          transition:border-color 0.25s,box-shadow 0.25s,background 0.25s;
        }
        .input-field::placeholder{color:rgba(240,246,255,0.38)}
        .input-field:focus{
          border-color:rgba(96,165,250,0.4);
          background:rgba(255,255,255,0.05);
          box-shadow:0 0 0 3px rgba(37,99,235,0.08);
        }

        .back-btn{
          background:none;border:none;cursor:pointer;
          color:rgba(240,246,255,0.25);font-size:13px;
          font-family:'DM Sans',sans-serif;letter-spacing:0.02em;
          transition:color 0.2s;padding:4px 0;
        }
        .back-btn:hover{color:rgba(240,246,255,0.5)}

        .toggle-btn{
          background:none;border:none;cursor:pointer;
          color:rgba(240,246,255,0.25);font-size:13px;
          font-family:'DM Sans',sans-serif;letter-spacing:0.02em;
          transition:color 0.2s;
        }
        .toggle-btn:hover{color:rgba(240,246,255,0.5)}

        .create-link{
          color:rgba(240,246,255,0.28);font-size:13px;
          background:none;border:none;cursor:pointer;
          font-family:'DM Sans',sans-serif;letter-spacing:0.02em;
          transition:color 0.2s;
        }
        .create-link:hover{color:rgba(240,246,255,0.5)}

        .about-btn{
          background:transparent;
          border:1px solid rgba(96,165,250,0.18);
          border-radius:100px;
          color:rgba(240,246,255,0.3);
          font-size:11px;font-weight:500;
          cursor:pointer;letter-spacing:0.05em;
          padding:8px 18px;
          transition:all 0.3s;
          font-family:'DM Sans',sans-serif;
          margin-top:8px;
        }
        .about-btn:hover{border-color:rgba(96,165,250,0.4);color:rgba(240,246,255,0.55)}

        .error-box{
          width:100%;padding:10px 14px;
          background:rgba(239,68,68,0.06);
          border:1px solid rgba(239,68,68,0.18);
          border-radius:8px;font-size:12px;
          color:rgba(248,113,113,0.85);
          text-align:center;letter-spacing:0.01em;
        }

        .footer-link{font-size:12px;color:rgba(240,246,255,0.3);text-decoration:none;letter-spacing:0.03em;transition:color 0.2s}
        .footer-link:hover{color:rgba(240,246,255,0.6)}

        .particle{position:fixed;width:1px;height:1px;background:rgba(96,165,250,0.35);border-radius:50%;animation:drift linear infinite;pointer-events:none}

        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.78);backdrop-filter:blur(8px);z-index:100;display:flex;align-items:center;justify-content:center;padding:24px;animation:fadeIn 0.3s ease}
        .modal-box{background:#060a14;border:1px solid rgba(96,165,250,0.1);border-radius:20px;padding:40px 32px;max-width:390px;width:100%;animation:slideUp 0.4s cubic-bezier(0.16,1,0.3,1)}
        .close-btn{width:100%;padding:13px;background:transparent;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:rgba(240,246,255,0.3);font-size:13px;cursor:pointer;transition:all 0.2s;font-family:'DM Sans',sans-serif;letter-spacing:0.04em}
        .close-btn:hover{border-color:rgba(255,255,255,0.14);color:rgba(240,246,255,0.6)}

        .input-wrap{position:relative;width:100%}
        .input-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:rgba(240,246,255,0.2);pointer-events:none;display:flex;align-items:center}
        .eye-btn{position:absolute;right:13px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(240,246,255,0.2);display:flex;align-items:center;padding:2px;transition:color 0.2s}
        .eye-btn:hover{color:rgba(96,165,250,0.6)}
      `}</style>

      {/* Particles */}
      {mounted && [...Array(14)].map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${5 + Math.random() * 90}%`,
          animationDuration: `${16 + Math.random() * 18}s`,
          animationDelay: `${Math.random() * 16}s`,
        }} />
      ))}

      {/* Main */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 28px' }}>

        {/* Logo */}
        <div className={isWelcome ? 'logo-large' : 'logo-small'}>
          <Image src="/logo.webp" alt="Cyboeta" fill style={{ objectFit: 'contain' }} priority />
        </div>

        {/* WELCOME STATE */}
        {isWelcome && (
          <div className="welcome-actions">
            <button className="login-btn" onClick={() => goTo('login')}>Login</button>
            <button className="create-link" onClick={() => goTo('register')}>Create new account →</button>
            <button className="about-btn" onClick={() => setShowModal(true)}>About Cyboeta</button>
          </div>
        )}

        {/* LOGIN STATE */}
        {screen === 'login' && (
          <div className="form-wrap">
            <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
              Sign in
            </div>

            {error && <div className="error-box">{error}</div>}

            <div className="input-wrap">
              <span className="input-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/></svg>
              </span>
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="input-field" autoComplete="off"/>
            </div>

            <div className="input-wrap">
              <span className="input-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input-field" autoComplete="off"
                onKeyDown={e => e.key === 'Enter' && handleAuth()}/>
              <button className="eye-btn" type="button" onClick={() => setShowPassword(!showPassword)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {showPassword
                    ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></>
                    : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                </svg>
              </button>
            </div>

            <button className="submit-btn" onClick={handleAuth} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <button className="toggle-btn" onClick={() => goTo('register')}>
              Create new account →
            </button>

            <button className="back-btn" onClick={() => goTo('welcome')}>← Back</button>
          </div>
        )}

        {/* REGISTER STATE */}
        {screen === 'register' && (
          <div className="form-wrap">
            <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
              Create account
            </div>

            {error && <div className="error-box">{error}</div>}

            <div className="input-wrap">
              <span className="input-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              </span>
              <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="input-field"/>
            </div>

            <div className="input-wrap">
              <span className="input-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/></svg>
              </span>
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="input-field" autoComplete="off"/>
            </div>

            <div className="input-wrap">
              <span className="input-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input-field"/>
              <button className="eye-btn" type="button" onClick={() => setShowPassword(!showPassword)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {showPassword
                    ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></>
                    : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                </svg>
              </button>
            </div>

            <div className="input-wrap">
              <span className="input-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="input-field"
                onKeyDown={e => e.key === 'Enter' && handleAuth()}/>
            </div>

            <button className="submit-btn" onClick={handleAuth} disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <button className="toggle-btn" onClick={() => goTo('login')}>
              Already have an account? Sign in →
            </button>

            <button className="back-btn" onClick={() => goTo('welcome')}>← Back</button>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: '18px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 1, pointerEvents: isWelcome ? 'auto' : 'none',
        opacity: isWelcome ? 1 : 0, transition: 'opacity 0.4s',
      }}>
        <span style={{ fontSize: 12, color: 'rgba(240,246,255,0.3)', letterSpacing: '0.03em' }}>© 2026 Cyboeta</span>
        <div style={{ display: 'flex', gap: 22 }}>
          {['Privacy', 'Terms', 'About'].map(l => (
            <a key={l} href="#" className="footer-link">{l}</a>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 6, color: '#f0f6ff' }}>What is Cyboeta?</div>
            <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.22)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 22 }}>Version 1.0</div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 20 }} />
            <p style={{ fontSize: 14, color: 'rgba(240,246,255,0.42)', lineHeight: 1.8, marginBottom: 22, fontWeight: 300 }}>
              Cyboeta is a community built for people who take security seriously. A space where cybersecurity minds come together — to learn, share, and grow without noise or distraction.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 28 }}>
              {[
                'A home for cybersecurity learners and professionals',
                'Discussions, knowledge sharing and collaboration',
                'Ethical hacking, CTF challenges and research',
                'Services connecting experts with those who need them',
                'VIP access for those who go deeper',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'rgba(240,246,255,0.42)' }}>
                  <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(96,165,250,0.4)', flexShrink: 0 }} />
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

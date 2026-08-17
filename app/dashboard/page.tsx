'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type User = {
  id: string;
  email: string;
  username: string;
  role: string;
};

type Post = {
  id: number;
  author: string;
  time: string;
  content: string;
  comments: number;
  likes: number;
  tag: string;
};

const MOCK_POSTS: Post[] = [
  { id: 1, author: '0xNinja', time: '2h ago', content: 'How I found my first bug in a web application — a full walkthrough of the process from recon to report.', comments: 24, likes: 12, tag: 'Community' },
  { id: 2, author: 'rootSec', time: '5h ago', content: 'Best penetration testing tools in 2026? Drop your recommendations below.', comments: 18, likes: 9, tag: 'Community' },
  { id: 3, author: 'cyberhunter', time: '8h ago', content: 'Share your CTF writeups and strategies — what was the hardest challenge you have solved?', comments: 32, likes: 21, tag: 'CTFs' },
  { id: 4, author: 'bluehat', time: '1d ago', content: 'Career roadmap for aspiring security analysts in 2026. Here is what actually matters.', comments: 15, likes: 34, tag: 'Community' },
  { id: 5, author: 'malSec', time: '2d ago', content: 'Malware reverse engineering — where do you start as a beginner? Resources and tips inside.', comments: 41, likes: 28, tag: 'Research' },
];

const TABS = ['Community', 'CTFs', 'Research'];
const SHOW_MOCK = false; // set to true to test with mock posts

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('Community');
  const [menuOpen, setMenuOpen] = useState(false);
  const [introPhase, setIntroPhase] = useState<'cinematic' | 'done'>('cinematic');

  useEffect(() => {
    document.body.style.background = '#000';
    document.documentElement.style.background = '#000';
    const stored = localStorage.getItem('cyboeta_user');
    if (stored) setUser(JSON.parse(stored));

    // Cinematic intro — 2.8s total then settle into nav
    const timer = setTimeout(() => setIntroPhase('done'), 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('cyboeta_user');
    router.push('/');
  };

  const posts = SHOW_MOCK ? MOCK_POSTS : [];
  const filteredPosts = activeTab === 'Community'
    ? posts
    : posts.filter(p => p.tag === activeTab);

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : 'CB';

  const isCinematic = introPhase === 'cinematic';

  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      color: '#f0f6ff',
      fontFamily: "'DM Sans', sans-serif",
      maxWidth: 640,
      margin: '0 auto',
      position: 'relative',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        html,body{background:#000!important;margin:0!important}

        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeOut{from{opacity:1}to{opacity:0}}
        @keyframes breathe{0%,100%{filter:drop-shadow(0 0 6px rgba(96,165,250,0.15))}50%{filter:drop-shadow(0 0 18px rgba(96,165,250,0.3))}}
        @keyframes postIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

        /* Cinematic overlay */
        .cinematic{
          position:fixed;inset:0;z-index:200;
          background:#000;
          display:flex;flex-direction:column;
          align-items:center;justify-content:center;gap:24px;
          animation:fadeOut 0.6s 2.2s cubic-bezier(0.16,1,0.3,1) forwards;
          pointer-events:none;
        }
        .cinematic-logo{
          width:100px;height:100px;position:relative;
          animation:fadeIn 0.8s cubic-bezier(0.16,1,0.3,1) both, breathe 3s 0.8s ease-in-out infinite;
        }
        .cinematic-tagline{
          font-size:11px;letter-spacing:0.18em;
          text-transform:uppercase;
          color:rgba(240,246,255,0.3);
          animation:fadeUp 0.8s 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* Nav */
        .nav{
          position:sticky;top:0;z-index:50;
          background:rgba(0,0,0,0.88);
          backdrop-filter:blur(14px);
          border-bottom:1px solid rgba(255,255,255,0.06);
          display:flex;align-items:center;
          padding:10px 18px;gap:12px;
          animation:fadeIn 0.5s 2.4s ease both;
        }
        .nav-logo{width:28px;height:28px;position:relative;flex-shrink:0;animation:breathe 4s ease-in-out infinite}
        .nav-tagline{
          font-size:9px;letter-spacing:0.14em;
          text-transform:uppercase;
          color:rgba(240,246,255,0.2);
          flex:1;
        }
        .nav-avatar{
          width:30px;height:30px;border-radius:50%;
          background:rgba(96,165,250,0.1);
          border:1px solid rgba(96,165,250,0.22);
          display:flex;align-items:center;justify-content:center;
          font-size:10px;font-weight:700;
          color:rgba(96,165,250,0.75);
          cursor:pointer;flex-shrink:0;
          font-family:'Syne',sans-serif;
        }
        .dots-btn{
          background:none;border:none;cursor:pointer;
          color:rgba(240,246,255,0.3);padding:4px 5px;
          display:flex;flex-direction:column;gap:3.5px;
          align-items:center;transition:color 0.2s;
        }
        .dots-btn:hover{color:rgba(240,246,255,0.6)}
        .dot{width:3px;height:3px;border-radius:50%;background:currentColor}

        /* Menu */
        .menu{
          position:fixed;top:54px;right:14px;z-index:100;
          background:#080e1c;
          border:1px solid rgba(255,255,255,0.07);
          border-radius:12px;overflow:hidden;min-width:170px;
          box-shadow:0 8px 40px rgba(0,0,0,0.7);
          animation:fadeUp 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .menu-item{
          display:block;width:100%;padding:12px 16px;
          background:none;border:none;
          color:rgba(240,246,255,0.55);font-size:13px;
          font-family:'DM Sans',sans-serif;cursor:pointer;
          text-align:left;transition:background 0.15s,color 0.15s;
          letter-spacing:0.02em;
        }
        .menu-item:hover{background:rgba(255,255,255,0.04);color:#f0f6ff}
        .menu-item.danger{color:rgba(248,113,113,0.55)}
        .menu-item.danger:hover{color:rgba(248,113,113,0.9);background:rgba(239,68,68,0.05)}
        .menu-divider{height:1px;background:rgba(255,255,255,0.05);margin:3px 0}

        /* Tabs */
        .tabs{display:flex;border-bottom:1px solid rgba(255,255,255,0.06)}
        .tab-btn{
          background:none;border:none;cursor:pointer;
          font-family:'DM Sans',sans-serif;font-size:13px;
          padding:12px 16px;color:rgba(240,246,255,0.3);
          letter-spacing:0.02em;transition:color 0.2s;position:relative;
        }
        .tab-btn.active{color:#f0f6ff}
        .tab-btn.active::after{
          content:'';position:absolute;bottom:0;
          left:16px;right:16px;height:1px;
          background:rgba(96,165,250,0.55);
        }
        .tab-btn:hover{color:rgba(240,246,255,0.65)}

        /* Posts */
        .post-item{
          padding:18px;
          border-bottom:1px solid rgba(255,255,255,0.04);
          animation:postIn 0.4s ease both;
        }
        .post-action{
          background:none;border:none;cursor:pointer;
          color:rgba(240,246,255,0.22);font-size:12px;
          font-family:'DM Sans',sans-serif;
          display:flex;align-items:center;gap:5px;
          transition:color 0.2s;padding:0;
        }
        .post-action:hover{color:rgba(96,165,250,0.65)}

        /* FAB */
        .fab{
          position:fixed;bottom:28px;right:22px;
          width:46px;height:46px;
          background:rgba(96,165,250,0.1);
          border:1px solid rgba(96,165,250,0.28);
          border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;font-size:20px;
          color:rgba(96,165,250,0.75);
          transition:all 0.25s;
          box-shadow:0 0 18px rgba(96,165,250,0.08);
          animation:fadeIn 0.5s 2.6s ease both;
        }
        .fab:hover{
          background:rgba(96,165,250,0.18);
          box-shadow:0 0 28px rgba(96,165,250,0.18);
          transform:scale(1.06);
        }

        /* Empty state */
        .empty{
          display:flex;flex-direction:column;
          align-items:center;justify-content:center;
          padding:72px 24px;gap:16px;
          animation:fadeIn 0.6s 0.3s ease both;
        }
      `}</style>

      {/* Cinematic Intro */}
      {isCinematic && (
        <div className="cinematic">
          <div className="cinematic-logo">
            <Image src="/logo.webp" alt="Cyboeta" fill style={{ objectFit: 'contain' }} priority/>
          </div>
          <div className="cinematic-tagline">Where Secure Minds Meet</div>
        </div>
      )}

      {/* Nav */}
      <div className="nav">
        <div className="nav-logo">
          <Image src="/logo.webp" alt="Cyboeta" fill style={{ objectFit: 'contain' }}/>
        </div>
        <div className="nav-tagline">where secure minds meet</div>
        <div className="nav-avatar">{initials}</div>
        <button className="dots-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="dot"/><div className="dot"/><div className="dot"/>
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <>
          <div className="menu" onClick={() => setMenuOpen(false)}>
            <Link href="/profile" style={{ textDecoration: 'none' }}>
              <button className="menu-item">Profile</button>
            </Link>
            <button className="menu-item">Settings</button>
            <button className="menu-item">VIP</button>
            <div className="menu-divider"/>
            <button className="menu-item danger" onClick={handleLogout}>Logout</button>
          </div>
          <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setMenuOpen(false)}/>
        </>
      )}

      {/* Tabs */}
      <div style={{ padding: '0 0', borderBottom: '1px solid rgba(255,255,255,0.06)', animation: 'fadeIn 0.5s 2.5s ease both', opacity: 0, animationFillMode: 'forwards' }}>
        <div className="tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div>
        {filteredPosts.length === 0 ? (
          <div className="empty">
            <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(240,246,255,0.15)' }}>
              Where Secure Minds Meet
            </div>
            <div style={{ width: 32, height: 1, background: 'rgba(96,165,250,0.2)' }}/>
            <div style={{ fontSize: 13, color: 'rgba(240,246,255,0.2)', textAlign: 'center', lineHeight: 1.7, maxWidth: 240 }}>
              No posts yet. Be the first to share something.
            </div>
          </div>
        ) : (
          filteredPosts.map((post, i) => (
            <div key={post.id} className="post-item" style={{ animationDelay: `${i * 0.06}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(96,165,250,0.07)',
                  border: '1px solid rgba(96,165,250,0.14)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700,
                  color: 'rgba(96,165,250,0.55)',
                  flexShrink: 0, fontFamily: "'Syne',sans-serif",
                }}>
                  {post.author.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{post.author}</span>
                  <span style={{ fontSize: 11, color: 'rgba(240,246,255,0.22)', marginLeft: 8 }}>{post.time}</span>
                </div>
                <span style={{
                  fontSize: 9, color: 'rgba(96,165,250,0.45)',
                  border: '1px solid rgba(96,165,250,0.14)',
                  borderRadius: 4, padding: '2px 7px',
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                }}>
                  {post.tag}
                </span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(240,246,255,0.7)', marginBottom: 14, fontWeight: 300 }}>
                {post.content}
              </p>
              <div style={{ display: 'flex', gap: 20 }}>
                <button className="post-action">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  {post.comments}
                </button>
                <button className="post-action">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  {post.likes}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FAB */}
      <button className="fab">+</button>

      {/* Footer */}
      <div style={{ padding: '40px 18px', textAlign: 'center', fontSize: 11, color: 'rgba(240,246,255,0.1)', letterSpacing: '0.03em' }}>
        © 2026 Cyboeta
      </div>

    </div>
  );
}

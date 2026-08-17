'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Community');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.background = '#000';
    document.documentElement.style.background = '#000';
    const stored = localStorage.getItem('cyboeta_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('cyboeta_user');
    router.push('/');
  };

  const filteredPosts = activeTab === 'Community'
    ? MOCK_POSTS
    : MOCK_POSTS.filter(p => p.tag === activeTab);

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : 'CN';

  if (loading) return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'rgba(240,246,255,0.2)', fontSize: 12, letterSpacing: '0.1em' }}>Loading...</div>
    </div>
  );

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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        html, body { background: #000 !important; margin: 0 !important; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .post-item { animation: fadeIn 0.4s ease both; }
        .tab-btn { background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; padding: 12px 16px; color: rgba(240,246,255,0.35); letter-spacing: 0.02em; transition: color 0.2s; position: relative; }
        .tab-btn.active { color: #f0f6ff; }
        .tab-btn.active::after { content: ''; position: absolute; bottom: 0; left: 16px; right: 16px; height: 1px; background: rgba(96,165,250,0.6); }
        .tab-btn:hover { color: rgba(240,246,255,0.7); }
        .post-action { background: none; border: none; cursor: pointer; color: rgba(240,246,255,0.25); font-size: 12px; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; gap: 5px; transition: color 0.2s; padding: 0; }
        .post-action:hover { color: rgba(96,165,250,0.7); }
        .menu-item { display: block; width: 100%; padding: 13px 18px; background: none; border: none; color: rgba(240,246,255,0.6); font-size: 14px; font-family: 'DM Sans', sans-serif; cursor: pointer; text-align: left; transition: background 0.2s, color 0.2s; letter-spacing: 0.02em; }
        .menu-item:hover { background: rgba(255,255,255,0.04); color: #f0f6ff; }
        .menu-item.danger { color: rgba(248,113,113,0.6); }
        .menu-item.danger:hover { color: rgba(248,113,113,0.9); background: rgba(239,68,68,0.06); }
        .fab { position: fixed; bottom: 28px; right: 24px; width: 48px; height: 48px; background: rgba(96,165,250,0.12); border: 1px solid rgba(96,165,250,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 22px; color: rgba(96,165,250,0.8); transition: all 0.2s; box-shadow: 0 0 20px rgba(96,165,250,0.1); }
        .fab:hover { background: rgba(96,165,250,0.2); box-shadow: 0 0 30px rgba(96,165,250,0.2); transform: scale(1.05); }
      `}</style>

      {/* Top Nav */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center',
        padding: '12px 18px', gap: 12,
      }}>
        {/* Logo */}
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, flex: 1, letterSpacing: '-0.01em' }}>
          Cybo<span style={{ color: 'rgba(96,165,250,0.85)' }}>eta</span>
        </div>

        {/* Avatar */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'rgba(96,165,250,0.12)',
          border: '1px solid rgba(96,165,250,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: 'rgba(96,165,250,0.8)',
          cursor: 'pointer', flexShrink: 0,
          fontFamily: "'Syne', sans-serif",
        }}>
          {initials}
        </div>

        {/* 3 dots vertical */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(240,246,255,0.35)', padding: '4px 6px',
            display: 'flex', flexDirection: 'column', gap: 4,
            alignItems: 'center', transition: 'color 0.2s',
          }}
        >
          <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'currentColor' }} />
          <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'currentColor' }} />
          <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'currentColor' }} />
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', top: 58, right: 16, zIndex: 100,
            background: '#0a0f1e',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, overflow: 'hidden', minWidth: 180,
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
          }}
          onClick={() => setMenuOpen(false)}
        >
          <Link href="/profile" style={{ textDecoration: 'none' }}>
            <button className="menu-item">Profile</button>
          </Link>
          <button className="menu-item">Settings</button>
          <button className="menu-item">VIP</button>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
          <button className="menu-item danger" onClick={handleLogout}>Logout</button>
        </div>
      )}

      {/* Overlay to close menu */}
      {menuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 99 }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Welcome */}
      <div style={{
        padding: '20px 18px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ fontSize: 13, color: 'rgba(240,246,255,0.25)', marginBottom: 2 }}>
          Welcome back
        </div>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 20, fontWeight: 800,
          letterSpacing: '-0.02em', marginBottom: 16,
        }}>
          {user?.username || 'Cyber Mind'}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
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

      {/* Posts Feed */}
      <div>
        {filteredPosts.length === 0 ? (
          <div style={{ padding: '48px 18px', textAlign: 'center', color: 'rgba(240,246,255,0.2)', fontSize: 13 }}>
            No posts in this section yet.
          </div>
        ) : (
          filteredPosts.map((post, i) => (
            <div
              key={post.id}
              className="post-item"
              style={{
                padding: '18px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {/* Post header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                {/* Avatar */}
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(96,165,250,0.08)',
                  border: '1px solid rgba(96,165,250,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700,
                  color: 'rgba(96,165,250,0.6)',
                  flexShrink: 0,
                  fontFamily: "'Syne', sans-serif",
                }}>
                  {post.author.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{post.author}</span>
                  <span style={{ fontSize: 11, color: 'rgba(240,246,255,0.25)', marginLeft: 8 }}>{post.time}</span>
                </div>
                <span style={{
                  fontSize: 10, color: 'rgba(96,165,250,0.5)',
                  border: '1px solid rgba(96,165,250,0.15)',
                  borderRadius: 4, padding: '2px 7px',
                  letterSpacing: '0.04em',
                }}>
                  {post.tag}
                </span>
              </div>

              {/* Post content */}
              <p style={{
                fontSize: 14, lineHeight: 1.65,
                color: 'rgba(240,246,255,0.75)',
                marginBottom: 14, fontWeight: 300,
              }}>
                {post.content}
              </p>

              {/* Actions */}
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

      {/* FAB — New Post */}
      <button className="fab">+</button>

      {/* Footer */}
      <div style={{
        padding: '32px 18px',
        textAlign: 'center',
        fontSize: 11,
        color: 'rgba(240,246,255,0.1)',
        letterSpacing: '0.03em',
      }}>
        © 2026 Cyboeta
      </div>

    </div>
  );
}

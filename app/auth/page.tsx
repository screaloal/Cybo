'use client';

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function AuthPage() {
  const { theme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend logic ready—we will plug our backend Prisma API endpoint right here next!
    console.log('Form Submitted:', { isLogin, email, password, username });
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12 transition-colors duration-200 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="w-full max-w-md space-y-8 p-8 rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900/40 backdrop-blur-md">
        
        {/* Top Branding Section */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 font-mono text-xl font-bold border border-emerald-500/20">
            &gt;_
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight">
            {isLogin ? 'Access Core Gateway' : 'Initialize Agent Profile'}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {isLogin ? 'Enter credentials to authorize session' : 'Register your signature to the central database'}
          </p>
        </div>

        {/* Dynamic Auth Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            
            {/* Username Field - Only Shows on Registration */}
            {!isLogin && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Codename / Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g., neo_matrix"
                  className="mt-1 block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:border-slate-800 dark:bg-slate-950 dark:focus:ring-emerald-400"
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Secure Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@domain.com"
                className="mt-1 block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:border-slate-800 dark:bg-slate-950 dark:focus:ring-emerald-400"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Security Passphrase</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="mt-1 block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:border-slate-800 dark:bg-slate-950 dark:focus:ring-emerald-400"
              />
            </div>
          </div>

          {/* Action Trigger Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] transition-all shadow-md shadow-emerald-500/10"
            >
              {isLogin ? 'Authenticate Session' : 'Commit Configuration'}
            </button>
          </div>
        </form>

        {/* Lower Toggle Trigger */}
        <div className="text-center pt-2">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 transition-colors"
          >
            {isLogin ? "Don't have permissions? Request credential access" : "Already registered? Return to login portal"}
          </button>
        </div>

      </div>
    </main>
  );
}

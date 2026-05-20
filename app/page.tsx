'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 transition-colors duration-200 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      
      {/* Theme Controller (Top Right Corner) */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 text-xs font-mono font-bold tracking-wider rounded-xl border border-slate-200 bg-white hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 transition-all shadow-sm"
        >
          MODE: {theme === 'dark' ? 'DEEP_SLATE' : 'CYBER_LIGHT'}
        </button>
      </div>

      {/* Main Core Branding */}
      <div className="text-center max-w-2xl space-y-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 font-mono text-3xl font-black border border-emerald-500/20 shadow-md shadow-emerald-500/5 animate-pulse">
          DR
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-mono uppercase text-slate-900 dark:text-white">
          Project <span className="text-emerald-600 dark:text-emerald-400">Screal</span>
        </h1>
        
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-mono max-w-md mx-auto leading-relaxed">
          A secure, modular framework designed for network telemetry, cryptographic authentication, and threat assessment operations.
        </p>

        {/* Central Interlinked Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 max-w-md mx-auto w-full">
          
          <Link 
            href="/auth" 
            className="flex flex-col items-center p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-emerald-400 transition-all text-center group"
          >
            <span className="text-sm font-bold font-mono group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
              &gt; Authenticate Session
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Access gate & key signing
            </span>
          </Link>

          <Link 
            href="/dashboard" 
            className="flex flex-col items-center p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-emerald-400 transition-all text-center group"
          >
            <span className="text-sm font-bold font-mono group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
              &gt; Central Terminal
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              View live system metrics
            </span>
          </Link>

        </div>
      </div>
    </main>
  );
}

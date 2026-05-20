'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center transition-colors duration-200 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="max-w-2xl p-8 rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900/50 backdrop-blur-md">
        
        {/* Core Tag */}
        <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-6">
          System Core Online
        </div>

        {/* Main Header */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
          Welcome to <span className="text-emerald-500">DR-SCREAL</span>
        </h1>
        
        <p className="text-base text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          A secure, high-performance community platform built for ethical hackers and cybersecurity experts. 
        </p>

        {/* Theme Controller Toggle Button */}
        <button
          onClick={toggleTheme}
          className="relative inline-flex items-center gap-2 px-6 py-3 font-medium text-sm rounded-xl border transition-all active:scale-95 shadow-sm bg-slate-900 border-slate-800 text-white hover:bg-slate-800 dark:bg-white dark:border-slate-200 dark:text-slate-900 dark:hover:bg-slate-100"
        >
          <span>Switch to {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </button>
      </div>
    </main>
  );
}

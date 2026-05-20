'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function DashboardPage() {
  const { theme } = useTheme();

  // Mock telemetry data for our cybersecurity dashboard metrics
  const systemMetrics = [
    { label: 'Active Proxies', value: '14 / 15', status: 'Optimal', color: 'text-emerald-500' },
    { label: 'Database Integrity', value: '99.98%', status: 'Secured', color: 'text-emerald-500' },
    { label: 'Intercepted Threats', value: '1,248', status: 'Mitigated', color: 'text-amber-500' },
    { label: 'System Load', value: '24.2%', status: 'Nominal', color: 'text-emerald-500' },
  ];

  const recentLogs = [
    { time: '21:44:12', event: 'SSH handshake initialized successfully via Termux Client', type: 'SYSTEM' },
    { time: '21:37:51', event: 'Git repository baseline pushed to origin main remote archive', type: 'DEVOPS' },
    { time: '17:51:03', event: 'Webpack compilation completed successfully - Status 200 OK', type: 'COMPILER' },
    { time: '17:42:31', event: 'Turbopack platform binding bypass activated (--webpack)', type: 'PATCH' },
  ];

  return (
    <main className="min-h-screen p-4 md:p-8 transition-colors duration-200 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      
      {/* Top Header / Navigation Bar Container */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl font-mono font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              DR-SCREAL // Core Central
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            Node: android-arm64_termux_v16 // Active Session
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold text-center">
          Security Cleared: Level 4 Admin
        </div>
      </header>

      {/* Grid Layout Row 1: System Telemetry Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {systemMetrics.map((metric, index) => (
          <div 
            key={index} 
            className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/30 backdrop-blur-sm"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {metric.label}
            </p>
            <p className="text-3xl font-mono font-bold tracking-tight my-2">
              {metric.value}
            </p>
            <div className="flex items-center space-x-1.5 text-xs font-mono">
              <span className={`font-semibold ${metric.color}`}>● {metric.status}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Grid Layout Row 2: Live Activity Feed & Operational Control Split */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Live Terminal Log Console Stream (Spans 2 columns) */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/30 backdrop-blur-sm flex flex-col">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 font-mono">
            &gt;_ System Activity Log Stream
          </h3>
          <div className="flex-1 min-h-[240px] rounded-xl bg-slate-900 text-slate-200 p-4 font-mono text-xs space-y-3 border border-slate-800 overflow-x-auto shadow-inner">
            {recentLogs.map((log, index) => (
              <div key={index} className="flex items-start space-x-2 leading-relaxed">
                <span className="text-emerald-500 shrink-0">[{log.time}]</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 shrink-0 uppercase tracking-wide">
                  {log.type}
                </span>
                <span className="text-slate-300">{log.event}</span>
              </div>
            ))}
            <div className="text-emerald-400/70 animate-pulse text-[11px] pt-1">
              &gt; Listening for incoming telemetry signals...
            </div>
          </div>
        </div>

        {/* Right Column: Platform Utility Directives */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/30 backdrop-blur-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
            Operational Directives
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center justify-between group">
              <span className="text-sm font-medium font-mono text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">
                Run Network Audit
              </span>
              <span className="text-xs font-mono text-slate-400 group-hover:text-emerald-400">&rarr;</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center justify-between group">
              <span className="text-sm font-medium font-mono text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">
                Sync Vault Archives
              </span>
              <span className="text-xs font-mono text-slate-400 group-hover:text-emerald-400">&rarr;</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center justify-between group">
              <span className="text-sm font-medium font-mono text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">
                Purge Temporary Cache
              </span>
              <span className="text-xs font-mono text-slate-400 group-hover:text-emerald-400">&rarr;</span>
            </button>
          </div>
        </div>

      </section>
    </main>
  );
}

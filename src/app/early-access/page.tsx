'use client';
import { useState } from 'react';

export default function EarlyAccessPage() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  return (
    <div className="shell items-center justify-center relative overflow-hidden">
      {/* Ambient background layers */}
      <div className="absolute inset-0 bg-obsidian" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(143,245,255,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(143,245,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(143,245,255,0.4) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full animate-float" style={{ background: 'radial-gradient(circle, rgba(143,245,255,0.05), transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full animate-float" style={{ background: 'radial-gradient(circle, rgba(0,252,64,0.04), transparent 70%)', animationDelay: '3s' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-16 px-8 max-w-5xl w-full">
        {/* System Status */}
        <div className="flex items-center gap-3 animate-fade-up">
          <div className="w-2 h-2 rounded-full bg-neon animate-signal" />
          <span className="text-[10px] font-mono text-neon uppercase tracking-[0.3em]">System Online · Accepting Early Access Requests</span>
        </div>

        {/* Main Headline */}
        <div className="text-center animate-fade-up" style={{ animationDelay: '100ms' }}>
          <h1 className="font-space font-bold text-5xl text-text-base uppercase leading-tight mb-4" style={{ letterSpacing: '-0.03em' }}>
            The Future of<br />
            <span className="text-cyan text-glow-cyan">Synthetic Intel.</span>
          </h1>
          <p className="text-sm text-text-sub max-w-lg mx-auto leading-relaxed">
            AI-driven geopolitical intelligence, real-time risk synthesis, and tactical market signals — all in one command terminal.
          </p>
        </div>

        {/* Waitlist Card */}
        <div className="w-full max-w-md animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="bg-surface-low/80 backdrop-blur-tactical rounded-sm p-8 shadow-cyan-lg">
            <div className="section-label mb-1">Request Early Access</div>
            <div className="font-space font-bold text-lg text-text-base mb-6">Join the Waitlist</div>

            {joined ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="w-12 h-12 rounded-full bg-neon/20 flex items-center justify-center animate-pulse-cyan">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00fc40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="font-space font-bold text-neon">Access Requested</div>
                <div className="text-[10px] font-mono text-text-muted text-center">You are in the queue. Expect confirmation within 48 hours.</div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="text-[9px] font-mono text-text-muted uppercase tracking-widest block mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="operator@intel.gov"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-obsidian text-text-base text-sm font-mono px-4 py-3 rounded-sm border border-surface-bright outline-none focus:border-cyan transition-colors placeholder:text-text-muted"
                  />
                </div>
                <button
                  onClick={() => email && setJoined(true)}
                  className="btn-cyan w-full py-4 text-sm">
                  Join Waitlist →
                </button>
              </>
            )}

            <div className="text-[8px] font-mono text-text-muted text-center mt-4">No spam. Access granted in order of queue position.</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-12 animate-fade-up" style={{ animationDelay: '300ms' }}>
          {[
            { val: '142k+', label: 'Intelligence Signals Processed' },
            { val: '0.4s',  label: 'Average AI Response Latency' },
            { val: '99.8%', label: 'Uptime Guarantee (SLA)' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-space font-bold text-3xl text-cyan mb-1">{s.val}</div>
              <div className="text-[9px] font-mono text-text-muted uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-[8px] font-mono text-text-muted animate-fade-up" style={{ animationDelay: '400ms' }}>
          ADER COMMAND SYSTEMS · CLASSIFIED ACCESS ONLY · GT-OMEGA CLEARANCE REQUIRED
        </div>
      </div>
    </div>
  );
}

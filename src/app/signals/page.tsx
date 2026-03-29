'use client';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const signals = [
  {
    id: 1, category: 'ENERGY / COMMODITIES', confidence: 94,
    title: 'Crude Oil Supply Shock: Red Sea Disruption',
    reasoning: 'Cross-referencing satellite tanker telemetry with localized geopolitical sentiment indices. Liquidity gap detected at $84.20 support.',
    riskFactor: 'CRITICAL VOLATILITY', riskColor: 'text-tactical',
    execStatus: 'ACTIVE ENTRY', execColor: 'text-neon',
    signals: 14, macros: 3,
    borderColor: 'border-l-tactical',
  },
  {
    id: 2, category: 'FOREX / MACRO', confidence: 81,
    title: 'USD/JPY Yield Curve Divergence',
    reasoning: 'Algorithmic scanning of BOJ policy leaks vs. US Treasury yield spikes. Momentum oscillators reaching terminal exhaustion.',
    riskFactor: 'MODERATE SPREAD', riskColor: 'text-amber-400',
    execStatus: 'PENDING TRIGGER', execColor: 'text-text-sub',
    signals: 9, macros: 2,
    borderColor: 'border-l-amber-400',
  },
];

const microStream = [
  { asset: 'ETHUSD', msg: 'Spot inflow Detected ($142M)', time: '16:03s' },
  { asset: 'EURUSD', msg: 'Negative Sentiment Spike (Reuters)', time: '44:12s' },
  { asset: 'GEN-AI', msg: 'GT-4 Initializing Sector Scan (Apr)', time: '52:40s' },
];

export default function SignalsFeedPage() {
  return (
    <div className="shell">
      <Sidebar />
      <div className="main-area">
        <Header subtitle="Network Status: Optimized" />
        <div className="body-viewport overflow-y-auto scrollbar-thin bg-obsidian">
          <div className="flex gap-0 h-full">

            {/* Main Feed */}
            <div className="flex-1 p-8 flex flex-col gap-6">
              <div className="animate-fade-up">
                <div className="text-[9px] font-mono text-neon uppercase tracking-[0.25em] mb-1 animate-signal">● Network Status: Optimized</div>
                <h1 className="font-space font-bold text-3xl uppercase">
                  AI Priority <span className="text-cyan text-glow-cyan">Signals</span>
                </h1>
              </div>

              <div className="flex gap-3">
                <button className="btn-outline">Filter by Asset</button>
                <button className="btn-outline flex items-center gap-2">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Export Report
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {signals.map((s, i) => (
                  <div key={s.id}
                    className={`bg-surface-low border-l-2 ${s.borderColor} p-5 animate-fade-up cursor-pointer group transition-all duration-300 hover:bg-surface-high`}
                    style={{ animationDelay: `${i * 120}ms` }}>

                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-[9px] font-mono text-text-muted uppercase tracking-widest mb-1">{s.category}</div>
                        <h2 className="font-space font-bold text-base text-text-base group-hover:text-cyan transition-colors">{s.title}</h2>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0 ml-4">
                        <div className="font-space font-bold text-3xl text-cyan text-glow-cyan">{s.confidence}%</div>
                        <div className="text-[9px] font-mono text-text-muted uppercase">Confidence</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 bg-obsidian p-3 rounded-sm mb-3">
                      <div>
                        <div className="text-[8px] font-mono text-text-muted uppercase mb-1">AI Reasoning Phase</div>
                        <p className="text-[10px] text-text-sub leading-relaxed">{s.reasoning}</p>
                      </div>
                      <div className="border-l border-surface-high pl-3">
                        <div className="text-[8px] font-mono text-text-muted uppercase mb-2">Risk Factor</div>
                        <div className={`font-mono font-bold text-xs ${s.riskColor}`}>{s.riskFactor}</div>
                      </div>
                      <div className="border-l border-surface-high pl-3">
                        <div className="text-[8px] font-mono text-text-muted uppercase mb-2">Execution Status</div>
                        <div className={`font-mono font-bold text-xs flex items-center gap-1.5 ${s.execColor}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${s.execColor.replace('text-','bg-')} animate-signal`} />
                          {s.execStatus}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-[9px] font-mono text-text-muted">
                        Associated with <span className="text-cyan">{s.signals} micro-signals</span> &amp; <span className="text-cyan">{s.macros} macro events</span>
                      </div>
                      <button className="text-[9px] font-mono text-cyan uppercase tracking-widest hover:text-glow-cyan transition-all flex items-center gap-1">
                        View Full Analysis
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-72 flex-shrink-0 bg-surface-low shadow-panel flex flex-col gap-0 overflow-y-auto scrollbar-thin divide-y divide-surface-high">
              {/* Hot Zone */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Hot Zone Detection</span>
                  <div className="w-4 h-4 rounded-sm bg-neon/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon animate-signal" />
                  </div>
                </div>
                <div className="h-28 bg-obsidian rounded-sm relative overflow-hidden mb-3">
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(143,245,255,0.06) 1px, transparent 0)', backgroundSize: '18px 18px' }} />
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center animate-pulse-ring">
                      <div className="w-4 h-4 rounded-full bg-neon/30" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className="text-[8px] font-mono text-neon bg-neon/10 px-2 py-0.5 rounded-sm">ACTIVE ZONE</span>
                  </div>
                </div>
                <p className="text-[9px] text-text-sub leading-relaxed">Geospatial analysis indicates a 52% increase in maritime insurance premiums within Sector 1.</p>
              </div>

              {/* Sentiment */}
              <div className="p-5">
                <div className="text-[9px] font-mono text-text-muted uppercase mb-3 tracking-widest">Aggregate Sentiment</div>
                {[
                  { label: 'Bullish Momentum', val: 68, color: 'progress-fill-green' },
                  { label: 'Bearish Pressure', val: 32, color: 'progress-fill-red' },
                ].map(s => (
                  <div key={s.label} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-[9px] font-mono text-text-sub uppercase">{s.label}</span>
                      <span className="text-[9px] font-mono text-text-muted">{s.val}%</span>
                    </div>
                    <div className="progress-track"><div className={`${s.color} h-full`} style={{ width: `${s.val}%` }} /></div>
                  </div>
                ))}
              </div>

              {/* Micro Stream */}
              <div className="p-5 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Micro Stream</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-signal" />
                </div>
                <div className="flex flex-col gap-2">
                  {microStream.map((m, i) => (
                    <div key={i} className="flex gap-2 items-start animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-1.5 flex-shrink-0" />
                      <div>
                        <div className="text-[9px] font-mono text-text-muted">{m.time}</div>
                        <div className="text-[10px] text-text-sub">{m.asset} — {m.msg}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boost button */}
              <div className="p-5">
                <button className="w-10 h-10 rounded-sm flex items-center justify-center ml-auto shadow-cyan-sm"
                  style={{ background: 'linear-gradient(135deg, #8ff5ff, #00deec)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#001a1c" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

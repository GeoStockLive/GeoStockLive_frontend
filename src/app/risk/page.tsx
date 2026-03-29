'use client';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const matrix = [
  { region: 'East Asia',       geo: 'critical', fin: 'low',      inf: 'elevated', cyber: 'guarded', geoLabel:'Tension High', finLabel:'Stable', infLabel:'Supply Chain', cyberLabel:'Fortified' },
  { region: 'Middle East',     geo: 'critical', fin: 'elevated', inf: 'low',      cyber: 'critical', geoLabel:'Conflict Zone', finLabel:'Currency Vol', infLabel:'Active', cyberLabel:'Breached' },
  { region: 'European Union',  geo: 'guarded',  fin: 'elevated', inf: 'low',      cyber: 'guarded', geoLabel:'Stable-ish', finLabel:'Equity Spill', infLabel:'No Alert', cyberLabel:'Guarded' },
  { region: 'North America',   geo: 'low',      fin: 'guarded',  inf: 'low',      cyber: 'elevated', geoLabel:'Domestic', finLabel:'Bank Drama', infLabel:'Optimal', cyberLabel:'Grid Events' },
];

const cellClass: Record<string, string> = {
  critical: 'risk-critical',
  elevated: 'risk-elevated',
  guarded:  'risk-guarded',
  low:      'risk-low',
};

const cellLabel: Record<string, string> = {
  critical: 'CRITICAL',
  elevated: 'ELEVATED',
  guarded:  'GUARDED',
  low:      'LOW',
};

export default function RiskMatrixPage() {
  return (
    <div className="shell">
      <Sidebar />
      <div className="main-area">
        <Header subtitle="Terminal ID 6T-1" />
        <div className="body-viewport overflow-y-auto scrollbar-thin bg-obsidian p-8 gap-6 flex-col">

          {/* Page Header */}
          <div className="flex items-start justify-between mb-6 animate-fade-up">
            <div>
              <div className="section-label">Cross-Regional Volatility Correlation and Structural Threat Assessment</div>
              <h1 className="font-space font-bold text-2xl text-text-base uppercase tracking-tight">
                Risk Matrix <span className="text-cyan">v4.2</span>
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[9px] font-mono text-text-muted uppercase">Last Global Sync</div>
                <div className="font-mono text-[11px] text-cyan font-bold">04/12:09 UTC</div>
              </div>
              <button className="btn-outline flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export Report
              </button>
            </div>
          </div>

          <div className="flex gap-6 min-h-0">
            {/* Matrix Table */}
            <div className="flex-1 animate-slide-in-left">
              <div className="bg-surface-low rounded-sm overflow-hidden">
                {/* Col Headers */}
                <div className="grid grid-cols-5 gap-px bg-obsidian">
                  {['Market Region', 'Geopolitical', 'Financial', 'Infrastructure', 'Cyber'].map(col => (
                    <div key={col} className="bg-surface-high px-4 py-3 text-[9px] font-mono uppercase tracking-widest text-text-muted">
                      {col}
                    </div>
                  ))}
                </div>
                {/* Rows */}
                {matrix.map((row, i) => (
                  <div key={row.region} className="grid grid-cols-5 gap-px bg-obsidian"
                       style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="bg-surface-low px-4 py-4 flex items-center gap-2">
                      <div className="w-1.5 h-8 rounded-full bg-cyan opacity-30" />
                      <span className="font-space font-semibold text-xs text-text-base">{row.region}</span>
                    </div>
                    {[
                      { lvl: row.geo,  sub: row.geoLabel  },
                      { lvl: row.fin,  sub: row.finLabel  },
                      { lvl: row.inf,  sub: row.infLabel  },
                      { lvl: row.cyber,sub: row.cyberLabel },
                    ].map((cell, j) => (
                      <div key={j} className={`px-3 py-4 flex flex-col gap-1 ${cellClass[cell.lvl]}`}>
                        <span className="text-[11px] font-bold font-mono">{cellLabel[cell.lvl]}</span>
                        <span className="text-[9px] opacity-70">{cell.sub}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Bottom Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[
                  { label: 'Geopolitical Flux', val: '+14.2%', color: 'text-neon',     bar: 'progress-fill-green', w: '60%' },
                  { label: 'Market Liquidity',  val: '-2.4%',  color: 'text-tactical', bar: 'progress-fill-red',   w: '30%' },
                  { label: 'Threat Neutralization', val: '88%', color: 'text-cyan',    bar: 'progress-fill-cyan',  w: '88%' },
                ].map(s => (
                  <div key={s.label} className="card-low animate-fade-up">
                    <div className="text-[9px] font-mono text-text-muted uppercase mb-1">{s.label}</div>
                    <div className={`font-space font-bold text-xl ${s.color} mb-2`}>{s.val}</div>
                    <div className="progress-track"><div className={`${s.bar} h-full`} style={{ width: s.w }} /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel: Regional Risk Scan */}
            <div className="w-72 flex-shrink-0 flex flex-col gap-4 animate-slide-in-right">
              <div className="card-low">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-tactical animate-signal" />
                  <span className="text-[10px] font-mono text-text-sub uppercase tracking-widest">Regional Risk Scan</span>
                </div>

                {/* Alert */}
                <div className="p-3 bg-tactical/10 rounded-sm border border-tactical/20 mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="badge-red">Action Required</span>
                    <span className="text-[9px] font-mono text-text-muted">9m ago</span>
                  </div>
                  <div className="font-space font-semibold text-xs text-text-base mb-1">Strait of Hormuz Congestion</div>
                  <p className="text-[9px] text-text-sub leading-relaxed">Satellite data indicates a 40% increase in tanker loitering. Kinetic threat high. Re-routing recommended for Tier 1 assets.</p>
                </div>

                {/* Focus Area */}
                <div className="text-[9px] font-mono text-text-muted uppercase mb-2">Focus Area</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-sm bg-neon/20 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00fc40" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                  </div>
                  <span className="font-space font-semibold text-xs text-text-base">SCS Maritime Corridor</span>
                </div>

                {[
                  { label: 'Congestion Index', val: '92.4', color: 'text-text-base' },
                  { label: 'Military Presence',val: 'ELEVATED', color: 'text-tactical' },
                  { label: 'Weather Forecast', val: 'OPTIMAL', color: 'text-neon' },
                ].map(m => (
                  <div key={m.label} className="flex justify-between py-1.5 border-b border-surface-highest last:border-0">
                    <span className="text-[9px] font-mono text-text-muted">{m.label}</span>
                    <span className={`text-[10px] font-mono font-bold ${m.color}`}>{m.val}</span>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="card-low overflow-hidden relative h-36">
                <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-tactical/5" />
                <div className="grid grid-cols-4 gap-px h-full">
                  {Array.from({length:16}).map((_,i) => (
                    <div key={i} className="bg-surface-highest/30 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-text-muted/20" />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Satellite Feed Active</div>
                </div>
              </div>

              <button className="btn-outline w-full text-center">View Full Intelligence Log</button>
              <button className="btn-cyan">Request Custom Analysis</button>
            </div>
          </div>

          {/* System Footer */}
          <div className="flex gap-12 pt-6 border-t border-surface-high mt-2">
            {[
              { label:'Active Satellites', val:'148 Nodes' },
              { label:'Encryption', val:'AES-512-GT' },
              { label:'Latency', val:'14ms' },
              { label:'Terminal ID', val:'GT-OMEGA-01' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-[8px] font-mono text-text-muted uppercase">{s.label}</div>
                <div className="text-[10px] font-mono text-text-sub font-semibold">{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
